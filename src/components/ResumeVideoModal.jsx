const ResumeVideoModal = ({ savedTime, onAccept, onCancel }) => {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-lg shadow-xl border border-purple-500 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold text-purple-300 mb-4 font-silkscreen">
          Reanudar video
        </h3>
        <p className="text-gray-300 mb-6">
          ¿Deseas continuar el video desde {formatTime(savedTime)}?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors"
          >
            Empezar desde el inicio
          </button>
          <button
            onClick={onAccept}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeVideoModal;
