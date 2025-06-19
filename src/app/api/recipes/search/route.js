import { NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const ingredients = searchParams.get('ingredients') || '';
    const category = searchParams.get('category') || '';
    
    let apiUrl = `${BASE_URL}/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&fillIngredients=true&number=12`;
    
    if (query) {
      apiUrl += `&query=${encodeURIComponent(query)}`;
    }
    
    if (ingredients) {
      apiUrl += `&includeIngredients=${encodeURIComponent(ingredients)}`;
    }
    
    if (category) {
      if (['vegetarian', 'vegan', 'gluten-free', 'ketogenic', 'pescetarian', 'paleo', 'whole30', 'low-fodmap'].includes(category)) {
        apiUrl += `&diet=${encodeURIComponent(category)}`;
      } else {
        // Assume it's a cuisine or meal type
        apiUrl += `&${category.includes('-') ? 'type' : 'cuisine'}=${encodeURIComponent(category)}`;
      }
    }

    console.log("Fetching from Spoonacular API:", apiUrl);
    const response = await fetch(apiUrl, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Search API response:", JSON.stringify(data).substring(0, 200) + "...");
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error searching recipes:', error);
    return NextResponse.json(
      { error: 'Failed to search recipes', message: error.message },
      { status: 500 }
    );
  }
} 