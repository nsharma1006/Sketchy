"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'



const RoomCreateComponent = () => {
    const getUserId =  async() => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/me` , {
            withCredentials : true
        })
        console.log(res.data.userId)
        return res.data.userId
    }
   
  const [name , setName] = useState<string>("")
  const router = useRouter()
  const handleSubmit = async(data : {name :string , 
    userId : string
  }) => {
    const userId = await getUserId()
    data.userId = userId
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/room` , data , {
        withCredentials : true
      })
      const formdata = response.data
      console.log(formdata)
      router.replace("/room")
  }
  
  
  return (
    <div className='min-h-max min-w-max flex flex-col justify-center items-center gap-2 mt-10 ' >

        
        <div className='p-2'>
          <h1 className='text-lg font-semibold'>Enter Room Name</h1>
          <input className='border p-2 rounded-lg w-80 shadow-2xl ' type='email' placeholder='Enter room Name' value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        
        <div className='px-6 py-4 rounded-xl bg-amber-200 cursor-pointer ' onClick={() => handleSubmit({name : name , userId : ""})}>Create Room</div>
       
    </div>
  )
}





export default RoomCreateComponent