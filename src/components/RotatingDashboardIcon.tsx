import React, { useState } from 'react';
import { motion } from 'motion/react';

interface RotatingDashboardIconProps {
  className?: string;
  size?: number;
  isHovered?: boolean;
}

export const RotatingDashboardIcon: React.FC<RotatingDashboardIconProps> = ({
  className = "w-4 h-4 text-emerald-600 dark:text-emerald-300",
  size = 18,
  isHovered: externalHover,
}) => {
  const [internalHover, setInternalHover] = useState(false);
  const isHovered = externalHover ?? internalHover;

  return (
    <div
      onMouseEnter={() => setInternalHover(true)}
      onMouseLeave={() => setInternalHover(false)}
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
    >
      {/* 4 Disproportionate Bento-style Dashboard Boxes (Unequal sizes) */}
      {/* On hover, boxes orbit in counter-clockwise position swap:
          Bottom-Left -> Bottom-Right -> Top-Right -> Top-Left -> Bottom-Left */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xs overflow-visible"
      >
        <g>
          {/* Box 1 (Top-Left): Large Main Card (9.5x9) */}
          {/* Path: Top-Left -> Bottom-Left -> Bottom-Right -> Top-Right -> Top-Left */}
          <motion.rect
            x="2.5"
            y="2.5"
            width="9.5"
            height="9"
            rx="2.2"
            className="fill-current"
            animate={
              isHovered
                ? {
                    x: [0, 0, 13, 11.5, 0],
                    y: [0, 11, 11, 0, 0],
                  }
                : { x: 0, y: 0 }
            }
            transition={
              isHovered
                ? {
                    duration: 2.0,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
                : { duration: 0.3 }
            }
          />

          {/* Box 2 (Top-Right): Narrow Tall Card (7.5x9) */}
          {/* Path: Top-Right -> Top-Left -> Bottom-Left -> Bottom-Right -> Top-Right */}
          <motion.rect
            x="14"
            y="2.5"
            width="7.5"
            height="9"
            rx="2"
            className="fill-current"
            animate={
              isHovered
                ? {
                    x: [0, -11.5, -11.5, 1.5, 0],
                    y: [0, 0, 11, 11, 0],
                  }
                : { x: 0, y: 0 }
            }
            transition={
              isHovered
                ? {
                    duration: 2.0,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
                : { duration: 0.3 }
            }
          />

          {/* Box 3 (Bottom-Left): Wide Horizontal Card (11x8) */}
          {/* Path: Bottom-Left -> Bottom-Right -> Top-Right -> Top-Left -> Bottom-Left */}
          <motion.rect
            x="2.5"
            y="13.5"
            width="11"
            height="8"
            rx="2"
            className="fill-current"
            animate={
              isHovered
                ? {
                    x: [0, 13, 11.5, 0, 0],
                    y: [0, 0, -11, -11, 0],
                  }
                : { x: 0, y: 0 }
            }
            transition={
              isHovered
                ? {
                    duration: 2.0,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
                : { duration: 0.3 }
            }
          />

          {/* Box 4 (Bottom-Right): Compact Small Card (6x8) */}
          {/* Path: Bottom-Right -> Top-Right -> Top-Left -> Bottom-Left -> Bottom-Right */}
          <motion.rect
            x="15.5"
            y="13.5"
            width="6"
            height="8"
            rx="1.8"
            className="fill-current"
            animate={
              isHovered
                ? {
                    x: [0, -1.5, -13, -13, 0],
                    y: [0, -11, -11, 0, 0],
                  }
                : { x: 0, y: 0 }
            }
            transition={
              isHovered
                ? {
                    duration: 2.0,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
                : { duration: 0.3 }
            }
          />
        </g>
      </svg>
    </div>
  );
};
