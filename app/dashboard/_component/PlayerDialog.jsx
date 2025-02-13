import React, { useEffect, useState } from 'react'
import { Player } from "@remotion/player";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import RemotionVideo from './RemotionVideo';
import { Button } from '@/components/ui/button';
import { db } from '@/configs/db';
import { VideoData } from '@/configs/schema';
  

const PlayerDialog = ({playVideo,videoId}) => {

    const [openDailog, setOpenDailog]= useState(false);

    const[videoData,setVideoData]=useState();

     useEffect(() => {
        setOpenDailog(playVideo)
        videoId && GetVideoData()
     },[playVideo])

     const GetVideoData =async()=>{
        const result=await db.select().from(VideoData).where(eq(VideoData.id,videoId))
        console.log(result);
        setVideoData(result[0]);
     } 


  return (
    <Dialog open={openDailog} >
   
    <DialogContent className="bg-white flex flex-col items-center" >
      <DialogHeader>
        <DialogTitle className='text-2xl font-bold my-5' >Your video is ready</DialogTitle>
        <DialogDescription>
        <Player
      component={RemotionVideo}
      durationInFrames={120}
      compositionWidth={1920}
      compositionHeight={1080}
      fps={30}
      inputProps={{
        ...videoData
      }}
    />
    <div className='flex gap-10'>
        <Button variant="ghost">
            Cancel
        </Button>
        <Button>
            Export
        </Button>
    </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
  
  )
}

export default PlayerDialog