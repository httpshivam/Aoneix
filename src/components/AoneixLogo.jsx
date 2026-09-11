import React from 'react';
import logoSrc from '../assets/aioneix.png';

export default function AoneixLogo({ className = "h-8", variant = "default" }) {
  // 'white' variant inverts the green logo to white for dark backgrounds (footer)
  const isWhite = variant === "white";

  return (
    <div className={`flex items-center select-none cursor-pointer ${className}`}>
      <img
        src={logoSrc}
        alt="Aoneix"
        className={`h-full w-auto object-contain ${isWhite ? 'brightness-0 invert' : ''}`}
        draggable={false}
      />
    </div>
  );
}
