// @ts-nocheck

import Image from 'next/image';
import React from 'react';
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  UserGroupIcon,
  ViewGridIcon,
  HomeIcon,
} from '@heroicons/react/solid';
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline';
import HeaderIcon from './HeaderIcon';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Navigate } from "react-router-dom";

const Header = () => {
  const {data:session} = useSession();

  // const signingOut = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //     signOut();
  //     <Navigate to='/Login'/>
  // }

  // const signingIn = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   signIn();
  // }

  return (
    <div className='p-2 lg:px-5 z-50 sticky top-0 bg-white shadow-md justify-between flex items-center h-16'>
      {/* Header Left */}
      <div className='items-center flex space-x-2 w-1/3'> 
            
            <div className='items-center flex w-3/4'>
            {/* facebook logo */}
            <Image
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1365px-Facebook_f_logo_%282019%29.svg.png'
            width={40}
            height={40}
            layout='fixed'
            className='cursor-pointer'
            />

            <div className='bg-gray-100 p-2 rounded-full flex items-center flex-1 ml-2'>
              <SearchIcon className='h-4 w-4 text-gray-500'/>
            
            <input 
            type="text" 
            placeholder='Search'
            className='hidden md:inline-flex bg-transparent outline-none pl-2 flex-shrink'
            />
            </div>
            </div>

            <div className="w-1/4"></div>
      </div>

      {/* Header Middle */}
      <div className='flex items-center flex-grow w-1/3'>
        <div className='flex items-center justify-between flex-grow mx-10'> 

        <HeaderIcon active Icon={HomeIcon}/>
        <HeaderIcon Icon={FlagIcon}/>
        <HeaderIcon Icon={PlayIcon}/>
        <HeaderIcon Icon={ShoppingCartIcon}/>
        <HeaderIcon Icon={UserGroupIcon}/>
        
        </div>
      </div>

      {/* Header Right */}
      <div className='flex items-center flex-grow w-1/3'>
        <div className='w-1/4'></div>
        <div className='flex items-center justify-between flex-grow w-3/4'> 
          <div 
          
          className=' items-center hidden md:inline-flex'> 
            <Image src={session?.user?.image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1365px-Facebook_f_logo_%282019%29.svg.png'}
            height={30}
            width={30}
            
            className='rounded-full cursor-pointer'
            />
            { !session?
              <p onClick={()=>signIn()} className='ml-1 cursor-pointer font-semibold'>Sign In</p>:
            <p onClick={()=>signOut()} className='ml-1 cursor-pointer font-semibold'>Sign Out</p>
            }
          </div>

          <ViewGridIcon className='icon'/>
          <ChatIcon className='icon'/>
          <BellIcon className='icon'/>
          <ChevronDownIcon className='icon'/>
          
          
        </div>
      </div>

      
    </div>
  )
}

export default Header