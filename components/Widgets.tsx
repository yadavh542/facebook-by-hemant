// @ts-nocheck

import React, { useEffect, useState } from 'react';
import {
  VideoCameraIcon,
  SearchIcon,
  DotsHorizontalIcon,
}from '@heroicons/react/outline';
import ContactRow from './ContactRow';

const Widgets = () => {
  const [ads, setAds] = useState([]);
  const [contacts, setContacts] = useState([]);

  
    fetch('https://dummyjson.com/products?limit=2')
    .then(res=>res.json())
    .then(data=>setAds(data))
    .catch(e=>console.log(e));
  
  
    fetch('https://reqres.in/api/users?page=2')
    .then(res=>res.json())
    .then(data=>setContacts(data))
    .catch(e=>console.log(e));

  return (
    <div className='lg:col-span-1 lg:col-start-7 mt-4 pr-2 max-w-[600px] xl:min-w-[250px] hidden lg:inline items-end overflow-y-scroll h-screen scrollbar-hide'>
      <div className='flex-end'>
      
        {/* Sponsored */}
        {ads && ads?.products?.map(ad=>(
          <>
          <h2 className='font-semibold'>Sponsored</h2>
          <div className='flex py-2'>
          <img className='h-36 w-36' src={ad.thumbnail} alt="adsImage" />
          <div className='ml-2'>
            <h4>{ad.title}</h4>
            <p>{ad.brand}</p>
          </div>
        </div>
        </>
        ))
      }

      {/* Contacts */}
      <div className='flex justify-between mb-2'>
        <h2 className='font-semibold'>Contacts</h2>
        <div className='flex space-x-2'>
          {/* icons */}
          <VideoCameraIcon className='h-5 w-5 text-gray-500 cursor-pointer'/>
          <SearchIcon className='h-5 w-5 text-gray-500 cursor-pointer'/>
          <DotsHorizontalIcon className='h-5 w-5 text-gray-500 cursor-pointer'/>
        </div>
      </div>

      {/* contacts list */}

      { contacts && contacts?.data?.map(c=>(
          <ContactRow img={c.avatar} fname={c.first_name} lname={c.last_name}/>
      ))
      }
      
      </div>        
    </div>
  )
}

export default Widgets;