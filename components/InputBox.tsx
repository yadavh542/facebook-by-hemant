// @ts-nocheck

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { EmojiHappyIcon } from '@heroicons/react/outline';
import { CameraIcon,VideoCameraIcon } from '@heroicons/react/solid';
import { addDoc, collection, doc, orderBy, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import toast from 'react-hot-toast';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

const InputBox = () => {
    const {data:session} = useSession();
    const inputRef:any = useRef("");
    const filePickerRef:any = useRef(null);
    const [imageToPost, setImageToPost] = useState(null);
    const [loading, setLoading] = useState(false);

    const sendPost=async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=> {
        e.preventDefault();
        setLoading(true);

        if(!inputRef.current.value) return;

        // const q: any= query(collection(db,"posts"),orderBy("timestamp","asc"))

        const docRef = await addDoc(collection(db,"posts"),{
            message: inputRef.current.value,
            name: session?.user?.name,
            //email: session?.user?.email,
            profileImg: session?.user?.image,
            timestamp:serverTimestamp(),
          }) 

          console.log("New doc id: ", docRef.id);

        const imageRef = ref(storage, `posts/${docRef.id}/image`);

        await uploadString(imageRef, imageToPost,"data_url").then(async snapshot=>{
            const downloadURL = await getDownloadURL(imageRef);

            await updateDoc(doc(db,'posts',docRef.id),{
                postImage: downloadURL,
            })
        });
        
        removeImage();
                
        inputRef.current.value = '';

        toast.success('👏Message Sent!');
        setLoading(false);
    }; 

    const uploadImageToPost=(e: any)=>{
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent: any) =>{
            setImageToPost(readerEvent.target.result);
        };
    };

    const removeImage=()=>{
        setImageToPost(null);
    }

  return (
    <div className='mt-4 bg-white p-2 rounded-md font-medium'>
        <div className='flex items-center space-x-2 mb-2'>
            {session && <Image
            className='rounded-full cursor-pointer'
            src={session?.user?.image}
            width={40}
            height={40}
            layout='fixed'
            />}
            {/* input search */}
            <form className='flex flex-1'>
                <input 
                type="text" 
                ref={inputRef}
                placeholder={`Whats in your mind, ${session?.user?.name} ?`}
                className='focus:outline-none py-3 px-4 rounded-2xl flex-1 bg-gray-100'
                />
                <button hidden onClick={sendPost} type='submit'>Submit</button>
            </form>
        </div>

        {/* Showing uploaded image */}
        {imageToPost && (
            <div 
            className='flex flex-col filter hover:brightness-110 transition duration-150  cursor-pointer my-2'>
                <img className='h-40 object-contain transform hover:scale-105 mb-2' src={imageToPost} alt="" />
                <p className='text-xs text-red-500 text-center' onClick={removeImage}>Remove</p>
            </div>
        )}

        {/* post button */}
        { imageToPost &&
          <div class="flex space-x-2 justify-center">
          <button 
          disabled={!imageToPost}
          onClick={sendPost}
          type="button" 
          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out cursor-pointer mb-2">
            {loading?"Uploading...":"Post"}</button>
      </div>}


        <hr />

        {/* Icons */}
        <div className='flex justify-between p-2'>

            <div className='flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer space-x-1'>
                <VideoCameraIcon className='text-red-500 h-7'/>
                <p className='text-xs sm:text-sm xl:text-base'>Live Video</p>
            </div>
            <div onClick={()=>filePickerRef.current.click()} className='flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer space-x-1'>
                <CameraIcon className='text-green-500 h-7'/>
                <p className='text-xs sm:text-sm xl:text-base'>Photo/Video</p>
                <input ref={filePickerRef} type="file" onChange={uploadImageToPost} hidden />
            </div>
            <div className='flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer space-x-1'>
                <EmojiHappyIcon className='text-yellow-500 h-7'/>
                <p className='text-xs sm:text-sm xl:text-base'>Feeling</p>
            </div>
            
        </div>
    </div>
  )
}

export default InputBox;