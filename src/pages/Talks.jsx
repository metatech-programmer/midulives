import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Talks = () => {
  const [talks, setTalks] = useState([]);

  useEffect(() => {
    const fetchTalks = async () => {
      const response = await fetch(
        "https://api.midudev.com/talks?_sort=start&_order=asc"
      );
      const data = await response.json();
      setTalks(data);
    };
    fetchTalks();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold my-4">Charlas</h1>
      <ul className="space-y-4">
        {talks.map((talk) => (
          <li key={talk.id} className="shadow-md p-4 rounded-lg">
            <Link to={`/talks/${talk.id}`}>
              <h2 className="text-xl font-semibold">{talk.title}</h2>
              <p className="text-gray-600 mt-2">
                {new Date(talk.start).toLocaleString()}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Talks;
