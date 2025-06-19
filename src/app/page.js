"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [ingredients, setIngredients] = useState('');
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Check if there are any search parameters
    const category = searchParams.get('category');
    const searchType = searchParams.get('searchType');
    
    if (category) {
      // If category parameter exists, search by category
      searchByCategory(category);
    } else if (searchType === 'ingredients') {
      // If searchType is ingredients, show the ingredients search UI
      // Just show the UI, don't actually search yet
    } else {
      // Otherwise fetch random recipes
      fetchRandomRecipes();
    }
  }, [searchParams]);

  const fetchRandomRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/recipes/random');
      const data = await response.json();
      
      // Log the response to debug
      console.log("API Response:", data);
      
      // Check if data has the expected structure
      if (data && data.recipes && Array.isArray(data.recipes)) {
        setRecipes(data.recipes);
      } else {
        console.error('Unexpected API response format:', data);
        setRecipes([]);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const searchRecipes = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/recipes/search?query=${searchTerm}&ingredients=${ingredients}`);
      const data = await response.json();
      
      // Check if data has the expected structure
      if (data && data.results && Array.isArray(data.results)) {
        setRecipes(data.results);
      } else {
        console.error('Unexpected API response format:', data);
        setRecipes([]);
      }
    } catch (error) {
      console.error('Error searching recipes:', error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const searchByCategory = async (category) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/recipes/search?category=${category}`);
      const data = await response.json();
      
      // Check if data has the expected structure
      if (data && data.results && Array.isArray(data.results)) {
        setRecipes(data.results);
      } else {
        console.error('Unexpected API response format:', data);
        setRecipes([]);
      }
    } catch (error) {
      console.error('Error searching recipes by category:', error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  // Get page title based on search parameters
  const getPageTitle = () => {
    const category = searchParams.get('category');
    
    if (searchTerm || ingredients) {
      return 'Search Results';
    } else if (category) {
      // Format category name for display (e.g., "gluten-free" -> "Gluten Free")
      return category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ') + ' Recipes';
    } else {
      return 'Popular Recipes';
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-500 to-orange-600 text-white py-20 px-4 rounded-b-3xl shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Delicious Recipes</h1>
          <p className="text-xl mb-8">Find the perfect meal with ingredients you already have</p>
          
          <form onSubmit={searchRecipes} className="max-w-3xl mx-auto space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  className="w-full px-4 py-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-orange-300 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Ingredients (comma separated)"
                  className="w-full px-4 py-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-orange-300 focus:outline-none"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="px-6 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition duration-300 shadow-md"
            >
              Search Recipes
            </button>
          </form>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 rounded-t-[50%] -mb-1"></div>
      </section>

      {/* Recipe Grid */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            {getPageTitle()}
          </h2>
          <button 
            onClick={fetchRandomRecipes}
            className="text-orange-500 hover:text-orange-700 font-medium flex items-center gap-1"
          >
            <span>Refresh</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : recipes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 dark:text-gray-400">No recipes found. Try different search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <Link href={`/recipe/${recipe.id}`} key={recipe.id}>
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative h-48 w-full">
                    {recipe.image ? (
                      <Image 
                        src={recipe.image} 
                        alt={recipe.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="bg-gray-200 dark:bg-gray-700 h-full w-full flex items-center justify-center">
                        <span className="text-gray-500 dark:text-gray-400">No image</span>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {recipe.readyInMinutes} min
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{recipe.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{recipe.healthScore || '–'} health score</span>
                    </div>
                    
                    <div className="mt-auto flex flex-wrap gap-2">
                      {recipe.diets && recipe.diets.slice(0, 2).map((diet, index) => (
                        <span 
                          key={index} 
                          className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-xs px-2 py-1 rounded-full"
                        >
                          {diet}
                        </span>
                      ))}
                      {recipe.diets && recipe.diets.length > 2 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                          +{recipe.diets.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
