import React from 'react';

const Logo = ({ className = "h-8", light = false }) => {
  const textColor = light ? "#ffffff" : "#0f172a";
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg 
        viewBox="0 0 160 50" 
        className="h-full w-auto" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 'onew' text */}
        <text 
          x="10" 
          y="36" 
          fontFamily="'Outfit', sans-serif" 
          fontWeight="700" 
          fontSize="26" 
          fill={textColor}
          letterSpacing="-0.5px"
        >
          onew
        </text>

        {/* Dotless 'ı' text */}
        <text 
          x="75" 
          y="36" 
          fontFamily="'Outfit', sans-serif" 
          fontWeight="700" 
          fontSize="26" 
          fill={textColor}
        >
          ı
        </text>

        {/* Custom Brand-colored Purple Dot for 'i' */}
        <circle cx="78.5" cy="15.5" r="3.5" fill="#8B55FD" />

        {/* 'nq' text */}
        <text 
          x="85" 
          y="36" 
          fontFamily="'Outfit', sans-serif" 
          fontWeight="700" 
          fontSize="26" 
          fill={textColor}
          letterSpacing="-0.5px"
        >
          nq
        </text>

        {/* Contactless Arches above 'q' */}
        <g transform="translate(114, 22) rotate(-20)" stroke="#8B55FD" strokeWidth="2.8" strokeLinecap="round" fill="none">
          {/* Inner Wave */}
          <path d="M 8,0 A 8,8 0 0,0 0,-8" />
          {/* Middle Wave */}
          <path d="M 14,0 A 14,14 0 0,0 0,-14" />
          {/* Outer Wave */}
          <path d="M 20,0 A 20,20 0 0,0 0,-20" />
        </g>
      </svg>
    </div>
  );
};

export default Logo;
