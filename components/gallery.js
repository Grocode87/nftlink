import React from 'react'
import Nft from './nft'
import Profile from './profile'

const Gallery = ({ userData }) => {
    return (
        <>
            {/* Banner */ }
            <div className='h-56 absolute bg-blue-400 w-full -z-10'/>
            <div className='flex flex-col md:flex-row z-10'>
                {/* User profile */}
                <div className='pt-12 md:pt-20 w-full md:w-96'><Profile userData={userData}/></div>
                {/* Actual NFTs */}
                <div className='pt-64 grid md:w-full md:grid-cols-3 grid-cols-1 gap-16 content-center align-center px-6 '>
                    {userData.nfts?.map((nft) => {
                        return <Nft key={nft} nft={nft}/>
                    })}
                    
                </div>
            </div>
        </>
    )
}

export default Gallery