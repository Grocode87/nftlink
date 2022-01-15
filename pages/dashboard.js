import React, { useState } from 'react'
import Gallery from '../components/gallery'
import GalleryPreview from '../components/gallery-preview'
import { IFrame } from '../components/iframe'
import dummyData from '../scripts/dummyData.json'



const Dashboard = () => {
   
    const userData = dummyData[0]

    /**
     * Tab Options
     * 
     * - nft
     * - appearance
     * - account
     */
    const tabs = [
        {
            id: 'nft',
            name: 'NFTs',
        },
        {
            id: 'appearance',
            name: 'Appearance',
        },
        {
            id: 'account',
            name: 'Account',
        }
    ]
    const [currTab, setCurrTab] = useState('nft')

    return (
        <div>
            {/* Header */}
            <div className='fixed w-full shadow-lg flex items-center'>
                {tabs.map((tab) => {
                    return (
                        <div className={'text-xl px-16 py-4 ' + (tab.id == currTab ? "border-b-4 border-gray-400" : "")}>
                            <p>{tab.name}</p>
                        </div>
                    )
                })}
            </div>

            <div className='pt-16 flex'>
                <div className='w-1/2'>
                Content
                </div>
                <div className='border-l-2 p-16 w-1/2 flex flex-col items-center'>
                    <p className='font-bold text-lg pb-4'>nftin.bio/{userData.username}</p>
                    
                    <div className='overflow-scroll h-1/2 w-72 rounded-3xl border-8 border-black'>
                        <GalleryPreview userData={userData} />
                        </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps() {




    return {
        props: {
            nfts: [],
            address: ''
        }
    }
}


export default Dashboard;
