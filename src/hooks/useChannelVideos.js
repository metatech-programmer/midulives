import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_API_KEY_YTUBE_NEW;
const CHANNELS_API = "https://www.googleapis.com/youtube/v3/channels";
const PLAYLIST_ITEMS_API = "https://www.googleapis.com/youtube/v3/playlistItems";
const VIDEOS_API = "https://www.googleapis.com/youtube/v3/videos";

// IDs de los canales - Actualizar en .env
const CHANNEL_IDS = {
    midulive: import.meta.env.VITE_MIDULIVE_CHANNEL_ID || "UCxbpVHBxEl36eEzhVCJMUgQ", // @midulive - placeholder
    midudev: import.meta.env.VITE_MIDUDEV_CHANNEL_ID || "UC8LeXCWOalN8SxlrPcG-PaQ"   // @midudev - placeholder
};

function parseISODuration(iso) {
    // Convierte PT#H#M#S -> segundos
    if (!iso) return 0;
    const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;
    const hours = parseInt(match[1] || "0", 10);
    const minutes = parseInt(match[2] || "0", 10);
    const seconds = parseInt(match[3] || "0", 10);
    return hours * 3600 + minutes * 60 + seconds;
}

function categorizeVideo(title = "", durationSec = 0, publishedAt = "") {
    const t = title.toLowerCase();
    const isRecent = new Date() - new Date(publishedAt) < 90 * 24 * 60 * 60 * 1000; // 3 meses

    // Reglas de prioridad: Eventos > Lives > Cursos > Live Coding > Charlas > Noticias

    // 1. EVENTOS - Videos que duren más de 3 horas
    if (durationSec > 3 * 3600) {
        return "eventos";
    }

    // 2. LIVES - Videos que duren más de 1 hora (excepto si ya fueron clasificados como Eventos)
    if (durationSec > 3600) {
        return "lives";
    }

    // 3. CURSOS - Keywords específicas + videos entre 1-2 horas
    const cursoKeywords = [
        "curso", "cursos", "aprende", "bootcamp", "aprendiendo",
        "introducción", "crea", "test", "portafolio", "portafolios",
        "web", "maneja"
    ];

    const hasCursoKeyword = cursoKeywords.some(keyword => t.includes(keyword));
    const isCourseDuration = durationSec >= 3600 && durationSec <= 2 * 3600;

    if (hasCursoKeyword || isCourseDuration) {
        return isRecent ? "cursos_nuevos" : "cursos";
    }

    // 4. LIVE CODING - Keywords de desarrollo + lenguajes
    const liveCodingKeywords = [
        "desarrollando", "desarrollom", "creando", "resuelvo", "arreglando",
        "velada", "html", "css", "js", "tailwind", "react", "probando",
        "javascript", "astro", "prueba", "clon", "sql", "chat"
    ];

    if (liveCodingKeywords.some(keyword => t.includes(keyword))) {
        return "live_coding";
    }

    // 5. CHARLAS - Keywords de charlas y entrevistas
    const charlaKeywords = [
        "charla", "charlando", "cómo ser", "historia", "entrevista",
        "aprender programación", "nos cuenta", "secretos", "commit show",
        "charlas dev", "escalando webs"
    ];

    if (charlaKeywords.some(keyword => t.includes(keyword))) {
        return "charlas";
    }

    // 6. NOTICIAS - Videos que duren menos de 30 minutos
    if (durationSec < 30 * 60) {
        return "noticias";
    }

    // Fallback: clasificar por duración
    if (durationSec < 10 * 60) return "noticias";
    if (durationSec < 60 * 60) return "charlas";
    return "lives";
}

