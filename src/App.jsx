import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import Header from "@Components/Header";
import Footer from "@Components/Footer";
import Lives from "@pages/Lives";
import Events from "@pages/Events";
import Courses from "@pages/Courses";
import News from "@pages/News";
import Talks from "@pages/Talks";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/lives", element: <Lives /> },
  { path: "/eventos", element: <Events /> },
  { path: "/cursos", element: <Courses /> },
  { path: "/noticias", element: <News /> },
  { path: "/charlas", element: <Talks /> },
];

function App() {
  const currentLanguage = localStorage.getItem("language");
  
  const { i18n } = useTranslation();
  useEffect(() => {
    if (currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage]);

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-950 min-h-screen flex flex-col">
      
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

