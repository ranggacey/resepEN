import { NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

export async function GET(request, { params }) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Recipe ID is required' },
        { status: 400 }
      );
    }

    console.log(`Fetching recipe details for ID: ${id}`);
    const response = await fetch(
      `${BASE_URL}/${id}/information?apiKey=${API_KEY}&includeNutrition=true`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Recipe not found' },
          { status: 404 }
        );
      }
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Recipe details fetched successfully for ID: ${id}`);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching recipe details:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch recipe details', message: error.message },
      { status: 500 }
    );
  }
} 