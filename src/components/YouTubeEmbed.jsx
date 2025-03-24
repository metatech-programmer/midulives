import { useEffect, useState } from "react";

export default function YouTubeEmbed({
  videoId,
  time,
  playListId,
  selectedVideo,
}) {
  const [bgColor, setBgColor] = useState("#000");

  useEffect(() => {
    const getThumbnailColors = async () => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Permite acceder a la imagen desde otro dominio
      img.src = `https://img.youtube.com/vi/${selectedVideo || videoId}/hqdefault.jpg`;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) return;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let r = 0,
          g = 0,
          b = 0,
          count = 0;

        for (let i = 0; i < imageData.length; i += 4 * 100) {
          r += imageData[i];
          g += imageData[i + 1];
          b += imageData[i + 2];
          count++;
        }

        const avgColor = `rgb(${Math.floor(r / count)}, ${Math.floor(g / count)}, ${Math.floor(b / count)})`;
        setBgColor(avgColor);
      };
    };


    getThumbnailColors();
  }, [videoId, selectedVideo]);

  return (
    <div className="relative w-full h-52 md:h-[80dvh] flex justify-center items-center">
      {/* Fondo dinámico con transición suave */}
      <div
        className="absolute w-full h-full blur-3xl opacity-80 -z-10 transition-all duration-700"
        style={{ backgroundColor: bgColor }}
      ></div>

      <iframe
        className="w-full h-52 md:h-[80dvh] rounded-lg shadow-lg z-50"
        src={`https://www.youtube.com/embed/${
          selectedVideo || videoId
        }?loop=1&list=${
          playListId || ""
        }&vq=hd1080&autoplay=1&controls=1&fs=1&modestbranding=1&start=${
          time || 0
        }`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}
