'use client';

import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  day: string;
  time: string;
  location: string;
  tags: string[];
  image: string;
  totalSeats: number;
  registered: number;
  availableSeats: number;
  isUpcoming: boolean;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [previousEvents, setPreviousEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/events.json');
      const data = await res.json();
      const upcomingEvents = data.events.filter((event: Event) => event.isUpcoming);
      const previousEvents = data.events.filter((event: Event) => !event.isUpcoming);

      setEvents(upcomingEvents);
      setPreviousEvents(previousEvents);
    };

    fetchData();
  }, []);
  if (!events) return <div className="text-center mt-10">Loading event...</div>;

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold text-[#2a235e] mb-6">Upcoming Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {previousEvents.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-[#2a235e] mt-10 mb-6">Previous Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {previousEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Events;
