/** @format */

import React from "react"
import styled from "styled-components"

const Div = styled.div`
	width: 100%;
	height: 100%;
	min-height: 30px;
	display: flex;
	flex-flow: row;
	justify-content: flex-start;
	align-items: flex-start;
	align-content: flex-start;
	font-size: 22px;
`

export default function PromptText(props) {
	return <Div onClick={props.handler}>{props.content}</Div>
}
