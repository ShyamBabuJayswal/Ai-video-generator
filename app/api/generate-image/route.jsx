import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    console.log("Received Prompt:", prompt); // Log the received prompt

    // Initialize Replicate API client
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN, // Use your Replicate API token
    });

    const input = {
      prompt: prompt,
      height: 1280,
      width: 1024,
      num_outputs: 1,
    };

    // Make API request to Replicate
    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
      { input }
    );

    console.log("Replicate API Response:", output); // Log the response from Replicate

    // Check if output is returned successfully
    if (!output || !output[0]) {
      console.error("Error: No Output from Replicate");
      return NextResponse.json({ result: "Error: No Output" }, { status: 500 });
    }

    // Return the generated image URL as JSON
    return NextResponse.json({ result: { imageUrl: output[0] } });
  } catch (error) {
    console.error("Server Error:", error); // Print the error details for debugging
    return NextResponse.json(
      { result: "Error: Server Error", details: error.toString() },
      { status: 500 }
    );
  }
}
