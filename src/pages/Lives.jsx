import axios from "axios";
import { useEffect, useState } from "react";
import * as cheerio from "cheerio";
import YouTube from "react-youtube";

const Lives = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          "https://www.youtube.com/playlist?list=PLnHPgY5vHkhDdRZP1xB_mq7f-aZCrdina"
        );

        const $ = cheerio.load(response.data);
        const videoIds = [];

        $('a[href^="/watch?v="]').each((index, element) => {
          const videoId = $(element).attr("href").split("=")[1];
          if (!videoIds.includes(videoId)) {
            videoIds.push(videoId);
          }
        });

        setVideos(videoIds);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
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

