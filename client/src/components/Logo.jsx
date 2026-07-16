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
        <g transform="translate(118, 5)" stroke="#8B55FD" strokeWidth="2.5" strokeLinecap="round">
          {/* Inner Arc */}
          <path d="M2.5 16.5 C3.8 14.5, 6.2 14.5, 7.5 16.5" />
          {/* Middle Arc */}
          <path d="M-0.5 11.5 C2.5 7.5, 8.5 7.5, 11.5 11.5" />
          {/* Outer Arc */}
          <path d="M-3.5 6.5 C1.0 0.5, 12.0 0.5, 16.5 6.5" />
        </g>
      </svg>
    </div>
  );
};

export default Logo;
