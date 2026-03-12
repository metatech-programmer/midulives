import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const CATEGORIES = [
  { key: "lives", path: "/lives", emoji: "🔴", color: "from-red-500/20 to-red-900/10" },
  { key: "live_coding", path: "/live_coding", emoji: "💻", color: "from-blue-500/20 to-blue-900/10" },
  { key: "eventos", path: "/eventos", emoji: "🎪", color: "from-yellow-500/20 to-yellow-900/10" },
  { key: "charlas", path: "/charlas", emoji: "🎤", color: "from-green-500/20 to-green-900/10" },
  { key: "noticias", path: "/noticias", emoji: "📰", color: "from-sky-500/20 to-sky-900/10" },
  { key: "cursos", path: "/cursos", emoji: "📚", color: "from-purple-500/20 to-purple-900/10" },
];

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-[80dvh] w-full flex flex-col text-white animate-fade-in overflow-hidden relative">
      {/* Animated gradient orbs in background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-700/20 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-blue-700/15 blur-3xl animate-pulse [animation-delay:1s]" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-indigo-700/15 blur-3xl animate-pulse [animation-delay:2s]" />
      </div>

      {/* Hero section */}
      <section className="flex flex-col items-center justify-center text-center px-4 pt-16 pb-10 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 mb-6 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          midudev · midulive
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold mb-4 text-white font-silkscreen leading-tight
          [text-shadow:0_0_40px_rgba(168,85,247,0.4)]">
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
            className="px-8 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-purple-900/40"
          >
            {t("home.courses")} →
          </Link>
          <Link
            to="/lives"
            className="px-8 py-3 rounded-full bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 font-semibold text-sm border border-gray-700/50 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            🔴 Lives
          </Link>
        </div>
      </section>

      {/* Category cards */}
      <section className="px-4 pb-20 max-w-4xl mx-auto w-full z-10">
        <h3 className="text-center text-xs font-medium text-gray-500 uppercase tracking-widest mb-6">
          Categorías
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {CATEGORIES.map(({ key, path, emoji, color }) => (
            <Link
              key={key}
              to={path}
              className={`group flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br ${color} 
                border border-white/5 hover:border-white/15 transition-all duration-300 
                hover:scale-[1.03] active:scale-[0.98] animate-fade-in-show`}
            >
              <span className="text-xl">{emoji}</span>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors capitalize">
                {t(key)}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
