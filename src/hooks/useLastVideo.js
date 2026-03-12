import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// YouTube video IDs are 11 chars: letters, digits, hyphens, underscores
const isValidVideoId = (id) => typeof id === 'string' && /^[a-zA-Z0-9_-]{8,12}$/.test(id);
const getLastTimeKey = (id) => `lastTime-id-[${id}]`;

export function useLastVideo(videos, currentPath) {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const navigate = useNavigate();
    const { vidId, name, time } = useParams();

    const segments = currentPath.split("/");
    if (segments[1] === "cursos" && segments[2] === "auto") {
        currentPath = segments.slice(0, 4).join("/");
    } else if (segments[1] === "cursos") {
        currentPath = segments.slice(0, 3).join("/");
    } else {
        currentPath = segments.slice(0, 2).join("/");
    }

    // Cargar video al cambiar de ruta o cuando los videos estén disponibles
    useEffect(() => {
        if (!videos || videos.length === 0) return;

        try {
            const storageKey = `lastVideo-${currentPath}`;
            const savedRaw = localStorage.getItem(storageKey);
            // Reject corrupt values like "[object Object]" that old code may have stored
            const savedId = isValidVideoId(savedRaw) ? savedRaw : null;
            if (savedRaw && !savedId) localStorage.removeItem(storageKey);
            const lastVideoId = vidId || savedId || videos[0]?.id;

            const title = (id) => {
                const video = videos.find(v => v?.id === id);
                if (video?.title) return video.title.replace(/\s+/g, '_');
                return name ? name.replace(/\s+/g, '_') : '';
            };

            const times = (id) => {
                const timeKey = getLastTimeKey(id);
                const stored = localStorage.getItem(timeKey);
                if (stored && !isNaN(Number(stored))) return Number(stored);
                if (time && !isNaN(Number(time))) return Number(time);
                return 0;
            };

            const payload = {
                id: lastVideoId,
                title: title(lastVideoId),
                time: times(lastVideoId)
            };

            setSelectedVideo(prev => {
                if (prev && prev.id === payload.id && prev.time === payload.time && prev.title === payload.title) {
                    return prev;
                }
                return payload;
            });
            localStorage.setItem(storageKey, lastVideoId);
        } catch (err) {
            console.error('useLastVideo error:', err);
        }
    }, [currentPath, vidId, name, time, videos]);



    const handleVideoSelect = (videoId, time, name) => {
        if (!videoId) return;
        setSelectedVideo(videoId);
        const storageKey = `lastVideo-${currentPath}`;
        localStorage.setItem(storageKey, videoId);
        localStorage.setItem(getLastTimeKey(videoId), Number(time) || 0);
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate((currentPath + "/" + videoId + "/" + name + "/" + time), { replace: true });
    };

    // Retorna el video seleccionado actual o null si no hay ninguno
    return {
        selectedVideo: selectedVideo || null,
        handleVideoSelect
    };
}
