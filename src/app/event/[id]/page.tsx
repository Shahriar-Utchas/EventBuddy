'use client';

import { Armchair } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useUser } from '../../context/userContext';
import Image from 'next/image';

type Event = {
  id: string;
  title: string;
  description: string;
  longDescription: string[];
  date: string;
  day: string;
  time: string;
  location: string;
  tags: string[];
  image: string;
  totalSeats: number;
  registered: number;
  availableSeats: number;
  bookingLimitPerUser: number;
  isUpcoming: boolean;
};

const EventDetails = () => {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();

  const id = params?.id as string;
  const [event, setEvent] = useState<Event | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/events.json');
      const data = await res.json();
      const found = data.events.find((event: Event) => event.id === id);
      setEvent(found || null);
    };

    if (id) fetchData();
  }, [id]);

  const handleBooking = () => {
    if (!user) {
      router.push('/signin');
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Booking Confirmed!',
      text: `You have successfully booked ${selectedSeats} seat${selectedSeats > 1 ? 's' : ''}.`,
      confirmButtonColor: '#5b5efc',
    });
  };

  if (!event) return <div className="text-center mt-10">Loading event...</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 text-[#2d2c3c]">
      {/* Back Link */}
      <button
        onClick={() => window.history.back()}
        className="text-[#5c5cde] text-sm font-medium flex items-center gap-1 mb-4"
      >
        <span className="text-lg">←</span> Back to event
      </button>

      {/* Image */}
      <div className="relative w-full h-[350px] rounded-xl overflow-hidden mb-6">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Tags */}
      <div className="flex gap-2 mb-3">
        {event.tags.map(tag => (
          <span
            key={tag}
            className="px-2 py-1 bg-[#f1f2ff] text-[#5c5cde] text-xs font-medium rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-3xl font-semibold mb-6">{event.title}</h1>

      {/* Info Block */}
      <div className="bg-[#f8f8ff] border border-[#e5e8f9] rounded-lg p-6 flex flex-wrap justify-between items-center text-sm text-[#2d2c3c] mb-8">
        <div className="flex items-center gap-3">
          <span className="text-[#5c5cde] text-xl">📅</span>
          <div>
            <p className="text-xs text-gray-500 mb-1">Date</p>
            <p className="font-medium">{event.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#5c5cde] text-xl">🕒</span>
          <div>
            <p className="text-xs text-gray-500 mb-1">Time</p>
            <p className="font-medium">{event.time}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#5c5cde] text-xl">📍</span>
          <div>
            <p className="text-xs text-gray-500 mb-1">Location</p>
            <p className="font-medium">{event.location}</p>
          </div>
        </div>
      </div>

      {/* Seat Selection */}
      <div className="bg-[#f8f8ff] border border-[#e5e8f9] rounded-lg p-6 mb-10">
        <p className="text-base font-semibold mb-5">Select Number of Seats</p>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map(seat => (
            <button
              key={seat}
              onClick={() => setSelectedSeats(seat)}
              className={`w-full py-6 px-4 rounded-md border text-sm font-medium transition text-[#2d2c3c] flex flex-col items-center ${
                selectedSeats === seat
                  ? 'border-[#5c5cde] shadow-sm bg-white'
                  : 'border-[#e0e0f0] hover:border-[#a6a6f5]'
              }`}
            >
              <div className="text-2xl mb-2">🎟</div>
              {seat} {seat === 1 ? 'Seat' : 'Seats'}
            </button>
          ))}
        </div>

        {/* Book Button */}
        <div className="flex justify-center">
          <button
            onClick={handleBooking}
            className="bg-[#5c5cde] hover:bg-[#4a4ac4] text-white px-6 py-2 rounded-md text-sm font-medium transition"
          >
            Book {selectedSeats} {selectedSeats === 1 ? 'Seat' : 'Seats'}
          </button>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-[#f8f8ff] border border-[#e5e8f9] rounded-lg px-6 py-6 mt-10">
        <h2 className="text-lg font-semibold text-[#2d2c3c] mb-4">About this event</h2>
        <p className="text-sm text-[#6c6c84] leading-relaxed mb-4">
          {event.longDescription[0]}
        </p>
        <ul className="list-disc list-inside text-sm text-[#6c6c84] space-y-1">
          {event.longDescription.slice(2, -1).map((point, index) => (
            <li key={index}>{point.replace(/^[-•]\s*/, '')}</li>
          ))}
        </ul>
        <p className="text-sm text-[#6c6c84] leading-relaxed mt-4">
          {event.longDescription[event.longDescription.length - 1]}
        </p>
      </div>

      {/* Spots Left */}
      <div className="flex items-center gap-2 text-[#5c5cde] text-sm font-medium mt-6">
        <span className="text-lg"><Armchair /></span>
        <span>{event.availableSeats} Spots Left</span>
        <span className="text-[#b3b3cc]">({event.registered} registered)</span>
      </div>
    </div>
  );
};

export default EventDetails;
