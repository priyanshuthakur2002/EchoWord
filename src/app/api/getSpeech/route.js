import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { text, voice } = body;

    if (!text || !voice) {
      return NextResponse.json(
        { error: "Missing text or voice parameter" },
        { status: 400 }
      );
    }

    const options = {
      method: "GET",
      url: "https://microsoft-edge-text-to-speech.p.rapidapi.com/TTS/EdgeTTS",
      params: {
        text,
        voice_name: voice,
        //   'en-US-AriaNeural'
      },
      headers: {
        "x-rapidapi-key": process.env.API_KEY,
        "x-rapidapi-host": "microsoft-edge-text-to-speech.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch speech data" },
      { status: 500 }
    );
  }
}
