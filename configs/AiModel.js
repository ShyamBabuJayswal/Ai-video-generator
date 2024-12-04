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
          {text: "Write a script to generate 30 seconds video on topic: Interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format  with imagePrompt and ContentText as field   "},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n[\n  {\n    \"imagePrompt\": \"Realistic image of a bustling 1920s speakeasy, dimly lit with jazz music playing, people in flapper dresses and suits talking and laughing\",\n    \"ContentText\": \"Our story begins in the roaring twenties, a time of jazz, flapper dresses, and… illegal alcohol. The Prohibition era was in full swing.\"\n  },\n  {\n    \"imagePrompt\": \"Realistic image of a stern-looking police officer raiding a speakeasy, breaking down a door, with surprised patrons visible inside.\",\n    \"ContentText\": \"But the law wasn't always so easily enforced.  Raids were common, but speakeasies popped up faster than the police could shut them down.\"\n  },\n  {\n    \"imagePrompt\": \"Realistic image of a shadowy figure, possibly a gangster, handing money to a corrupt police officer in a back alley at night, under a flickering streetlight.\",\n    \"ContentText\": \"Corruption was rampant.  Deals were struck, and the line between law and lawlessness blurred.\"\n  },\n  {\n    \"imagePrompt\": \"Realistic image of a close-up of a hidden flask, partially concealed in a woman's purse, showing the detail of the metal and the subtle sheen of liquid inside.\",\n    \"ContentText\": \"To survive, people got creative.  Hidden flasks, secret passwords, and ingenious ways to transport and consume the forbidden liquor.\"\n  },\n  {\n    \"imagePrompt\": \"Realistic image of a newspaper headline proclaiming 'Prohibition Repealed!', with celebratory people in the background.\",\n    \"ContentText\": \"Eventually, the tide turned.  Public opinion shifted, and in 1933, Prohibition was repealed.\"\n  },\n  {\n    \"imagePrompt\": \"Realistic image of a bar with people enjoying legal drinks and music in the 1930s style, with a celebratory and happy mood.\",\n    \"ContentText\": \"The era of speakeasies ended, but the stories, the glamour, and the lawlessness of the Prohibition era remain a fascinating chapter in American history.\"\n  }\n]\n```\n\n**Explanation of the JSON structure:**\n\n* **imagePrompt:** This field provides a detailed description for an AI image generator (like Midjourney, Dall-E 2, Stable Diffusion) to create a realistic image for each scene.  The more detail you give, the better the results.  The \"Realistic\" style is specified to ensure the image aligns with a documentary-style video.\n\n* **ContentText:** This field contains the narration or text overlay for that scene in the video.  This text should be concise and easily digestible within the timeframe of a short video segment.\n\n**To create the 30-second video:**\n\n1. **Use an AI image generator:**  Feed each `imagePrompt` to your chosen AI art generator to get high-quality images.  Adjust parameters like aspect ratio (widescreen is recommended for video) as needed.\n\n2. **Video editing software:**  Import the generated images into a video editing software (e.g., Adobe Premiere Pro, DaVinci Resolve, iMovie, Kapwing).\n\n3. **Add narration:**  Add the text from the `ContentText` field as voiceover or text overlay using your video editing software.\n\n4. **Transitions and timing:**  Add smooth transitions between images and adjust the duration of each scene to fit within the 30-second timeframe.  Aim for roughly 4-5 seconds per scene.\n\n5. **Music and sound effects:**  Include appropriate background music and sound effects to enhance the mood and storytelling.\n\n\nThis JSON provides a structured foundation.  You might need to adjust the number of scenes and the content text to precisely fill 30 seconds depending on your chosen pace and voiceover speed.  Remember to experiment with different AI image generators and video editing techniques to achieve the best results.\n"},
        ],
      },
    ],
  });

 