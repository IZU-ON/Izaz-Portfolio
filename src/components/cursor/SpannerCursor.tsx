import React, { useEffect, useState } from 'react';

interface SpannerCursorProps {
  enabled: boolean;
}

export const SpannerCursor: React.FC<SpannerCursorProps> = ({ enabled }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [enabled, isVisible]);

  if (!enabled || !isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: `translate(-12px, -12px) scale(${isClicking ? 0.85 : 1.0}) rotate(${isClicking ? '-25deg' : '-10deg'})`,
      }}
    >
      {/* Metallic Mini-Spanner SVG */}
      <div className="relative">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]"
        >
          {/* Spanner body */}
          <path
            d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
            fill="url(#spanner-metal-grad)"
            stroke="#f59e0b"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Ring hole */}
          <circle cx="5" cy="19" r="1.5" fill="#0c0d12" stroke="#f59e0b" strokeWidth="0.8" />
          <defs>
            <linearGradient id="spanner-metal-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f8fafc" />
              <stop offset="0.45" stopColor="#94a3b8" />
              <stop offset="0.7" stopColor="#475569" />
              <stop offset="1" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
        </svg>

        {/* Small cursor precision crosshair dot */}
        <div className="absolute top-[3px] right-[3px] w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
      </div>
    </div>
  );
};
