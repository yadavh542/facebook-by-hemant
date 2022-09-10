import React from 'react';
import Feed from '../components/Feed';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Widgets from '../components/Widgets';

const HomePage = () => {
  return (
    <div className='h-screen bg-gray-100 overflow-hidden'>
        {/* Header */}
        <Header/>

        <main className='flex grid-cols-7'>
        {/* Sidebar  */}
        <Sidebar/>
        {/* Feed  */}
        <Feed/>
        {/* widgets  */}
        <Widgets/>
        </main>

    </div>
  )
}

export default HomePage;