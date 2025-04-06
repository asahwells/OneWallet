import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // The base64 image from the client
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'No image provided' });
    }

    // 1) Read your real Dojah credentials from environment variables
    const DOJAH_SECRET_KEY = process.env.DOJAH_SECRET_KEY;
    const DOJAH_APP_ID = process.env.DOJAH_APP_ID;

    if (!DOJAH_SECRET_KEY || !DOJAH_APP_ID) {
      return res.status(500).json({
        error: 'Dojah credentials are not set. Make sure .env.local is configured.',
      });
    }

    // 2) Construct the request to Dojah. According to their docs:
    //    https://docs.dojah.io/docs/facial-biometric-verification
    //    For a single face verification, you typically send "selfie" with base64.
    //    If you are doing face *match*, you might send "selfie" & "image" or "selfie2" etc.
    const url = 'https://api.dojah.io/api/v1/kyc/faceid';

    const response = await axios.post(
      url,
      {
        // For single face verification
        selfie: image, // base64 string from the client
      },
      {
        headers: {
          Authorization: `Bearer ${DOJAH_SECRET_KEY}`,
          AppId: DOJAH_APP_ID,
          'Content-Type': 'application/json',
        },
      }
    );

    // 3) Send Dojah response back to the client
    return res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Dojah Face Verification Error:', error.response?.data || error.message);
    return res
      .status(500)
      .json({ error: error.response?.data || 'Failed to call Dojah Face Verification' });
  }
}
