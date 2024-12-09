"use client";
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from 'uuid';

const scriptData='It was a cold, dark night. The wind howled through the trees, sending shivers down the spines of those brave enough to venture outside. The leaves rustled in chaotic whispers, as if carrying secrets from the depths of the unknown.A lone figure walked cautiously along the deserted path, each step crunching against the frosted ground. Shadows danced under the pale moonlight, creating shapes that seemed almost alive.In the distance, the faint sound of a bell echoed, its eerie chime a reminder of something lost—or perhaps, something yet to come.'

const FILE_URL ='https://firebasestorage.googleapis.com/v0/b/aigen-aed65.firebasestorage.app/o/Ai-video-gen%2F390bd8b0-c2f2-4e5e-b7a1-958695727fa4.mp3?alt=media&token=3ecb5e9f-4d72-4aad-b94a-47b51e434274'


function CreateNew() {
  const [formData, setFormData] = useState({});
  const [loading,setLoading] = useState(false);
  const [videoScript,setVideoScript] = useState();
  const [audioFileUrl,setAudioFileUrl] = useState();
  const [captions,setCaptions] = useState();


  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    
    //  GetVideoScript();
    //  GenerateAudioFile(scriptData);
    GenerateAudioCaption(FILE_URL)
    
  };

  const GetVideoScript = async () => {
    setLoading(true);
    const prompt = `Write a script to generate ${formData.duration} video on topic: ${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and ContentText as field`;

    
      const result = await axios.post("/api/get-video-script", { 
        prompt }).then(resp  => {
      
      setVideoScript(resp.data.result)
      GenerateAudioFile(resp.data.result);
    
        });
    setLoading(false);
  };

  const GenerateAudioFile = async (videoScriptData)   => {
    setLoading(true)
    let script ='';

    const id = uuidv4()
    // videoScriptData.forEach(item => {
    //     script=script + item.ContentText +' ';      
    // });
    
    

    await axios.post('/api/generate-audio',{
      text:videoScriptData,
      id:id
    }) .then(resp => {
      setAudioFileUrl(resp.data.result);
      
    })
    setLoading(false);
  }
  const GenerateAudioCaption = async (fileUrl) => {
    setLoading(true);
   
     await axios.post("/api/generate-captions", {
        audioFileUrl: fileUrl,
      }).then(resp => {
        console.log(resp.data.result);
        setCaptions(resp?.data?.result);
        
      })
      
    
    setLoading(false);
  };

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-primary text-center">Create New</h2>

      <div className="mt-10 shadow-md p-10">
        {/* Select Topic */}
        <SelectTopic onUserSelect={onHandleInputChange} />
        {/* Select Style */}
        <SelectStyle onUserSelect={onHandleInputChange} />
        {/* Duration */}
        <SelectDuration onUserSelect={onHandleInputChange} />
        {/* Create Button */}
        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
          Create Short Video
        </Button>
      </div>
      <CustomLoading loading={loading}/>
    </div>
  );
}

export default CreateNew;
