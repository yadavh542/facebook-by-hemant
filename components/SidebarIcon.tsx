import Image from 'next/image';
import React from 'react';

const SidebarIcon = ({Icon,title,src}:any) => {
  return (
    <div className='flex items-center space-x-2 p-4 hover:bg-gray-200 rounded-xl cursor-pointer'>
        {Icon && (<Icon className='h-6 w-6 text-blue-500'/>)}
        
        {src && (
            <Image
            className='rounded-full'
            src={src}
            width={30}
            height={30}
            layout='fixed'
            />
        )}
        <h4 className='hidden lg:inline-flex font-medium md:inline-flex'>{title}</h4>
    </div>
  )
}

export default SidebarIcon;