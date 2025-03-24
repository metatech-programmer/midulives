import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import Home from "@pages/Home";
import Lives from "@pages/Lives";
import Courses from "@pages/Courses";
import Header from "@components/Header";
import BtnTop from "@components/BtnTop";
import Footer from "@components/Footer";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/lives", element: <Lives /> },
  { path: "/live_coding", element: <Lives /> },
  { path: "/eventos", element: <Lives /> },
  { path: "/noticias", element: <Lives /> },
  { path: "/charlas", element: <Lives /> },
  { path: "/cursos", element: <Courses /> },
  { path: "/cursos/:cursoId", element: <Lives /> },
];

function App() {
  const currentLanguage = localStorage.getItem("language") || "es";

  const { i18n } = useTranslation();
  useEffect(() => {
    if (currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage]);

  return (
    <div
      className="bg-gradient-to-b from-gray-800 to-gray-950 min-h-screen flex flex-col"
      id="top"
    >
      <BtnTop />
      <BrowserRouter>
        <Header />
        <main className="flex-grow pt-16">
          <Routes>
            {routes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}


export default App;
