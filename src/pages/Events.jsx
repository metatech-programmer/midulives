import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(
        "https://api.midudev.com/events?_sort=start&_order=asc"
      );
      const data = await response.json();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold my-4">Eventos</h1>
      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event.id} className="shadow-md p-4 rounded-lg">
            <Link to={`/events/${event.id}`}>
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-gray-600 mt-2">
                {new Date(event.start).toLocaleString()}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
