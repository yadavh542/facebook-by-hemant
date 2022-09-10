import React from 'react'

type Props={
    name: string
    profile: string
    src:string
}

const StoryCard = ({name, profile, src}: Props) => {
  return (
    <div className='sm:rounded-full md:rounded-full lg:rounded-xl p-1 relative h-14 w-14 md:h-20 md:w-20 lg:h-56 lg:w-36 cursor-pointer overflow-x transition duration-200 transform ease-in hover:scale-105 hover:animate-pulse'>
        
        <img src={profile} 
        className="lg:absolute md:relative opacity-0 lg:opacity-100 rounded-full z-50 lg:top-5 object-cover lg:h-10 lg:w-10 md:h-20 md:w-20 h-14 w-14 ml-1" />
        <img src={src} 
        className="hidden lg:inline rounded-xl object-cover filter brightness-75 lg:rounded-xl lg:h-56 lg:w-36" />
        <p className='absolute opacity-0 lg:opacity-100 bottom-4 w-5/6 text-blue-500 text-sm font-bold truncate ml-1'>{name}</p>
    </div>
  )
}

export default StoryCard;