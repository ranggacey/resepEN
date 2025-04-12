"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ceritaData from "@/data/cerita.json";

export default function StoryPage() {
    const { id } = useParams();
    const story = ceritaData.find((s) => s.id.toString() === id);
    const [currentChoiceId, setCurrentChoiceId] = useState(null);
    const [currentNode, setCurrentNode] = useState(null);
    const [ending, setEnding] = useState(null);
  

    useEffect(() => {
        if (story && story.choices && story.choices.length > 0) {
          const firstChoice = story.choices.find((c) => c.id === "1A");
          setCurrentChoiceId("1A");
          setCurrentNode(firstChoice);
        }
      }, [story]);
    
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



  if (!story) {
    return <div className="text-center text-white">Cerita tidak ditemukan.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 font-pixel">{story.title}</h1>
        <img
          src={story.thumbnail}
          alt="Thumbnail"
          className="rounded-xl w-full max-h-[300px] object-cover mb-6 border border-white"
        />
        <p className="text-lg italic text-gray-300 mb-4">{story.description}</p>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
          <p className="text-sm text-gray-400">Intro:</p>
          <p className="text-white">{story.intro}</p>
        </div>

        {ending ? (
          <div className="bg-red-900 p-6 rounded-xl shadow-lg mt-10">
            <h2 className="text-2xl font-bold mb-2">{ending.endingTitle}</h2>
            <p className="mb-4">{ending.description}</p>
            <span className="bg-black text-white px-3 py-1 rounded">{ending.type}</span>
          </div>
        ) : (
          currentNode && (
            <div className="bg-gray-900 p-6 rounded-xl shadow-md mt-8">
              <p className="text-xl mb-4">{currentNode.question}</p>
              <div className="space-y-3">
                {currentNode.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option.nextChoice)}
                    className="block w-full text-left px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-800 transition duration-200"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );

  
}
