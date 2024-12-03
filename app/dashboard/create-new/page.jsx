"use client"
import React, { useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle';

function CreateNew() {

    const [formData,setFormData] = useState([]);
    const onHandleInputChange = (feildName,feildValue) => {
        console.log(feildName,feildValue);
        


    }
  return (
    <div className='md:px-20'>
        <h2 className='font-bold text-4xl text-primary text-center'>Create New</h2>

        <div className='mt-10 shadow-md p-10'>
            {/*Select Topic*/}
            <SelectTopic onUserSelect={onHandleInputChange}/>
            {/*Select Style*/}
            <SelectStyle onUserSelect={onHandleInputChange}/>
             {/*Duration*/}
              {/*Create Button*/}
        </div>
    </div>
  )
}

export default CreateNew