import React from 'react'
import Link from 'next/link'

export default function EditBar() {
  return (
    <div className='flex justify-center' >
        <div className='flex text-black md:w-[50vw] w-[90vw]   justify-center gap-10 font-bold rounded-xl shadow-xl  '>
            <Link href='/editProfile/gallery' className='bg-yellow-500 mb-3 underline-offset-1 text-white px-4 rounded-xl py-2' >Gallery</Link>
            <Link href='/editProfile/profile' className='bg-yellow-500 mb-3 underline-offset-1 text-white px-4 rounded-xl py-2' >Profile</Link>
            <Link href='/editProfile/service' className='bg-yellow-500 mb-3 underline-offset-1 text-white px-4 rounded-xl py-2' >Service</Link>
            
        </div>
    </div>
  )
}
