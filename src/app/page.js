"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import CardStory from "@/components/CardStory";
import storyData from "@/data/story.json";

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.4,
      when: "beforeChildren",
      staggerChildren: 0.1 
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: { duration: 0.2 }
  }
};

function Pagination({ currentPage, totalPages, onPageChange }) {
  const renderPageNumbers = () => {
    // Untuk layar kecil, tampilkan maksimal 3 nomor halaman
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const maxVisiblePages = isMobile ? 3 : 5;
    
    // Logika untuk menentukan halaman mana yang ditampilkan
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    const pages = [];
    
    // Tambahkan tombol halaman pertama jika tidak termasuk dalam range
    if (startPage > 1) {
      pages.push(
        <button
          key="1"
          onClick={() => onPageChange(1)}
          className="px-2 md:px-3 py-1 text-xs md:text-sm rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors min-w-[24px] md:min-w-[32px] flex items-center justify-center"
          aria-label="Go to first page"
        >
          1
        </button>
      );
      
      // Tambahkan ellipsis jika ada gap
      if (startPage > 2) {
        pages.push(
          <span 
            key="ellipsis-start" 
            className="px-1 text-xs md:text-sm text-gray-600 dark:text-gray-300 flex items-center justify-center"
            aria-hidden="true"
          >
            ...
          </span>
        );
      }
    }
    
    // Tambahkan halaman-halaman dalam range
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-2 md:px-3 py-1 text-xs md:text-sm rounded-md flex items-center justify-center min-w-[24px] md:min-w-[32px] ${
            currentPage === i
              ? 'bg-blue-500 text-white font-medium shadow-sm'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          } transition-colors`}
          aria-label={`Go to page ${i}`}
          aria-current={currentPage === i ? "page" : undefined}
        >
          {i}
        </button>
      );
    }
    
    // Tambahkan ellipsis jika ada gap di akhir
    if (endPage < totalPages - 1) {
      pages.push(
        <span 
          key="ellipsis-end" 
          className="px-1 text-xs md:text-sm text-gray-600 dark:text-gray-300 flex items-center justify-center"
          aria-hidden="true"
        >
          ...
        </span>
      );
    }
    
    // Tambahkan tombol halaman terakhir jika tidak termasuk dalam range
    if (endPage < totalPages) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className="px-2 md:px-3 py-1 text-xs md:text-sm rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors min-w-[24px] md:min-w-[32px] flex items-center justify-center"
          aria-label="Go to last page"
        >
          {totalPages}
        </button>
      );
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1 md:gap-2 mt-4 md:mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-1 md:p-1.5 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center"
        aria-label="Previous page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 md:h-4 md:w-4 text-gray-600 dark:text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="flex flex-wrap justify-center gap-1 mx-1">
        {renderPageNumbers()}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-1 md:p-1.5 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center"
        aria-label="Next page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 md:h-4 md:w-4 text-gray-600 dark:text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [stories, setStories] = useState([]);
  
  // Dynamically adjust stories per page based on screen size
  const STORIES_PER_PAGE = isMobile ? 4 : 6;

  useEffect(() => {
    // Pastikan kode hanya berjalan di browser
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        const width = window.innerWidth;
        setIsMobile(width < 640);
      };

      // Set initial state
      handleResize();
      
      // Handle resize
      window.addEventListener('resize', handleResize);
      
      // Set stories data with error handling
      try {
        // Tambahkan penundaan kecil untuk animasi loading
        const timer = setTimeout(() => {
          setStories(Array.isArray(storyData) ? storyData : []);
          setIsLoading(false);
        }, 800);
        
        return () => {
          clearTimeout(timer);
          window.removeEventListener('resize', handleResize);
        };
      } catch (error) {
        console.error("Error loading story data:", error);
        setStories([]);
        setIsLoading(false);
        
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }
    }
  }, []);

  useEffect(() => {
    // If screen size changes, make sure we're not on a now-invalid page
    if (currentPage > Math.ceil(stories.length / STORIES_PER_PAGE)) {
      setCurrentPage(1);
    }
  }, [isMobile, stories.length, STORIES_PER_PAGE, currentPage]);

  const totalPages = Math.max(1, Math.ceil(stories.length / STORIES_PER_PAGE));
  const startIndex = (currentPage - 1) * STORIES_PER_PAGE;
  const currentStories = stories.slice(startIndex, startIndex + STORIES_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    
    // Scroll to stories section instead of top of page
    const storiesSection = document.getElementById("stories");
    if (storiesSection) {
      const yOffset = -80; // Offset for header
      const y = storiesSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleStoryClick = (storyId) => {
    console.log(`Navigating to story: ${storyId}`);
    // Implement navigation to story page
  };

  // Fallback for loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-10 h-10">
            <svg 
              className="animate-spin w-10 h-10 text-purple-500" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              ></circle>
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <p className="text-purple-400 font-pixel text-sm">Memuat Petualangan...</p>
        </div>
      </div>
    );
  }

  // Fallback for empty data
  if (!Array.isArray(stories) || stories.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <HeroSection />
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-pixel text-white mb-4">Tidak ada petualangan tersedia</h2>
            <p className="text-gray-400 mb-6">Maaf, cerita petualangan sedang tidak tersedia saat ini. Silakan coba lagi nanti.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              Muat ulang
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="min-h-screen bg-gray-900"
    >
      <HeroSection />

      <section id="stories" className="w-full px-3 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <motion.h2
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-pixel text-center mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent px-2 md:px-4"
        >
          Pilih Petualanganmu
        </motion.h2>

        {/* Grid layout yang responsif - 2 kolom di mobile */}
        <motion.div
          className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 max-w-[1440px] mx-auto"
          variants={pageVariants}
        >
          <AnimatePresence mode="wait">
            {currentStories.map((story) => (
              <motion.div
                key={story.id || `story-${startIndex + currentStories.indexOf(story)}`}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.3 }}
                className="w-full"
                onClick={() => handleStoryClick(story.id)}
              >
                <CardStory 
                  story={{
                    ...story,
                    // Ensure imageUrl exists, with fallback
                    imageUrl: story.imageUrl || "/placeholder-image.jpg"
                  }} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>

      {/* Scroll to Top Button - Always visible but with transitions */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: isMobile ? 0.9 : 1,
          transition: { delay: 1 }
        }}
        whileHover={{ scale: isMobile ? 0.95 : 1.05 }}
        whileTap={{ scale: isMobile ? 0.85 : 0.95 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 p-2 sm:p-2.5 lg:p-3 bg-blue-500/90 dark:bg-blue-600/90 backdrop-blur-sm text-white rounded-full shadow-lg hover:shadow-xl transition-all z-50"
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </motion.button>
    </motion.div>
  );
}