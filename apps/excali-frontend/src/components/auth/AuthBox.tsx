"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


const AuthBox = ({isSignIn } : {
  isSignIn : boolean,
  
}) => {
  
  const router = useRouter()
  const handleSignUp = async(data: {
    name ?: string,
    email: string;
    password: string;
  })=>{
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signup` , data, {
        withCredentials : true
      })
      const formdata = response.data
      console.log(formdata)
      router.push("/room")

    } catch (error) {
      console.log("Error in fetching axios")
      console.log(error)
    }

  }
  const handleSignIn = async(data: {
    email: string;
    password: string;
  })=>{

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signin` , data , {
        withCredentials : true
      })
      const formdata = response.data
      console.log(formdata)
      router.push("/room")

    } catch (error) {
      console.log("Error in fetching axios")
      console.log(error)
    }
  }
  const handleSubmit = () => {
    
    if(isSignIn){
      handleSignIn(
        {
          email,
          password
        }
      )
    }else{
      handleSignUp({
        name,
        email,
        password
      })
    }
    
  }
  const [name , setName] = useState<string>("")
  const [email , setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  
  return (
    <div className='min-h-max min-w-max flex flex-col justify-center items-center gap-2 mt-10 ' >

        {!isSignIn && 
          <div className='p-2'>
          <h1 className='text-lg font-semibold'>Enter Name</h1>
          <input className='border p-2 rounded-lg w-80 shadow-2xl ' type='text' placeholder='Enter your name' value={name} onChange={(e)=>setName(e.target.value)}  />
          </div>
        }
        <div className='p-2'>
          <h1 className='text-lg font-semibold'>Enter email</h1>
          <input className='border p-2 rounded-lg w-80 shadow-2xl ' type='email' placeholder='Enter your email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className='p-2'>
          <h1 className='text-lg font-semibold'>Enter password</h1>
          <input className='border p-2 rounded-lg w-80 shadow-2xl ' type='password' placeholder='Enter your password' value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        
        <div className='px-6 py-4 rounded-xl bg-amber-200 cursor-pointer ' onClick={() => handleSubmit()}>{
          isSignIn ? "Sign In" : "Sign Up"}
          </div>
       
    </div>
  )
}

export default AuthBox