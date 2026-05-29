import React, { useState, useRef, useEffect } from 'react';
import { WorkoutCard } from '../data/workouts';
import { motion, AnimatePresence } from 'motion/react';
import { MoveLeft, MoveRight, Zap } from 'lucide-react';

interface ThreeDCardProps {
  card: WorkoutCard;
  onPrev?: () => void;
  onNext?: () => void;
  currentIndex?: number;
  totalCards?: number;
}

export default function ThreeDCard({ 
  card, 
  onPrev, 
  onNext, 
  currentIndex = 0, 
  totalCards = 3 
}: ThreeDCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({});
  const [direction, setDirection] = useState<number>(0); // -1 for left, 1 for right
  const cardRef = useRef<HTMLDivElement>(null);

  // Keep track of index direction for sliding animation
  const lastIndex = useRef(currentIndex);

  useEffect(() => {
    if (currentIndex > lastIndex.current) {
      setDirection(1);
    } else if (currentIndex < lastIndex.current) {
      setDirection(-1);
    }
    lastIndex.current = currentIndex;
  }, [currentIndex]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const element = cardRef.current;
    const rect = element.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Mouse coordinates relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Tilt angle, keeping it realistic (max 15 degrees)
    const rX = -(mouseY / (height / 2)) * 15;
    const rY = (mouseX / (width / 2)) * 15;
    
    setRotateX(rX);
    setRotateY(rY);

    // Realistic glare metallic shine overlay
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    const pctX = (relX / width) * 100;
    const pctY = (relY / height) * 100;

    setGlareStyle({
      background: `
        radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 55%),
        linear-gradient(${135 + (pctX - 50) / 3}deg, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0.08) 48%, rgba(255, 255, 255, 0.14) 50%, rgba(255, 255, 255, 0.08) 52%, rgba(255, 255, 255, 0) 75%)
      `,
      mixBlendMode: 'overlay',
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlareStyle({});
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '110%' : '-110%',
      opacity: 0,
      scale: 0.85,
      rotateY: dir > 0 ? 30 : -30,
      z: -200,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      z: 0,
      transition: {
        x: { type: 'spring', stiffness: 280, damping: 26, mass: 0.9 },
        opacity: { duration: 0.4, ease: 'easeOut' },
        scale: { type: 'spring', stiffness: 220, damping: 22 },
        rotateY: { type: 'spring', stiffness: 240, damping: 24 },
        z: { type: 'spring', stiffness: 220, damping: 22 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-110%' : '110%',
      opacity: 0,
      scale: 0.85,
      rotateY: dir > 0 ? -30 : 30,
      z: -200,
      transition: {
        x: { type: 'spring', stiffness: 280, damping: 28 },
        opacity: { duration: 0.35, ease: 'easeIn' },
        scale: { duration: 0.35 },
        rotateY: { duration: 0.35 },
        z: { duration: 0.35 }
      }
    }),
  };

  const activeColor = card.color;

  return (
    <div className="flex flex-col items-center w-full max-w-[370px] mx-auto -translate-y-4 sm:-translate-y-6 relative z-10">
      
      {/* 3D Viewport wrapper - aspect ratio optimized for high-fidelity portrait cards */}
      <div 
        className="w-full relative select-none aspect-[3.2/4.33]"
        style={{ perspective: '1200px' }}
      >
        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          <motion.div
            key={card.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(e, info) => {
              if (info.offset.x < -60) {
                onNext?.();
              } else if (info.offset.x > 60) {
                onPrev?.();
              }
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            className="absolute inset-x-0 top-0 w-full h-full cursor-grab active:cursor-grabbing origin-center"
          >
            {/* The 3D tilting card frame. We display the complete raw image with NO cropping, overlays or details */}
            <motion.div
              ref={cardRef}
              animate={isHovered ? {
                rotateX: rotateX,
                rotateY: rotateY,
                scale: 1.04,
                z: 25,
              } : {
                rotateX: 1,
                rotateY: 0,
                scale: 1,
                z: 0,
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 24 }}
              style={{
                transformStyle: 'preserve-3d',
                boxShadow: isHovered 
                  ? `0 35px 70px -15px ${card.glowColor}, inset 0 0 20px rgba(255,255,255,0.01)` 
                  : '0 15px 40px -20px rgba(0,0,0,0.9)',
              }}
              className="w-full rounded-[2.2rem] overflow-hidden bg-neutral-950 border border-neutral-900/60 p-0 relative"
            >
              {/* Card content - No overlays, fully uncropped h-auto block image matching user's original specs */}
              <div className="w-full h-auto bg-black relative">
                <img 
                  src={card.imageUrl} 
                  alt={card.imageAlt} 
                  className="w-full h-auto block select-none pointer-events-none rounded-[2.2rem]"
                  referrerPolicy="no-referrer"
                />

                {/* Cyber-glow back illumination reflection following cursor hover */}
                <div 
                  className="absolute inset-0 opacity-12 mix-blend-color-dodge pointer-events-none transition-opacity duration-300 rounded-[2.2rem]" 
                  style={{ backgroundColor: activeColor }}
                />

                {/* Holographic reflections */}
                {isHovered && (
                  <div 
                    className="absolute inset-0 pointer-events-none transition-all duration-150 rounded-[2.2rem]"
                    style={glareStyle}
                  />
                )}
                
                {/* Tech active optic overlay element so user knows it's interactive, but highly subtle */}
                <div className={`absolute top-4 right-4 flex items-center space-x-1 px-2.5 py-1 rounded-full bg-black/85 backdrop-blur border text-[8.5px] font-mono tracking-widest transition-all duration-300 opacity-80 pointer-events-none ${
                  isHovered ? 'scale-100 opacity-95' : 'scale-95 opacity-50'
                }`} style={{ borderColor: `${activeColor}30`, color: activeColor }}>
                  <Zap className="w-2.5 h-2.5 animate-pulse" />
                  <span>Interactive Holo</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Recreated premium minimalist controls replacing the HUD bar */}
      <div className="flex items-center justify-between w-full max-w-[310px] mt-8 select-none">
        <button 
          onClick={onPrev}
          className="w-11 h-11 rounded-full border border-neutral-850 bg-neutral-950 hover:bg-neutral-900 text-neutral-400 hover:text-white transition flex items-center justify-center cursor-pointer active:scale-90 shadow-md"
          aria-label="Previous workout"
        >
          <MoveLeft className="w-4 h-4" />
        </button>
        
        <div className="text-center">
          <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-500 uppercase block mb-0.5">WORKOUT ROUTINE</span>
          <span className="text-xs font-mono font-bold text-neutral-300">
            0{currentIndex + 1} <span className="text-neutral-600">/</span> 0{totalCards}
          </span>
        </div>

        <button 
          onClick={onNext}
          className="w-11 h-11 rounded-full border border-neutral-850 bg-neutral-950 hover:bg-neutral-900 text-neutral-400 hover:text-white transition flex items-center justify-center cursor-pointer active:scale-90 shadow-md"
          aria-label="Next workout"
        >
          <MoveRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