export function useChannelVideos(options = {}) {
    const { pollInterval = 0, autoUpdate = false } = options;
    const [categorizedVideos, setCategorizedVideos] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(null);

    useEffect(() => {
        let active = true;
        let intervalId = null;

        const fetchAllVideosFromChannel = async (channelId) => {
            try {
                // 1. Obtener el playlist de uploads del canal
                const channelResponse = await fetch(
                    `${CHANNELS_API}?part=contentDetails&id=${channelId}&key=${API_KEY}`
                );
                const channelData = await channelResponse.json();

                if (channelData.error) {
                    throw new Error(`Canal error: ${channelData.error.message}`);
                }

                const uploadsPlaylistId = channelData.items[0]?.contentDetails?.relatedPlaylists?.uploads;
                if (!uploadsPlaylistId) {
                    throw new Error("No se encontró playlist de uploads");
                }

                // 2. Obtener todos los videos del playlist (paginando si es necesario)
                let allItems = [];
                let nextPageToken = undefined;

                do {
                    const playlistResponse = await fetch(
                        `${PLAYLIST_ITEMS_API}?part=snippet&playlistId=${uploadsPlaylistId}&key=${API_KEY}&maxResults=50${nextPageToken ? `&pageToken=${nextPageToken}` : ""
                        }`
                    );
                    const playlistData = await playlistResponse.json();

                    if (playlistData.error) {
                        throw new Error(`Playlist error: ${playlistData.error.message}`);
                    }

                    allItems = allItems.concat(playlistData.items || []);
                    nextPageToken = playlistData.nextPageToken;
                } while (nextPageToken);

                // 3. Obtener detalles de duración de todos los videos
                const videoIds = allItems.map(item => item.snippet.resourceId.videoId);
                const videoDetails = [];

                // Dividir en chunks de 50 (límite de la API)
                for (let i = 0; i < videoIds.length; i += 50) {
                    const chunk = videoIds.slice(i, i + 50);
                    const videoResponse = await fetch(
                        `${VIDEOS_API}?part=snippet,contentDetails&id=${chunk.join(",")}&key=${API_KEY}`
                    );
                    const videoData = await videoResponse.json();

                    if (videoData.error) {
                        throw new Error(`Videos error: ${videoData.error.message}`);
                    }

                    videoDetails.push(...(videoData.items || []));
                }

                // 4. Formatear y categorizar videos
                const formattedVideos = allItems.map(item => {
                    const videoDetail = videoDetails.find(v => v.id === item.snippet.resourceId.videoId);
                    const durationSec = videoDetail ? parseISODuration(videoDetail.contentDetails.duration) : 0;
                    const publishedAt = videoDetail?.snippet?.publishedAt || item.snippet.publishedAt;

                    return {
                        id: item.snippet.resourceId.videoId,
                        title: item.snippet.title,
                        thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
                        publishedAt: new Date(publishedAt).toLocaleDateString(),
                        rawPublishedAt: publishedAt,
                        duration: durationSec,
                        durationFormatted: formatDuration(durationSec),
                        category: categorizeVideo(item.snippet.title, durationSec, publishedAt),
                        channelId
                    };
                });

                return formattedVideos;
            } catch (err) {
                console.error(`Error fetching videos from channel ${channelId}:`, err);
                throw err;
            }
        };

        const fetchAllChannelVideos = async () => {
            if (!active) return;

            setLoading(true);
            setError(null);

            try {
                // Obtener videos de ambos canales
                const [miduliveVideos, midudevVideos] = await Promise.all([
                    fetchAllVideosFromChannel(CHANNEL_IDS.midulive),
                    fetchAllVideosFromChannel(CHANNEL_IDS.midudev)
                ]);

                // Combinar y organizar por categorías
                const allVideos = [...miduliveVideos, ...midudevVideos];
                const organized = {};

                // Inicializar categorías
                const categories = [
                    "eventos", "lives", "cursos", "cursos_nuevos",
                    "live_coding", "charlas", "noticias"
                ];

                categories.forEach(cat => {
                    organized[cat] = {
                        midulive: [],
                        midudev: []
                    };
                });

                // Clasificar videos
                allVideos.forEach(video => {
                    const channel = video.channelId === CHANNEL_IDS.midulive ? "midulive" : "midudev";
                    const category = video.category;

                    if (organized[category]) {
                        organized[category][channel].push(video);
                    }
                });

                // Ordenar por fecha (más recientes primero)
                Object.keys(organized).forEach(category => {
                    ["midulive", "midudev"].forEach(channel => {
                        organized[category][channel].sort((a, b) =>
                            new Date(b.rawPublishedAt) - new Date(a.rawPublishedAt)
                        );
                    });
                });

                if (active) {
                    setCategorizedVideos(organized);
                    setLastUpdate(new Date());
                }
            } catch (err) {
                if (active) {
                    setError(err.message || String(err));
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        fetchAllChannelVideos();

        // Configurar polling si está habilitado
        if (autoUpdate && pollInterval > 0) {
            intervalId = setInterval(fetchAllChannelVideos, pollInterval);
        }

        return () => {
            active = false;
            if (intervalId) clearInterval(intervalId);
        };
    }, [pollInterval, autoUpdate]);

    return { categorizedVideos, loading, error, lastUpdate };
}

function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}
