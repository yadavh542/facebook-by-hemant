import React from 'react';
import SidebarIcon from './SidebarIcon';
import {
    BellIcon,
    ChatIcon,
    ChevronDownIcon,
    UserGroupIcon,
    ViewGridIcon,
    ShoppingBagIcon,
  } from '@heroicons/react/solid';
  import {
    CalendarIcon,
    ClockIcon,
    UsersIcon,
    DesktopComputerIcon,
    ShoppingCartIcon,
  } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';

const Sidebar = () => {
    const {data:session} = useSession();

  return (
    <div className='md:col-span-1 md:col-start-1 p-2 mt-4 max-w-[600px] xl:min-w-[250px] '>
        {session && <SidebarIcon src={session?.user?.image} title={session?.user?.name}/>}
        <SidebarIcon Icon={UsersIcon} title='Friends'/>
        <SidebarIcon Icon={UserGroupIcon} title='Group'/>
        <SidebarIcon Icon={ShoppingBagIcon} title='MarketPlace'/>
        <SidebarIcon Icon={DesktopComputerIcon} title='Watch'/>
        <SidebarIcon Icon={CalendarIcon} title='Events'/>
        <SidebarIcon Icon={ClockIcon} title='Memories'/>
        <SidebarIcon Icon={ChevronDownIcon} title='See More'/>
    </div>
  )
}

export default Sidebar;