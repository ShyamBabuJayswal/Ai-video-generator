import Image from 'next/image';
import React, { useState } from 'react';

function SelectStyle({onUserSelect}) {
    const styleOptions = [
        {
            name: 'Realistic',
            image: '/real.jpg',
        },
        {
            name: 'Cartoon',
            image: '/cartoon.jpg',
        },
        {
            name: 'Comic',
            image: '/comic.jpg',
        },
        {
            name: 'WaterColor',
            image: '/watercolor.jpg',
        },
        {
            name: 'GTA',
            image: '/gta.jpg',
        },
        {
            name: 'Historic',
            image: '/Historic.jpg',
        },
    ];
const [selectedOptions,setSelectedOptions] = useState();

    return (
        <div className='mt-7'>
            <h2 className="font-bold text-xl text-primary">Style</h2>
            <p className="text-gray-500">Select Your Video Style</p>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-col-6 gap-5 mt-3'>
                {styleOptions.map((item, index) => (
                    <div key={index} className={`relative hover:scale-105 transition-all cursor-pointer rounded-xl ${selectedOptions==item.name && 'border-4 border-primary'}`}>

                        <Image src={item.image} width={100} height={100} alt={item.name} className='h-48 object-cover rounded-lg w-full'
                        onClick={() => {setSelectedOptions(item.name)
                        onUserSelect('imageStyle',item.name)
                        }}
                        />

                        <h2 className='absolute p-1 bg-black bottom-0 w-full text-white text-center rounded-lg'>{item.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SelectStyle;
