"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

const SignIn = () => {

    const {data:session} =useSession(); 
  
    if(session && session.user){
        return(

            <div className='flex justify-center flex-col items-center'>
            <p>{session.user.name}</p>
            <button onClick={()=>signOut()} className='text-red-500'>SignOut</button>
        </div>
        )
    }
    return (
    
        <button onClick={()=>signIn()} className='border bg-black text-white p-2 m-2 rounded-full'>
            Sign in with Google
        </button>

  )
}

export default SignIn
