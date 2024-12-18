import { AssemblyAI } from 'assemblyai';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { audioFileUrl } = await req.json();
    console.log("Received audio file URL:", audioFileUrl);

    const client = new AssemblyAI({
      apiKey: process.env.CAPTION_API,
    });

    const FILE_URL = audioFileUrl;

    const data = {
      audio:FILE_URL, 
    };

    const transcript = await client.transcripts.transcribe(data);
    console.log("Transcription Result:", transcript.words);

    return NextResponse.json({
      result: transcript.words
    });
  } catch (error) {
    
    return NextResponse.json(
      { 'error': error},
     
    );
  }
}

