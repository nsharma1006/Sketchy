import Canvas from "@/components/canvas/Canvas"
import RoomCanvas from "@/components/canvas/RoomCanvas"
import axios from "axios"


let valid = false
const getRoomId = async (roomName:string) => {
      try {
        
        const response = await axios.get(`${process.env.BACKEND_URL}/room/${roomName}`)
        const data = response.data
        
        if(!data.room?.id){
          return
        }
        valid = true
        return data.room.id
      } catch (error) {
        console.error("getRoomId error:", error);
        return null
      }
    }

const Room = async({params} : {
    params : Promise<{roomId : string}>
}) => {
  let roomUid = 0
    try {
      const {roomId} = await params
      roomUid = await getRoomId(roomId)
      console.log( "Room Id: " , roomUid)
    } catch (error) {
      console.log("error in fetch roomUid")
      console.error(error)
    }
    
  if(!valid){
    return (
      <div>No such room exist</div>
    )
  }  
  return (
    
    <Canvas roomId={roomUid} />

  )
}

export default Room