import { chatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json(); // Parse incoming request
    console.log("Received Prompt:", prompt);

    // Send the prompt to chatSession
    const result = await chatSession.sendMessage(prompt);

    // Await the response text
    const responseText = await result.response.text();
    console.log("AI Response:", responseText);

    // Send the response back as JSON
    return NextResponse.json({
      result: JSON.parse(responseText), // If the response is valid JSON
    });
  } catch (e) {
    console.error("Error:", e);

    // Return a sanitized error message
    return NextResponse.json({
      error: "An error occurred while processing the request.",
      details: e.message, // Include error details if necessary
    });
  }
}
