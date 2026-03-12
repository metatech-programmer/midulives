import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const THUMBNAIL_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1280 720'%3E%3Crect width='1280' height='720' fill='%23050505'/%3E%3Ccircle cx='640' cy='360' r='92' fill='%23262626'/%3E%3Cpath d='M612 305l108 55-108 55z' fill='%23f5f5f5'/%3E%3C/svg%3E";

export default function YouTubeEmbed({
  videoId,
  playListId,
  selectedVideo,
  onPlayerReady,
  videoQueue = [],
  onVideoSelect,
}) {
  const [bgColor, setBgColor] = useState("#000");
  const playerRef = useRef(null);
  const timeRef = useRef(0);
  const [loaded, setLoaded] = useState(false);
  const [playerStatus, setPlayerStatus] = useState("loading");
  const [statusLabel, setStatusLabel] = useState("Cargando video...");
  const intervalRef = useRef(null);
  const playerContainerIdRef = useRef(
    `player-${Math.random().toString(36).slice(2, 10)}`
  );
  const playerContainerRef = useRef(null);
  const mountedRef = useRef(false);
  const attemptedVideoIdsRef = useRef(new Set());
  const location = useLocation();
  const { vidId, time } = useParams();

  // helper to resolve selectedVideo which can be either an id string or an object { id, title, time }
  const resolveId = (v) => {
    if (!v) return null;
    if (typeof v === "string") return v;
    if (typeof v === "object" && (v.id || v.videoId)) return v.id || v.videoId;
    return null;
  };

  const resolvedVideoId = resolveId(selectedVideo) || videoId;
  const resolvedVideo = useMemo(
    () => videoQueue.find((video) => video.id === resolvedVideoId) || null,
    [resolvedVideoId, videoQueue]
  );

  // Ref always holds the latest target ID — prevents stale closures in async callbacks
  const videoIdRef = useRef(resolvedVideoId);
  videoIdRef.current = resolvedVideoId;

  useEffect(() => {
    attemptedVideoIdsRef.current = new Set(
      resolvedVideoId ? [resolvedVideoId] : []
    );
    setPlayerStatus("loading");
    setStatusLabel("Cargando video...");
  }, [resolvedVideoId]);

  const selectFallbackVideo = () => {
    if (!Array.isArray(videoQueue) || videoQueue.length === 0 || !onVideoSelect) {
      setPlayerStatus("error");
      setStatusLabel("No se pudo cargar este video");
      return;
    }

    const nextCandidate = videoQueue.find(
      (video) =>
        video?.id && !attemptedVideoIdsRef.current.has(video.id)
    );

    if (!nextCandidate) {
      setPlayerStatus("error");
      setStatusLabel("No hay otro video disponible por ahora");
      return;
    }

    attemptedVideoIdsRef.current.add(nextCandidate.id);
    setPlayerStatus("loading");
    setStatusLabel("Cargando un video disponible...");
    onVideoSelect(
      nextCandidate.id,
      localStorage.getItem(`lastTime-id-[${nextCandidate.id}]`) || 0,
      nextCandidate.title
    );
  };

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.warn("failed to destroy player on unmount", e);
        }
        playerRef.current = null;
      }
    };
  }, []);

  // When video changes and a player already exists, switch via loadVideoById
  // instead of destroying and recreating the whole player
  useEffect(() => {
    if (!resolvedVideoId || !playerRef.current) return;
    const startSec =
      selectedVideo && typeof selectedVideo === "object"
        ? selectedVideo.time ?? 0
        : timeRef.current ?? 0;
    try {
      setPlayerStatus("loading");
      setStatusLabel("Cargando video...");
      playerRef.current.loadVideoById({
        videoId: resolvedVideoId,
        startSeconds: startSec,
      });
    } catch (e) {
      // Player in a bad state — clear ref so the init effect recreates it
      console.warn("loadVideoById failed, will reinitialize player", e);
      playerRef.current = null;
    }
  }, [resolvedVideoId]);

  useEffect(() => {
    const saveVideoInfo = () => {
      try {
        const videoIdToUse = resolvedVideoId;
        const videos = JSON.parse(localStorage.getItem("videos_history")) || [];
        const existingVideo = videos.find((v) => v.videoId === videoIdToUse);

        if (existingVideo || !videoIdToUse) {
          return;
        }
        let urls =
          location.pathname.split("/").splice(0, 2).join("/") === "/cursos"
            ? location.pathname.split("/").splice(0, 3).join("/")
            : location.pathname.split("/").splice(0, 2).join("/");

        const video = {
          videoId: videoIdToUse,
          title: resolvedVideo?.title || `Video: ${videoIdToUse}`,
          thumbnail:
            resolvedVideo?.thumbnail ||
            `https://img.youtube.com/vi/${videoIdToUse}/hqdefault.jpg`,
          url: urls,
          timestamp: Date.now(),
        };

        localStorage.setItem("videos_history", JSON.stringify([...videos, video]));
      } catch (error) {
        console.error("Error saving video info:", error);
      }
    };

    if (resolvedVideoId) saveVideoInfo();
  }, [resolvedVideoId, resolvedVideo, location.pathname]);

  useEffect(() => {
    const getThumbnailColors = async () => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      const thumbId = resolvedVideoId;
      img.src = `https://img.youtube.com/vi/${thumbId}/hqdefault.jpg`;

      img.onerror = () => {
        setBgColor("#050505");
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) return;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        ).data;
        let r = 0,
          g = 0,
          b = 0,
          count = 0;

        for (let i = 0; i < imageData.length; i += 4 * 50) {
          r += imageData[i];
          g += imageData[i + 1];
          b += imageData[i + 2];
          count++;
        }

        const avgColor = `rgb(${Math.floor(r / count)}, ${Math.floor(
          g / count
        )}, ${Math.floor(b / count)})`;
        setBgColor(avgColor);
      };
    };

    if (resolvedVideoId) getThumbnailColors();
  }, [resolvedVideoId]);

  useEffect(() => {
    if (time) {
      timeRef.current = parseFloat(time);
    } else {
      timeRef.current = 0;
    }
    setLoaded(true);
  }, [resolvedVideoId, time]);

  useEffect(() => {
    if (!loaded) return;

    const initializeYouTubeAPI = () => {
      const existing = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      );
      if (!existing) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        script.onerror = (e) =>
          console.error("YouTube iframe API failed to load", e);
        document.body.appendChild(script);
      }

      const onYTReady = () => {
        if (!mountedRef.current) return;
        if (window.YT && window.YT.Player && !playerRef.current) {
          createPlayer();
        }
      };

      window.addEventListener("yt-iframe-api-ready", onYTReady);

      if (!window.__ytIframeReadyHookInstalled) {
        const prev = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          try {
            if (typeof prev === "function") prev();
          } catch (e) {
            console.warn("previous onYouTubeIframeAPIReady failed", e);
          }
          window.dispatchEvent(new Event("yt-iframe-api-ready"));
        };
        window.__ytIframeReadyHookInstalled = true;
      }

      if (window.YT && window.YT.Player) {
        onYTReady();
      }

      return () => {
        window.removeEventListener("yt-iframe-api-ready", onYTReady);
      };
    };

    return initializeYouTubeAPI();
  }, [loaded]);

  const createPlayer = () => {
    if (!mountedRef.current) return;

    const containerElement = playerContainerRef.current;
    if (!containerElement || !containerElement.isConnected) {
      return;
    }

    if (playerRef.current) {
      try {
        playerRef.current.destroy();
      } catch (e) {
        console.warn("failed to destroy previous player", e);
      }
      playerRef.current = null;
    }

    // Use ref to get the latest video ID — avoids stale closure issues
    const idToPlay = videoIdRef.current || vidId;

    // Guard: never pass an invalid/corrupt ID to the YT player
    if (!idToPlay || typeof idToPlay !== 'string' || !/^[a-zA-Z0-9_-]{8,12}$/.test(idToPlay)) {
      console.warn('YouTubeEmbed: invalid video id, skipping player init', idToPlay);
      return;
    }

    if (!window.YT || !window.YT.Player) {
      console.warn("YouTube API not ready yet");
      return;
    }

    // Do NOT pass the React-managed containerElement directly to YT.Player —
    // the API replaces the node with an <iframe>, which breaks React's fiber.
    // Instead, give it an ephemeral child div that React doesn't track.
    containerElement.innerHTML = "";
    const playerMount = document.createElement("div");
    containerElement.appendChild(playerMount);

    playerRef.current = new window.YT.Player(playerMount, {
      height: "100%",
      width: "100%",
      videoId: idToPlay,
      playerVars: {
        autoplay: 1,
        controls: 1,
        fs: 1,
        modestbranding: 1,
        list: playListId || "",
        vq: "hd1080",
        origin: window.location.origin,
        rel: 0,
      },
      events: {
        onReady: (event) => {
          if (!mountedRef.current) return;
          event.target.seekTo(timeRef.current, true);
          event.target.playVideo();
          setPlayerStatus("ready");
          if (onPlayerReady) {
            onPlayerReady(event.target);
          }
        },
        onStateChange: handleStateChange,
        onError: (event) => {
          // Error codes: 2=invalid id, 5=html5 error, 100=not found/private, 101/150=embedding not allowed
          console.warn('YouTubeEmbed player error:', event.data, 'for id:', videoIdRef.current);
          selectFallbackVideo();
        },
      },
    });
  };

  const handleStateChange = (event) => {
    if (!mountedRef.current) return;

    if (
      event.data === window.YT.PlayerState.PLAYING ||
      event.data === window.YT.PlayerState.PAUSED ||
      event.data === window.YT.PlayerState.BUFFERING ||
      event.data === window.YT.PlayerState.CUED
    ) {
      setPlayerStatus("ready");
    }

    if (event.data === window.YT.PlayerState.PLAYING) {
      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        if (playerRef.current?.getCurrentTime && playerRef.current?.getVideoData) {
          const currentTime = playerRef.current.getCurrentTime();
          const videoData = playerRef.current.getVideoData();
          const currentVideoId = videoData?.video_id;
          if (!currentVideoId) return;
          localStorage.setItem(
            `lastTime-id-[${currentVideoId}]`,
            currentTime
          );
        }
      }, 3000);
    } else if (
      event.data === window.YT.PlayerState.ENDED ||
      event.data === window.YT.PlayerState.PAUSED
    ) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  return (
    <div className="relative w-full h-52 sm:h-[80dvh] flex justify-center items-center">
      <div
        className="absolute w-full h-full blur-3xl opacity-80 -z-10 transition-all duration-700"
        style={{ backgroundColor: bgColor }}
      ></div>

      {playerStatus !== "ready" && (
        <div className="absolute inset-0 z-[60] flex flex-col items-center justify-center gap-3 rounded-lg bg-black text-gray-200">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-gray-700 border-t-purple-400" />
          <p className="text-sm tracking-wide text-gray-300">{statusLabel}</p>
        </div>
      )}

      <div
        id={playerContainerIdRef.current}
        ref={playerContainerRef}
        className={`w-full h-52 sm:h-[80dvh] rounded-lg shadow-lg z-50 bg-gray-950 transition-opacity duration-300 ${
          playerStatus === "ready" ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      {playerStatus !== "ready" && resolvedVideo && (
        <img
          src={resolvedVideo.thumbnail || THUMBNAIL_FALLBACK}
          alt={resolvedVideo.title}
          className="absolute inset-0 z-[55] h-full w-full rounded-lg object-cover opacity-35"
          loading="eager"
          onError={(event) => {
            event.currentTarget.src = THUMBNAIL_FALLBACK;
          }}
        />
      )}
    </div>
  );
}
