/** @format */

import React from "react"
import styled from "styled-components"

const SPromptButton = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 60px;
	color: ${(props) => props.theme.colors.buttonText};
	background-color: ${(props) => props.theme.colors.buttonBG};
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
				onClick={props.handler}
			>
				{props.text}
			</SPromptButton>
		</Div>
	)
}
