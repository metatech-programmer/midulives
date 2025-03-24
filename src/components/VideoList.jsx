import { useTranslation } from "react-i18next";

const VideoList = ({ videos, selectedVideo, onVideoSelect }) => {
  const { t } = useTranslation();
  const timeFormat = (time) => {
    const hours = isNaN(Math.floor(time / 3600)) ? 0 : Math.floor(time / 3600);
    const minutes = isNaN(Math.floor((time % 3600) / 60)) ? 0 : Math.floor((time % 3600) / 60);
    const seconds = isNaN(parseInt(time % 60)) ? 0 : parseInt(time % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {videos.map((video) => (
        <div
          key={video.id}
          className={`bg-gray-900 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300 animate-fade-in-show cursor-pointer ${
            selectedVideo === video.id
              ? "ring-2 ring-purple-500 shadow-lg  shadow-purple-500 hover:text-gray-100"
              : ""
          }`}
          onClick={() => onVideoSelect(video.id, (localStorage.getItem(`lastTime-id-[${video.id}]`)))}
        >
          <div
            className={`relative hover:grayscale-0  ${
              selectedVideo === video.id ? "" : "grayscale-100"
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
            <p className="text-sm text-gray-500 mt-2 flex justify-between">
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
