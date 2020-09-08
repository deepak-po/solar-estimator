import React from 'react'
import video from "../test.mp4";
export default function (props) {
  return (
    <div>
      <video src={video} width="600" height="300" controls="controls" autoplay="true"/>
    </div>
  )
}
