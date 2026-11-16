import React, { useRef, useEffect } from 'react';

export const HeroInteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let time = 0;
    
    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const resizeCanvas = () => {
      if (!canvas.parentElement) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = canvas.parentElement.clientWidth * dpr;
      canvas.height = canvas.parentElement.clientHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    setTimeout(resizeCanvas, 100);
    window.addEventListener('resize', resizeCanvas);

    interface Point3D { x: number, y: number, z: number, angle: number, radius: number, speed: number, yOffset: number, sizeMultiplier: number }

    // Increased point count slightly for better volume, while keeping it optimized
    const numPoints = window.innerWidth < 768 ? 350 : 900;
    const points: Point3D[] = [];
    
    for (let i = 0; i < numPoints; i++) {
      const radius = Math.random() * 1200 + 50; // Spread out more
      const angle = Math.random() * Math.PI * 2;
      const yOffset = (Math.random() - 0.5) * 500; // Thicker vortex
      
      points.push({
        x: Math.cos(angle) * radius,
        y: yOffset,
        z: Math.sin(angle) * radius,
        angle: angle,
        radius: radius,
        speed: (Math.random() * 0.005 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
        yOffset: yOffset,
        sizeMultiplier: Math.random() * 1.5 + 0.5 // Varied particle sizes
      });
    }

    const draw = () => {
      const isDark = document.documentElement.classList.contains('dark');
      const width = canvas.parentElement?.clientWidth || canvas.width;
      const height = canvas.parentElement?.clientHeight || canvas.height;
      
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      time += prefersReduced ? 0.001 : 0.003; 
      
      // More responsive mouse tracking
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      // EXAGGERATED TILT AND ROTATION for obvious interactivity
      const tiltX = Math.PI * 0.25 + mouseY * 0.4; 
      const tiltY = time * 0.2 + mouseX * 0.6; 

      const focalLength = 1000;
      const centerX = width * 0.5;
      const centerY = height * 0.5; // Center it better behind the text

      const cosTiltY = Math.cos(tiltY);
      const sinTiltY = Math.sin(tiltY);
      const cosTiltX = Math.cos(tiltX);
      const sinTiltX = Math.sin(tiltX);

      points.forEach(p => {
        if (!prefersReduced) {
          p.angle += p.speed;
          p.x = Math.cos(p.angle) * p.radius;
          p.z = Math.sin(p.angle) * p.radius;
        }

        const wave = Math.sin(p.radius * 0.01 - time * 2) * 60;
        const currentY = p.yOffset + wave;

        const x1 = p.x * cosTiltY - p.z * sinTiltY;
        const z1 = p.x * sinTiltY + p.z * cosTiltY;
        
        const y2 = currentY * cosTiltX - z1 * sinTiltX;
        const z2 = currentY * sinTiltX + z1 * cosTiltX;

        const zOff = z2 + 1200; 
        if (zOff <= 0) return;

        const scale = focalLength / zOff;
        const px = centerX + x1 * scale;
        const py = centerY + y2 * scale;

        // Increased base opacity for much higher visibility
        const alpha = Math.min(1, Math.max(0.15, scale * 1.2));
        
        if (isDark) {
          ctx.fillStyle = p.radius < 400 
            ? `rgba(96, 165, 250, ${alpha})` // Brighter blue
            : `rgba(129, 140, 248, ${alpha * 0.8})`; // Brighter indigo
        } else {
          ctx.fillStyle = p.radius < 400 
            ? `rgba(79, 70, 229, ${alpha})` // Deep indigo
            : `rgba(59, 130, 246, ${alpha * 0.7})`; // Solid blue
        }
        
        // Increased overall size
        const size = Math.max(1, (scale * p.sizeMultiplier * (p.radius < 400 ? 3.5 : 2.0)));
        
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (animationFrameId === null) draw();
      } else {
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      }
    });
    
    if (canvas.parentElement) observer.observe(canvas.parentElement);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#F6F8FC] dark:bg-[#060608]">
      {/* Reduced the opacity of the center mask so the vortex shines through the text */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.6)_0%,transparent_50%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.1)_0%,transparent_50%)] z-10" />
      
      <canvas 
        ref={canvasRef} 
        className="w-full h-full relative z-0"
      />
      
      {/* Reduced vignette so the outer particles don't disappear too early */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#F6F8FC_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_20%,#060608_100%)] opacity-60 z-10" />
      
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F6F8FC] dark:from-[#060608] to-transparent z-10" />
    </div>
  );
};
