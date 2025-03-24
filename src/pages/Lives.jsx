import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PLAYLIST_IDS from "@constants/playlistIds.json";
import { useVideos } from "@hooks/useVideos";
import { useLastVideo } from "@hooks/useLastVideo";
import VideoList from "@components/VideoList";
import Pagination from "@components/Pagination";

const VIDEOS_PER_PAGE = 12;

const Lives = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { cursoId } = useParams();
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo(0, 0);
  }, [currentPath]);

  const playlistId = (() => {
    const path = currentPath.split("/")[1];
    return path === "cursos" && cursoId
      ? PLAYLIST_IDS.cursos[cursoId]
      : PLAYLIST_IDS[path] || "PLnHPgY5vHkhDdRZP1xB_mq7f-aZCrdina";
  })();

  const { videos, loading, error } = useVideos(playlistId);
  const { time, selectedVideo, handleVideoSelect } = useLastVideo(
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
      <iframe
        className="w-full h-52 md:h-[80dvh] rounded-lg shadow-lg"
        src={`https://www.youtube.com/embed/${
          selectedVideo || videos[0]?.id
        }?loop=1&list=${
          playlistId || ""
        }&vq=hd1080&autoplay=1&controls=1&fs=1&modestbranding=1&start=${
          time || 0
        }`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      <hr className="my-8 opacity-10" />

      <div className="flex justify-between items-center my-10">
        <h1 className="text-xl font-bold font-silkscreen text-purple-300">
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
