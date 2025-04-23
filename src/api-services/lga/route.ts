// api-services/lga/route.ts
import { NextResponse } from 'next/server';

export async function GetLGA(request: any) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get('state');
  
  console.log('Fetching LGAs for state:', state); // Debugging log

  if (!state) {
    return NextResponse.json({ error: 'State parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://nga-states-lga.onrender.com/?state=${state}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching LGAs:', error);
    return NextResponse.json({ error: 'Failed to fetch LGA data' }, { status: 500 });
  }
}
