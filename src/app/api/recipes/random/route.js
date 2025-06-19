import { NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

export async function GET() {
  try {
    const response = await fetch(
      `${BASE_URL}/random?apiKey=${API_KEY}&number=9&addRecipeInformation=true&fillIngredients=true`,
      { cache: 'no-store' } // Disable caching to ensure fresh data
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Spoonacular API response:", JSON.stringify(data).substring(0, 200) + "...");
    
    // Ensure we're returning the expected format
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch random recipes', message: error.message },
      { status: 500 }
    );
  }
} 