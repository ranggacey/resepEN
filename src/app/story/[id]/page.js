"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ceritaData from "@/data/cerita.json";

// Animasi konfigurasi
const pageVariants = {
  initial: { opacity: 0 },
  enter: { 
    opacity: 1,
    transition: { duration: 0.4, ease: "easeInOut", staggerChildren: 0.1 }
  },
  exit: { opacity: 0 }
};

const itemVariants = {
  initial: { opacity: 0, y: 10 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10 }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 }
};

export default function StoryPage() {
  const { id } = useParams();
  const story = ceritaData.find((s) => s.id.toString() === id);
  const [currentChoiceId, setCurrentChoiceId] = useState(null);
  const [currentNode, setCurrentNode] = useState(null);
  const [ending, setEnding] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const choiceRef = useRef(null);

  useEffect(() => {
    if (story?.choices?.length) {
      const firstChoice = story.choices.find((c) => c.id === "1A");
      setCurrentChoiceId("1A");
      setCurrentNode(firstChoice);
    }
  }, [story]);

  useEffect(() => {
    // Smooth scroll to choices when node changes
    if (choiceRef.current && currentNode) {
      setTimeout(() => {
        choiceRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [currentNode]);

  const handleOptionClick = (nextId) => {
    if (nextId.startsWith("ENDING")) {
      const endingFound = story.endings.find((e) => e.id === nextId);
      setEnding(endingFound);
    } else {
      const nextNode = story.choices.find((c) => c.id === nextId);
      setCurrentChoiceId(nextId);
      setCurrentNode(nextNode);
    }
  };

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  if (!story) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 text-gray-900"
      >
        <div className="text-center p-8 max-w-md">
          <h1 className="text-3xl font-bold mb-4">⚠️ Cerita Tidak Ditemukan</h1>
          <Link href="/" className="btn-primary">
            Kembali ke Beranda
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Sticky Header */}
        <motion.div
          variants={itemVariants}
          className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-md p-4 mb-6 flex justify-between items-center"
        >
          <h1 className="text-xl md:text-2xl font-bold font-pixel bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            {story.title}
          </h1>
          <Link
            href="/"
            className="flex items-center gap-1 text-sm px-3 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            
          </Link>
        </motion.div>

        {/* Story Content */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - Image and Description */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-1 space-y-4"
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              src={story.thumbnail}
              alt="Thumbnail"
              className="rounded-xl w-full aspect-[3/4] object-cover shadow-lg border-2 border-white dark:border-gray-800"
            />
            
            <motion.div
              variants={cardVariants}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-medium">Tentang Cerita</h2>
                <motion.button 
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={toggleDescription}
                  className="text-blue-500 dark:text-blue-400 text-sm"
                >
                  {isExpanded ? "Ringkas" : "Selengkapnya"}
                </motion.button>
              </div>
              <p className={`text-sm text-gray-600 dark:text-gray-300 ${isExpanded ? '' : 'line-clamp-3'}`}>
                {story.description}
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Story Flow */}
          <div className="md:col-span-2 space-y-4">
            {/* Intro Section */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-purple-500 rounded-lg flex items-center justify-center text-white">
                  <span className="text-sm">📜</span>
                </div>
                <h2 className="text-lg font-medium">Awal Cerita</h2>
              </div>
              <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {story.intro}
              </p>
            </motion.div>

            {/* Choices/Ending Section */}
            <AnimatePresence mode="wait">
              {ending ? (
                <motion.div
                  key="ending"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-red-100 dark:bg-red-900/30 p-6 rounded-xl shadow-md border border-red-200 dark:border-red-800/50"
                >
                  <div className="space-y-4 text-center">
                    <div className="inline-block text-3xl animate-bounce">🎉</div>
                    <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {ending.endingTitle}
                    </h2>
                    <p className="text-base text-red-700 dark:text-red-300">
                      {ending.description}
                    </p>
                    <span className="inline-block px-3 py-1 rounded-full bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-100 text-xs font-medium">
                      {ending.type}
                    </span>
                    
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => {
                        setEnding(null);
                        if (story?.choices?.length) {
                          const firstChoice = story.choices.find((c) => c.id === "1A");
                          setCurrentChoiceId("1A");
                          setCurrentNode(firstChoice);
                        }
                      }}
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Mulai Ulang
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                currentNode && (
                  <motion.div
                    ref={choiceRef}
                    key={currentChoiceId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                          <span className="text-sm">❓</span>
                        </div>
                        <h3 className="text-lg font-medium">Pilihan</h3>
                      </div>
                      
                      <p className="text-base font-medium text-gray-800 dark:text-gray-200">
                        {currentNode.question}
                      </p>

                      <div className="grid gap-3">
                        {currentNode.options.map((option, index) => (
                          <motion.button
                            key={index}
                            variants={buttonVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => handleOptionClick(option.nextChoice)}
                            className="w-full text-left p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 hover:from-blue-100 hover:to-purple-100 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all border border-gray-200 dark:border-gray-700"
                          >
                            <div className="flex items-center gap-2">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                                {String.fromCharCode(65 + index)}
                              </span>
                              <span className="text-gray-800 dark:text-gray-200 text-sm">
                                {option.text}
                              </span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              )}
            </AnimatePresence>

            {/* Progress Tracker */}
            {currentNode && !ending && (
              <motion.div 
                variants={itemVariants}
                className="mt-4 px-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Pilihan saat ini: {currentChoiceId}
                  </span>
                  
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => {
                      if (story?.choices?.length) {
                        const firstChoice = story.choices.find((c) => c.id === "1A");
                        setCurrentChoiceId("1A");
                        setCurrentNode(firstChoice);
                      }
                    }}
                    className="text-xs text-blue-500 dark:text-blue-400 flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Mulai Ulang
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}