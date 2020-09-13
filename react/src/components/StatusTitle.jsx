/** @format */

import React from "react"
import styled from "styled-components"

const SButton = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 17px;
	color: ${props => props.theme.colors.buttonText};
	background-color: ${props => "green"};
	height: 30px;
	width: 1200px;
	text-align: center;
	border-radius: 2px;
  margin: 0 2px 2px 10px;
	&:hover {
		opacity: 0.5;
		cursor: pointer;
	}
`

export default function StatusTile(props) {
	return (
		<SButton
			className="test"
			text={props.text}
			onClick={props.handler}
		>
			{props.text}
		</SButton>
	)
}
