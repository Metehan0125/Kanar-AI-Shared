import React from 'react';

export const LiquidBubbles: React.FC = () => {
  // Generate a few stable bubbles with random-looking CSS variables
  const bubbles = Array.from({ length: 6 }).map((_, i) => {
    // Determine random-like properties based on index
    const size = 3 + (i % 3); // 3px, 4px, 5px (smaller to prevent clipping)
    const duration = 2.5 + (i * 0.5); // slightly slower & smoother
    const delay = i * 0.8; // Staggered delays
    const wobbleDuration = 1.5 + (i % 2); // smooth wobble
    const wobbleDev = 1 + (i % 2); // 1px, 2px (prevents top/bottom edge clipping)
    const maxOpacity = 0.4 + ((i % 3) * 0.2); // softer opacity


    return (
      <div
        key={i}
        className="liquid-bubble"
        style={{
          '--b-size': `${size}px`,
          '--b-dur': `${duration}s`,
          '--b-del': `${delay}s`,
          '--b-wob': `${wobbleDuration}s`,
          '--b-dev': `${wobbleDev}px`,
          '--b-max-op': maxOpacity,
        } as React.CSSProperties}
      />
    );
  });

  return (
    <div className="absolute inset-0 pointer-events-none liquid-bar-container">
      {bubbles}
    </div>
  );
};
