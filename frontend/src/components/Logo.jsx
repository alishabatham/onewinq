import React from 'react';

const Logo = ({ className = "h-8", light = false }) => {
  const textColor = light ? "text-white" : "text-slate-900";
  
  return (
    <div className={`inline-flex items-center space-x-2.5 select-none ${className}`}>
      {/* Icon: Purple gradient rounded box with 'W' */}
      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#6344F5] to-indigo-600 flex items-center justify-center shadow-md shadow-[#6344F5]/25">
        <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
          <path d="M3.5 6L8.5 18L12 9.5L15.5 18L20.5 6H17.5L15.5 13.5L12 6L8.5 13.5L6.5 6H3.5Z" />
        </svg>
      </div>

      {/* Brand Text */}
      <span className={`text-xl font-extrabold tracking-tight ${textColor} font-sans`}>
        One<span className="text-[#6344F5]">Winq</span>
      </span>
    </div>
  );
};

export default Logo;
