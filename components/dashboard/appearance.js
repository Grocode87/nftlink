import React, { useState } from 'react'
import { ChromePicker } from 'react-color';

const Appearance = () => {
    const [fromColor, setFromColor] = useState()
    const [toColor, setToColor] = useState()
    
    return (
        <div className='p-12 px-32'>
            <div>
                <p className='text-2xl font-semibold pb-4'>Profile</p>
                <div className='bg-white rounded-xl border shadow-lg p-4'>
                    <p className='pb-2'>Profile Title</p>
                    <input className='w-full border-b p-2' defaultValue="Colin Grob"></input>

                    <p className='pt-8 pb-2'>Bio</p>
                    <textarea className='w-full h-40 border p-2' placeholder='Enter a bio to appear in your NFTinBio page'></textarea>
                </div>
            </div>

            <div className='mt-20'>
                <p className='text-2xl font-semibold pb-4'>Theme</p>

                <div className='bg-white rounded-xl border shadow-lg'>
                    <div className='h-36 bg-gradient-to-r from-cyan-500 to-blue-500 w-full'/>

                    <div className='p-4 text-lg'>
                    <div className='flex justify-between relative'>
                        <p>Header Gradient:</p>
                        <div>
                            <span>From: #00000</span>
                            <span className='pl-4'>To: #000000</span>
                        </div>
                        <ChromePicker className='absolute right-0 top-7' color={fromColor} onChangeComplete={(color) => setFromColor(color.hex)}/>
                    </div>

                    <div className='flex justify-between pt-8'>
                        <p className='font-bold'>Dark Mode:</p>
                        <p>TOGGLE</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Appearance
