import React from 'react'
import styled from 'styled-components'

const Video = styled.video`
  /* width:${props=>props.width}; */
  width: 100%;
  min-width:200px; 
  max-width:600px;
  height: 100%;
  min-height:200px; 
  max-height:600px;
  
`

export default function (props) {
	return (
		<div>
			<Video
        autoPlay
				src={props.video}
				controls="controls"
				// width={props.width}
			/>
		</div>
	)
}
