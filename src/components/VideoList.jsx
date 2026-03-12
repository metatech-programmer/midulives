import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const THUMBNAIL_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1280 720'%3E%3Crect width='1280' height='720' fill='%23111111'/%3E%3Ccircle cx='640' cy='360' r='92' fill='%23262626'/%3E%3Cpath d='M612 305l108 55-108 55z' fill='%23f5f5f5'/%3E%3C/svg%3E";

const VideoList = ({ videos, selectedVideo, onVideoSelect }) => {
  const { t } = useTranslation();

  // selectedVideo can be a string ID or an object { id, title, time }
  const resolvedSelectedId = selectedVideo && typeof selectedVideo === 'object'
    ? (selectedVideo.id || selectedVideo.videoId || null)
    : selectedVideo || null;
  const timeFormat = (time) => {
    const hours = isNaN(Math.floor(time / 3600)) ? 0 : Math.floor(time / 3600);
    const minutes = isNaN(Math.floor((time % 3600) / 60)) ? 0 : Math.floor((time % 3600) / 60);
    const seconds = isNaN(parseInt(time % 60)) ? 0 : parseInt(time % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const {vidId} = useParams();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {videos.map((video) => (
        
        <div
          key={video.id}
          className={`bg-gray-800/50  rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300 animate-fade-in-show cursor-pointer  hover:text-gray-100 ${
            (vidId ? vidId : resolvedSelectedId) === video.id
              ? "ring-2 ring-purple-500 shadow-lg  shadow-purple-500  text-gray-100"
              : " text-gray-500"
          }`}
          onClick={() => onVideoSelect( video.id, (localStorage.getItem(`lastTime-id-[${video.id}]`)), video.title)}
        >
          <div
            className={`relative hover:grayscale-0  ${
              (vidId ? vidId : resolvedSelectedId) === video.id ? "" : "grayscale"
            }`}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-48 object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              onError={(e) => {
                e.currentTarget.src = THUMBNAIL_FALLBACK;
              }}
            />
          </div>
          <div className="p-4  ">
            <h2 className="text-lg font-semibold ">
              {video.title}
            </h2>
            <p className="text-sm  mt-2 flex justify-between">
              <span>
                {t("lives.publishedAt")}: {video.publishedAt}
              </span>
              <span>
                {t("lives.lastTime")}:{" "}
                {timeFormat(localStorage.getItem(`lastTime-id-[${video.id}]`))}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
