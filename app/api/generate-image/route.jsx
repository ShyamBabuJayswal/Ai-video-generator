import { NextResponse } from "next/server";
import Replicate from "replicate";
export async function POST(req){
try {

     const {prompt} = await request.json()   
 const replicate = new Replicate({
    auth:process.env.REPLICATE_API_TOKEN
 });

const input = {
    prompt:prompt,
    height:1280,
    width:1024,
    num_output:1
};

const output = await replicate.run("bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637", { input });
console.log(output);
return NextResponse.json({'result':output[0]})


        
    } catch (error) {

        
    }
}