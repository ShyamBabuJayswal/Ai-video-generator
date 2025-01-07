import { storage } from "@/configs/FirebaseConfig";
import axios from "axios";
import { getDownloadURL, uploadString, ref } from "firebase/storage";
import { NextResponse } from "next/server";
import Replicate from "replicate";

import { v4 as uuidv4 } from 'uuid';

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

    // Convert image to base64
    const base64Image = "data:image/png;base64," + await convertImage(output[0]);


    const fileName = `Ai-video-gen/${uuidv4()}.png`;
    const storageRef = ref(storage, fileName);
    


  
    await uploadString(storageRef, base64Image, "data_url");

    
     const downloadUrl = await getDownloadURL(storageRef);

     console.log(downloadUrl);
     

    // Return the download URL
    return NextResponse.json({
      success: true,
      'result': downloadUrl,
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

const convertImage = async (imageUrl) => {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const base64Image = Buffer.from(response.data).toString("base64");
    return base64Image;
  } catch (e) {
    console.log("Error", e);
    throw new Error("Failed to convert image.");
  }
};
