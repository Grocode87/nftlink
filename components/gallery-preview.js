import React from 'react'
import Nft from './nft'

import Image from 'next/image';


const GalleryPreview = ({ userData }) => {
    return (
        <>
            {/* Banner */ }
            <div className='h-40 -mb-28 bg-gradient-to-r from-cyan-500 to-blue-500 w-full -z-10'/>
            <div className='flex flex-col z-10'>
                {/* User profile */}
                <div className='w-full'>

                    <div className='p-12 space-y-2 flex flex-col items-center'>
                        <div className='px-10'>
                        <img className="rounded-full mb-2" src={userData.image} />
                        </div>
                        <p className='text-3xl font-bold'>{userData.displayName}</p>
                        <p className='bg-gray-100 rounded-full inline-block px-2 py-1 text-gray-500 text-xs'>{userData.address.substring(0,4) + "... " + userData.address.substring(userData.address.length - 4)}</p>
                        <p>{userData.description}</p>
                        <div className='pt-4'>
                            {userData.socials.twitter && (
                                    <a className="pr-2"href={`https://twitter.com/${userData.socials.twitter}`}>
                                        <Image src="/images/social/twitter.png" width={20} height={20}/>
                                    </a>
                            )}

                                {userData.socials.rarible && (
                                    <a className="pr-2"href={`https://rarible.com//${userData.socials.rarible}`}>
                                        <Image src="/images/social/rarible.png" width={20} height={20}/>
                                    </a>
                            )}

                                {userData.socials.website && (
                                    <a className="pr-2"href={`https://${userData.socials.website}`}>
                                        <Image src="/images/social/website.png" width={20} height={20}/>
                                    </a>
                            )}
                        </div>
                        
                    </div>

                </div>
                {/* Actual NTs */}
                <div className='grid grid-cols-1 gap-16 content-center align-center px-14'>
                    {userData.nfts?.map((nft) => {
                        return (
                        <div className='m-auto flex-col group hover:cursor-pointer'>
                            <img className="w-full rounded-2xl mb-2 group-hover:drop-shadow-lg ease-in duration-200" src={nft.image} />
                            <p className='text-sm text-gray-400 px-2'>{nft.collection}</p>
                            <h2 className='text-lg font-bold px-2'>{nft.name}</h2>
                            <div className='flex w-full justify-between items-center px-2'>
                                <p className='text-sm text-gray-400'>Current bid:</p>
                                {/* Bid price */}
                                <p><span className='font-bold'>{nft.price}</span> <span className='text-gray-400'>ETH</span></p>
                            </div>
                        </div>
                        )
                    })}
                    
                </div>
                             
   {/* Our logo */}
   <a className='text-sm text-center text-gray-400 my-4' href="/">Made with NFTinBio</a>

               </div>
        </>
    )
}

export default GalleryPreview