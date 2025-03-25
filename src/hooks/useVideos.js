import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_API_KEY_YTUBE_NEW;
const PLAYLIST_ITEMS_API = "https://www.googleapis.com/youtube/v3/playlistItems";
const VIDEOS_API = "https://www.googleapis.com/youtube/v3/videos";

export function useVideos(playlistId) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cachedVideos, setCachedVideos] = useState({});

  useEffect(() => {
    const fetchVideos = async () => {
      if (!playlistId) return;

      setLoading(true);
      setError(null);

      if (cachedVideos[playlistId]) {
        setVideos(cachedVideos[playlistId]);
        setLoading(false);
        return;
      }

      try {
        // 1. Obtener los videos de la playlist
        const response = await fetch(
          `${PLAYLIST_ITEMS_API}?part=snippet&playlistId=${playlistId}&key=${API_KEY}&maxResults=50`
        );
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error.message);
        }

        const videoIds = data.items.map(item => item.snippet.resourceId.videoId).join(",");

        // 2. Obtener información detallada de cada video
        const videoResponse = await fetch(
          `${VIDEOS_API}?part=snippet&id=${videoIds}&key=${API_KEY}`
        );
        const videoData = await videoResponse.json();

        if (videoData.error) {
          throw new Error(videoData.error.message);
        }

        // 3. Formatear la información combinada
        const formattedVideos = data.items.map(item => {
          const videoInfo = videoData.items.find(v => v.id === item.snippet.resourceId.videoId);
          return {
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url,
            publishedAt: videoInfo ? new Date(videoInfo.snippet.publishedAt).toLocaleDateString() : "Fecha desconocida",
          };
        });

        setCachedVideos(prev => ({
          ...prev,
          [playlistId]: formattedVideos,
        }));
        setVideos(formattedVideos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [playlistId]);

  return { videos, loading, error };
}
