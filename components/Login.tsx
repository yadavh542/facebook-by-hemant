import { signIn } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
import { Navigate } from 'react-router-dom';


const Login = () => {

    const onClick = (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
        signIn();
        <Navigate to='/Header'/>
    };
    
  return (
    <div className='grid place-items-center'>
        <Image
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1365px-Facebook_f_logo_%282019%29.svg.png'
            width={200}
            height={200}
            objectFit='contain'
        />
        <h1 onClick={onClick} className='p-5 bg-blue-500 rounded-full text-white mt-5 cursor-pointer'>Login With Facebook</h1>
    </div>
  )
}

export default Login;