import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const API_KEY = import.meta.env.VITE_API_KEY_YTUBE_NEW // Reemplázalo con tu clave de API
const PLAYLIST_IDS = {
  lives: "PLnHPgY5vHkhDdRZP1xB_mq7f-aZCrdina",
  live_coding: "PLnHPgY5vHkhBn2KMeQcvRexJDnAHQmhfJ",
  eventos: "PLnHPgY5vHkhBKWI8udqRJRYXLtoMRv9nU",
  noticias: "PLnHPgY5vHkhBAP_odp6nr4HV9tnFaKas_",
  charlas: "PLnHPgY5vHkhCE9ESV9dblUf_u4rPE89VJ",
  cursos: {
    portfolios: "PLnHPgY5vHkhDwl6uXSQoRhyGk16O7RMKD",
    actualizados: "PLnHPgY5vHkhCkFx_FgYUbjUPo7Qh_79a8",
    react: "PLUofhDIg_38q4D0xNWp7FEHOTcZhjWJ29",
    javascript: "PLV8x_i1fqBw0Kn_fBIZTa3wS_VZAqddX7",
    python: "PLnHPgY5vHkhDmnTd4rqfCRTLzNf9uXVRW",
    typescript: "PLUofhDIg_38pNCZe9ptj72exbFjzyePxT",
    astro: "PLUofhDIg_38q8ZBsl9-GPRNI1AIjkRIHZ",
    nodejs: "PLUofhDIg_38qm2oPOV-IRTTEKyrVBBaU7",
    php:"PLUofhDIg_38rCmybY4E_bmGvUHaSw7-oc&pp=0gcJCXcEOCosWNin",
    nextjs:"PLUofhDIg_38poFpsV-xAbWUbW1urNmY_I",
    
  },
};
const API_URL = "https://www.googleapis.com/youtube/v3/playlistItems";

const Lives = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [playlistId, setPlaylistId] = useState("");

  const location = useLocation();
  const { cursoId } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    switch (location.pathname.split("/")[1]) {
      case "lives":
        setPlaylistId(PLAYLIST_IDS.lives);
        break;
      case "live_coding":
        setPlaylistId(PLAYLIST_IDS.live_coding);
        break;
      case "eventos":
        setPlaylistId(PLAYLIST_IDS.eventos);
        break;
      case "noticias":
        setPlaylistId(PLAYLIST_IDS.noticias);
        break;
      case "charlas":
        setPlaylistId(PLAYLIST_IDS.charlas);
        break;
      case "cursos":
        if (cursoId) {
          setPlaylistId(PLAYLIST_IDS.cursos[cursoId]);
        }
        break;
      default:
        break;
    }
  }, [location, cursoId]);

  useEffect(() => {
    const fetchAllVideos = async () => {
      if (!playlistId) return;

      let allVideos = [];
      let nextPageToken = "";

      try {
        do {
          const response = await fetch(
            `${API_URL}?part=snippet&playlistId=${playlistId}&key=${API_KEY}&maxResults=50&pageToken=${nextPageToken}`
          );
          const data = await response.json();

          if (data.items) {
            const formattedVideos = data.items.map((item) => ({
              id: item.snippet.resourceId.videoId,
              title: item.snippet.title,
              thumbnail: item.snippet.thumbnails.high.url,
              publishedAt: new Date(
                item.snippet.publishedAt
              ).toLocaleDateString(),
            }));

            allVideos = [...allVideos, ...formattedVideos];
          }

          nextPageToken = data.nextPageToken || "";
        } while (nextPageToken);

        setVideos(allVideos);
      } catch (error) {
        console.error("Error al obtener videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllVideos();
  }, [playlistId, location]);

  const handleVideoSelect = (videoId) => {
    setSelectedVideo(videoId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 pt-8 pb-24 ">
      {loading ? (
        <div className="h-[60dvh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-52 w-52 border-b-3 border-purple-500"></div>
      </div>
      ) : (
        <div className="animate-fade-in">
          <iframe
            className="w-full h-52 md:h-[80dvh] rounded-lg shadow-lg"
            src={`https://www.youtube.com/embed/${
              selectedVideo || videos[0]?.id
            }?list=${playlistId}&autoplay=1`}
            title="YouTube Playlist"
            allow="accelerometer; autoplay; encrypted-media; fullscreen; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>

          <hr className="my-8 opacity-10 " />

          <h1 className="text-xl font-bold my-10 font-silkscreen text-purple-300 ">
            {t('lives.title', { category: location.pathname.split("/")[1] })}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-gray-900 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300 animate-fade-in-show"
                onClick={() => handleVideoSelect(video.id)}
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
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-400">
                    {video.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-2">
                    {t('lives.publishedAt')}: {video.publishedAt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Lives;
