import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_API_KEY_YTUBE_NEW;
const API_URL = "https://www.googleapis.com/youtube/v3/playlistItems";


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

      // Add delay to ensure navigation is complete
      await new Promise(resolve => setTimeout(resolve, 100));

      try {
        const response = await fetch(
          `${API_URL}?part=snippet&playlistId=${playlistId}&key=${API_KEY}&maxResults=50`
        );
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error.message);
        }

        const formattedVideos = data.items?.map(item => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
        })) || [];

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
