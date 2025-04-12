"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500 text-white overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-4 max-w-4xl mx-auto z-10"
      >
        <h4 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 font-pixel animate-float">
          MultiEnding
        </h4>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-base xs:text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 md:mb-8 max-w-xs xs:max-w-sm sm:max-w-lg md:max-w-2xl mx-auto leading-relaxed px-2"
        >
          Jelajahi dunia petualangan yang penuh misteri, tantangan, dan cerita epik
        </motion.p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
        >
          <button className="px-5 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 bg-white text-blue-600 rounded-full text-sm sm:text-base md:text-lg font-bold hover:bg-opacity-90 transition-all shadow-lg md:shadow-xl">
            Mulai Petualangan
          </button>
        </motion.div>
      </motion.div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="animate-pulse-slow absolute -top-10 -left-10 sm:-top-20 sm:-left-20 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-purple-400 rounded-full mix-blend-screen filter blur-xl sm:blur-2xl md:blur-3xl" />
        <div className="animate-pulse-slow absolute -bottom-10 -right-10 sm:-bottom-20 sm:-right-20 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-blue-400 rounded-full mix-blend-screen filter blur-xl sm:blur-2xl md:blur-3xl" />
      </div>
    </section>
  );
}