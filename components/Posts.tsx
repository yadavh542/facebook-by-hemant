// @ts-nocheck

import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React,{useState,useEffect} from 'react';
import { db } from '../firebase';
import Post from './Post';

const Posts = () => {
  const [posts, setPosts] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db,'posts'),orderBy('timestamp', 'desc')),(snapshot:any)=>{
            setPosts(snapshot.docs);
        });

        return()=>{
            unsubscribe();
        }
    },[db])

  return (
    <div>
         {posts?.map((post) => (
            <Post
                key={post.id}
                id={post.id}
                username={post.data().name}
                userImg={post.data().profileImg}
                img={post.data().postImage}
                caption={post.data().message}
            />
        ))}
        

    </div>
  )
}

export default Posts;