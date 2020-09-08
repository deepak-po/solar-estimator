import React  from 'react'
import styled from 'styled-components'


const SPromptButton = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 60px;
	color: #4fc5b5;
	background-color: #f8dd74;
	height: 150px;
  width: 500px;
	border-radius: 5px;
	&:hover {
		opacity: 0.5;
    cursor: crosshair;
	}
`
 
const Div = styled.div`
	display: flex;
	flex-flow: column;
	justify-content: center;
	align-items: center;
`


export default function PromptButton(props) {
	return (
		<Div>
			<SPromptButton
				className="test"
				text={props.text}
				onClick={props.handleClick}
			>
				{props.text}
			</SPromptButton>
		</Div>
	)
}
