// @ts-nocheck

import React, { useEffect, useState } from 'react';
import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon,
    HandThumbUpIcon,
    HandIcon,
    ChatAltIcon,
    ThumbUpIcon,
} from "@heroicons/react/outline";
import {
    ThumbUpIcon as ThumbUpIconFilled,
    HeartIcon as HeartIconFilled,
    
} from "@heroicons/react/solid";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useSession } from 'next-auth/react';
import Moment from 'react-moment';
import PostMenu from './PostMenu';


const Post = ({id,username,img,userImg,caption}:any) =>{
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const { data: session}:any = useSession();
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);

    // Fetch comments from firebase
    useEffect(() => 
        onSnapshot(query(collection(db, 'posts',id,'comments'),orderBy('timestamp','desc')),
        (snapshot:any)=>setComments(snapshot.docs))
    ,[db,id]);
    
    // send comment to firebase
    const sendComment=async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        const commentToSend = comment;
        setComment("");

        await addDoc(collection(db, 'posts', id, 'comments'),{
            comment: commentToSend,
            username: session?.user?.name,
            userImage: session?.user?.image,
            timestamp:serverTimestamp(),
        })
    }

    // Fetch Likes from firebase
    useEffect(() => 
        onSnapshot(collection(db, 'posts',id,'likes'),
        (snapshot:any)=>setLikes(snapshot.docs))
    ,[db,id]);

    // Send Likes to firebase
    const sendLikes = async () => {

        if(hasLiked){
            await deleteDoc(doc(db, 'posts',id,'likes',session?.user.uid));
        }else{
            await setDoc(doc(db, 'posts', id, 'likes',session?.user.uid),{
                username:session?.user.username,
            });
        }    
    }

    // setHasLiked

    useEffect(() =>
        
        setHasLiked(likes.findIndex((like:any)=>
        like.id === session?.user?.uid)!== -1)
       
       ,[likes]);


  return (
    <div className='my-4 border bg-white rounded-md'>

        {/* header */}
        <div className='flex items-center p-3 '>
            <img className='h-10 w-10 items-center rounded-full object-contain border p-[1.5px]' src={userImg} alt="" />
            <p className='flex-1 ml-2 font-bold'>{username}</p>
            <PostMenu/>
        </div>

        {/* caption */}
        <p className='pl-4 mb-2'>{caption}</p>

        {/* img */}
        <img src={img} className='w-full object-contain' alt="" />

        {/* Likes & Comments Count Show */}
        <div className='flex justify-between items-center px-5 mt-1'>

        <div className='flex space-x-1 items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-500 ">
            <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
            </svg>
          <p className='font-semibold text-sm p-1'>{likes.length}</p>
        </div>
        <p className='font-semibold text-sm p-3'>{comments.length} comments</p>
        </div>

        {/* Like & Comment Icons  */}
        <hr className='mx-5'/>
        <div className='px-5 my-2 flex justify-evenly'> 

        <div className='flex space-x-2'>
            {hasLiked?<ThumbUpIconFilled onClick={sendLikes} className='postBtn text-blue-500 -rotate-12 hover:rotate-12' />:
            <ThumbUpIcon onClick={sendLikes} className='postBtn hover:text-blue-500 -rotate-12 hover:rotate-12'/>
            }
            <p className={hasLiked? 'font-semibold text-blue-500':'font-semibold text-gray-500'}>Like</p>
        </div>

        <div className='flex space-x-2'>
            <ChatAltIcon className='postBtn'/>
            <p className='font-semibold cursor-pointer text-gray-500'>Comment</p>
        </div>
       
        </div>
        <hr className='mx-5 mb-4'/>
        

        {/* comments */}
        {comments.length>0 && (
            <div className=' h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin px-6 py-4'>
                { 
                    comments.map(comment =>(
                        <div key={comment.id} className='flex items-center space-x-2 mb-3 text-sm px-5'>
                            {/* <hr className='absolute left-5 top-10 h-8 border-x border-black'/> */}
                            <img 
                            className='h-6 w-6 rounded-full'
                            src={comment.data().userImage} alt="userImage" />
                            <p className=' ml-2 flex-1'><span className='font-bold '>{comment.data().username}    </span>{comment.data().comment}</p>
                            
                            <Moment className='font-semibold text-gray-500 text-xs' fromNow>{comment.data().timestamp?.toDate()}</Moment>
                        </div>
                    ))
                    
                }
            </div>
        )}

        {/* input box */}
        <form className='flex items-center p-3 space-x-1'>
            <img className='h-8 w-8 rounded-full object-contain' src={userImg}/>
            
            <div className='flex items-center border-none flex-1 focus:ring-0 outline-none bg-gray-100 rounded-xl'>
            <input 
            value={comment}
            onChange={(e:any)=>setComment(e.target.value)}
            type="text"
            placeholder='Write a Comment...'
            className='border-none flex-1 focus:ring-0 outline-none bg-gray-100 rounded-full px-4 py-2 '
            />
            <EmojiHappyIcon className='postBtn mr-5'/>
            </div>
            <button 
            hidden
            type='submit'
            disabled={!comment.trim()}
            onClick={sendComment}
            className='font-semibold text-blue-500'>Post</button>
        </form>


    </div>
  )
}

export default Post;