import React, { useEffect, useRef, useState, memo } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface HeroVideoBackgroundProps {
  mouseX: any;
  mouseY: any;
}

// Videos live in /public/videos so Vite serves them identically in dev,
// prod build, and any AI Studio preview mode — no server-side static
// route or path-guessing needed.
const VIDEO_A_SRC = '/videos/borsa.mp4';
const VIDEO_B_SRC = '/videos/borsa3.mp4';

// Feature detection for low-end devices
const checkIsLowEndDevice = () => {
  if (typeof navigator === 'undefined') return false;
  
  // Check device memory (if < 4GB)
  const mem = (navigator as any).deviceMemory;
  if (mem && mem < 4) return true;
  
  // Check CPU cores (if < 4 cores)
  const cores = navigator.hardwareConcurrency;
  if (cores && cores < 4) return true;
  
  // Check connection speed
  const conn = (navigator as any).connection;
  if (conn) {
    if (conn.saveData) return true;
    if (['slow-2g', '2g', '3g'].includes(conn.effectiveType)) return true;
  }
  
  return false;
};

export const HeroVideoBackground: React.FC<HeroVideoBackgroundProps> = memo(({ mouseX, mouseY }) => {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 1000], [1.03, 1.00]);

  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const [videoAError, setVideoAError] = useState(false);
  const [videoBError, setVideoBError] = useState(false);

  // Active crossfade video state
  const [activeVideo, setActiveVideo] = useState<'A' | 'B'>('A');

  const containerRef = useRef<HTMLDivElement>(null);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Screen resize & reduced motion & device detection
  useEffect(() => {
    setIsLowEndDevice(checkIsLowEndDevice());
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);
    window.addEventListener('resize', checkMobile);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Intersection Observer for viewport visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 } // Trigger as soon as 1px is visible/hidden
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Flawless Video Sequencer for Crossfading
  const activeVideoRef = useRef(activeVideo);
  activeVideoRef.current = activeVideo;

  useEffect(() => {
    if (prefersReducedMotion || isLowEndDevice || !isVisible) {
      if (!isVisible) {
        videoARef.current?.pause();
        videoBRef.current?.pause();
      }
      return;
    }

    const playSafe = async (video: HTMLVideoElement | null) => {
      if (!video) return;
      try {
        if (video.paused) {
          video.muted = true;
          await video.play();
        }
      } catch (err) {
        console.warn('Video play constrained:', err);
      }
    };

    // Ensure currently active video is playing
    if (activeVideoRef.current === 'A') {
      playSafe(videoARef.current);
    } else {
      playSafe(videoBRef.current);
    }

    let step2Timer: NodeJS.Timeout;
    let step3Timer: NodeJS.Timeout;

    // Sequence loop function
    const runSequence = () => {
      // Transition from A to B
      if (activeVideoRef.current === 'A') {
        // Step 1: Pre-play B so it spins up before opacity transition
        playSafe(videoBRef.current);
        
        // Step 2: Trigger Opacity transition after video B has 300ms to decode frames
        step2Timer = setTimeout(() => {
          setActiveVideo('B');
          
          // Step 3: Pause A after transition completes (4500ms)
          step3Timer = setTimeout(() => {
            if (isVisible) videoARef.current?.pause();
          }, 4500);
        }, 300);
      } 
      // Transition from B to A
      else {
        // Step 1: Pre-play A
        playSafe(videoARef.current);
        
        // Step 2: Trigger Opacity transition
        step2Timer = setTimeout(() => {
          setActiveVideo('A');
          
          // Step 3: Pause B after transition completes
          step3Timer = setTimeout(() => {
            if (isVisible) videoBRef.current?.pause();
          }, 4500);
        }, 300);
      }
    };

    const interval = setInterval(runSequence, 12500);

    return () => {
      clearInterval(interval);
      clearTimeout(step2Timer);
      clearTimeout(step3Timer);
    };
  }, [prefersReducedMotion, isLowEndDevice, isVisible]);

  const handleVideoAError = () => setVideoAError(true);
  const handleVideoBError = () => setVideoBError(true);

  // LAYER 2: HTML Canvas AI Network
  useEffect(() => {
    if (isLowEndDevice || prefersReducedMotion) return; // Disable canvas on low-end or reduced motion
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Node count based on screen size
    const nodeCount = isMobile ? 22 : 42;
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number; pulse: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 1,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const render = () => {
      if (!isVisible) {
        // Pause animation when out of view
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      
      ctx.clearRect(0, 0, width, height);

      // Draw nodes and constellation connections
      const maxDistance = isMobile ? 100 : 150;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.02;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const opacity = (1 - dist / maxDistance) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        // Draw node points
        const currentRadius = node.radius + Math.sin(node.pulse) * 0.4;
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(129, 140, 248, 0.25)';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile, prefersReducedMotion, isLowEndDevice, isVisible]);

  // Parallax motion transforms
  const parallaxX1 = useTransform(mouseX, [0, 1], isMobile ? ['0%', '0%'] : ['-1%', '1%']);
  const parallaxY1 = useTransform(mouseY, [0, 1], isMobile ? ['0%', '0%'] : ['-1%', '1%']);

  const x = useTransform(mouseX, [0, 1], isMobile ? ['0%', '0%'] : ['-8px', '8px']);
  const y = useTransform(mouseY, [0, 1], isMobile ? ['0%', '0%'] : ['-8px', '8px']);

  const targetOpacity = 0.72; // Increased from 0.28 so video motion is vibrant and visible
  const videoFilter = 'brightness(0.85) contrast(1.10) saturate(0.98)'; // Clear, natural, high-end look

  const allVideosFailed = videoAError && (videoBError || isLowEndDevice);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#F6F8FC] dark:bg-[#060608] select-none">
      
      {/* LAYER 1: Market Videos (Stacked & Infinite Crossfading) */}
      {!allVideosFailed && (
        <motion.div
          style={{ scale, x, y }}
          className="absolute inset-[-4%] w-[108%] h-[108%] will-change-transform z-0"
        >
          {/* Video A */}
          {!videoAError && (
            <video
              ref={videoARef}
              muted
              loop
              playsInline
              preload="auto"
              onError={handleVideoAError}
              className="absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out pointer-events-none"
              style={{
                transitionDuration: '4500ms',
                opacity: activeVideo === 'A' ? targetOpacity : 0,
                filter: videoFilter,
                transform: 'translate3d(0,0,0)',
                willChange: 'opacity, transform',
              }}
              src={VIDEO_A_SRC}
            />
          )}

          {/* Video B - Do not mount on low-end devices */}
          {!isLowEndDevice && !videoBError && (
            <video
              ref={videoBRef}
              muted
              loop
              playsInline
              preload="auto"
              onError={handleVideoBError}
              className="absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out pointer-events-none"
              style={{
                transitionDuration: '4500ms',
                opacity: activeVideo === 'B' ? targetOpacity : 0,
                filter: videoFilter,
                transform: 'translate3d(0,0,0)',
                willChange: 'opacity, transform',
              }}
              src={VIDEO_B_SRC}
            />
          )}
        </motion.div>
      )}

      {/* FALLBACK: Premium FinTech Gradient Canvas if videos cannot load */}
      {allVideosFailed && (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 opacity-90 animate-pulse" />
      )}

      {/* DIRECTIONAL BLUR MASKS (Left: Soft blur for editorial text | Right: Crystal clear graph area) */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0) 70%)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0) 70%)',
        }}
      />

      {/* LAYER 2: HTML Canvas AI Network (Animated Nodes & Moving Particles) */}
      {!isLowEndDevice && !prefersReducedMotion && (
        <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.14]">
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
      )}

      {/* LAYER 3: Glass Light Sweep (Subtle luxury sheen sweeping every 20s) */}
      {!isMobile && !prefersReducedMotion && !isLowEndDevice && (
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay"
          style={{
            background:
              'linear-gradient(125deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.02) 40%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.02) 60%, rgba(255,255,255,0) 100%)',
            width: '220%',
            height: '220%',
            top: '-60%',
            left: '-60%',
          }}
          animate={{
            x: ['-60%', '60%'],
            y: ['-60%', '60%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
            repeatDelay: 2,
          }}
        />
      )}

      {/* LAYER 4: Overlay Gradient (Exact level specification for maximum video visibility + text contrast) */}
      {/* Vertical Overlay (Top: 0.25, Center: 0.18, Bottom: 0.40) */}
      <div
        className="absolute inset-0 z-20 dark:hidden pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(246,248,252,0.35) 0%, rgba(246,248,252,0.20) 50%, rgba(246,248,252,0.45) 100%)',
        }}
      />
      <div
        className="absolute inset-0 z-20 hidden dark:block pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0.40) 100%)',
        }}
      />

      {/* Horizontal Soft Text Vignette for Editorial Legibility (Left side subtle 0.22 -> 0.0) */}
      <div
        className="absolute inset-0 z-20 hidden dark:block pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(6,9,15,0.32) 0%, rgba(6,9,15,0.15) 40%, rgba(6,9,15,0.0) 80%)',
        }}
      />
      <div
        className="absolute inset-0 z-20 dark:hidden pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(246,248,252,0.35) 0%, rgba(246,248,252,0.15) 40%, rgba(246,248,252,0.0) 80%)',
        }}
      />

      {/* Right Side Soft Blue/Indigo Ambient Glow */}
      <motion.div
        className="absolute top-0 right-0 w-[750px] h-[750px] rounded-full z-10 pointer-events-none translate-x-[20%] translate-y-[-10%]"
        style={{
          x: parallaxX1,
          y: parallaxY1,
          background: 'radial-gradient(circle, rgba(59,130,246,0.14) 0%, rgba(59,130,246,0) 70%)',
          filter: 'blur(90px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Bottom Seamless Gradient Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#F6F8FC] via-[#F6F8FC]/60 to-transparent dark:from-[#060608] dark:via-[#060608]/60 dark:to-transparent z-30 pointer-events-none" />
    </div>
  );
});

HeroVideoBackground.displayName = 'HeroVideoBackground';

