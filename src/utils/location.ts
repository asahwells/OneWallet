// utils/api-utils.ts

import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { GetLGA } from 'api-services/lga/route';
import { GetStates } from 'api-services/states/route';

// Handle errors and show a toast if inside a React component
export const handleError = (error: unknown) => {
  //const toast = useToast(); // Only accessible in a component context

  if (axios.isAxiosError(error) && error.response) {
    const message = error.response.data?.message || 'Request failed. Please try again.';
   // toast.error(message);
    throw new Error(message);
  }

  //toast.error('An unknown error occurred while processing your request.');
  throw new Error('An unknown error occurred while processing your request.');
}

export const fetchStates = async () => {
  try {
    const res = await GetStates();
    if (!res.ok) throw new Error(`Failed to fetch States: ${res.statusText}`);

    const data = await res.json();
    return data.map((state: string) => ({
      name: state, // This will allow the state to match the same format as LGA items
      value: state,
    }));
  } catch (error) {
    console.error('Error fetching States:', error);
    handleError(error); // Log and handle the error
  }
}


// Fetch LGAs (handles state as parameter and API error handling)
export const fetchLGA = async (state: string) => {
  if (!state) return [];

  try {
    // Fix the API call by adding the state parameter directly to the URL
    const res = await fetch(`https://nga-states-lga.onrender.com/?state=${state}`);

    if (!res.ok) throw new Error(`Failed to fetch LGAs: ${res.statusText}`);

    const data = await res.json();

    return data.map((lga: string) => ({
      name: lga,
      value: lga,
    }));
  } catch (error) {
    console.error('Error fetching LGAs:', error);
    handleError(error);
    return [];
  }
};



