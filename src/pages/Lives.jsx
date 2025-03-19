import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Lives = () => {
  const [lives, setLives] = useState([]);

  useEffect(() => {
    const fetchLives = async () => {
      const response = await fetch(
        "https://api.midudev.com/lives?_sort=start&_order=asc"
      );
      const data = await response.json();
      setLives(data);
    };
    fetchLives();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold my-4">Lives</h1>
      <ul className="space-y-4">
        {lives.map((live) => (
          <li key={live.id} className="shadow-md p-4 rounded-lg">
            <Link to={`/lives/${live.id}`}>
              <h2 className="text-xl font-semibold">{live.title}</h2>
              <p className="text-gray-600 mt-2">
                {new Date(live.start).toLocaleString()}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="h-dvh">
        <iframe
          className="w-full h-full p-10 rounded-xl"
          src="https://www.youtube.com/embed/videoseries?si=aUg4iOl9f3p1xPau&amp;list=PLnHPgY5vHkhDdRZP1xB_mq7f-aZCrdina"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; ambient-light-sensor; autoplay; camera; display-capture; document-domain; encrypted-media; fullscreen; geolocation; gyroscope; magnetometer; microphone; midi; payment; picture-in-picture; publickey-credentials-get; sync-xhr; usb; web-share; xr-spatial-tracking;"
          referrerpolicy="strict-origin-when-cross-origin"
        ></iframe>
      </div>
    </div>
  );
};

export default Lives;
