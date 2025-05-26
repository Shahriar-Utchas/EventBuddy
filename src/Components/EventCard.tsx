'use client';

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { Armchair, CalendarDays, Clock, MapPin } from 'lucide-react';

interface EventProps {
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

const EventCard = ({ event }: { event: EventProps }) => {
  const eventDate = new Date(event.date);
  const month = eventDate.toLocaleString('default', { month: 'short' });
  const day = eventDate.getDate();

  return (
    <Link href={`/event/${event.id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden cursor-pointer">
        <div className="w-full h-48 relative">
          <Image
            src={event.image}
            alt={event.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-4">
          <div className="flex items-start gap-4">
            <div className="text-center leading-none">
              <div className="text-sm text-[#5773ff] font-bold uppercase">{month}</div>
              <div className="text-xl font-extrabold text-[#2a235e]">{day}</div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#2a235e] mb-1">{event.title}</h3>
              <p className="text-sm text-gray-700">{event.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-600 mt-4">
            <div className="flex items-center gap-1">
              <CalendarDays size={14} className="text-[#5773ff]" />
              <span>{event.day}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} className="text-[#5773ff]" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={14} className="text-[#5773ff]" />
              <span>{event.location}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {event.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-[#eef2ff] text-[#5773ff] text-xs font-medium px-2 py-1 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

          <hr className="my-4 border-t border-gray-200" />

          <div className="flex justify-between items-center text-sm text-gray-500 font-medium">
            <span className='flex gap-1'><Armchair size={16} />{event.availableSeats} Spots Left</span>
            <span>Total {event.totalSeats} Seats</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
