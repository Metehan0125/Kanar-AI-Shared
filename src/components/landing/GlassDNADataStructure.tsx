import React, { useRef, useEffect } from 'react';
import { useInView } from 'motion/react';

export const GlassDNADataStructure: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { margin: "-20%" });
  const inViewRef = useRef(inView);

  useEffect(() => {
    inViewRef.current = inView;
  }, [inView]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let time = 0;

    const resizeCanvas = () => {
      if (!canvas.parentElement) return;
      // OPTIMIZATION: Cap DPR at 1.25. High resolution isn't needed for soft glass and saves 4x pixels.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = canvas.parentElement.clientWidth * dpr;
      canvas.height = canvas.parentElement.clientHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    setTimeout(resizeCanvas, 100);
    window.addEventListener('resize', resizeCanvas);

    interface Point3D { x: number, y: number, z: number }
    interface Quad {
      points: Point3D[];
      zIndex: number;
      normal: Point3D;
      t: number;
    }

    function rotate3D(p: Point3D, rx: number, ry: number, rz: number): Point3D {
      let x1 = p.x * Math.cos(rz) - p.y * Math.sin(rz);
      let y1 = p.x * Math.sin(rz) + p.y * Math.cos(rz);
      let z1 = p.z;
      
      let x2 = x1 * Math.cos(ry) + z1 * Math.sin(ry);
      let y2 = y1;
      let z2 = -x1 * Math.sin(ry) + z1 * Math.cos(ry);
      
      let x3 = x2;
      let y3 = y2 * Math.cos(rx) - z2 * Math.sin(rx);
      let z3 = y2 * Math.sin(rx) + z2 * Math.cos(rx);
      
      return { x: x3, y: y3, z: z3 };
    }

    const draw = () => {
      const isDark = document.documentElement.classList.contains('dark');
      const width = canvas.parentElement?.clientWidth || canvas.width;
      const height = canvas.parentElement?.clientHeight || canvas.height;
      
      ctx.clearRect(0, 0, width, height);
      
      ctx.globalCompositeOperation = isDark ? 'screen' : 'source-over';

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      time += prefersReduced ? 0.0005 : 0.004; 

      // OPTIMIZATION: Reduce plate density. Maintains the block look but halves rendering cost.
      const numPlates = window.innerWidth < 768 ? 90 : 180; 
      const plateWidth = Math.min(width * 0.22, 280); 
      const plateHeight = 6.5; 
      
      const quads: Quad[] = [];
      const startX = -width * 0.15;
      const endX = width * 1.15;

      for (let i = 0; i < numPlates; i++) {
        const t = i / numPlates;
        
        const x = startX + t * (endX - startX);
        const yOff = Math.sin(t * Math.PI * 1.5 - time * 0.6) * height * 0.35;
        const y = height * 0.5 + yOff;
        const z = Math.cos(t * Math.PI * 1.5 - time * 0.6) * 250;

        const rx = Math.sin(t * Math.PI * 2 + time * 0.2) * 0.3;
        const ry = Math.cos(t * Math.PI * 2 + time * 0.2) * 0.3;
        const rz = t * Math.PI * 3 + time * 0.8; 

        const corners = [
          {x: -plateWidth/2, y: -plateHeight/2, z: 0},
          {x:  plateWidth/2, y: -plateHeight/2, z: 0},
          {x:  plateWidth/2, y:  plateHeight/2, z: 0},
          {x: -plateWidth/2, y:  plateHeight/2, z: 0}
        ];

        const rotatedCorners = corners.map(c => rotate3D(c, rx, ry, rz)).map(c => ({
          x: c.x + x,
          y: c.y + y,
          z: c.z + z
        }));

        const normal = rotate3D({x: 0, y: 0, z: 1}, rx, ry, rz);
        const zIndex = (rotatedCorners[0].z + rotatedCorners[1].z + rotatedCorners[2].z + rotatedCorners[3].z) / 4;

        quads.push({
          points: rotatedCorners,
          zIndex,
          normal,
          t
        });
      }

      quads.sort((a, b) => a.zIndex - b.zIndex);

      const focalLength = 1200;
      const project = (p: Point3D) => {
        const scale = focalLength / (focalLength - p.z);
        return {
          x: width/2 + (p.x - width/2) * scale,
          y: height/2 + (p.y - height/2) * scale
        };
      };

      quads.forEach(q => {
        const p0 = project(q.points[0]);
        const p1 = project(q.points[1]);
        const p2 = project(q.points[2]);
        const p3 = project(q.points[3]);

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.closePath();

        const fresnel = Math.pow(1 - Math.abs(q.normal.z), 2.5);
        
        // OPTIMIZATION: Removed expensive `createLinearGradient` per quad. 
        // Replaced with dynamic solid fills that simulate volumetric light based on fresnel.
        if (isDark) {
          const intensity = 0.1 + fresnel * 0.8;
          ctx.fillStyle = `rgba(167, 139, 250, ${intensity * 0.25})`; // Violet tint
          ctx.strokeStyle = `rgba(56, 189, 248, ${intensity * 0.6})`; // Cyan edge glow
          ctx.lineWidth = 1;
        } else {
          const intensity = 0.2 + fresnel * 0.7;
          ctx.fillStyle = `rgba(79, 70, 229, ${intensity * 0.3})`; // Indigo tint
          ctx.strokeStyle = `rgba(255, 255, 255, ${intensity})`; // Bright edge
          ctx.lineWidth = 1;
        }

        ctx.fill();
        ctx.stroke();
      });

      if (inViewRef.current) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    const visibilityCheck = () => {
      if (inViewRef.current && animationFrameId === null) {
        draw();
      } else if (!inViewRef.current && animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    draw();
    const idleCheckInterval = setInterval(visibilityCheck, 500);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(idleCheckInterval);
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full drop-shadow-2xl"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 dark:from-[#060608]/30 dark:via-transparent dark:to-[#060608]/30 opacity-50" />
    </div>
  );
};
