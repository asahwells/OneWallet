// api-services/states/route.ts

import { NextResponse } from 'next/server';

export async function GetStates() {
  try {
    const response = await fetch('https://nga-states-lga.onrender.com/fetch');
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data); // Return the state data
  } catch (error) {
    console.error('Error fetching states:', error);
    return NextResponse.json({ error: 'Failed to fetch state data' }, { status: 500 });
  }
}
