import { useState, useEffect } from 'react';

export function useLastVideo(videos, currentPath) {
    const [selectedVideo, setSelectedVideo] = useState(null);

    // Cargar video al cambiar de ruta o cuando los videos estén disponibles
    useEffect(() => {
        if (videos.length > 0) {
            const storageKey = `lastVideo-${currentPath}`;
            const lastVideoId = localStorage.getItem(storageKey);
            

            if (lastVideoId) {
                setSelectedVideo(lastVideoId);
            } else {
                // Solo si no hay video guardado, usar el primero
                setSelectedVideo(videos[0].id);
                localStorage.setItem(storageKey, videos[0].id);
            }
        }
    }, [videos, currentPath]);

    const handleVideoSelect = (videoId, time) => {
        if (!videoId) return;

        const storageKey = `lastVideo-${currentPath}`;
        localStorage.setItem(storageKey, videoId);
        localStorage.setItem(`lastTime-id-[${videoId}]`, time);
        setSelectedVideo(videoId);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Retorna el video seleccionado actual o null si no hay ninguno
    return {
        selectedVideo: selectedVideo || null,
        handleVideoSelect
    };
}
