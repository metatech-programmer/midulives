import { useMemo } from 'react';
import { useChannelVideos } from "./useChannelVideos";

/**
 * Hook para obtener videos auto-clasificados por categoría.
 * @param {string} category - Nombre de la categoría ('lives', 'eventos', 'cursos', etc.)
 * @param {object} options - Opciones adicionales (canal: 'midulive' | 'midudev' | 'all')
 * @returns { videos, loading, error }
 */
export function useAutoVideos(category, options = {}) {
    const { canal = "all", ...rest } = options;
    const { categorizedVideos, loading, error } = useChannelVideos(rest);

    const videos = useMemo(() => {
        let result = [];

        if (categorizedVideos) {
            // Para "cursos", combinar también "cursos_nuevos" y ordenar por fecha
            const categoriesToMerge = category === "cursos"
                ? ["cursos", "cursos_nuevos"]
                : [category];

            categoriesToMerge.forEach(cat => {
                if (!categorizedVideos[cat]) return;
                if (canal === "all") {
                    result = result.concat(
                        categorizedVideos[cat].midulive || [],
                        categorizedVideos[cat].midudev || []
                    );
                } else {
                    result = result.concat(categorizedVideos[cat][canal] || []);
                }
            });

            // Orden global por fecha más reciente primero, incluso al mezclar canales.
            result.sort((a, b) => new Date(b.rawPublishedAt) - new Date(a.rawPublishedAt));
        }

        return result;
    }, [categorizedVideos, category, canal]);

    return { videos, loading, error };
}