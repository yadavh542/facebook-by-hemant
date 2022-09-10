import React from 'react';

const ContactRow = ({img,fname,lname}:any) => {
  return (
    <div className='flex items-center hover:bg-gray-200 p-2 cursor-pointer rounded-md'>
        <img src={img} className='rounded-full h-8 w-8 p-1 border-pink-400' />
        <p className='font-semibold text-sm'>{fname} {lname}</p>
    </div>
  )
}

export default ContactRow;