import { useAutoVideos } from "@hooks/useAutoVideos";
import { useLastVideo } from "@hooks/useLastVideo";
import VideoList from "@components/VideoList";
import Pagination from "@components/Pagination";
import YouTubeEmbed from "@components/YouTubeEmbed";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const VIDEOS_PER_PAGE = 12;

const LiveCoding = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo(0, 0);
  }, [currentPath]);

  const { videos, loading, error } = useAutoVideos("live_coding");
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
    <div
      className="container mx-auto px-4 pt-8 pb-24 animate-fade-in"
      id="live_coding"
    >
      <YouTubeEmbed
        videoId={videos[0]?.id}
        playListId={null}
        selectedVideo={selectedVideo}
        videoQueue={videos}
        onVideoSelect={handleVideoSelect}
      />
      <div className="flex justify-between items-center my-4 md:my-10 ">
        <h1 className="text-xs md:text-2xl font-bold font-silkscreen text-purple-300 text-pretty text-center md:text-left">
          {t("live_coding")}
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

export default LiveCoding;
