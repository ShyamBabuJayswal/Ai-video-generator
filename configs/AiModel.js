const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
 
  export  const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Write a script to generate 30 seconds video on topic: interesting historical story video along with AI image prompt in realstic format for each scene and give me result in json format  with imagePrompt and ContextText as feild "},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"imagePrompt\": \"A realistic depiction of a bustling 1920s speakeasy, dimly lit with jazz music playing, people in flapper dresses and suits enjoying drinks,  focus on a clandestine meeting happening in a back booth.\",\n    \"contextText\": \"The roaring twenties. Prohibition was in full swing, and the underground world of speakeasies thrived.  Our story begins in one such establishment...\"\n  },\n  {\n    \"imagePrompt\": \"A realistic close-up of a vintage ledger book, its pages filled with elegant cursive handwriting and numbers, showing a series of mysterious transactions.  A single, slightly smudged fingerprint is visible on one page.\",\n    \"contextText\": \"A mysterious ledger, filled with cryptic entries and hidden codes, hinted at a larger scheme than simple bootlegging.\"\n  },\n  {\n    \"imagePrompt\": \"A realistic image of a determined young woman, dressed in 1920s attire, looking intently at a map spread out on a table.  A glint of defiance in her eyes.\",\n    \"contextText\": \"Meet Evelyn Reed, a sharp-witted reporter, determined to uncover the truth behind the coded messages.\"\n  },\n  {\n    \"imagePrompt\": \"A realistic scene of a dimly lit alleyway in 1920s Chicago, rain falling, a shadowy figure handing something to Evelyn in a clandestine exchange.  Focus on the tension and mystery.\",\n    \"contextText\": \"Her investigation led her down dangerous paths, meeting shady characters and facing unexpected threats.\"\n  },\n  {\n    \"imagePrompt\": \"A realistic depiction of a dramatic confrontation in a luxurious apartment, Evelyn confronting a powerful mob boss.  A sense of impending danger permeates the scene.\",\n    \"contextText\": \"The truth was closer than she thought, but getting to it meant facing the most dangerous men in the city.\"\n  },\n  {\n    \"imagePrompt\": \"A realistic image of Evelyn triumphantly holding up a piece of evidence – a key piece of the puzzle –  in a police station, surrounded by police officers. A look of relief on her face.\",\n    \"contextText\": \"After a perilous chase and daring confrontation, Evelyn finally exposed the truth, bringing down a vast criminal empire.\"\n  },\n  {\n    \"imagePrompt\": \"A realistic newspaper headline proclaiming Evelyn Reed's success in solving the case.  A photograph of Evelyn graces the front page.\",\n    \"contextText\": \"Her courage and determination made headlines, forever cementing her place in history.\"\n  }\n]\n```\n\n**Explanation:**\n\nThis JSON provides seven scenes,  each with an AI image prompt designed for a realistic style and a short context text suitable for narration within a 30-second video. To create the video:\n\n1. **AI Image Generation:**  Use an AI image generator (like Midjourney, Dall-E 2, Stable Diffusion) and input each `imagePrompt` to generate the corresponding image.  The realistic style specification is crucial.\n2. **Video Editing:** Import the generated images into a video editing software (e.g., DaVinci Resolve, Adobe Premiere Pro, iMovie). Add the `contextText` as voiceover narration or on-screen text. Use smooth transitions between images (fades, wipes).  Adjust the duration of each scene to fit within the 30-second timeframe. Add appropriate background music to enhance the mood.\n\n\n**Important Note:**  A 30-second video is very short.  You may need to condense the story considerably or focus on a single compelling moment from a larger historical event.  The provided JSON offers a structured approach to storytelling, but you'll likely need to adjust the timing and detail for optimal impact.\n"},
          ],
        },
      ],
    });
  

  
  
