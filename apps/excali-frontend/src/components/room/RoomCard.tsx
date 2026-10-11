import React from 'react'

const RoomCard = ({name , id} : {
    name : string,
    id : number

}) => {
  return (
        <div className='flex flex-col justify-center items-center '>
            
                <div className='h-60 w-60 bg-black m-2 flex justify-center border items-center shadow-2xl rounded-xl'>
                <h1 className='flex  text-white text-2xl '  >{name}</h1>
                </div>
            
            <div>
                 <h1 className='text-xl font-bold shadow-2xl'>{id - 1}</h1>
            </div>
           
        
        </div>
     
  )
}

export default RoomCard