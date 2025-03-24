import { t } from "i18next";
import { useState, useRef, useEffect, use } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  /* Nav links start */
  const location = useLocation();

  const initialLinks = [
    {
      name: "lives",
      path: "/lives",
      active: false,
      svg: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <title>ic_fluent_live_24_filled</title>{" "}
            <desc>Created with Sketch.</desc>{" "}
            <g
              id="🔍-Product-Icons"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              {" "}
              <g
                id="ic_fluent_live_24_filled"
                fill="#ffffff"
                fill-rule="nonzero"
              >
                {" "}
                <path
                  d="M6.34277267,4.93867691 C6.73329697,5.3292012 6.73329697,5.96236618 6.34277267,6.35289047 C3.21757171,9.47809143 3.21757171,14.5450433 6.34277267,17.6702443 C6.73329697,18.0607686 6.73329697,18.6939336 6.34277267,19.0844579 C5.95224838,19.4749821 5.3190834,19.4749821 4.92855911,19.0844579 C1.02230957,15.1782083 1.02230957,8.84492646 4.92855911,4.93867691 C5.3190834,4.54815262 5.95224838,4.54815262 6.34277267,4.93867691 Z M19.0743401,4.93867691 C22.9805896,8.84492646 22.9805896,15.1782083 19.0743401,19.0844579 C18.6838158,19.4749821 18.0506508,19.4749821 17.6601265,19.0844579 C17.2696022,18.6939336 17.2696022,18.0607686 17.6601265,17.6702443 C20.7853275,14.5450433 20.7853275,9.47809143 17.6601265,6.35289047 C17.2696022,5.96236618 17.2696022,5.3292012 17.6601265,4.93867691 C18.0506508,4.54815262 18.6838158,4.54815262 19.0743401,4.93867691 Z M9.3094225,7.81205295 C9.69994679,8.20257725 9.69994679,8.83574222 9.3094225,9.22626652 C7.77845993,10.7572291 7.77845993,13.2394099 9.3094225,14.7703724 C9.69994679,15.1608967 9.69994679,15.7940617 9.3094225,16.184586 C8.91889821,16.5751103 8.28573323,16.5751103 7.89520894,16.184586 C5.58319778,13.8725748 5.58319778,10.1240641 7.89520894,7.81205295 C8.28573323,7.42152866 8.91889821,7.42152866 9.3094225,7.81205295 Z M16.267742,7.81205295 C18.5797531,10.1240641 18.5797531,13.8725748 16.267742,16.184586 C15.8772177,16.5751103 15.2440527,16.5751103 14.8535284,16.184586 C14.4630041,15.7940617 14.4630041,15.1608967 14.8535284,14.7703724 C16.384491,13.2394099 16.384491,10.7572291 14.8535284,9.22626652 C14.4630041,8.83574222 14.4630041,8.20257725 14.8535284,7.81205295 C15.2440527,7.42152866 15.8772177,7.42152866 16.267742,7.81205295 Z M12.0814755,10.5814755 C12.9099026,10.5814755 13.5814755,11.2530483 13.5814755,12.0814755 C13.5814755,12.9099026 12.9099026,13.5814755 12.0814755,13.5814755 C11.2530483,13.5814755 10.5814755,12.9099026 10.5814755,12.0814755 C10.5814755,11.2530483 11.2530483,10.5814755 12.0814755,10.5814755 Z"
                  id="🎨-Color"
                >
                  {" "}
                </path>{" "}
              </g>{" "}
            </g>{" "}
          </g>
        </svg>
      ),
    },
    {
      name: "live_coding",
      path: "/live_coding",
      active: false,
      svg: (
        <svg
          className="w-6 h-6"
          fill="#ffffff"
          height="200px"
          width="200px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
          xml:space="preserve"
          stroke="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              {" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <path d="M282.503,149.97c-11.43-2.858-23.013,4.092-25.87,15.522l-42.667,170.667c-2.858,11.43,4.092,23.013,15.522,25.87 s23.013-4.092,25.87-15.522l42.667-170.667C300.883,164.41,293.933,152.828,282.503,149.97z"></path>{" "}
                  <path d="M170.662,234.667V192c11.782,0,21.333-9.551,21.333-21.333c0-11.782-9.551-21.333-21.333-21.333 c-25.201,0-42.667,17.466-42.667,42.667v33.83l-15.085,15.085c-8.331,8.331-8.331,21.839,0,30.17l15.085,15.085V320 c0,25.201,17.466,42.667,42.667,42.667c11.782,0,21.333-9.551,21.333-21.333c0-11.782-9.551-21.333-21.333-21.333v-42.667 c0-5.658-2.248-11.084-6.248-15.085L158.166,256l6.248-6.248C168.415,245.751,170.662,240.325,170.662,234.667z"></path>{" "}
                  <path d="M383.996,225.83V192c0-25.201-17.466-42.667-42.667-42.667c-11.782,0-21.333,9.551-21.333,21.333 c0,11.782,9.551,21.333,21.333,21.333v42.667c0,5.658,2.248,11.084,6.248,15.085l6.248,6.248l-6.248,6.248 c-4.001,4.001-6.248,9.427-6.248,15.085V320c-11.782,0-21.333,9.551-21.333,21.333c0,11.782,9.551,21.333,21.333,21.333 c25.201,0,42.667-17.466,42.667-42.667v-33.83l15.085-15.085c8.331-8.331,8.331-21.839,0-30.17L383.996,225.83z"></path>{" "}
                  <path d="M426.731,0H85.269C38.181,0,0,38.181,0,85.269v341.461C0,473.819,38.181,512,85.269,512h341.461 C473.819,512,512,473.819,512,426.731V85.269C512,38.181,473.819,0,426.731,0z M469.333,426.731 c0,23.525-19.078,42.603-42.603,42.603H85.269c-23.525,0-42.603-19.078-42.603-42.603V85.269 c0-23.525,19.078-42.603,42.603-42.603h341.461c23.525,0,42.603,19.078,42.603,42.603V426.731z"></path>{" "}
                </g>{" "}
              </g>{" "}
            </g>{" "}
          </g>
        </svg>
      ),
    },
    {
      name: "eventos",
      path: "/eventos",
      active: false,
      svg: (
        <svg
          className="w-6 h-6"
          fill="#ffffff"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <defs>
              <style>{`.cls-1{fill:none;}`}</style>
            </defs>
            <title>events</title>
            <path d="M26,14H24v2h2a3.0033,3.0033,0,0,1,3,3v4h2V19A5.0058,5.0058,0,0,0,26,14Z"></path>
            <path d="M24,4a3,3,0,1,1-3,3,3,3,0,0,1,3-3m0-2a5,5,0,1,0,5,5A5,5,0,0,0,24,2Z"></path>
            <path d="M23,30H21V28a3.0033,3.0033,0,0,0-3-3H14a3.0033,3.0033,0,0,0-3,3v2H9V28a5.0059,5.0059,0,0,1,5-5h4a5.0059,5.0059,0,0,1,5,5Z"></path>
            <path d="M16,13a3,3,0,1,1-3,3,3,3,0,0,1,3-3m0-2a5,5,0,1,0,5,5A5,5,0,0,0,16,11Z"></path>
            <path d="M8,14H6a5.0059,5.0059,0,0,0-5,5v4H3V19a3.0033,3.0033,0,0,1,3-3H8Z"></path>
            <path d="M8,4A3,3,0,1,1,5,7,3,3,0,0,1,8,4M8,2a5,5,0,1,0,5,5A5,5,0,0,0,8,2Z"></path>
          </g>
        </svg>
      ),
    },
    {
      name: "cursos",
      path: "/cursos",
      active: false,
      svg: (
        <svg
          className="w-6 h-6"
          fill="#ffffff"
          viewBox="0 0 1920 1920"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M1395.06 960c165.12 0 299.4 134.16 299.88 299.04 0 .3.083.6.111.83l.009.13c0 165.36-134.64 300-300 300s-300-134.64-300-300 134.64-300 300-300Zm-975 0c165.36 0 300 134.64 300 300s-134.64 300-300 300c-165.48 0-300-134.64-300-300s134.52-300 300-300Zm1394.88 299.04c-.36-124.8-96.96-781.8-100.92-808.44-14.76-120-117.12-210.6-238.2-210.6h-155.76v120h155.76c60.48 0 111.72 45.24 119.28 106.68 15 101.88 42.84 297.24 65.4 470.64-72.6-59.88-164.28-97.32-265.44-97.32-210.96 0-384.48 157.08-414 360H833.94c-29.4-202.92-202.92-360-413.88-360-101.28 0-192.96 37.44-265.56 97.32 22.56-173.52 50.52-369.48 65.52-472.08 7.44-60 58.68-105.24 119.16-105.24h140.88V240H339.18c-121.08 0-223.44 90.6-237.96 209.28C97.02 477.24.06 1137 .06 1260c0 231.6 188.4 420 420 420 210.96 0 384.48-157.08 413.88-360h147.12c29.52 202.92 203.04 360 414 360 231.6 0 420-188.4 420-420 0-.24-.12-.6-.12-.96"
              fill-rule="evenodd"
            ></path>{" "}
          </g>
        </svg>
      ),
    },
    {
      name: "noticias",
      path: "/noticias",
      active: false,
      svg: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g clip-path="url(#clip0_429_11031)">
              {" "}
              <path
                d="M3 4V18C3 19.1046 3.89543 20 5 20H17H19C20.1046 20 21 19.1046 21 18V8H17"
                stroke="#ffffff"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
              <path
                d="M3 4H17V18C17 19.1046 17.8954 20 19 20V20"
                stroke="#ffffff"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
              <path
                d="M13 8L7 8"
                stroke="#ffffff"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
              <path
                d="M13 12L9 12"
                stroke="#ffffff"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
            </g>{" "}
            <defs>
              {" "}
              <clipPath id="clip0_429_11031">
                {" "}
                <rect width="24" height="24" fill="white"></rect>{" "}
              </clipPath>{" "}
            </defs>{" "}
          </g>
        </svg>
      ),
    },
    {
      name: "charlas",
      path: "/charlas",
      active: false,
      svg: (
        <svg
          className="w-6 h-6"
          fill="#ffffff"
          height="200px"
          width="200px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 259.465 259.465"
          xml:space="preserve"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              {" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <path d="M216.544,9.994H42.921c-25.535,0-45.436,22.21-42.662,47.579l12.258,112.159c2.385,21.808,20.726,38.253,42.662,38.253 c7.486,0,65.908,0,76.517,0l35.642,36.216c9.988,10.153,27.357,4.854,29.913-9.212l4.91-27.004 c25.999,0,42.539-17.686,44.788-38.253l12.258-112.159C261.981,32.189,242.064,9.994,216.544,9.994z M244.294,55.943 l-12.257,112.159c-1.552,14.186-13.481,24.883-27.751,24.883h-8.385c-3.625,0-6.73,2.592-7.379,6.158l-6.03,33.163 c-0.384,2.108-2.963,2.9-4.464,1.374l-25.831-26.248c7.594-3.084,5.391-14.448-2.818-14.448c-10.983,0-84.789,0-94.2,0 c-14.269,0-26.199-10.697-27.75-24.883L15.171,55.943c-1.806-16.511,11.149-30.949,27.75-30.949h173.623 C233.153,24.994,246.099,39.44,244.294,55.943z"></path>{" "}
                  <circle cx="84.136" cy="113.734" r="12.193"></circle>{" "}
                  <circle cx="129.732" cy="113.734" r="12.193"></circle>{" "}
                  <circle cx="175.328" cy="113.734" r="12.193"></circle>{" "}
                </g>{" "}
              </g>{" "}
            </g>{" "}
          </g>
        </svg>
      ),
    },
  ];

  const [links, setLinks] = useState(initialLinks);

  useEffect(() => {
    const updatedLinks = links.map((link) => ({
      ...link,
      active: link.path === location.pathname,
    }));
    setLinks(updatedLinks);
  }, [location.pathname]);

  /* Nav links end */

  /* Languages Start */
  const listLanguages = [
    {
      name: "English",
      code: "EN",
      flag: "https://flagcdn.com/us.svg",
      isActive: false,
      bg: "cover",
    },
    {
      name: "Spanish",
      code: "ES",
      flag: "https://flagcdn.com/es.svg",
      isActive: true,
      bg: "cover",
    },
    {
      name: "French",
      code: "FR",
      flag: "https://flagcdn.com/fr.svg",
      isActive: false,
      bg: "contain",
    },
    {
      name: "Portugues-Brazil",
      code: "PT-BR",
      flag: "https://flagcdn.com/br.svg",
      isActive: false,
      bg: "cover",
    },
    {
      name: "Argentina",
      code: "ES-AR",
      flag: "https://flagcdn.com/ar.svg",
      isActive: false,
      bg: "cover",
    },
    {
      name: "Catalan",
      code: "CA",
      flag: "https://flagcdn.com/ad.svg",
      isActive: false,
      bg: "cover",
    },
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [languages, setLanguages] = useState(listLanguages);
  const currentLanguage = localStorage.getItem("language") || "es";

  const toggleDropdownMenu = () => {
    setDropdownMenuOpen(!dropdownMenuOpen);
  };

  const selectLanguage = (language) => {
    const updatedLanguages = listLanguages.map((lang) => ({
      ...lang,
      isActive: lang.code === language.code,
    }));
    setLanguages(updatedLanguages);
    setDropdownOpen(false);
    window.localStorage.setItem("language", language.code.toLowerCase());
    changeLanguage(language.code.toLowerCase());
  };

  // Cerrar el menú cuando se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const updatedLanguages = listLanguages.map((lang) => ({
      ...lang,
      isActive:
        lang.code.toLowerCase() ===
        (currentLanguage ? currentLanguage.toLowerCase() : ""),
    }));
    setLanguages(updatedLanguages);
  }, [currentLanguage]);

  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  /* Languages End */

  return (
    <header className="fixed top-0 w-dvw z-[999] md:px-12 animate-fade-in-scroll ">
      <nav className="mx-auto w-full ">
        <div className=" w-full flex flex-wrap items-center justify-between md:justify-around mx-auto py-4 md:py-3 md:h-16  pr-4 md:pr-0 relative ">
          <Link
            to="/"
            className="hidden md:flex items-center space-x-4 active:scale-105 md:hover:scale-105 transition-all duration-150 md:hover:text-purple-500 text-3xl"
          >
            <img src="/icon.webp" className="h-11" alt="Logo" />
            <span className="text-4xl font-semibold text-white">
              Midulive's
            </span>
          </Link>

          <button
            onClick={toggleDropdownMenu}
            className="md:hidden flex items-center space-x-3 active:scale-105 md:hover:scale-105 transition-all duration-150 md:hover:text-purple-500 text-2xl px-4 py-2"
          >
            <img src="/icon.webp" className="h-11" alt="Logo" />
            <span className="text-4xl font-semibold text-white">
              Midulive's
            </span>
          </button>
          <div className="hidden md:block">
            <ul className="flex  text-gray-300 font-semibold items-center justify-evenly space-x-8">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`flex items-center space-x-3 active:scale-105 md:hover:scale-105 transition-all duration-150 md:hover:text-purple-500 text-2xl 
                      ${" "} ${
                      link.active ? "text-purple-500" : "text-gray-300"
                    }`}
                  >
                    {link.svg}
                    <span>{t(link.name.toString())}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {dropdownMenuOpen && (
            <div className="absolute left-0 top-0 pt-4  bg-gray-800 rounded-lg md:hidden w-dvw z-50 animate-fade-in-nav ">
              <ul className="flex flex-col   text-gray-300 font-semibold items-start justify-evenly space-x-8">
                <li>
                  <button
                    onClick={toggleDropdownMenu}
                    className="flex items-center space-x-3 active:scale-105 md:hover:scale-105 transition-all duration-150 md:hover:text-purple-500 text-2xl px-4 py-2"
                  >
                    <img src="/icon.webp" className="h-11" alt="Logo" />
                    <span className="text-4xl font-semibold text-white">
                      Midulive's
                    </span>
                  </button>
                <hr className="border-gray-700 w-dvw my-3"/>
                </li>
                <li onClick={toggleDropdownMenu}>
                  <Link
                    to="/"
                    className="flex items-center space-x-3 active:scale-105 md:hover:scale-105 transition-all duration-150 md:hover:text-purple-500 text-2xl px-4 py-2"
                  >
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#ffffff"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M6.49996 7C7.96131 5.53865 9.5935 4.41899 10.6975 3.74088C11.5021 3.24665 12.4978 3.24665 13.3024 3.74088C14.4064 4.41899 16.0386 5.53865 17.5 7C20.6683 10.1684 20.5 12 20.5 15C20.5 16.4098 20.3895 17.5988 20.2725 18.4632C20.1493 19.3726 19.3561 20 18.4384 20H17C15.8954 20 15 19.1046 15 18V16C15 15.2043 14.6839 14.4413 14.1213 13.8787C13.5587 13.3161 12.7956 13 12 13C11.2043 13 10.4413 13.3161 9.87864 13.8787C9.31603 14.4413 8.99996 15.2043 8.99996 16V18C8.99996 19.1046 8.10453 20 6.99996 20H5.56152C4.64378 20 3.85061 19.3726 3.72745 18.4631C3.61039 17.5988 3.49997 16.4098 3.49997 15C3.49997 12 3.33157 10.1684 6.49996 7Z"
                          stroke="#ffffff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>{" "}
                    <span>{t("home")}</span>
                  </Link>
                </li>
                {links.map((link) => (
                  <li key={link.name} onClick={toggleDropdownMenu}>
                    <Link
                      to={link.path}
                      className={`flex items-center space-x-3 active:scale-105 md:hover:scale-105 transition-all duration-150 md:hover:text-purple-500 text-2xl px-4 py-2  
                       ${" "} ${
                        link.active ? "text-purple-500" : "text-gray-300"
                      }`}
                    >
                      {link.svg}
                      <span>{t(link.name.toString())}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="relative" ref={dropdownRef}>
            {/* Botón de idioma */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center px-4 py-2 text-sm text-gray-200 rounded-lg hover:bg-gray-700 transition"
            >
              {languages.map(
                (lang) =>
                  lang.isActive && (
                    <>
                      <div
                        className={`w-5 h-5 rounded-full me-2 bg-cover bg-gray-400 bg-center `}
                        style={{
                          backgroundImage: `url(${lang.flag})`,
                          backgroundSize: lang.bg,
                          backgroundPosition: "center",
                        }}
                      />
                      {lang.name}
                    </>
                  )
              )}
            </button>

            {/* Menú desplegable */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-900 shadow-lg rounded-lg overflow-hidden">
                <ul className="">
                  {/* Opciones de idioma */}

                  {languages.map(
                    (lang) =>
                      !lang.isActive && (
                        <li>
                          <button
                            onClick={() => selectLanguage(lang)}
                            className="flex items-center px-4 py-2 text-sm text-gray-200 rounded-lg hover:bg-gray-950 transition w-full"
                          >
                            <div
                              className={`w-5 h-5 rounded-full me-2 `}
                              style={{
                                backgroundImage: `url(${lang.flag})`,
                                backgroundSize: lang.bg,
                              }}
                            />
                            {lang.name} ({lang.code})
                          </button>
                        </li>
                      )
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
