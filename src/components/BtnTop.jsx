import { useState } from "react";

const BtnTop = () => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <button
      className={`fixed bottom-2 md:bottom-10 right-2  md:right-10 bg-blue-500/50 md:hover:bg-blue-500 active:bg-blue-500 active:scale-105 p-4 transition-all rounded-full z-[999] ${
        visible ? "block" : "hidden"
      }`}
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>
  );
};

export default BtnTop;
