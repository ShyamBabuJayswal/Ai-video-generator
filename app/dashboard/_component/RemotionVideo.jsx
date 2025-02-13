import React from 'react'
import { AbsoluteFill, Sequence, useVideoConfig, Img, useCurrentFrame, interpolate } from 'remotion'

const RemotionVideo = ({ script, imageList, audioFileUrl, captions,  setDurationFrame }) => {
    const { fps } = useVideoConfig();
    const frame = useCurrentFrame();

    const getDurationFrames = () => {
        setDurationFrame( captions?.[captions.length - 1]?.end / 1000 * fps)
        return captions?.[captions.length - 1]?.end / 1000 * fps;
    };

    const durationFrames = getDurationFrames();


    const getCurrentCaptions = () => {
        const currentTime=frame/30*100;//convert frame number to miliseconds
        const currentCaptions = captions.find((word) => currentTime=> word.start && currentTime <= word.end)
        return currentCaptions?currentCaptions?.text:'';
    }

    return (
        <AbsoluteFill className='bg-black'>
            {imageList?.map((item, index) =>{  
                const startTime = Math.floor((index * durationFrames) / imageList?.length);
                const duration = getDurationFrames();

               const scale =(index)=>interpolate(
                frame,
                [startTime,startTime + duration/2,startTime + duration],

                index % 2==0 ?[1,1.8,1]:[1.8,1,1.8],
                {
                    extrapolateLeft:'clamp', extrapolateLeft:'clamp'
                }
               ); 

                
                return
                (

                <Sequence key={index} from={startTime} durationInFrames={durationFrames}>
                <AbsoluteFill style={{justifyContent:'center', alignItems:'center'}}>
                    <Img
                        src={item}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: "cover",
                            transform:`scale(${scale(index)})`
                        }}
                    />
                    <AbsoluteFill style={{color:'white',
                      justifyContent:'center',
                      top:undefined,
                      bottom:50,
                      height:150,
                      textAlign:'center',
                      width:'100%'
                    }} >
                        <h2 className='text-2xl'>
                       {getCurrentCaptions()}
                        </h2>
                    </AbsoluteFill>
                   </AbsoluteFill>
                </Sequence>
            )
            })}
            <Audio src={audioFileUrl}/>
        </AbsoluteFill>
    );
}

export default RemotionVideo;
