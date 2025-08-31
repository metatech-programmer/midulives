import React, { useState } from "react";
import { useChannelVideos } from "../hooks/useChannelVideos";

const SimpleVideoTest = () => {
  const [showDetails, setShowDetails] = useState(false);
  const { categorizedVideos, loading, error, lastUpdate } = useChannelVideos();

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto"></div>
        <p className="mt-4 text-gray-400">Obteniendo videos de YouTube...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        <h2 className="text-xl font-semibold">Error</h2>
        <p className="mt-2">{error}</p>
        <div className="mt-4 text-sm text-gray-400">
          <p>Verifica:</p>
          <ul className="list-disc list-inside mt-2">
            <li>
              Tu API key de YouTube está configurada en VITE_API_KEY_YTUBE_NEW
            </li>
            <li>Los IDs de canal están configurados correctamente</li>
            <li>Tienes cuota disponible en tu API key</li>
          </ul>
        </div>
      </div>
    );
  }

  const getTotalStats = () => {
    let stats = {
      total: 0,
      byCategory: {},
      byChannel: { midulive: 0, midudev: 0 },
    };

    Object.entries(categorizedVideos).forEach(([category, data]) => {
      const miduliveCount = data.midulive?.length || 0;
      const midudevCount = data.midudev?.length || 0;
      const categoryTotal = miduliveCount + midudevCount;

      stats.total += categoryTotal;
      stats.byCategory[category] = categoryTotal;
      stats.byChannel.midulive += miduliveCount;
      stats.byChannel.midudev += midudevCount;
    });

    return stats;
  };

  const stats = getTotalStats();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Clasificación Automática de Videos de YouTube
      </h1>

      {/* Estadísticas generales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-purple-400">
            Total Videos
          </h3>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-blue-400">@midulive</h3>
          <p className="text-2xl font-bold text-white">
            {stats.byChannel.midulive}
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-green-400">@midudev</h3>
          <p className="text-2xl font-bold text-white">
            {stats.byChannel.midudev}
          </p>
        </div>
      </div>

      {/* Categorías */}
      <div className="space-y-6">
        {Object.entries(categorizedVideos).map(([category, data]) => {
          const totalInCategory =
            (data.midulive?.length || 0) + (data.midudev?.length || 0);

          if (totalInCategory === 0) return null;

          return (
            <div key={category} className="bg-gray-800/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-purple-400 capitalize">
                {category.replace("_", " ")} ({totalInCategory})
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Canal @midulive */}
                {data.midulive && data.midulive.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-3 text-blue-400">
                      @midulive ({data.midulive.length})
                    </h3>
                    <div className="space-y-2">
                      {data.midulive.slice(0, 3).map((video) => (
                        <div
                          key={video.id}
                          className="flex items-center space-x-3 bg-gray-700/50 rounded p-3"
                        >
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-16 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-200 truncate">
                              {video.title}
                            </p>
                            <p className="text-xs text-gray-400">
                              {video.durationFormatted} • {video.publishedAt}
                            </p>
                          </div>
                        </div>
                      ))}
                      {data.midulive.length > 3 && (
                        <p className="text-sm text-gray-400 text-center">
                          y {data.midulive.length - 3} videos más...
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Canal @midudev */}
                {data.midudev && data.midudev.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-3 text-green-400">
                      @midudev ({data.midudev.length})
                    </h3>
                    <div className="space-y-2">
                      {data.midudev.slice(0, 3).map((video) => (
                        <div
                          key={video.id}
                          className="flex items-center space-x-3 bg-gray-700/50 rounded p-3"
                        >
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-16 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-200 truncate">
                              {video.title}
                            </p>
                            <p className="text-xs text-gray-400">
                              {video.durationFormatted} • {video.publishedAt}
                            </p>
                          </div>
                        </div>
                      ))}
                      {data.midudev.length > 3 && (
                        <p className="text-sm text-gray-400 text-center">
                          y {data.midudev.length - 3} videos más...
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Información adicional */}
      <div className="mt-8 p-4 bg-gray-800/30 rounded-lg">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-purple-400 hover:text-purple-300 font-semibold"
        >
          {showDetails ? "Ocultar" : "Mostrar"} reglas de categorización
        </button>

        {showDetails && (
          <div className="mt-4 space-y-2 text-sm text-gray-400">
            <p>
              <strong className="text-purple-400">Eventos:</strong> Videos de
              más de 3 horas
            </p>
            <p>
              <strong className="text-purple-400">Lives:</strong> Videos de 1-3
              horas
            </p>
            <p>
              <strong className="text-purple-400">Cursos:</strong> Keywords como
              "curso", "aprende", "bootcamp" + videos de 1-2 horas
            </p>
            <p>
              <strong className="text-purple-400">Live Coding:</strong> Keywords
              como "desarrollando", "creando", "html", "react", etc.
            </p>
            <p>
              <strong className="text-purple-400">Charlas:</strong> Keywords
              como "charla", "entrevista", "historia", etc.
            </p>
            <p>
              <strong className="text-purple-400">Noticias:</strong> Videos de
              menos de 30 minutos
            </p>

            {lastUpdate && (
              <p className="mt-4 text-xs">
                Última actualización: {lastUpdate.toLocaleString()}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleVideoTest;
