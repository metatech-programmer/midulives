import React from "react";
import { useChannelVideos } from "../hooks/useChannelVideos";

const CategorySection = ({ title, videos, channelName, onVideoSelect }) => {
  if (!videos || videos.length === 0) return null;

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 text-purple-400">
        {title} - {channelName} ({videos.length})
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.slice(0, 6).map((video) => (
          <div
            key={video.id}
            className="bg-gray-800/50 rounded-lg overflow-hidden hover:bg-gray-700/50 cursor-pointer transition-all duration-200"
            onClick={() => onVideoSelect?.(video)}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-32 object-cover"
              loading="lazy"
            />
            <div className="p-3">
              <h4 className="text-sm font-medium text-gray-200 line-clamp-2 mb-2">
                {video.title}
              </h4>
              <div className="flex justify-between text-xs text-gray-400">
                <span>{video.publishedAt}</span>
                <span>{video.durationFormatted}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {videos.length > 6 && (
        <button className="mt-4 text-purple-400 hover:text-purple-300 text-sm">
          Ver todos los {videos.length} videos →
        </button>
      )}
    </div>
  );
};

const AutoCategorizedVideos = ({ onVideoSelect }) => {
  const { categorizedVideos, loading, error, lastUpdate } = useChannelVideos({
    autoUpdate: true,
    pollInterval: 10 * 60 * 1000, // Actualizar cada 10 minutos
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 pt-8 pb-24 flex justify-center items-center h-[60dvh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-52 w-52 border-b-3 border-purple-500 mx-auto mb-4" />
          <p className="text-gray-400">Cargando y categorizando videos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 pt-8 pb-24 text-red-500 text-center">
        <h2 className="text-xl font-semibold mb-4">Error al cargar videos</h2>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  const categoryLabels = {
    eventos: "🎪 Eventos",
    lives: "🔴 Lives",
    cursos: "📚 Cursos",
    cursos_nuevos: "🆕 Cursos Nuevos",
    live_coding: "💻 Live Coding",
    charlas: "🎤 Charlas",
    noticias: "📰 Noticias",
  };

  const getTotalVideos = () => {
    let total = 0;
    Object.values(categorizedVideos).forEach((category) => {
      total += category.midulive?.length || 0;
      total += category.midudev?.length || 0;
    });
    return total;
  };

  return (
    <div className="container mx-auto px-4 pt-8 pb-24 animate-fade-in">
      {/* Header con estadísticas */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Videos Categorizados Automáticamente
        </h1>
        <div className="flex justify-center space-x-6 text-sm text-gray-400">
          <span>Total: {getTotalVideos()} videos</span>
          {lastUpdate && (
            <span>Última actualización: {lastUpdate.toLocaleTimeString()}</span>
          )}
        </div>
      </div>

      {/* Categorías */}
      {Object.entries(categoryLabels).map(([categoryKey, categoryLabel]) => {
        const categoryData = categorizedVideos[categoryKey];

        if (
          !categoryData ||
          (!categoryData.midulive?.length && !categoryData.midudev?.length)
        ) {
          return null;
        }

        return (
          <div key={categoryKey} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center text-purple-300">
              {categoryLabel}
            </h2>

            {/* Canal @midulive */}
            <CategorySection
              title={categoryLabel}
              videos={categoryData.midulive}
              channelName="@midulive"
              onVideoSelect={onVideoSelect}
            />

            {/* Canal @midudev */}
            <CategorySection
              title={categoryLabel}
              videos={categoryData.midudev}
              channelName="@midudev"
              onVideoSelect={onVideoSelect}
            />
          </div>
        );
      })}

      {/* Footer con información adicional */}
      <div className="mt-12 p-6 bg-gray-800/30 rounded-lg text-center">
        <h3 className="text-lg font-semibold mb-2 text-purple-400">
          Reglas de Categorización
        </h3>
        <div className="text-sm text-gray-400 space-y-1">
          <p>
            <strong>Eventos:</strong> Videos de más de 3 horas
          </p>
          <p>
            <strong>Lives:</strong> Videos de más de 1 hora (excepto eventos)
          </p>
          <p>
            <strong>Cursos:</strong> Keywords específicas + videos de 1-2 horas
          </p>
          <p>
            <strong>Live Coding:</strong> Keywords de desarrollo y programación
          </p>
          <p>
            <strong>Charlas:</strong> Keywords de entrevistas y charlas
          </p>
          <p>
            <strong>Noticias:</strong> Videos de menos de 30 minutos
          </p>
        </div>
      </div>
    </div>
  );
};

export default AutoCategorizedVideos;
