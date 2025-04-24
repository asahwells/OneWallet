// api-services/countries/route.ts
import { NextResponse } from 'next/server';

// Fetch countries from REST Countries API
export const fetchCountries = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all'); // Fetching all countries
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }

    const countries = await response.json();
    return countries.map((country: any) => ({
      name: country.name.common,
      value: country.cca3, // Using cca3 code (ISO 3166-1 alpha-3) for the country value
      id: country.cca3,
    }));
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};
