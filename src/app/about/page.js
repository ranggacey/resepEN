export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">About RecipeFinder</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Our Mission</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          RecipeFinder was created with a simple mission: to help people discover delicious recipes based on their dietary preferences, available ingredients, and nutritional needs.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Whether you're looking for quick weeknight dinners, special occasion meals, or recipes that accommodate specific dietary restrictions, RecipeFinder makes it easy to find exactly what you need.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Features</h2>
        <ul className="space-y-4">
          <li className="flex">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100 flex items-center justify-center mr-3 font-semibold text-sm">1</span>
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200">Search by Ingredients</h3>
              <p className="text-gray-600 dark:text-gray-400">Find recipes based on ingredients you already have in your kitchen.</p>
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100 flex items-center justify-center mr-3 font-semibold text-sm">2</span>
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200">Detailed Nutritional Information</h3>
              <p className="text-gray-600 dark:text-gray-400">View comprehensive nutritional data for each recipe to help you make informed dietary choices.</p>
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100 flex items-center justify-center mr-3 font-semibold text-sm">3</span>
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200">Dietary Filters</h3>
              <p className="text-gray-600 dark:text-gray-400">Easily find recipes that match your dietary preferences, whether you're vegetarian, vegan, gluten-free, or following another diet.</p>
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100 flex items-center justify-center mr-3 font-semibold text-sm">4</span>
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200">Save Favorites</h3>
              <p className="text-gray-600 dark:text-gray-400">Save your favorite recipes for quick access later.</p>
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100 flex items-center justify-center mr-3 font-semibold text-sm">5</span>
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200">Dark Mode Support</h3>
              <p className="text-gray-600 dark:text-gray-400">Comfortable browsing experience in any lighting condition with our dark mode feature.</p>
            </div>
          </li>
        </ul>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Data Source</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          RecipeFinder uses the Spoonacular API to provide comprehensive recipe data, including ingredients, instructions, and nutritional information.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Spoonacular offers one of the most extensive food and recipe databases available, allowing us to provide you with accurate and detailed information for thousands of recipes.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Technology</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          RecipeFinder is built with modern web technologies:
        </p>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
            </svg>
            Next.js for fast, server-rendered React applications
          </li>
          <li className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
            </svg>
            Tailwind CSS for beautiful, responsive design
          </li>
          <li className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
            </svg>
            Spoonacular API for comprehensive recipe data
          </li>
          <li className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
            </svg>
            Responsive design for optimal viewing on any device
          </li>
        </ul>
      </div>
    </div>
  );
} 