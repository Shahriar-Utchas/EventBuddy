'use client';

import { Search } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Hero = () => {
  return (
    <div className="h-[500px] flex flex-col items-center justify-start pt-24 text-center px-4 relative overflow-hidden bg-gradient-to-b from-white to-[#a2a7e3]">

      {/* Background Ellipses */}
      <div className="absolute top-[25%] left-0 w-screen h-auto opacity-80 z-0 pointer-events-none">
        <Image
          src="/images/Ellipse 739.png"
          alt="Ellipse 2"
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute top-[50%] left-0 w-screen h-auto opacity-70 z-0 pointer-events-none">
        <Image
          src="/images/Ellipse 740.png"
          alt="Ellipse 3"
          fill
          className="object-cover"
        />
      </div>

      {/* LEFT Star */}
      <div className="absolute top-[30%] md:top-[58%] left-[5%] z-0 animate-pulse pointer-events-none">
        <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <g fill="white" fillOpacity="0.9">
            <path
              d="M60 38 C60 50, 68 60, 82 60 C68 60, 60 72, 60 82 C60 72, 52 60, 38 60 C52 60, 60 50, 60 38Z"
            />
            <rect x="59.25" y="0" width="1.5" height="120" className="opacity-50" />
            <rect x="0" y="59.25" width="120" height="1.5" className="opacity-50" />
          </g>
        </svg>
      </div>

      {/* RIGHT Star */}
      <div className="absolute top-[30%] md:top-[58%] right-[5%] z-0 animate-pulse pointer-events-none">
        <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <g fill="white" fillOpacity="0.9">
            <path
              d="M60 38 C60 50, 68 60, 82 60 C68 60, 60 72, 60 82 C60 72, 52 60, 38 60 C52 60, 60 50, 60 38Z"
            />
            <rect x="59.25" y="0" width="1.5" height="120" className="opacity-50" />
            <rect x="0" y="59.25" width="120" height="1.5" className="opacity-50" />
          </g>
        </svg>
      </div>

      {/* Hero Title */}
      <div className="relative flex items-center justify-center w-full mb-4 z-10">
        <div className="absolute -left-6 sm:-left-2 md:top-10 transform -translate-y-1/2 w-32 sm:w-68 drop-shadow-md">
          <Image
            src="/images/Right-ticket.png"
            alt="Ticket Left"
            width={128}
            height={128}
            className="w-full h-auto"
          />
        </div>
        <h1 className="font-semibold text-[#2a235e] z-10 -mt-12 mb-8">
          <p className="text-[40px] sm:text-[60px] md:text-[80px] leading-tight">Discover</p>
          <span className="text-[#5773ff] text-[40px] sm:text-[60px] md:text-[80px] leading-tight">Amazing</span>
          <span className="text-[40px] sm:text-[60px] md:text-[80px] leading-tight"> Events</span>
        </h1>
        <div className="absolute -top-10 -right-6 sm:-right-2 md:top-1/2 transform -translate-y-1/2 w-32 sm:w-62 drop-shadow-md">
          <Image
            src="/images/Left-ticket.png"
            alt="Ticket Right"
            width={128}
            height={128}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Subtitle */}
      <p className="max-w-[90%] sm:max-w-[70%] md:max-w-[60%] text-[#3d3d66] text-sm sm:text-base md:text-lg font-semibold -mt-6 z-10">
        Find and book events that match your interests. From tech conferences to music festivals, we've got you covered.
      </p>

      {/* Search Section Title */}
      <p className="max-w-[90%] sm:max-w-[70%] md:max-w-[60%] text-[#3d3d66] text-sm sm:text-base md:text-lg font-semibold mt-6 mb-6 z-10">
        Find your next event
      </p>

      {/* Search Section */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full px-4 z-10">
        <div className="flex items-center bg-white/40 backdrop-blur-md px-4 py-3 rounded-md w-full sm:w-96 max-w-md border border-[#cccccc]">
          <Search className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search events"
            className="flex-1 bg-transparent text-gray-700 focus:outline-none"
          />
        </div>
        <button className="w-full sm:w-auto px-6 py-3 text-white font-semibold shadow-md hover:brightness-110 transition rounded-md bg-[linear-gradient(to_bottom,_#a288ff_0%,_#5773ff_15%,_#5773ff_100%)]">
          Search Events
        </button>
      </div>

      {/* Hash Grid Overlay */}
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[80%] h-[220px] z-0 pointer-events-none opacity-30"
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          maskImage:
            'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
        }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffffcc" strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
