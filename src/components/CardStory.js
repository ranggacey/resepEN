import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

export default function CardStory({ story }) {
  const [isHovered, setIsHovered] = useState(false);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  const rotate = useTransform(
    [rotateX, rotateY],
    ([x, y]) => `perspective(1000px) rotateX(${y * 0.5}deg) rotateY(${x * 0.5}deg)`
  );

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) - rect.width/2;
    const y = (event.clientY - rect.top) - rect.height/2;
    
    rotateX.set(-y/15);
    rotateY.set(x/15);
  };

  return (
    <motion.div 
      onMouseMove={handleMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        rotateX.set(0);
        rotateY.set(0);
      }}
      style={{ transform: rotate }}
      className="group h-full flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden relative isolate"
    >
      {/* Animated Light Border */}
      <motion.div
        initial={false}
        animate={{
          opacity: isHovered ? 1 : 0,
          backgroundPosition: isHovered ? '200% 200%' : '0% 0%'
        }}
        transition={{ 
          duration: 2.5,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 rounded-xl bg-[conic-gradient(from_var(--angle),transparent_25%,#8affef_50%,transparent_75%)] opacity-0 pointer-events-none"
        style={{ 
          '--angle': `${isHovered ? 360 : 0}deg`,
          backgroundSize: '200% 200%'
        }}
      />
      
      {/* Glow Overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-purple-500/30 via-transparent to-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content Container */}
      <div className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-xl overflow-hidden backdrop-blur-xl">
        {/* Image Section */}
        <div className="relative aspect-video overflow-hidden">
          <motion.img
            src={story.thumbnail}
            alt={story.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ 
              scale: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Text Content - Adjusted for Mobile */}
        <div className="flex-1 p-3 sm:p-4 flex flex-col gap-2 sm:gap-3">
          <h3 className="text-base sm:text-lg lg:text-xl font-bold line-clamp-2 leading-snug sm:leading-tight text-gray-900 dark:text-gray-100">
            {story.title}
          </h3>
          
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-3 flex-1 leading-relaxed">
            {story.description}
          </p>

          {/* Interactive Button */}
          <motion.div 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href={`/story/${story.id}`}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 w-full py-2 px-3 sm:py-2.5 sm:px-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all text-xs sm:text-sm md:text-base"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 sm:h-5 sm:w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="whitespace-nowrap">Mulai</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}