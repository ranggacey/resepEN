"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Categories() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('diets');
  
  const categories = {
    diets: [
      { name: 'Vegetarian', icon: '🥗', color: 'bg-green-500', query: 'vegetarian' },
      { name: 'Vegan', icon: '🌱', color: 'bg-green-600', query: 'vegan' },
      { name: 'Gluten Free', icon: '🌾', color: 'bg-yellow-500', query: 'gluten-free' },
      { name: 'Ketogenic', icon: '🥩', color: 'bg-red-500', query: 'ketogenic' },
      { name: 'Pescetarian', icon: '🐟', color: 'bg-blue-500', query: 'pescetarian' },
      { name: 'Paleo', icon: '🍖', color: 'bg-orange-500', query: 'paleo' },
      { name: 'Whole30', icon: '🥑', color: 'bg-green-700', query: 'whole30' },
      { name: 'Low FODMAP', icon: '🍽️', color: 'bg-purple-500', query: 'low-fodmap' }
    ],
    cuisines: [
      { name: 'Italian', icon: '🍝', color: 'bg-red-500', query: 'italian' },
      { name: 'Mexican', icon: '🌮', color: 'bg-green-600', query: 'mexican' },
      { name: 'Chinese', icon: '🥡', color: 'bg-red-600', query: 'chinese' },
      { name: 'Indian', icon: '🍛', color: 'bg-orange-500', query: 'indian' },
      { name: 'Japanese', icon: '🍣', color: 'bg-pink-500', query: 'japanese' },
      { name: 'Thai', icon: '🍜', color: 'bg-yellow-500', query: 'thai' },
      { name: 'French', icon: '🥐', color: 'bg-blue-500', query: 'french' },
      { name: 'Mediterranean', icon: '🫒', color: 'bg-teal-500', query: 'mediterranean' },
      { name: 'Greek', icon: '🥙', color: 'bg-blue-600', query: 'greek' },
      { name: 'Spanish', icon: '🥘', color: 'bg-yellow-600', query: 'spanish' },
      { name: 'Korean', icon: '🍲', color: 'bg-red-700', query: 'korean' },
      { name: 'Vietnamese', icon: '🍲', color: 'bg-green-500', query: 'vietnamese' }
    ],
    mealTypes: [
      { name: 'Breakfast', icon: '🍳', color: 'bg-yellow-400', query: 'breakfast' },
      { name: 'Lunch', icon: '🥪', color: 'bg-orange-400', query: 'lunch' },
      { name: 'Dinner', icon: '🍽️', color: 'bg-indigo-500', query: 'dinner' },
      { name: 'Dessert', icon: '🍰', color: 'bg-pink-400', query: 'dessert' },
      { name: 'Appetizer', icon: '🧀', color: 'bg-yellow-500', query: 'appetizer' },
      { name: 'Salad', icon: '🥗', color: 'bg-green-400', query: 'salad' },
      { name: 'Soup', icon: '🍲', color: 'bg-orange-500', query: 'soup' },
      { name: 'Snack', icon: '🍿', color: 'bg-red-400', query: 'snack' },
      { name: 'Drink', icon: '🍹', color: 'bg-blue-400', query: 'drink' },
      { name: 'Sauce', icon: '🧂', color: 'bg-red-500', query: 'sauce' }
    ]
  };

  const handleCategoryClick = (query) => {
    router.push(`/?category=${query}`);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">Browse Categories</h1>
      
      {/* Category Tabs */}
      <div className="flex overflow-x-auto pb-2 mb-6 gap-2">
        <button
          onClick={() => setSelectedCategory('diets')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap ${
            selectedCategory === 'diets'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Dietary Preferences
        </button>
        <button
          onClick={() => setSelectedCategory('cuisines')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap ${
            selectedCategory === 'cuisines'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Cuisines
        </button>
        <button
          onClick={() => setSelectedCategory('mealTypes')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap ${
            selectedCategory === 'mealTypes'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Meal Types
        </button>
      </div>
      
      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories[selectedCategory].map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(category.query)}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col items-center text-center"
          >
            <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center text-white text-3xl mb-3`}>
              <span>{category.icon}</span>
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">{category.name}</h3>
          </button>
        ))}
      </div>

      {/* Search by Ingredient Section */}
      <div className="mt-12 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-4 md:mb-0 md:mr-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Search by Ingredients</h2>
            <p className="text-gray-600 dark:text-gray-300">Find recipes with ingredients you already have at home</p>
          </div>
          <Link href="/?searchType=ingredients" className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300 text-center whitespace-nowrap">
            Ingredient Search
          </Link>
        </div>
      </div>
    </div>
  );
} 