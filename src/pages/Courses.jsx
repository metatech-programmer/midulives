import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { COURSES, AUTO_DETECT_TOPICS } from "@constants/courses";
import { useChannelVideos } from "@hooks/useChannelVideos";

const Courses = () => {
  const { t } = useTranslation();
  const { categorizedVideos } = useChannelVideos();

  // Flatten all course videos from both channels
  const allCourseVideos = useMemo(() => {
    if (!categorizedVideos) return [];
    return [
      ...(categorizedVideos.cursos?.midulive || []),
      ...(categorizedVideos.cursos?.midudev || []),
      ...(categorizedVideos.cursos_nuevos?.midulive || []),
      ...(categorizedVideos.cursos_nuevos?.midudev || []),
    ].sort((a, b) => new Date(b.rawPublishedAt) - new Date(a.rawPublishedAt));
  }, [categorizedVideos]);

  // Detect topics from API that aren't covered by any static COURSE entry
  const dynamicCourses = useMemo(() => {
    if (!allCourseVideos.length) return [];
    const staticIds = new Set(COURSES.map(c => c.id));
    return AUTO_DETECT_TOPICS.filter(topic => {
      if (staticIds.has(topic.id)) return false;
      return allCourseVideos.some(v =>
        topic.keywords.some(kw => v.title.toLowerCase().includes(kw))
      );
    }).map(topic => {
      const matchingVideos = allCourseVideos.filter(v =>
        topic.keywords.some(kw => v.title.toLowerCase().includes(kw))
      );

      return {
        ...topic,
        count: matchingVideos.length,
        latestPublishedAt: matchingVideos[0]?.rawPublishedAt || null,
      };
    }).sort((a, b) => new Date(b.latestPublishedAt || 0) - new Date(a.latestPublishedAt || 0));
  }, [allCourseVideos]);

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-2xl md:text-4xl font-bold my-8 font-silkscreen text-purple-300 text-center">
        {t("courses.title")}
      </h1>

      {/* All courses: static + dynamically detected */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pb-8">
        {COURSES.map((course) => (
          <Link
            key={course.id}
            to={`/cursos/${course.id}`}
            className="group block bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/30 
              transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in-show"
            style={{ "--course-color": course.color }}
          >
            <div
              className="h-28 flex items-center justify-center p-5"
              style={{ backgroundColor: course.color + "18" }}
            >
              <div
                className="w-14 h-14 transition-transform duration-300 group-hover:scale-110"
                style={{ color: course.color }}
              >
                {course.svg}
              </div>
            </div>
            <div
              className="p-4"
              style={{ borderTop: `2px solid ${course.color}30` }}
            >
              <h2 className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors duration-200 text-pretty">
                {t(`courses.${course.id}.title`, { defaultValue: course.id })}
              </h2>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                {t(`courses.${course.id}.description`, { defaultValue: "" })}
              </p>
            </div>
          </Link>
        ))}

        {dynamicCourses.map((topic) => (
          <Link
            key={topic.id}
            to={`/cursos/auto/${topic.id}`}
            className="group block bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/30 
              transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in-show"
            style={{ "--course-color": topic.color }}
          >
            <div
              className="h-28 flex items-center justify-center p-5"
              style={{ backgroundColor: topic.color + "22" }}
            >
              <span
                className="text-3xl font-bold font-silkscreen tracking-widest transition-transform duration-300 group-hover:scale-110"
                style={{ color: topic.color }}
              >
                {topic.label.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div
              className="p-4"
              style={{ borderTop: `2px solid ${topic.color}30` }}
            >
              <h2 className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors duration-200 text-pretty">
                {topic.label}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                {topic.count} {topic.count === 1 ? "video" : "videos"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Courses;
