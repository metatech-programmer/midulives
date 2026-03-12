import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_API_KEY_YTUBE_NEW;
const PLAYLIST_ITEMS_API = "https://www.googleapis.com/youtube/v3/playlistItems";
const VIDEOS_API = "https://www.googleapis.com/youtube/v3/videos";

// Module-level cache keyed by playlistId
const playlistCache = new Map();
const CACHE_TTL = 30 * 60 * 1000; // 30 minutos

function parseISODuration(iso) {
  if (!iso) return 0;
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  return (parseInt(match[1] || 0) * 3600) + (parseInt(match[2] || 0) * 60) + parseInt(match[3] || 0);
}

function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return h > 0
    ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    : `${m}:${s.toString().padStart(2, '0')}`;
}

export function useVideos(playlistId) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(!!playlistId);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!playlistId) return;

    // Check module-level cache first
    const cached = playlistCache.get(playlistId);
    if (cached && Date.now() - cached.ts < CACHE_TTL) {
      setVideos(cached.data);
      setLoading(false);
      return;
    }

    if (!API_KEY) {
      setError("Falta la API Key de YouTube. Configura VITE_API_KEY_YTUBE_NEW en tu archivo .env");
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchVideos = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1. Paginar todos los items de la playlist
        let allItems = [];
        let nextPageToken = undefined;

        do {
          const url = `${PLAYLIST_ITEMS_API}?part=snippet&playlistId=${playlistId}&key=${API_KEY}&maxResults=50${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;
          const res = await fetch(url);
          const data = await res.json();

          if (data.error) throw new Error(data.error.message);

          allItems = allItems.concat(data.items || []);
          nextPageToken = data.nextPageToken;
        } while (nextPageToken);

        // Filtrar videos eliminados o privados
        const validItems = allItems.filter(item =>
          item.snippet.title !== 'Deleted video' &&
          item.snippet.title !== 'Private video'
        );

        // 2. Obtener detalles (snippet + duration) en bloques de 50
        const videoIds = validItems.map(i => i.snippet.resourceId.videoId);
        const videoDetails = [];

        for (let i = 0; i < videoIds.length; i += 50) {
          const chunk = videoIds.slice(i, i + 50);
          const res = await fetch(
            `${VIDEOS_API}?part=snippet,contentDetails&id=${chunk.join(',')}&key=${API_KEY}`
          );
          const data = await res.json();
          if (data.error) throw new Error(data.error.message);
          videoDetails.push(...(data.items || []));
        }

        // 3. Combinar datos
        const formatted = validItems.map(item => {
          const vid = item.snippet.resourceId.videoId;
          const detail = videoDetails.find(v => v.id === vid);
          const durationSec = detail ? parseISODuration(detail.contentDetails.duration) : 0;
          const publishedRaw = detail?.snippet?.publishedAt || item.snippet.publishedAt;

          return {
            id: vid,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url || '',
            publishedAt: publishedRaw ? new Date(publishedRaw).toLocaleDateString() : '',
            rawPublishedAt: publishedRaw,
            duration: durationSec,
            durationFormatted: formatDuration(durationSec),
          };
        }).sort((a, b) => new Date(b.rawPublishedAt) - new Date(a.rawPublishedAt));

        if (!cancelled) {
          playlistCache.set(playlistId, { data: formatted, ts: Date.now() });
          setVideos(formatted);
        }
      } catch (err) {
        if (!cancelled) setError(err.message || String(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchVideos();
    return () => { cancelled = true; };
  }, [playlistId]);

  return { videos, loading, error };
}
