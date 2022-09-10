import React from 'react';
import InputBox from './InputBox';
import Posts from './Posts';
import Stories from './Stories';

const Feed = () => {
  return (
    <div className='lg:col-span-3 md:col-start-3 mx-40 mt-4 h-screen overflow-y-scroll scrollbar-hide '>
        
            {/* Stories */}
            <Stories/>
            <InputBox/>
            <Posts/>
       
    </div>
  )
}

export default Feed;