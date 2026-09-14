import React from 'react';
import logoSrc from '../assets/aioneix.png';

export default function AoneixLogo({ className = "h-8", variant = "default", style }) {
  // 'white' variant inverts the green logo to white for dark backgrounds (footer)
  const isWhite = variant === "white";

  return (
    <div className={`flex items-center justify-center select-none cursor-pointer ${className}`} style={style}>
      <img
        src={logoSrc}
        alt="Aoneix"
        className={`h-full max-h-full w-auto object-contain ${isWhite ? 'brightness-0 invert' : ''}`}
        style={style?.height ? { height: style.height, maxHeight: style.height } : undefined}
        draggable={false}
      />
    </div>
  );
}
