import Link from 'next/link'
import React from 'react'


const Footer = () => {
    return (
        <div className='flex bg-[#212121] w-[100%] text-white justify-center'>
            <Link href={"/"} className='px-3 py-4 text-sm'>Security & Privacy</Link>
            <Link href={"/"} className='px-3 py-4 text-sm'>Conditions of use</Link>
            <p className='px-3 py-4 text-sm'>©2023-2025 hopefund.org. All rights Reserved</p>
        </div>
    )
}

export default Footer