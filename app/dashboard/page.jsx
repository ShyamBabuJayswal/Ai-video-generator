"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import EmptyState from './_component/EmptyState';
import Link from 'next/link';
import { VideoData } from '@/configs/schema';
import VideoList from './_component/VideoList';

function Dashboard() {
    const [videoList,setVideoList] = useState([]);

    const {user} = useUser();

    useEffect(() => {
      user && GetVideoList();
    })

   const GetVideoList = async() => {
         const result = await db.select().from(VideoData).where(eq(VideoData?.createBy,user?.primaryEmailAddress?.emailAddress))

         console.log(result);
         setVideoList(result);
   }

  return (
    <div>
        <div className='flex justify-between items-center'>
        <h2 className='font-bold text-2xl text-primary'>Dashboard</h2>
       
       <Link href="/dashboard/create-new">
        <Button>+ Create New</Button>
      </Link>
        </div>
        
        {/*Empty State*/}

        
            {videoList?.length==0 && <div>
            <EmptyState/>
        </div>
        }
        <VideoList videoList={videoList}/>
    </div>
  )
}

export default Dashboard