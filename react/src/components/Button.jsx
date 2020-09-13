/** @format */

import React from "react"
import styled from "styled-components"

const SButton = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: ${props => props.textSize};
	color: ${props => props.theme.colors.buttonText};
	background-color: ${props => props.theme.colors.buttonBG};
	height: ${props => props.height};
	width: ${props => props.width};
  margin: ${props=>props.margin};
	text-align: center;
	border-radius: 2px;
	&:hover {
		opacity: 0.5;
		cursor: crosshair;
	}
`

export default function Button(props) {
	return (
		<SButton
      className="button"
      height={props.height}
			width={props.width}
			text={props.text}
      textSize={props.textSize}
      onClick={props.handler}
      margin={props.margin}
		>
			{props.text}
		</SButton>
	)
}
