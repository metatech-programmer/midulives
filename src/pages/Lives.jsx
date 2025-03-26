import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PLAYLIST_IDS from "@constants/playlistIds.json";
import { useVideos } from "@hooks/useVideos";
import { useLastVideo } from "@hooks/useLastVideo";
import VideoList from "@components/VideoList";
import Pagination from "@components/Pagination";
import YouTubeEmbed from "@components/YouTubeEmbed";

const VIDEOS_PER_PAGE = 12;

const Lives = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const currentPathLink =
    location.pathname.split("/").splice(0, 2).join("/") === "/cursos"
      ? location.pathname.split("/").splice(0, 3).join("/")
      : location.pathname.split("/").splice(0, 2).join("/");

  let { cursoId, vidId, name, time } = useParams();
  let timeNow = (id) => {
    return localStorage.getItem(`lastTime-id-[${id}]`) || time;
  };
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
  const [includeTime, setIncludeTime] = useState(true);

  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo(0, 0);
  }, [currentPath]);

  useEffect(() => {
    if (isSharePopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSharePopupOpen]);

  const playlistId = (() => {
    const path = currentPath.split("/")[1];
    return path === "cursos" && cursoId
      ? PLAYLIST_IDS.cursos[cursoId]
      : PLAYLIST_IDS[path] || "PLnHPgY5vHkhDdRZP1xB_mq7f-aZCrdina";
  })();

  const { videos, loading, error } = useVideos(playlistId);
  const { selectedVideo, handleVideoSelect } = useLastVideo(
    videos,
    currentPath
  );

  const indexOfLastVideo = currentPage * VIDEOS_PER_PAGE;
  const indexOfFirstVideo = indexOfLastVideo - VIDEOS_PER_PAGE;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);
  const totalPages = Math.ceil(videos.length / VIDEOS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getShareUrl = (withTime = true) => {
    const baseUrl =
      window.location.origin + currentPathLink + "/" + vidId + "/" + name;
    return withTime ? baseUrl + "/" + timeNow(vidId) : baseUrl;
  };

  const getShareUrlCopy = () => {
    const baseUrl =
      window.location.origin + currentPathLink + "/" + vidId + "/" + name;
    return baseUrl + "/" + timeNow(vidId);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 pt-8 pb-24 flex justify-center items-center h-[60dvh]">
        <div className="animate-spin rounded-full h-52 w-52 border-b-3 border-purple-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 pt-8 pb-24 text-red-500 text-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-8 pb-24 animate-fade-in">
      <YouTubeEmbed
        videoId={videos[0].id}
        playListId={playlistId}
        selectedVideo={selectedVideo}
      />
      <div className="flex justify-center pt-4">
        <button
          onClick={() => setIsSharePopupOpen(true)}
          className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-purple-300 
            border border-purple-500/30 rounded-lg transition-all duration-300 
            hover:bg-purple-500/10 hover:scale-105 active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
          <span>{t("common.share")}</span>
        </button>
      </div>

      {isSharePopupOpen && (
        <div className="fixed inset-0 w-full h-screen  flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div
            className="fixed inset-0 w-full h-screen bg-black/50 overflow-y-auto"
            onClick={() => setIsSharePopupOpen(false)}
          ></div>
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full md:m-auto z-[55] mx-2 md:mx-0">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-purple-300">
                {t("common.share")}
              </h3>
              <button
                onClick={() => setIsSharePopupOpen(false)}
                className="text-gray-400 hover:text-gray-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                id="includeTime"
                checked={includeTime}
                onChange={(e) => setIncludeTime(e.target.checked)}
                className="rounded bg-gray-700 border-gray-600"
              />
              <label htmlFor="includeTime" className="text-sm text-gray-300">
                {t("common.includeTimestamp")}
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={() => {
                  window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      document.title
                    )}&url=${encodeURIComponent(getShareUrl(includeTime))}`,
                    "_blank"
                  );
                }}
                className="flex items-center justify-center gap-2 p-2 text-blue-400 border border-blue-400/30 rounded-lg hover:bg-blue-400/10"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>Twitter</span>
              </button>

              <button
                onClick={() => {
                  window.open(
                    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      getShareUrl(includeTime)
                    )}`,
                    "_blank"
                  );
                }}
                className="flex items-center justify-center gap-2 p-2 text-sky-500 border border-sky-500/30 rounded-lg hover:bg-sky-500/10"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                </svg>
                <span>LinkedIn</span>
              </button>

              <button
                onClick={() => {
                  window.open(
                    `https://wa.me/?text=${encodeURIComponent(
                      `${document.title} ${getShareUrl(includeTime)}`
                    )}`,
                    "_blank"
                  );
                }}
                className="flex items-center justify-center gap-2 p-2 text-green-500 border border-green-500/30 rounded-lg hover:bg-green-500/10"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  navigator
                    .share({
                      title: document.title,
                      url: getShareUrl(includeTime),
                    })
                    .catch(console.error);
                }}
                className="flex items-center justify-center gap-2 p-2 text-purple-300 border border-purple-500/30 rounded-lg hover:bg-purple-500/10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
                <span>{t("common.shareGeneric")}</span>
              </button>
            </div>

            <div className="mt-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(getShareUrlCopy());
                  alert(t("common.urlCopied"));
                }}
                className="w-full flex items-center justify-center gap-2 p-3 text-purple-300 border border-purple-500/30 rounded-lg hover:bg-purple-500/10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <span>{t("common.copyUrl")}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <hr className="my-4 md:my-5 opacity-10" />

      <div className="flex justify-between items-center my-4 md:my-10 ">
        <h1 className="text-xs md:text-2xl font-bold font-silkscreen text-purple-300 text-pretty text-center md:text-left">
          {t(
            location.pathname.split("/")[1] !== "cursos"
              ? "lives.title"
              : "lives.title.two",
            {
              category:
                location.pathname.split("/")[1] !== "cursos"
                  ? location.pathname.split("/")[1]
                  : location.pathname.split("/")[2],
            }
          )}
        </h1>
      </div>

      <VideoList
        videos={currentVideos}
        selectedVideo={selectedVideo}
        onVideoSelect={handleVideoSelect}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Lives;
