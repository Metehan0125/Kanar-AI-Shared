import React from 'react';
import { motion } from 'motion/react';

interface AnimatedIconProps {
  className?: string;
  size?: number;
  isHovered?: boolean;
}

/**
 * 1. Animated Landmark (TEFAS Fon Analitiği)
 * Pillars elevate sequentially & roof lifts on hover.
 */
export const AnimatedLandmarkIcon: React.FC<AnimatedIconProps> = ({
  className = "w-4 h-4",
  size = 18,
  isHovered = false,
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full overflow-visible"
      >
        {/* Roof pediment */}
        <motion.path
          d="M3 10L12 3L21 10"
          animate={
            isHovered
              ? { y: [-1, -3, -1], stroke: ['currentColor', '#10b981', 'currentColor'] }
              : { y: 0 }
          }
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Base */}
        <path d="M2 21H22" />
        <path d="M4 18H20" />

        {/* Pillar 1 */}
        <motion.line
          x1="6"
          y1="10"
          x2="6"
          y2="18"
          animate={isHovered ? { y2: [18, 14, 18], strokeWidth: [2, 2.5, 2] } : { y2: 18 }}
          transition={{ duration: 1.0, repeat: Infinity, delay: 0.0 }}
        />
        {/* Pillar 2 */}
        <motion.line
          x1="10"
          y1="10"
          x2="10"
          y2="18"
          animate={isHovered ? { y2: [18, 13, 18], strokeWidth: [2, 2.5, 2] } : { y2: 18 }}
          transition={{ duration: 1.0, repeat: Infinity, delay: 0.2 }}
        />
        {/* Pillar 3 */}
        <motion.line
          x1="14"
          y1="10"
          x2="14"
          y2="18"
          animate={isHovered ? { y2: [18, 14, 18], strokeWidth: [2, 2.5, 2] } : { y2: 18 }}
          transition={{ duration: 1.0, repeat: Infinity, delay: 0.4 }}
        />
        {/* Pillar 4 */}
        <motion.line
          x1="18"
          y1="10"
          x2="18"
          y2="18"
          animate={isHovered ? { y2: [18, 13, 18], strokeWidth: [2, 2.5, 2] } : { y2: 18 }}
          transition={{ duration: 1.0, repeat: Infinity, delay: 0.6 }}
        />
      </svg>
    </div>
  );
};

/**
 * 2. Animated Shield Alert (AI Stres Testi)
 * Shield pulses aura, exclamation point vibrates/bounces on hover.
 */
export const AnimatedShieldAlertIcon: React.FC<AnimatedIconProps> = ({
  className = "w-4 h-4",
  size = 18,
  isHovered = false,
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full overflow-visible"
      >
        {/* Outer Shield Outline */}
        <motion.path
          d="M20 13C20 18 12 22 12 22C12 22 4 18 4 13V6L12 2L20 6V13Z"
          animate={
            isHovered
              ? {
                  scale: [1, 1.06, 1],
                  stroke: ['currentColor', '#a855f7', 'currentColor'],
                }
              : { scale: 1 }
          }
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Exclamation Mark Bar */}
        <motion.line
          x1="12"
          y1="8"
          x2="12"
          y2="12"
          animate={
            isHovered
              ? {
                  y: [0, -1.5, 0],
                  stroke: ['currentColor', '#ec4899', 'currentColor'],
                }
              : { y: 0 }
          }
          transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Exclamation Dot */}
        <motion.circle
          cx="12"
          cy="16"
          r="0.8"
          fill="currentColor"
          animate={
            isHovered
              ? {
                  scale: [1, 1.6, 1],
                  fill: ['currentColor', '#ec4899', 'currentColor'],
                }
              : { scale: 1 }
          }
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
        />
      </svg>
    </div>
  );
};

/**
 * 3. Animated Bar Chart (Benchmark & Karşılaştırma)
 * Bars bounce continuously like active trading metrics on hover.
 */
