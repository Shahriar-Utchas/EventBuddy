import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#f5f7ff] py-6">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center flex-col gap-2 md:flex-row">
        <div className="flex items-center space-x-2 text-[#2a235e] font-bold text-lg">
            <img src="/images/logo.png" alt="" />
          <span>Event buddy.</span>
        </div>

        {/* Navigation links */}
        <div className="flex space-x-6 text-sm text-[#2a235e]">
          <a href="#">Home</a>
          <a href="#">Sign in</a>
          <a href="#">Sign up</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-200 my-4 mx-16" />

      {/* Bottom copyright */}
      <div className="text-center text-xs text-gray-600 mt-2">
        © 2025 Event buddy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
