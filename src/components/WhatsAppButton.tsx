'use client';

import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  
  // WhatsApp Business number (format: country code + number without + or spaces)
  const whatsappNumber = '919876543210'; // Replace with actual number
  const message = encodeURIComponent('Hello! I would like to inquire about your export products.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Contact us on WhatsApp"
    >
      {/* Floating Button */}
      <div className="relative">
        {/* Pulse Animation */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
        
        {/* Main Button */}
        <div className="relative w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center hover:scale-110 cursor-pointer">
          <MessageCircle className="w-7 h-7 text-white" fill="white" />
        </div>

        {/* Notification Badge */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
          <span className="text-white text-xs font-bold">1</span>
        </div>
      </div>

      {/* Tooltip */}
      {isHovered && (
        <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap animate-fade-in">
          <div className="text-sm font-semibold">Chat on WhatsApp</div>
          <div className="text-xs text-gray-300">We reply instantly!</div>
          {/* Arrow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
            <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-gray-900" />
          </div>
        </div>
      )}
    </a>
  );
}
