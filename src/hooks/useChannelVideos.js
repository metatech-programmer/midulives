import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_API_KEY_YTUBE_NEW;
const CHANNELS_API = "https://www.googleapis.com/youtube/v3/channels";
const PLAYLIST_ITEMS_API = "https://www.googleapis.com/youtube/v3/playlistItems";
const VIDEOS_API = "https://www.googleapis.com/youtube/v3/videos";

// IDs de los canales - Actualizar en .env
const CHANNEL_IDS = {
    midulive: import.meta.env.VITE_MIDULIVE_CHANNEL_ID || "UC3aj05GEEyzdOqYM5FLSFeg",
    midudev: import.meta.env.VITE_MIDUDEV_CHANNEL_ID || "UC8LeXCWOalN8SxlrPcG-PaQ"
};

// Module-level cache: survives component re-mounts within the same page session
let _videoCache = null;
let _cacheTimestamp = 0;
let _videoCachePromise = null;
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutos

function getCache() {
    if (_videoCache && Date.now() - _cacheTimestamp < CACHE_TTL_MS) {
        return _videoCache;
    }
    return null;
}

function setCache(data) {
    _videoCache = data;
    _cacheTimestamp = Date.now();
}

function getCachePromise() {
    return _videoCachePromise;
}

function setCachePromise(promise) {
    _videoCachePromise = promise;
}

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

// Helper: detect programming/coding content
function isProgrammingContent(t) {
    const keywords = [
        // Technologies
        "html", "css", "javascript", "typescript", " react", "svelte", "vue",
        "angular", "astro", "next.js", "nextjs", "python", "node", "nodejs",
        "php", "rust", "golang", " go ", "java ", "kotlin", "swift", "c++",
        "sql", "mysql", "postgresql", "mongodb", "redis", "prisma", "graphql",
        "tailwind", "bootstrap", "sass", "webpack", "vite", "esbuild",
        "docker", "kubernetes", "aws", "gcp", "azure", "linux", "bash",
        "git ", "github", "gitlab", "neovim", "vim", "vscode",
        "firebase", "supabase", "strapi", "wordpress",
        "nestjs", "nest.js", "express", "fastify", "hono",
        "remix", "solidjs", "solid.js", "qwik", "htmx", "alpinejs",
        "bun ", "deno ", "pnpm", "turborepo",
        "openai", "chatgpt", "llm", "langchain", " ia ", " ai ", "copilot",
        "machine learning", "inteligencia artificial",
        "web3", "blockchain", "solidity",
        // Actions
        "programacion", "programando", "desarrollo web", "desarrollando",
        "creando", "construyendo", "haciendo ", "probando",
        "arreglando", "refactor", "debugging", "depurando",
        "resuelvo", "resolviendo", "reaccionando",
        // Session types
        "live coding", "coding live", "prueba técnica", "prueba tecnica",
        "entrevista técnica", "entrevista tecnica",
        "clon de", "clone de", "clonando", "clonar",
        "taller", "workshop", "kata ", "katas", "leetcode",
        "full stack", "frontend", "backend", "devops",
        "api rest", " api ", "microservicios", "arquitectura",
        "testing", " test ", " tdd", "deploy", "despliegue",
        "portafolio", "portfolio",
        // Short tech terms that need word boundaries (handled by spaces or position)
        "redux", "zustand", "jotai", "pinia", "mobx",
        "jest ", "vitest", "playwright", "cypress",
    ];
    return keywords.some(k => t.includes(k));
}

