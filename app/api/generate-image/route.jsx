import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req) {
  try {
    // Parse the request body
    const { prompt } = await req.json();

    // Validate the prompt
    if (!prompt) {
      return NextResponse.json(
        { success: false, message: "Prompt is required." },
        { status: 400 }
      );
    }

    // Initialize Replicate with your API token
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    // Define the input for the model
    const input = {
      prompt,
      height: 1280,
      width: 1024,
      num_outputs: 1,
    };

    // Run the model on Replicate
    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
      { input }
    );

    // Validate the output
    if (!output || !output[0]) {
      return NextResponse.json(
        { success: false, message: "No output returned from Replicate." },
        { status: 500 }
      );
    }

    // Return the first result as a JSON response
    return NextResponse.json({
      success: true,
      result: output[0],
    });
  } catch (error) {
    // Handle any error that occurs
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while generating the image.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
