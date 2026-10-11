import RoomCard from '@/components/room/RoomCard'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'


const getRooms = async() => {
    const response = await axios.get(`${process.env.BACKEND_URL}/room`)
    const roomData = response.data
    return roomData.room    
}

type RoomParams = {
  id: number, name: string, createdAt: Date, adminId: string
}

const Room = async() => {
  const rooms:RoomParams[] = await getRooms()
  
  return (
    <div className='grid grid-cols-5 mx-10 cursor-pointer p-2 py-4' >
      {rooms.map((room , index)=>(
        <Link key={index}  href={`/room/${room.name}`} >
          <RoomCard name={room.name} id={room.id} />
        </Link>
      ))}
    </div>
    
  )
}

export default Room