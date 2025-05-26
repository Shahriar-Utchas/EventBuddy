'use client';

import React, { useEffect, useRef, useState } from 'react';
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

const EVENTS_PER_PAGE = 6;
const PREVIOUS_PER_PAGE = 3;

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [previousEvents, setPreviousEvents] = useState<Event[]>([]);
  const [eventPage, setEventPage] = useState(1);
  const [prevEventPage, setPrevEventPage] = useState(1);

  const upcomingRef = useRef<HTMLDivElement>(null);
  const previousRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/events.json');
      const data = await res.json();
      const upcoming = data.events.filter((event: Event) => event.isUpcoming);
      const previous = data.events.filter((event: Event) => !event.isUpcoming);

      setEvents(upcoming);
      setPreviousEvents(previous);
    };

    fetchData();
  }, []);

  const totalEventPages = Math.ceil(events.length / EVENTS_PER_PAGE);
  const totalPrevPages = Math.ceil(previousEvents.length / PREVIOUS_PER_PAGE);

  const paginatedEvents = events.slice(
    (eventPage - 1) * EVENTS_PER_PAGE,
    eventPage * EVENTS_PER_PAGE
  );

  const paginatedPrevious = previousEvents.slice(
    (prevEventPage - 1) * PREVIOUS_PER_PAGE,
    prevEventPage * PREVIOUS_PER_PAGE
  );

  const handleUpcomingPageChange = (page: number) => {
    setEventPage(page);
    upcomingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePreviousPageChange = (page: number) => {
    setPrevEventPage(page);
    previousRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold text-[#2a235e] mb-6">Upcoming Events</h1>

      <div ref={upcomingRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginatedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {totalEventPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalEventPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handleUpcomingPageChange(i + 1)}
              className={`w-9 h-9 rounded-md text-sm font-medium flex items-center justify-center transition ${
                eventPage === i + 1
                  ? 'bg-[#5c5cde] text-white'
                  : 'bg-white border border-[#ddd] text-[#2a235e] hover:bg-[#f0f0ff]'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {previousEvents.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-[#2a235e] mt-10 mb-6">Previous Events</h2>
          <div ref={previousRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paginatedPrevious.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {totalPrevPages > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: totalPrevPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePreviousPageChange(i + 1)}
                  className={`w-9 h-9 rounded-md text-sm font-medium flex items-center justify-center transition ${
                    prevEventPage === i + 1
                      ? 'bg-[#5c5cde] text-white'
                      : 'bg-white border border-[#ddd] text-[#2a235e] hover:bg-[#f0f0ff]'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Events;
