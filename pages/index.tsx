import type { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import HomePage from './HomePage'
import Login from '../components/Login'
import Header from '../components/Header'
import { Toaster } from 'react-hot-toast'

const Home = ({session}:any) => {
  // const {data:session} = useSession();

  return (
    <div className="">

      <Head>
        <title>Facebook By Hemant</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster/>

      {/* { session? <HomePage/> : <Login/> 
        
      } */}

      <HomePage/>

    </div>
  )
}

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session: any | null = await getSession(context);

    return {
      props:{
        session
      }
    }
}
