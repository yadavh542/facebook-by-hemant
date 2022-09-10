import React from 'react';

const HeaderIcon = ({Icon, active}:any) => {
  return (
   
    <div
    className='text-gray-500 cursor-pointer hover:bg-gray-100 p-3 m-1 rounded-xl active:border-b-2 active:border-blue-500 group'
    >
        <Icon className={`h-6 w-6 group-hover:text-blue-500 ${active  &&'text-blue-500'}`}/>
    </div>
    
  )
}

export default HeaderIcon;