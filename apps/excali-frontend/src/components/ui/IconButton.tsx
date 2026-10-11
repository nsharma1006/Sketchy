import React, { ReactNode } from 'react'

const IconButton = ({icon , onClick , activated} : {
    icon : ReactNode,
    onClick : () => void,
    activated : boolean
}) => {
  return (
    <div onClick={onClick} className={`cursor-pointer rounded-full border p-2 bg-black hover:bg-neutral-700 ${activated ?   "text-red-500" : "text-white"} `} >
        {icon}
    </div>
  )
}

export default IconButton