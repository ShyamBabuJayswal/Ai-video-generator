import RemotionVideo from '@/app/dashboard/_component/RemotionVideo'
import React from 'react'

const RemotionRoot = () => {
  return (
   
     <>
      <Composition
        id="Empty"
        component={RemotionVideo}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
    </>
   
  )
}

export default RemotionRoot