export const AnimatedBarChartIcon: React.FC<AnimatedIconProps> = ({
  className = "w-4 h-4",
  size = 18,
  isHovered = false,
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full overflow-visible"
      >
        {/* Baseline */}
        <path d="M3 20H21" />

        {/* Bar 1 */}
        <motion.line
          x1="6"
          y1="20"
          x2="6"
          y2="14"
          animate={isHovered ? { y2: [14, 8, 16, 14] } : { y2: 14 }}
          transition={{ duration: 1.0, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Bar 2 */}
        <motion.line
          x1="12"
          y1="20"
          x2="12"
          y2="8"
          animate={isHovered ? { y2: [8, 16, 5, 8] } : { y2: 8 }}
          transition={{ duration: 1.0, repeat: Infinity, delay: 0.2, ease: 'easeInOut' }}
        />

        {/* Bar 3 */}
        <motion.line
          x1="18"
          y1="20"
          x2="18"
          y2="11"
          animate={isHovered ? { y2: [11, 4, 15, 11] } : { y2: 11 }}
          transition={{ duration: 1.0, repeat: Infinity, delay: 0.4, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
};

/**
 * 4. Animated Radio (Piyasa Duyarlılığı & Sentiment)
 * Concentric radio signal waves pulse outwards on hover.
 */
export const AnimatedRadioIcon: React.FC<AnimatedIconProps> = ({
  className = "w-4 h-4",
  size = 18,
  isHovered = false,
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full overflow-visible"
      >
        {/* Center dot */}
        <motion.circle
          cx="12"
          cy="12"
          r="2"
          fill="currentColor"
          animate={
            isHovered
              ? { scale: [1, 1.4, 1], fill: ['currentColor', '#f43f5e', 'currentColor'] }
              : { scale: 1 }
          }
          transition={{ duration: 0.8, repeat: Infinity }}
        />

        {/* Inner Wave Arcs */}
        <motion.path
          d="M4.93 19.07A10 10 0 0 1 4.93 4.93"
          animate={
            isHovered
              ? { opacity: [0.3, 1, 0.3], scale: [0.95, 1.05, 0.95] }
              : { opacity: 1, scale: 1 }
          }
          transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
        />
        <motion.path
          d="M19.07 4.93a10 10 0 0 1 0 14.14"
          animate={
            isHovered
              ? { opacity: [0.3, 1, 0.3], scale: [0.95, 1.05, 0.95] }
              : { opacity: 1, scale: 1 }
          }
          transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
        />

        {/* Inner Small Arcs */}
        <motion.path
          d="M8.46 15.54a5 5 0 0 1 0-7.07"
          animate={
            isHovered
              ? { opacity: [1, 0.3, 1], scale: [1, 0.9, 1] }
              : { opacity: 1, scale: 1 }
          }
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
        />
        <motion.path
          d="M15.54 8.46a5 5 0 0 1 0 7.07"
          animate={
            isHovered
              ? { opacity: [1, 0.3, 1], scale: [1, 0.9, 1] }
              : { opacity: 1, scale: 1 }
          }
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
        />
      </svg>
    </div>
  );
};

/**
 * 5. Animated Notebook Pen (Notlar & Planlama)
 * Pen scribbles horizontally over lines on hover.
 */
export const AnimatedNotebookPenIcon: React.FC<AnimatedIconProps> = ({
  className = "w-4 h-4",
  size = 18,
  isHovered = false,
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full overflow-visible"
      >
        {/* Notebook Body */}
        <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
        
        {/* Lines */}
        <motion.line
          x1="8"
          y1="7"
          x2="12"
          y2="7"
          animate={isHovered ? { x2: [12, 16, 12] } : { x2: 12 }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
        <motion.line
          x1="8"
          y1="11"
          x2="16"
          y2="11"
          animate={isHovered ? { x2: [16, 12, 16] } : { x2: 16 }}
          transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
        />
        <motion.line
          x1="8"
          y1="15"
          x2="13"
          y2="15"
          animate={isHovered ? { x2: [13, 15, 13] } : { x2: 13 }}
          transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
        />

        {/* Writing Pen */}
        <motion.path
          d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
          animate={
            isHovered
              ? {
                  x: [0, 2, -1, 3, 0],
                  y: [0, -1, 1, 0, 0],
                  rotate: [0, 5, -3, 0],
                  stroke: ['currentColor', '#f59e0b', 'currentColor'],
                }
              : { x: 0, y: 0, rotate: 0 }
          }
          transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
};
