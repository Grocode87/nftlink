import React from 'react'
import Image from 'next/image';

const Profile = ({ userData }) => {

    return (
        <div className='p-12 space-y-2 flex flex-col items-center md:items-baseline'>
            <img className="w-64 rounded-full mb-2" src={userData.image} />
           <p className='text-3xl font-bold'>{userData.displayName}</p>
           <p className='bg-gray-100 rounded-full inline-block px-2 py-1 text-gray-500'>{userData.address.substring(0,4) + "... " + userData.address.substring(userData.address.length - 4)}</p>
           <p>{userData.description}</p>
           <div className=''>
               
               <Image src="/images/social/twitter.png" width={20} height={20}></Image>
               <Image src="/images/social/rarible.png" width={20} height={20}></Image>
               <Image src="/images/social/website.png" width={20} height={20}></Image>
               <Image src="/images/social/email.png" width={20} height={20}></Image>
           </div>
        </div>
    )
}

export default Profile
