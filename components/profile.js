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
            <img className="w-64 rounded-full mb-2" src={userData.image} />
           <p className='text-3xl font-bold'>{userData.displayName}</p>
           <p onClick={copyAddress} className='bg-gray-100 rounded-full inline-block px-2 py-1 text-gray-500 cursor-pointer'>{copied ? "Copied" : userData.address.substring(0,4) + "... " + userData.address.substring(userData.address.length - 4) } {copied ? <></> : <Image src='/images/clipboard.png' width={15} height={15} />}  </p>
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
           <a className='sm:hidden md:block text-sm text-center text-gray-400' href="/">Made with NFTree</a>
        </div>
    )
}

export default Profile
