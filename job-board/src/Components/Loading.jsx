import React from 'react'
import loading from "./loading.gif"
function Loading() {
  return (
    <div className='d-flex justify-content-center align-items-center ' style={{height:"500px"}}>
      <img src={loading} style={{filter:"contrast(150%)"}} height="250px"/>
    </div>
  )
}

export default Loading
