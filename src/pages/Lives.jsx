import axios from "axios";
import { useEffect, useState } from "react";

const Lives = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get(
        "https://www.youtube.com/playlist?list=PLnHPgY5vHkhDdRZP1xB_mq7f-aZCrdina",
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
          },
        }
      );

      const videoIds = response.data
        .split('href="/watch?v=')
        .slice(1)
        .map((video) => video.split('"')[0]);

      setVideos(videoIds);
    };
    fetchVideos();
  }, []);

  const opts = {
    height: "390",
    width: "640",
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold my-4">Lives</h1>
      <ul className="space-y-4">
        {videos.map((videoId) => (
          <li key={videoId} className="shadow-md p-4 rounded-lg">
            <YouTube videoId={videoId} opts={opts} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lives;

