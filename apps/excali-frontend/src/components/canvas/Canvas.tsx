"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import RoomCanvas from './RoomCanvas'


const Canvas = ({roomId} : {
    roomId : number
}) => {

    const [socket , setSocket] = useState<WebSocket | null>(null)


    useEffect(()=>{
        const token = document.cookie
  .split("; ")
  .find((row) => row.startsWith("JWT_TOKEN="))
  ?.split("=")[1];
  console.log(token);
  if(!process.env.NEXT_PUBLIC_BACKEND_WS_URL ) return
        const ws = new WebSocket(`${process.env.NEXT_PUBLIC_BACKEND_WS_URL}${token}`)
        
        ws.onopen = () => {
            console.log("Scoket set")
            setSocket(ws)
        }
    } , [roomId])
    

    if(!socket) return (
        <div>Connecting to socket by canvas ..............</div>
    )
    socket.send(JSON.stringify({
        "type" : "join-room",
        "roomId" : roomId
    }))
  return (

    <div>
        <RoomCanvas roomId={roomId} socket={socket}/> 
        
    </div>
  )
}




export default Canvas