function categorizeVideo(title = "", durationSec = 0, publishedAt = "") {
    const t = title.toLowerCase();
    const isRecent = new Date() - new Date(publishedAt) < 90 * 24 * 60 * 60 * 1000; // 3 meses

    // ─────────────────────────────────────────────────────────────────────────
    // 1. CURSOS — keywords siempre ganan sin importar la duración
    // ─────────────────────────────────────────────────────────────────────────
    const cursoKeywords = [
        "curso de ", "curso: ", "cursos de", "tutorial de", "tutorial:",
        "aprende ", "aprender ", "aprendo ", "aprendiendo ",
        "bootcamp", "desde cero", "para principiantes", "para novatos",
        "introducción a", "introduccion a",
        "cómo crear", "como crear", "cómo hacer", "como hacer",
        "guia completa", "guía completa",
        "paso a paso", "full course", "curso completo",
        "primeros pasos con", "empezar con", "empezar a programar",
        "clase de ", "clases de ",
    ];
    if (cursoKeywords.some(k => t.includes(k))) {
        return isRecent ? "cursos_nuevos" : "cursos";
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 2. EVENTOS — keywords tienen MAYOR PRIORIDAD que la duración aquí
    //    (jsconf, midufest, hackathon, etc.) → siempre es un evento
    //    Fallback: cualquier video > 4h que no tenga otra categoría
    // ─────────────────────────────────────────────────────────────────────────
    const eventoKeywords = [
        "jsconf", "midufest", "miduconf", "charlas dev", "hackathon", "conferencia",
        "meetup", "jornada", "summit", "midu fest", "js conf", "midu conf",
    ];
    if (eventoKeywords.some(k => t.includes(k)) || durationSec > 4 * 3600) {
        return "eventos";
    }

    // ─────────────────────────────────────────────────────────────────────────
    // A PARTIR DE AQUÍ LA DURACIÓN ES EL CRITERIO PRINCIPAL.
    // Keywords solo desempatan dentro de cada rango horario.
    //
    // Rangos definidos:
    //   < 35 min         → Noticias
    //   35 min – 1 h     → Charlas (cortas) / Live Coding (si es claramente código)
    //   1 h – 1.5 h      → Live Coding puro (sin solapamiento con Lives)
    //   1.5 h – 2.5 h    → Zona overlap → keywords deciden: Lives vs Live Coding
    //   2.5 h – 4 h      → Lives puro (fuera del rango de Live Coding)
    //   > 4 h            → Eventos (capturado arriba)
    // ─────────────────────────────────────────────────────────────────────────

    const liveKeywords = [
        "en vivo", "en directo", "| live", "[ live", "(live)",
        "live stream", "livestream", "streaming",
        "retransmision", "retransmisión", "directo:",
    ];
    const charlaKeywords = [
        "charla", "charlamos", "charlando",
        "entrevista", "nos cuenta", "hablamos con", "hablo con",
        "commit show", "historia de", "mi experiencia",
        "debate", "opinión", "opinion", "reflexion", "reflexión",
        "cómo ser", "como ser", "futuro de",
        "salario", "empleo", "carrera como", "developer",
        "consejos para", "vale la pena", "debes saber",
        "te cuento", "les cuento", "hablando de",
        "escalando", "fundador", "ceo ", "creador de",
        "secretos de", "¿qué hace", "que hace un",
    ];

    // ── NOTICIAS: < 35 minutos ───────────────────────────────────────────────
    if (durationSec < 35 * 60) {
        return "noticias";
    }

    // ── 35 min – 1 h: contenido corto ────────────────────────────────────────
    if (durationSec <= 60 * 60) {
        // Charlas suelen ser conversaciones/entrevistas cortas
        if (charlaKeywords.some(k => t.includes(k))) return "charlas";
        // Codeo corto (prueba técnica express, snippet, etc.)
        if (isProgrammingContent(t)) return "live_coding";
        // Por defecto, contenido corto sin categoría → charlas
        return "charlas";
    }

    // ── 1 h – 1.5 h: zona exclusiva de Live Coding ───────────────────────────
    //    (Lives empieza en 1.5h, así que no hay solapamiento)
    if (durationSec <= 1.5 * 3600) {
        // Excepción: entrevistas/charlas largas
        if (charlaKeywords.some(k => t.includes(k))) return "charlas";
        return "live_coding";
    }

    // ── 1.5 h – 2.5 h: zona de solapamiento Lives ↔ Live Coding ─────────────
    //    Aquí los keywords desempatan
    if (durationSec <= 2.5 * 3600) {
        if (liveKeywords.some(k => t.includes(k))) return "lives";
        if (isProgrammingContent(t)) return "live_coding";
        // Por defecto los streams largos tienden a ser lives
        return "lives";
    }

    // ── 2.5 h – 4 h: zona exclusiva de Lives ─────────────────────────────────
    //    (Live Coding termina en 2.5h, no hay solapamiento)
    return "lives";
}

export function useChannelVideos(options = {}) {
    const { pollInterval = 0, autoUpdate = false } = options;
    const [categorizedVideos, setCategorizedVideos] = useState(() => getCache() || {});
    const [loading, setLoading] = useState(() => !getCache());
    const [error, setError] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(null);

    useEffect(() => {
        let active = true;
        let intervalId = null;

        // Use cache if available
        const cached = getCache();
        if (cached) {
            setCategorizedVideos(cached);
            setLoading(false);
            if (!autoUpdate || !pollInterval) return;
        }

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

                // Filter out deleted/private videos
                const validItems = allItems.filter(item =>
                    item.snippet.title !== 'Deleted video' &&
                    item.snippet.title !== 'Private video'
                );

                // 3. Obtener detalles de duración de todos los videos
                const videoIds = validItems.map(item => item.snippet.resourceId.videoId);
                const videoDetails = [];

                // Dividir en chunks de 50 (límite de la API)
                for (let i = 0; i < videoIds.length; i += 50) {
                    const chunk = videoIds.slice(i, i + 50);
                    const videoResponse = await fetch(
                        `${VIDEOS_API}?part=snippet,contentDetails,status&id=${chunk.join(",")}&key=${API_KEY}`
                    );
                    const videoData = await videoResponse.json();

                    if (videoData.error) {
                        throw new Error(`Videos error: ${videoData.error.message}`);
                    }

                    videoDetails.push(...(videoData.items || []));
                }

                // 4. Formatear y categorizar videos
                const formattedVideos = validItems.map(item => {
                    const videoId = typeof item.snippet.resourceId.videoId === 'string'
                        ? item.snippet.resourceId.videoId
                        : String(item.snippet.resourceId.videoId);
                    const videoDetail = videoDetails.find(v => v.id === videoId);
                    const isEmbeddable = videoDetail?.status?.embeddable !== false;
                    const privacyStatus = videoDetail?.status?.privacyStatus || 'public';
                    const durationSec = videoDetail ? parseISODuration(videoDetail.contentDetails.duration) : 0;
                    const publishedAt = videoDetail?.snippet?.publishedAt || item.snippet.publishedAt;

                    return {
                        id: videoId,
                        title: item.snippet.title,
                        thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
                        publishedAt: new Date(publishedAt).toLocaleDateString(),
                        rawPublishedAt: publishedAt,
                        duration: durationSec,
                        durationFormatted: formatDuration(durationSec),
                        category: categorizeVideo(item.snippet.title, durationSec, publishedAt),
                        channelId,
                        embeddable: isEmbeddable,
                        privacyStatus,
                    };
                }).filter(video => video.embeddable && (video.privacyStatus === 'public' || video.privacyStatus === 'unlisted'));

                return formattedVideos;
            } catch (err) {
                if (err instanceof TypeError && err.message.includes('NetworkError')) {
                    console.error(`Error de red al obtener videos del canal ${channelId}. Verifica tu conexión o la API key.`);
                } else {
                    console.error(`Error fetching videos from channel ${channelId}:`, err);
                }
                throw err;
            }
        };

        const fetchAllChannelVideos = async () => {
            if (!active) return;

            if (!API_KEY) {
                setError("Falta la API Key de YouTube. Configura VITE_API_KEY_YTUBE_NEW en tu archivo .env");
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                let fetchPromise = getCachePromise();

                if (!fetchPromise) {
                    fetchPromise = (async () => {
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

                        setCache(organized);
                        return organized;
                    })();

                    setCachePromise(fetchPromise);
                }

                const organized = await fetchPromise;
                setCachePromise(null);

                if (active) {
                    setCategorizedVideos(organized);
                    setLastUpdate(new Date());
                }
            } catch (err) {
                setCachePromise(null);
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
