import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="h-[60dvh] md:h-[80dvh] w-full flex flex-col items-center justify-center text-white relative animate-fade-in">
      <div className="fixed inset-0 bg-noise bg-[url(/giphy.gif)] bg-cover opacity-10  bg-center [mask-image:radial-gradient(circle,#000_10%,transparent_80%)]" />
      <div className="z-10 text-center">
        <h1 className="text-4xl md:text-8xl font-extrabold my-6  text-purple-700 font-silkscreen [text-shadow:0_0_10px_purple]">
          {t("home.title")}
        </h1>
        <h2 className="text-lg md:text-5xl font-semibold my-4 text-sky-200/70">
          {t("home.subtitle")}
        </h2>
        <p className="text-xs md:text-2xl mt-4 text-gray-500 ">
          {t("home.description")}{" "}
          <a
            className="md:hover:underline underline-offset-4 md:text-purple-500 "
            href="http://twitch.tv/midudev"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            {t("home.link")}
          </a>{" "}
          {t("home.and")}{" "}
        </p>
      </div>
      <Link
        to="/cursos"
        className="text-xs md:text-2xl mt-4 bg-purple-500/50 border p-3 rounded-full active:scale-105 md:hover:scale-105 transition-all duration-150 md:hover:bg-purple-700 active:bg-purple-500 z-50 "
      >
        {t("home.courses")}
      </Link>
    </div>
  );
};

export default Home;
