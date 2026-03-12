import { useState, useEffect, useMemo } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useVideos } from "@hooks/useVideos";
import { useChannelVideos } from "@hooks/useChannelVideos";
import { useLastVideo } from "@hooks/useLastVideo";
import VideoList from "@components/VideoList";
import Pagination from "@components/Pagination";
import YouTubeEmbed from "@components/YouTubeEmbed";
import playlistIds from "@constants/playlistIds.json";
import { COURSES, AUTO_DETECT_TOPICS } from "@constants/courses";

const VIDEOS_PER_PAGE = 12;

const CoursePage = () => {
  const { cursoId, topicId } = useParams();
  const location = useLocation();
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  // Determine if this is a dynamic auto-detected course or a static playlist course
  const isAutoMode = !!topicId;
  const effectiveId = topicId || cursoId;

  const playlistId = isAutoMode ? null : playlistIds.cursos?.[effectiveId];
  const course = COURSES.find((c) => c.id === effectiveId);
  const autoTopic = isAutoMode ? AUTO_DETECT_TOPICS.find(t => t.id === effectiveId) : null;

  // === Static playlist mode ===
  const { videos: playlistVideos, loading: playlistLoading, error: playlistError } = useVideos(playlistId);

  // === Auto / channel-based mode ===
  const { categorizedVideos, loading: channelLoading, error: channelError } = useChannelVideos();
  const autoVideos = useMemo(() => {
    if (!isAutoMode || !autoTopic || !categorizedVideos) return [];
    const all = [
      ...(categorizedVideos.cursos?.midulive || []),
      ...(categorizedVideos.cursos?.midudev || []),
      ...(categorizedVideos.cursos_nuevos?.midulive || []),
      ...(categorizedVideos.cursos_nuevos?.midudev || []),
      // also search live_coding in case some slipped through
      ...(categorizedVideos.live_coding?.midulive || []),
      ...(categorizedVideos.live_coding?.midudev || []),
    ];
    return all.filter(v =>
      autoTopic.keywords.some(kw => v.title.toLowerCase().includes(kw))
    ).sort((a, b) => new Date(b.rawPublishedAt) - new Date(a.rawPublishedAt));
  }, [isAutoMode, autoTopic, categorizedVideos]);

  const videos = isAutoMode ? autoVideos : playlistVideos;
  const loading = isAutoMode ? channelLoading : playlistLoading;
  const error = isAutoMode ? channelError : playlistError;

  const { selectedVideo, handleVideoSelect } = useLastVideo(videos, location.pathname);

  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo(0, 0);
  }, [effectiveId]);

  if (!isAutoMode && !playlistId) {
    return (
      <div className="container mx-auto px-4 pt-16 pb-24 text-center animate-fade-in">
        <h2 className="text-2xl font-bold text-red-400 mb-4">
          Curso no encontrado
        </h2>
        <p className="text-gray-400 mb-6">
          El curso &ldquo;{effectiveId}&rdquo; no existe o aún no está disponible.
        </p>
        <Link
          to="/cursos"
          className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          ← Ver todos los cursos
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 pt-8 pb-24 flex justify-center items-center h-[60dvh]">
        <div className="animate-spin rounded-full h-52 w-52 border-b-3 border-purple-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 pt-8 pb-24 text-center animate-fade-in">
        <div className="text-red-500 mb-4">{error}</div>
        <Link
          to="/cursos"
          className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          ← Ver todos los cursos
        </Link>
      </div>
    );
  }

  const indexOfLast = currentPage * VIDEOS_PER_PAGE;
  const indexOfFirst = indexOfLast - VIDEOS_PER_PAGE;
  const currentVideos = videos.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(videos.length / VIDEOS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 pt-8 pb-24 animate-fade-in" id="course-top">
      {/* Breadcrumb + course header */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <Link
          to="/cursos"
          className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
        >
          ← Cursos
        </Link>
        <span className="text-gray-600">/</span>
        {course && (
          <div
            className="flex items-center gap-2"
            style={{ color: course.color }}
          >
            <div className="w-6 h-6 flex-shrink-0">{course.svg}</div>
            <span className="font-semibold text-sm">
              {t(`courses.${effectiveId}.title`, { defaultValue: effectiveId })}
            </span>
          </div>
        )}
        {autoTopic && (
          <div className="flex items-center gap-2" style={{ color: autoTopic.color }}>
            <span className="font-semibold text-sm">{autoTopic.label}</span>
          </div>
        )}
      </div>

      {/* Player */}
      <YouTubeEmbed
        videoId={videos[0]?.id}
        selectedVideo={selectedVideo}
        playListId={playlistId}
        videoQueue={videos}
        onVideoSelect={handleVideoSelect}
      />

      <hr className="my-4 md:my-5 opacity-10" />

      {/* Title + video count */}
      <div className="flex justify-between items-center my-4 md:my-8">
        <h1 className="text-sm md:text-2xl font-bold font-silkscreen text-purple-300 text-pretty">
          {t("lives.title.two", {
            category: autoTopic?.label ?? t(`courses.${effectiveId}.title`, { defaultValue: effectiveId }),
          })}
        </h1>
        <span className="text-xs text-gray-500 ml-4 whitespace-nowrap">
          {videos.length} videos
        </span>
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
          onPageChange={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}
    </div>
  );
};

export default CoursePage;
