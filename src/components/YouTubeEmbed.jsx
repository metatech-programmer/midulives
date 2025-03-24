import { useEffect, useState, useRef } from "react";

export default function YouTubeEmbed({ videoId, playListId, selectedVideo }) {
  const [bgColor, setBgColor] = useState("#000");
  const playerRef = useRef(null);
  const timeRef = useRef(0);
  const [loaded, setLoaded] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const getThumbnailColors = async () => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = `https://img.youtube.com/vi/${selectedVideo || videoId}/hqdefault.jpg`;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) return;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let r = 0, g = 0, b = 0, count = 0;

        for (let i = 0; i < imageData.length; i += 4 * 50) {
          r += imageData[i];
          g += imageData[i + 1];
          b += imageData[i + 2];
          count++;
        }

        const avgColor = `rgb(${Math.floor(r / count)}, ${Math.floor(g / count)}, ${Math.floor(b / count)})`;
        setBgColor(avgColor);
      };
    };

    getThumbnailColors();
  }, [videoId, selectedVideo]);

  useEffect(() => {
    const savedTime = localStorage.getItem(`lastTime-id-[${selectedVideo}]`);
    if (savedTime) {
      timeRef.current = parseFloat(savedTime);
    }
    setLoaded(true);
  }, [selectedVideo]);

  useEffect(() => {
    if (!loaded) return;

    const initializeYouTubeAPI = () => {
      if (!window.YT) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
          if (window.YT && typeof window.YT.Player === "function") {
            createPlayer();
          }
        };
      } else {
        createPlayer();
      }
    };

    // Esperar a que la API de YouTube esté lista antes de crear el reproductor
    window.onYouTubeIframeAPIReady = () => {
      if (!playerRef.current) {
        createPlayer();
      }
    };

    initializeYouTubeAPI();
  }, [videoId, selectedVideo, loaded]);

  const createPlayer = () => {
    if (playerRef.current) {
      playerRef.current.destroy();
    }

    playerRef.current = new YT.Player("player", {
      height: "100%",
      width: "100%",
      videoId: selectedVideo || videoId,
      playerVars: {
        autoplay: 1,
        controls: 1,
        fs: 1,
        modestbranding: 1,
        list: playListId || "",
        vq: "hd1080",
        origin: window.location.origin,
      },
      events: {
        onReady: (event) => {
          event.target.seekTo(timeRef.current, true);
          event.target.playVideo();
        },
        onStateChange: handleStateChange,
      },
    });
  };

  const handleStateChange = (event) => {
    if (event.data === YT.PlayerState.PLAYING) {
      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        if (playerRef.current) {
          const currentTime = playerRef.current.getCurrentTime();
          localStorage.setItem(
            `lastTime-id-[${playerRef.current.getVideoData().video_id}]`,
            currentTime
          );
          console.log(`Tiempo guardado: ${currentTime}`);
        }
      }, 5000);
    } else if (event.data === YT.PlayerState.ENDED || event.data === YT.PlayerState.PAUSED) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  return (
    <div className="relative w-full h-52 md:h-[80dvh] flex justify-center items-center">
      <div
        className="absolute w-full h-full blur-3xl opacity-80 -z-10 transition-all duration-700"
        style={{ backgroundColor: bgColor }}
      ></div>

      <div id="player" className="w-full h-52 md:h-[80dvh] rounded-lg shadow-lg z-50"></div>
    </div>
  );
}
