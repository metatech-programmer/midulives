import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';



export function useLastVideo(videos, currentPath) {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const {  vidId, name,  time }= useParams();	

    currentPath = currentPath.split("/").splice(0, 2).join("/") === "/cursos" ? currentPath.split("/").splice(0, 3).join("/") : currentPath.split("/").splice(0, 2).join("/");



    // Cargar video al cambiar de ruta o cuando los videos estén disponibles
    useEffect(() => {
        const storageKey = `lastVideo-${currentPath}`;
        const lastVideoId =  vidId || localStorage.getItem(storageKey) || videos[0]?.id ;
        const title = (vidID) => {
            const video = videos.find(video => video?.id === vidID);
            return video?.title ? video.title.replace(/\s+/g, '_') : name?.replace(/\s+/g, '_');
        }
        const times = (vidID) => {
            return  localStorage.getItem(`lastTime-id-[${vidID}]`) || time;
        }
        if (videos.length > 0) {
            if (lastVideoId) {
                navigate((currentPath + "/" + lastVideoId + "/" + title(lastVideoId)  + "/" + times(lastVideoId)), { replace: true });

            } else {
                // Solo si no hay video guardado, usar el primero
                navigate((currentPath + "/" + lastVideoId + "/" + title(lastVideoId) + "/" + times(lastVideoId)), { replace: true });
                localStorage.setItem(storageKey, lastVideoId);
            }


        }
    }, [videos, currentPath, location.pathname]);



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
