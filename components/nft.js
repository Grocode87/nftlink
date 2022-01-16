import React from 'react'


const Nft = ({ nft }) => {
    return (
        <a href={`https://rarible.com/token/${nft.id}?tab=details`}>
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
        </a>
    )
}

export default Nft;