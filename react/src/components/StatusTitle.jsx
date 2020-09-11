/** @format */

import React from "react"
import styled from "styled-components"

const SPromptButton = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 17px;
	color: ${props => props.theme.colors.buttonText};
	background-color: ${props => props.theme.colors.buttonBG};
	height: 30px;
	width: 80px;
	text-align: center;
	border-radius: 5px;
	margin-bottom: 10px;
	&:hover {
		opacity: 0.5;
		cursor: crosshair;
	}
`

export default function StatusTile(props) {
	return (
		<SPromptButton
			className="test"
			text={props.text}
			onClick={props.handler}
		>
			{props.text}
		</SPromptButton>
	)
}
