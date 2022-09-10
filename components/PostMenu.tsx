// @ts-nocheck

import React from 'react';
import { Menu,Transition } from '@headlessui/react';
import {
    DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const PostMenu = () => {

    const deletePost=async()=>{
        await deleteDoc(doc(db, 'posts',doc.id));
    }

  return (
    <div>
       <Menu>
      <Menu.Button><DotsHorizontalIcon className='h-6'/></Menu.Button>
      <Menu.Items>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`text-sm text-black font-semibold  p-2 ${active && 'bg-blue-500 p-2 cursor-pointer rounded-md text-white'}`}
              onClick={deletePost}
            >
              Delete Post
            </a>
          )}
        </Menu.Item>
        {/*
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active && 'bg-blue-500'}`}
              href="/account-settings"
            >
              Documentation
            </a>
          )}
        </Menu.Item>
         <Menu.Item disabled>
          <span className="opacity-75">Invite a friend (coming soon!)</span>
        </Menu.Item> */}
      </Menu.Items>
    </Menu>
    </div>
  )
}

export default PostMenu;