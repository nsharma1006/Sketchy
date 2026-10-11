"use client"

// import { initDraw } from "@/draw/initDraw"

import { useEffect, useRef, useState } from "react"
import IconButton from "../ui/IconButton"
import { Circle, MessageSquareMore, Pencil, RectangleHorizontalIcon, Text, Type } from "lucide-react"
import { DrawClass, Shape, Tool } from "@/draw/DrawClass"


const RoomCanvas = ({roomId , socket}  : {
    roomId : number,
    socket : WebSocket | null
}) => {
    const [selectedTool , setSelectedTool] = useState<Tool>("rectangle")
    const canvasRef = useRef< HTMLCanvasElement>(null)
    const [draw , setDraw] = useState<DrawClass>()

    useEffect(()=>{
        draw?.setTool(selectedTool)
    } , [selectedTool , draw])
    useEffect(
        () => {
            if(canvasRef.current){
                if(!socket) return 
                const draw = new DrawClass(canvasRef.current , roomId , socket) 
                setDraw(draw)
                return () => {
                    draw.destroy()
                }
            }
        },
        
        [canvasRef]
    )
  return (
    <>
    <canvas ref={canvasRef} className="fixed  w-screen h-screen "/>
    <div className="absolute bottom-0 right-10 bg-white">
        <TopBar selectedTool={selectedTool} setSelectedTool={setSelectedTool}/>
    </div>
    </>
  )
}

const TopBar = ({selectedTool , setSelectedTool} : {
    selectedTool : Tool ,
    setSelectedTool : (s : Tool) => void,
}) => {
    return(
        <div className="fixed top-10 left-10">
            <div className="flex gap-2">
                <IconButton icon={<RectangleHorizontalIcon/>} onClick={()=>{
                    setSelectedTool("rectangle")
                }} activated={selectedTool === "rectangle"} />
                <IconButton icon={<Circle/>} onClick={()=>{
                    setSelectedTool("circle")
                }}  activated={selectedTool === "circle"}  />
                <IconButton icon={<Type/>} onClick={()=>{
                    setSelectedTool("text")
                }}   activated={selectedTool === "text"} />
            </div>
        </div>
    )
}

export default RoomCanvas