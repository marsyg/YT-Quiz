// src/app/api/captions/route.ts
import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fetchTranscript } from 'youtube-transcript-plus';
import { YoutubeTranscript } from '@danielxceron/youtube-transcript';
const execAsync = promisify(exec);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('videoId');

    if (!videoId) {
      return NextResponse.json(
        { error: 'Video ID is required' },
        { status: 400 },
      );
    }
   const  transcript =  await  YoutubeTranscript.fetchTranscript(videoId);
   console.log(transcript)
    // Path to python script
    // const scriptPath = path.join(
    //   process.cwd(),
    //   'scripts',
    //   'caption-extractor.py',
    // );

    // Execute Python script
    // const { stdout, stderr } = await execAsync(
    //   `python "${scriptPath}" ${videoId}`,
    // );

    // if (stderr) {
    //   console.error('Python script error:', stderr);
    //   return NextResponse.json(
    //     { error: 'Failed to extract captions' },
    //     { status: 500 },
    //   );
    // }

    // Parse the JSON output from Python
    // const result = JSON.parse(stdout);

    return NextResponse.json("hello");
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 },
    );
  }
}
