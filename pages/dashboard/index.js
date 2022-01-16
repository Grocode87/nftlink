import React, { useState, useEffect } from 'react'
import Gallery from '../../components/gallery'
import GalleryPreview from '../../components/gallery-preview'
import { IFrame } from '../../components/iframe'
import dummyData from '../../scripts/dummyData.json'
import axios from 'axios'
import ManageNfts from '../../components/dashboard/manage-nfts'
import Appearance from '../../components/dashboard/appearance'
import Account from '../../components/dashboard/account'

const Dashboard = ({ nfts }) => {

useEffect(() => {
    console.log("nfts: ", nfts)
}, [])
   
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
            <div className='fixed w-full bg-white shadow-lg flex items-center z-50'>
                {tabs.map((tab) => {
                    return (
                        <button onClick={() => {setCurrTab(tab.id)}}>
                        <div className={'text-xl px-16 py-4 hover:bg-gray-50 ' + (tab.id == currTab ? "border-b-4 border-gray-400" : "")}>
                            <p>{tab.name}</p>
                        </div>
                        </button>
                    )
                })}
            </div>

            <div className='pt-16 flex'>
                <div className='w-1/2'>
                    {
                        currTab == 'nft' && <ManageNfts userNfts={userData.nfts}/>
                    }
                       {
                        currTab == 'appearance' && <Appearance />
                    }
                       {
                        currTab == 'account' && <Account />
                    }
                </div>


                {/** Preview */}
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

    const {data} = await axios.post("http://localhost:3000//api/get-rarible",
      {address: "0x8c5ed3bfbe9c0f294a12ceaed360797b440bca3d"}
    )
    
    return {
        props: {
            nfts: data.nfts,
        }
    }
}


export default Dashboard;
