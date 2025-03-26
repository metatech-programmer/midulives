import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function History() {
  const [videos, setVideos] = useState([])

  const {t} = useTranslation()

  useEffect(() => {
    const loadVideos = () => {
      const savedVideos = JSON.parse(localStorage.getItem('videos_history')) || []
      setVideos(savedVideos.sort((a, b) => b.timestamp - a.timestamp))
    }

    loadVideos()
  }, [])

  const clearHistory = () => {
    localStorage.removeItem('videos_history')
    setVideos([])
  }

  const removeVideo = (videoId) => {
    const newVideos = videos.filter(video => video.videoId !== videoId)
    localStorage.setItem('videos_history', JSON.stringify(newVideos))
    setVideos(newVideos)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold font-silkscreen text-purple-500">{t('history.title')}</h1>
        <button 
          onClick={clearHistory}
          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg font-dongle shadow-md transform transition-transform duration-200 hover:scale-105 text-center"
        >
          {t('history.clear')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div key={video.videoId} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-all">

            <Link to={video.url+`/${video.videoId}/${video.title}`}>
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full object-cover h-48"
              />
            </Link>
            <div className="p-4">
              <Link to={video.url+`/${video.videoId}/${video.title}`}>
                <h2 className="text-lg font-semibold mb-2 hover:text-blue-400">
                  {video.title}
                </h2>
              </Link>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">
                  {new Date(video.timestamp).toLocaleDateString()}
                </span>
                <button
                  onClick={() => removeVideo(video.videoId)}
                  className="text-red-400 hover:text-red-500"
                >
                  {t('history.remove')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {videos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">{t('history.empty')}</p>
        </div>
      )}
    </div>
  )
}
