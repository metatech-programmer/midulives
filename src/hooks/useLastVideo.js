import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';



export function useLastVideo(videos, currentPath) {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { vidId, name, time } = useParams();

    currentPath = currentPath.split("/").splice(0, 2).join("/") === "/cursos"
        ? currentPath.split("/").splice(0, 3).join("/")
        : currentPath.split("/").splice(0, 2).join("/");

    // Cargar video al cambiar de ruta o cuando los videos estén disponibles
    useEffect(() => {
        if (!videos || videos.length === 0) return;

        try {
            const storageKey = `lastVideo-${currentPath}`;
            const savedId = localStorage.getItem(storageKey);
            const lastVideoId = vidId || savedId || videos[0]?.id;

            const title = (id) => {
                const video = videos.find(v => v?.id === id);
                if (video?.title) return video.title.replace(/\s+/g, '_');
                return name ? name.replace(/\s+/g, '_') : '';
            };

            const times = (id) => {
                const timeKey = `lastTime-${id}`;
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

            setSelectedVideo(payload);
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
        localStorage.setItem(`lastTime-id-[${videoId}]`, time);
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate((currentPath + "/" + videoId + "/" + name + "/" + time), { replace: true });
    };

    // Retorna el video seleccionado actual o null si no hay ninguno
    return {
        selectedVideo: selectedVideo || null,
        handleVideoSelect
    };
}
