"use client";

import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import CardStory from "@/components/CardStory";

// ⬇️ Import JSON langsung
import storyData from "@/data/story.json";

const STORIES_PER_PAGE = 6;

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-center space-x-3 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-blue-500 dark:bg-blue-700 text-white rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span className="text-black dark:text-white">
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-blue-500 dark:bg-blue-700 text-white rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(storyData.length / STORIES_PER_PAGE);
  const startIndex = (currentPage - 1) * STORIES_PER_PAGE;
  const currentStories = storyData.slice(startIndex, startIndex + STORIES_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <HeroSection />

      <section id="stories" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-pixel text-black dark:text-white text-center mb-12">
          Pilih Petualanganmu
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {currentStories.map((story) => (
            <CardStory key={story.id} story={story} />
          ))}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </section>
    </>
  );
}
