import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch(
        "https://api.midudev.com/news?_sort=created_at&_order=desc"
      );
      const data = await response.json();
      setNews(data);
    };
    fetchNews();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold my-4">Noticias</h1>
      <ul className="space-y-4">
        {news.map((newItem) => (
          <li key={newItem.id} className="shadow-md p-4 rounded-lg">
            <Link to={`/noticias/${newItem.id}`}>
              <h2 className="text-xl font-semibold">{newItem.title}</h2>
              <p className="text-gray-600 mt-2">
                {newItem.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      
    </div>
    
  );
};

export default News;
