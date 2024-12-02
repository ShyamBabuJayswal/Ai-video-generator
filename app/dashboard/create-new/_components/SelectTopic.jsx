"use client"
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';

function SelectTopic() {
  const options = [
    'Custom Prompt',
    'Random AI Story',
    'Scary Story',
    'Historical Story',
    'Bed Time Story',
    'Motivational',
    'Fun Facts'
  ];

  const [selectedOptions,setSelectedOptions] = useState();
  
  return (
    <div>
      <h2 className="font-bold text-xl text-primary">Content</h2>
      <p className="text-gray-500">What is the topic of your video</p>
      <Select onValueChange={(value) => setSelectedOptions(value) }>
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
          {options.map((item, index) => (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedOptions =='Custom Prompt' && 
        <Textarea className="mt-3" placeholder="Write Prompt on which you want to generate video"/>
       }
    </div>
  );
}

export default SelectTopic;
