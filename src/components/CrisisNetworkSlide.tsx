import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Zap, Activity, Globe, DollarSign } from 'lucide-react';

const nodes = [
  { id: 1, labelTR: 'USD/TRY Paritesi', labelEN: 'USD/TRY Parity', x: 220, y: 140, color: '#f43f5e', icon: DollarSign },
  { id: 2, labelTR: 'Faiz Oranları', labelEN: 'Interest Rates', x: 780, y: 140, color: '#0ea5e9', icon: Activity },
  { id: 3, labelTR: 'Teknoloji Hisseleri', labelEN: 'Tech Equities', x: 220, y: 460, color: '#a855f7', icon: Zap },
  { id: 4, labelTR: 'Emtia & Altın', labelEN: 'Commodities', x: 780, y: 460, color: '#10b981', icon: Globe },
];

const paths = [
  'M 220 140 C 350 140, 420 300, 500 300',
  'M 780 140 C 650 140, 580 300, 500 300',
  'M 220 460 C 350 460, 420 300, 500 300',
  'M 780 460 C 650 460, 580 300, 500 300',
];

interface DataPacket {
  id: string;
  sourceIndex: number;
}

export const CrisisNetworkSlide = ({ isTR }: { isTR: boolean }) => {
  const [packets, setPackets] = useState<DataPacket[]>([]);
  const [coreImpacts, setCoreImpacts] = useState<{ id: string; color: string }[]>([]);
  
  // Simulation states
  const [vols, setVols] = useState(['2.1%', '2.6%', '2.0%', '2.3%']);
  
  // Continuous random data flow
  useEffect(() => {
    let isMounted = true;
    
    const packetInterval = setInterval(() => {
      if (!isMounted) return;
      
      const sourceCount = Math.random() > 0.6 ? 2 : 1;
      const newPackets: DataPacket[] = [];
      
      for(let i=0; i<sourceCount; i++) {
         const sourceIndex = Math.floor(Math.random() * 4);
         const packetId = Math.random().toString(36).substring(7);
         newPackets.push({ id: packetId, sourceIndex });
         
         // Travel time to core
         setTimeout(() => {
           if (!isMounted) return;
           setCoreImpacts(prev => [...prev, { id: packetId, color: nodes[sourceIndex].color }]);
           
           setVols(prev => {
             const newVols = [...prev];
             const newVolVal = (Math.random() * 3 + 0.5).toFixed(1);
             newVols[sourceIndex] = `${newVolVal}%`;
             return newVols;
           });

           // Shrink the shield after impact
           setTimeout(() => {
             if (!isMounted) return;
             setCoreImpacts(prev => prev.filter(imp => imp.id !== packetId));
           }, 1200);
           
         }, 800);
      }
      
      setPackets(prev => [...prev, ...newPackets]);
      
      setTimeout(() => {
        if (!isMounted) return;
        setPackets(prev => prev.filter(p => !newPackets.find(np => np.id === p.id)));
      }, 900);

    }, 2000); 
    
    return () => {
      isMounted = false;
      clearInterval(packetInterval);
    };
  }, []);

  const isShieldActive = coreImpacts.length > 0;

  return (
    // CRITICAL FIX: The aspect ratio of the container MUST perfectly match the SVG viewBox (1000/600 = 5/3)
    // Otherwise, the HTML absolute positioning (%) will drift away from the SVG paths!
    <div className="relative w-full max-w-[1000px] mx-auto flex items-center justify-center" style={{ aspectRatio: '1000 / 600' }}>
      
      <svg viewBox="0 0 1000 600" className="w-full h-full max-h-[600px] overflow-visible pointer-events-none" style={{ aspectRatio: '1000/600' }}>
        <defs>
          {nodes.map(n => (
             <filter key={`glow-${n.id}`} id={`glow-${n.id}`} x="-50%" y="-50%" width="200%" height="200%">
               <feGaussianBlur stdDeviation="4" result="blur" />
               <feComposite in="SourceGraphic" in2="blur" operator="over" />
             </filter>
          ))}

          <radialGradient id="dribbble-core" cx="35%" cy="35%" r="65%">
             <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.9" />
             <stop offset="40%" stopColor="#4c1d95" stopOpacity="1" />
             <stop offset="90%" stopColor="#1e1b4b" stopOpacity="1" />
             <stop offset="100%" stopColor="#4c1d95" stopOpacity="1" />
          </radialGradient>

          <radialGradient id="dribbble-shield" cx="50%" cy="50%" r="50%">
             <stop offset="40%" stopColor="#4c1d95" stopOpacity="0" />
             <stop offset="85%" stopColor="#7c3aed" stopOpacity="0.15" />
             <stop offset="98%" stopColor="#a78bfa" stopOpacity="0.6" />
             <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0.8" />
          </radialGradient>
          
          <radialGradient id="dribbble-highlight" cx="50%" cy="10%" r="90%">
             <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
             <stop offset="40%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Static Dark Base Paths */}
        {paths.map((p, i) => (
           <path key={`base-path-${i}`} d={p} stroke={nodes[i].color} strokeOpacity="0.2" strokeWidth="2" fill="none" />
        ))}

        {/* 2. Travelling Data Packets */}
        <AnimatePresence>
          {packets.map((packet) => (
             <motion.path 
               key={`packet-${packet.id}`}
               d={paths[packet.sourceIndex]}
               stroke={nodes[packet.sourceIndex].color}
               strokeWidth="4"
               fill="none"
               strokeLinecap="round"
               filter={`url(#glow-${nodes[packet.sourceIndex].id})`}
               initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
               animate={{
                  pathLength: [0, 0.3, 0.1],
                  pathOffset: [0, 0.5, 1],
                  opacity: [0, 1, 1, 0]
               }}
               transition={{ duration: 0.8, ease: "easeInOut" }}
             />
          ))}
        </AnimatePresence>

        {/* 3. The Dribbble Style 3D Shield (Breathing & Growing on Impact) - HIDDEN BY USER REQUEST */}
        {/*
        <motion.g 
           initial={{ scale: 0.4, opacity: 0 }}
           animate={{ 
              scale: isShieldActive ? 1 : 0.45, 
              opacity: isShieldActive ? 1 : 0 
           }}
           transition={{ 
              duration: isShieldActive ? 0.5 : 1.5, 
              ease: isShieldActive ? "easeOut" : "easeInOut" 
           }}
           style={{ transformOrigin: '500px 300px' }}
        >
           <circle cx="500" cy="300" r="220" fill="#0A0A10" opacity="0.4" />
           <circle cx="500" cy="300" r="220" fill="url(#dribbble-shield)" />
           <circle cx="500" cy="300" r="220" fill="url(#dribbble-highlight)" />
           <g stroke="rgba(167, 139, 250, 0.35)" fill="none" strokeWidth="1.5">
              <circle cx="500" cy="300" r="220" stroke="rgba(196, 181, 253, 0.6)" strokeWidth="2" />
              <ellipse cx="500" cy="300" rx="220" ry="140" />
              <ellipse cx="500" cy="300" rx="220" ry="70" />
              <line x1="280" y1="300" x2="720" y2="300" strokeOpacity="0.2" />
              <ellipse cx="500" cy="300" rx="140" ry="220" />
              <ellipse cx="500" cy="300" rx="70" ry="220" />
              <line x1="500" y1="80" x2="500" y2="520" strokeOpacity="0.2" />
           </g>
           <AnimatePresence>
              {isShieldActive && (
                 <motion.circle cx="500" cy="300" r="220" fill="none" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="4"
                    initial={{ scale: 0.9, opacity: 0.5 }}
                    animate={{ scale: 1.05, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                 />
              )}
           </AnimatePresence>
        </motion.g>
        */}

        {/* 4. Dribbble Style Central AI Core */}
        <g transform="translate(500, 300)">
            
            {/* Core Impact Shockwaves */}
            <AnimatePresence>
               {coreImpacts.map(impact => (
                  <motion.circle 
                     key={`impact-${impact.id}`}
                     r="55" fill="none" stroke={impact.color} strokeWidth="3"
                     initial={{ scale: 0.9, opacity: 1 }}
                     animate={{ scale: 2.2, opacity: 0 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.8, ease: "easeOut" }}
                  />
               ))}
            </AnimatePresence>

            {/* Rotating Tech HUD Rings (Inner) */}
            <motion.circle r="75" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="15 30 5 10" opacity="0.8"
                animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <motion.circle r="85" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="40 20 10 40" opacity="0.6"
                animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            {/* Thick HUD segments */}
            <motion.circle r="95" fill="none" stroke="#7c3aed" strokeWidth="3" strokeDasharray="80 150" strokeLinecap="round" opacity="0.7"
                animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />

            {/* Solid 3D Sphere Core */}
            <motion.circle r="55" fill="url(#dribbble-core)" 
               animate={{ 
                 scale: coreImpacts.length > 0 ? 1.1 : 1,
                 filter: coreImpacts.length > 0 ? "brightness(1.3)" : "brightness(1)"
               }}
               transition={{ type: "spring", stiffness: 300, damping: 15 }}
            />

            {/* Center Symbol (White, crisp) */}
            <foreignObject x="-28" y="-28" width="56" height="56">
                <div xmlns="http://www.w3.org/1999/xhtml" className="w-full h-full flex items-center justify-center text-white">
                    <ShieldCheck className="w-9 h-9 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" strokeWidth={2.5} />
                </div>
            </foreignObject>
        </g>

        {/* 5. SVG NATIVE DATA CARDS (ForeignObjects) - They scale perfectly with the viewBox! */}
        {nodes.map((node, i) => {
           const Icon = node.icon;
           return (
             <foreignObject 
               key={`card-${node.id}`} 
               x={node.x - 100} // Center 200px wide box
               y={node.y - 40}  // Center 80px tall box
               width="200" 
               height="80"
               className="overflow-visible"
             >
                <div xmlns="http://www.w3.org/1999/xhtml" className="w-full h-full flex items-center justify-center pointer-events-auto">
                  <div className="flex flex-col items-center justify-center min-w-[160px] bg-[#0A0A10]/90 backdrop-blur-xl border border-slate-800/80 rounded-xl px-5 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-transform hover:scale-105 hover:-translate-y-1">
                     <div className="flex items-center gap-2 mb-1.5" style={{ color: node.color }}>
                        <Icon className="w-4 h-4" />
                        <span className="text-[14px] font-black tracking-wide whitespace-nowrap">
                          {isTR ? node.labelTR : node.labelEN}
                        </span>
                     </div>
                     <motion.div 
                       key={vols[i]} 
                       initial={{ scale: 1.2, color: '#fff' }}
                       animate={{ scale: 1, color: '#94a3b8' }}
                       className="text-[12px] font-mono"
                     >
                        Vol: {vols[i]}
                     </motion.div>
                  </div>
                </div>
             </foreignObject>
           );
        })}

      </svg>

    </div>
  );
};
