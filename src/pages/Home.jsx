import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const THUMBNAIL_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1280 720'%3E%3Crect width='1280' height='720' fill='%23050505'/%3E%3Ccircle cx='640' cy='360' r='92' fill='%23262626'/%3E%3Cpath d='M612 305l108 55-108 55z' fill='%23f5f5f5'/%3E%3C/svg%3E";

const IconLives = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M6.343 4.938a1 1 0 010 1.415 8 8 0 000 11.314 1 1 0 01-1.415 1.415C2.516 16.67 2.516 11.33 4.929 8.354a1 1 0 011.414-.001zm11.314 0a1 1 0 011.414 0C21.484 7.888 23 9.901 23 12c0 2.099-1.516 4.112-3.929 7.062a1 1 0 01-1.415-1.415 8 8 0 000-11.314 1 1 0 010-1.415zM9.172 7.757a1 1 0 010 1.415 4 4 0 000 5.656 1 1 0 01-1.415 1.415 6 6 0 010-8.486 1 1 0 011.415 0zm5.656 0a1 1 0 011.415 0 6 6 0 010 8.486 1 1 0 01-1.415-1.415 4 4 0 000-5.656 1 1 0 010-1.415zM12 10a2 2 0 110 4 2 2 0 010-4z" />
  </svg>
);

const IconCode = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconChat = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);

const IconNews = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const IconGradCap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const CATEGORIES = [
  { key: "lives",       path: "/lives",       color: "#ef4444", Icon: IconLives },
  { key: "live_coding", path: "/live_coding", color: "#3b82f6", Icon: IconCode },
  { key: "eventos",     path: "/eventos",     color: "#eab308", Icon: IconCalendar },
  { key: "charlas",     path: "/charlas",     color: "#22c55e", Icon: IconChat },
  { key: "noticias",    path: "/noticias",    color: "#06b6d4", Icon: IconNews },
  { key: "cursos",      path: "/cursos",      color: "#a855f7", Icon: IconGradCap },
];

const Home = () => {
  const { t } = useTranslation();
  const [recentVideos, setRecentVideos] = useState([]);

  useEffect(() => {
    try {
      const history = JSON.parse(localStorage.getItem("videos_history")) || [];
      setRecentVideos(history.sort((a, b) => b.timestamp - a.timestamp).slice(0, 4));
    } catch {
      setRecentVideos([]);
    }
  }, []);

  return (
    <div className="min-h-[80dvh] w-full flex flex-col text-white animate-fade-in overflow-hidden relative">

      {/* GIF background — low opacity translucent */}
      <div className="pointer-events-none fixed inset-0 -z-30 overflow-hidden">
        <img
          src="/giphy.gif"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-[0.07]"
        />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none fixed inset-0 -z-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(168,85,247,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient orbs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-700/20 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-blue-700/15 blur-3xl animate-pulse [animation-delay:1s]" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-indigo-700/15 blur-3xl animate-pulse [animation-delay:2s]" />
      </div>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="flex flex-col items-center justify-center text-center px-4 pt-16 pb-10 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium backdrop-blur-sm">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          midudev · midulive
        </div>

        <h1
          className="text-4xl sm:text-6xl md:text-8xl font-extrabold mb-4 text-white font-silkscreen leading-tight"
          style={{ textShadow: "0 0 60px rgba(168,85,247,0.5), 0 0 120px rgba(168,85,247,0.2)" }}
        >
          Midulive
          <span className="text-purple-500">&apos;</span>s
        </h1>

        <h2 className="text-base sm:text-xl md:text-2xl font-medium text-gray-400 mb-6 max-w-2xl">
          {t("home.subtitle")}
        </h2>

        <p className="text-sm text-gray-500 mb-10 max-w-xl">
          {t("home.description")}{" "}
          <a
            className="text-purple-400 hover:text-purple-300 underline underline-offset-4 transition-colors"
            href="https://twitch.tv/midudev"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("home.link")}
          </a>{" "}
          {t("home.and")}
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/cursos"
            className="px-8 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm
              transition-all duration-200 hover:scale-105 active:scale-95
              shadow-lg shadow-purple-900/40 hover:shadow-purple-600/40"
          >
            {t("home.courses")} →
          </Link>
          <Link
            to="/lives"
            className="flex items-center gap-2 px-8 py-3 rounded-full bg-gray-900/60 hover:bg-gray-800/80 text-gray-200 font-semibold text-sm
              border border-red-500/30 hover:border-red-500/50
              transition-all duration-200 hover:scale-105 active:scale-95
              backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
            Lives
          </Link>
        </div>
      </section>

      {/* ── Category grid ────────────────────────────────────── */}
      <section className="px-4 pb-12 max-w-4xl mx-auto w-full z-10">
        <p className="text-center text-xs font-medium text-gray-600 uppercase tracking-[0.3em] mb-6 font-mono">
          // categorías
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {CATEGORIES.map(({ key, path, color, Icon }) => (
            <Link
              key={key}
              to={path}
              className="group flex items-center gap-3 p-4 rounded-xl
                bg-gray-900/40 backdrop-blur-sm
                border border-gray-700/30
                transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]
                animate-fade-in-show"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = color + "55";
                e.currentTarget.style.boxShadow = `0 8px 32px ${color}18`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              <span style={{ color }} className="transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
                <Icon />
              </span>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors font-mono capitalize">
                {t(key)}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Recent videos ─────────────────────────────────────── */}
      {recentVideos.length > 0 && (
        <section className="px-4 pb-20 max-w-4xl mx-auto w-full z-10">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-[0.3em] font-mono">
              // vistos recientemente
            </p>
            <Link to="/history" className="text-xs text-purple-400 hover:text-purple-300 transition-colors font-mono">
              ver todo →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {recentVideos.map((video) => {
              const savedTime = localStorage.getItem(`lastTime-id-[${video.videoId}]`);
              const resumeTime = savedTime && !isNaN(Number(savedTime)) ? Math.floor(Number(savedTime)) : 0;
              const safeTitle = (video.title || video.videoId).replace(/\s+/g, "_").slice(0, 80);
              const to = `${video.url}/${video.videoId}/${safeTitle}/${resumeTime}`;
              return (
                <Link
                  key={video.videoId}
                  to={to}
                  className="group flex flex-col rounded-xl overflow-hidden
                    border border-gray-700/30 hover:border-purple-500/40
                    bg-gray-900/40 backdrop-blur-sm
                    transition-all duration-300 hover:scale-[1.02]
                    hover:shadow-lg hover:shadow-purple-500/10"
                >
                  <div className="relative overflow-hidden aspect-video bg-gray-950">
                    <img
                      src={video.thumbnail || `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.src = THUMBNAIL_FALLBACK; }}
                    />
                    {resumeTime > 30 && (
                      <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-purple-600/90 backdrop-blur-sm text-white text-[10px] font-mono leading-none">
                        ▶ continuar
                      </div>
                    )}
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs text-gray-400 line-clamp-2 group-hover:text-gray-200 transition-colors leading-relaxed">
                      {video.title}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;

