import React from 'react';
import blackLogoImg from '../assets/onewinq black logo.png';

const Logo = ({ className = "h-9 sm:h-10", light = false }) => {
  return (
    <div className={`inline-flex items-center shrink-0 select-none ${className}`}>
      <img 
        src={blackLogoImg} 
        alt="OneWinq Logo" 
        className={`h-full w-auto object-contain ${light ? 'brightness-0 invert' : ''}`}
      />
    </div>
  );
};

export default Logo;
