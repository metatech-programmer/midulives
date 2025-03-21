import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const API_KEY = import.meta.env.VITE_API_KEY_YTUBE_NEW; // Reemplázalo con tu clave de API
const PLAYLIST_IDS = {
  lives: "PLnHPgY5vHkhCjQ56qEHVvGqTRC5530U5t",
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
    php: "PLUofhDIg_38rCmybY4E_bmGvUHaSw7-oc&pp=0gcJCXcEOCosWNin",
    nextjs: "PLUofhDIg_38poFpsV-xAbWUbW1urNmY_I",
  },
};
const API_URL = "https://www.googleapis.com/youtube/v3/playlistItems";

const Lives = () => {
  const location = useLocation();
  const { cursoId } = useParams();
  const { t } = useTranslation();

  // Move these hooks before the useState that depends on cursoId
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [cachedVideos, setCachedVideos] = useState({});

  // Now playlistId can access cursoId
  const [playlistId, setPlaylistId] = useState(() => {
    const path = window.location.pathname.split("/")[1];
    const id = path === "cursos" && cursoId ? PLAYLIST_IDS.cursos[cursoId] : PLAYLIST_IDS[path];
    return id || "PLnHPgY5vHkhDdRZP1xB_mq7f-aZCrdina";
  });

  const VIDEOS_PER_PAGE = 12;

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    let newPlaylistId;

    switch (path) {
      case "lives":
      case "live_coding":
      case "eventos":
      case "noticias":
      case "charlas":
        newPlaylistId = PLAYLIST_IDS[path];
        break;
      case "cursos":
        if (cursoId) {
          newPlaylistId = PLAYLIST_IDS.cursos[cursoId];
        }
        break;
      default:
        break;
    }

    if (newPlaylistId && newPlaylistId !== playlistId) {
      setPlaylistId(newPlaylistId);
      setVideos([]); // Limpiar videos anteriores
      setIsFirstLoad(true);
    }
  }, [location, cursoId]);

  useEffect(() => {
    setCurrentPage(1); // Reset page when playlist changes

    const fetchAllVideos = async () => {
      if (!playlistId) return;

      setLoading(true);
      setVideos([]); // Reset videos before new fetch

      // Check cache first
      if (cachedVideos[playlistId]) {
        setVideos(cachedVideos[playlistId]);
        setLoading(false);
        setIsFirstLoad(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}?part=snippet&playlistId=${playlistId}&key=${API_KEY}&maxResults=50`
        );
        const data = await response.json();

        if (data.items) {
          const formattedVideos = data.items.map((item) => ({
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url,
            publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
          }));

          // Update cache
          setCachedVideos((prev) => ({
            ...prev,
            [playlistId]: formattedVideos,
          }));

          // Update videos state
          setVideos(formattedVideos);
        }
      } catch (error) {
        console.error("Error al obtener videos:", error);
      } finally {
        setLoading(false);
        setIsFirstLoad(false);
      }
    };

    if (playlistId && (isFirstLoad || !cachedVideos[playlistId])) {
      fetchAllVideos();
    }
  }, [playlistId, isFirstLoad]);

  // Get current videos for pagination
  const indexOfLastVideo = currentPage * VIDEOS_PER_PAGE;
  const indexOfFirstVideo = indexOfLastVideo - VIDEOS_PER_PAGE;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);
  const totalPages = Math.ceil(videos.length / VIDEOS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleVideoSelect = (videoId) => {
    setSelectedVideo(videoId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 pt-8 pb-24">
      {(loading || isFirstLoad) && videos.length === 0 ? (
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

          <div className="flex justify-between items-center my-10">
            <h1 className="text-xl font-bold font-silkscreen text-purple-300">
              {t("lives.title", { category: location.pathname.split("/")[1] })}
            </h1>
          </div>

          {loading && videos.length > 0 && (
            <div>
              <span className="text-lg text-purple-400 animate-pulse">
                Cargando más videos...
              </span>
            </div>
          )}

          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {currentVideos.map((video) => (
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
                      {t("lives.publishedAt")}: {video.publishedAt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded ${
                      currentPage === page
                        ? "bg-purple-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Lives;
