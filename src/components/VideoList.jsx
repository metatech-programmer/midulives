import { useTranslation } from "react-i18next";

const VideoList = ({ videos, selectedVideo, onVideoSelect }) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {videos.map((video) => (
        <div
          key={video.id}
          className={`bg-gray-900 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300 animate-fade-in-show cursor-pointer ${
            selectedVideo === video.id
              ? "ring-2 ring-purple-500 shadow-lg  shadow-purple-500"
              : ""
          }`}
          onClick={() => onVideoSelect(video.id)}
        >
          <div
            className={`relative hover:grayscale-0 ${
              selectedVideo === video.id
                ? ""
                : "grayscale-100"
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
                e.target.src = "https://via.placeholder.com/150";
              }}
            />
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-400">
              {video.title}
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              {t("lives.publishedAt")}: {video.publishedAt}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
