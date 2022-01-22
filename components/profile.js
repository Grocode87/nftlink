import React, { useState }  from 'react'
import Image from 'next/image';

const Profile = ({ userData }) => {
     const [copied, setCopied] = useState(false)


    const copyAddress = () => {
        const address = userData.address;
        navigator.clipboard.writeText(address)
        setCopied(true)
            setTimeout(() => {
                setCopied(false)  
            }, 2000)
    }

    return (
        <div className='p-12 space-y-2 flex flex-col items-center md:items-baseline'>
            <img className="w-64 rounded-full mb-2 border-white border-8" src={userData.image} />
           <p className='text-3xl font-bold'>{userData.displayName}</p>
           <p onClick={copyAddress} className='bg-gray-100 rounded-full inline-block px-2 py-1 text-gray-500 cursor-pointer'>{copied ? "Copied" : userData.address.substring(0,4) + "... " + userData.address.substring(userData.address.length - 4) } {copied ? <></> : <Image src='/images/clipboard.png' width={15} height={15} />}  </p>
           <p>{userData.description}</p>
           <div className='pt-4'>
               {userData.socials.twitter && (
                    <div className='my-2'>
                    <a className=""href={`https://twitter.com/${userData.socials.twitter}`}>
                   <div className='flex items-center bg-gray-100 rounded-full px-3'>
                        <div className='mt-1 mr-2'>
                        <Image src="/images/social/twitter.png" width={20} height={20} />
                        </div>      
                    @{userData.socials.twitter}</div>
                    </a>
                    </div>  
               )}

                {userData.socials.website && (
                     <div className='my-2'>
                    <a className=""href={`https://${userData.socials.website}`}>
                 <div className='flex items-center bg-gray-100 rounded-full px-3'>
                 
                    <div className='mt-1 mr-2'>
                        <Image src="/images/social/website.png" width={20} height={20}/>
                        </div>
                    {userData.socials.website}
                    </div>
                    </a>
                    </div>  
               )}

                {userData.address && (
                <div className='my-2'>
                    <a className=""href={`https://rarible.com/user/${userData.address}`}>
                    <div className='flex items-center bg-gray-100 rounded-full px-3'>
                    <div className='mt-1 mr-2'>
                        <Image src="/images/social/rarible.png" width={20} height={20}/>
                    </div>
                    Rarible
                    </div>
                    </a>
                    </div>
               )}
               
           </div>
           <a className='sm:hidden md:block text-sm text-center text-gray-400' href="/">Made with NFTree</a>
        </div>
    )
}

export default Profile
