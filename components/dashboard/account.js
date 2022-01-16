import React from 'react'

const Account = () => {
    return (
        <div className='flex flex-col items-center py-10 px-8'>
            
          <div className='flex flex-col items-center shadow-md  rounded-xl w-5/6 p-4'>
                <h1 className='font-bold text-lg mb-4'>Update Socials</h1>
                 <input className='w-4/6 border rounded-md p-2 my-2' type="text" placeholder='Twitter' />              
                <input className='w-4/6 border rounded-md p-2 my-2' type="text" placeholder='Rarible' />
                <input className='w-4/6 border rounded-md p-2 my-2' type="text" placeholder='Website' />


          </div>
        </div>
    )
}

export default Account
