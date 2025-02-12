"use client";
import React, { useContext, useEffect, useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from 'uuid';
import { VideoDataContext } from "@/app/_context/VideoDataContext";
import { VideoData } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";




function CreateNew() {
  const [formData, setFormData] = useState({});
  const [loading,setLoading] = useState(false);
  const [videoScript,setVideoScript] = useState();
  const [audioFileUrl,setAudioFileUrl] = useState();
  const [captions,setCaptions] = useState();
  const[imageList,setImageList]  = useState(); 
  const {videoData,setVideoData}=useContext(VideoDataContext);
  const {user} =useUser();


  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    
     GetVideoScript();
    //  GenerateAudioFile(scriptData);
    // GenerateAudioCaption(FILE_URL)
    // GenerateImage();
    
  };

  const GetVideoScript = async () => {
    setLoading(true);
    const prompt = `Write a script to generate ${formData.duration} video on topic: ${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and ContentText as field`;

    
      const resp= await axios.post("/api/get-video-script", { 
        prompt:prompt })


           
      
      setVideoScript(prev =>({
        ...prev,
        'videoScript':resp.data.result
      }))
     
      resp.data.result && GenerateAudioFile(resp.data.result)
    
       
   
  }

  const GenerateAudioFile = async (videoScriptData)   => {
    setLoading(true)
    let script ='';

    const id = uuidv4();

    videoScriptData.forEach(item => {
        script=script+item.ContentText +' ';      
    });
    
    

 const resp = await axios.post('/api/generate-audio',{
      text:script,
      id:id
    }) ;
    setVideoScript(prev =>({
      ...prev,
      'audioFileUrl':resp.data.result
    }))
   
     setAudioFileUrl(resp.data.result);
      
    resp.data.result &&  GenerateAudioCaption(resp.data.result,videoScriptData)
     
      
    
    
  }
  const GenerateAudioCaption = async (fileUrl,videoScriptData) => {
    setLoading(true);
    console.log(fileUrl);
    
   
   const resp=await axios.post("/api/generate-captions", {
        audioFileUrl: fileUrl,
      })
        
        setCaptions(resp?.data?.result);
        setVideoScript(prev =>({
          ...prev,
          'captions':resp.data.result
        }))
        
        resp.data.result && GenerateImage(videoScriptData);
        
    
      
    
     
      
   };

  const GenerateImage = async (videoScriptData) => {
    let images =[];
   
    for(const element of videoScriptData){
      try {
        const resp=await axios.post('/api/generate-image',{
          prompt:element.imagePrompt
        });
        console.log(resp.data.result)
        images.push(resp.data.result)
      } catch (error) {
        console.log("Error:"+e);
        
      }
    }
    setVideoScript(prev =>({
      ...prev,
      'ImageList':resp.data.result
    }))
    
    setImageList(images);
    setLoading(false);
    
  }

  useEffect(() => {
    console.log(videoData);
    if(Object.keys(VideoData).length === 4){
  SaveVideoData(videoData);
    }
    
  },[videoData])



const SaveVideoData = async(videoData) => {
    setLoading(true)
    const result = await db.insert(VideoData).values({
      script:videoData?.videoScript,
      audioFileUrl:videoData?.audioFileUrl,
      captions:videoData?.captions,
      imageList:videoData?.imageList,
      createdBy:user.primaryEmailAddress?.emailAddress
    }).returning({
      id:VideoData?.id
    })
    console.log(result)
    setLoading(false);
}
  
   
   
  


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
