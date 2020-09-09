/** @format */

import React from "react"
import styled from "styled-components"

const Div = styled.div`
  /* box-sizing: border-box; */
	max-width: auto;
	min-width: 110px;
	min-height: 50px;
	max-height: 100%;
	display: flex;
	flex-flow: Column;
	justify-content: center;
	align-items: center;
	align-content: flex-start;
	font-size: 22px;
	background-color: ${(props) => props.theme.colors.buttonBG};
	border-radius: 10px;
`

const DataDiv = styled.div`
  box-sizing: border-box;
	width: 95%;
	min-height: 25px;
	height: 50%;
	display: flex;
	flex-flow: Column;
	justify-content: center;
	align-items: center;
	font-size: 16px;
	padding: 2px;
	color: ${(props) => props.theme.colors.buttonText};
`

const DataDivTop = styled(DataDiv)`
	border-bottom: 3px solid ${(props) => props.theme.colors.buttonText};
`
const DataDivButton = styled(DataDiv)`
	height: 100%;
	/* min-height: 50px; */
`

export function DataBox(props) {
	return (
		<Div>
			<DataDivTop>{props.title}</DataDivTop>
			<DataDiv>{props.data}</DataDiv>
		</Div>
	)
}

export function DataBoxButton(props) {
	return (
		<Div>
			<DataDivButton onClick={props.handler}>{props.title}</DataDivButton>
		</Div>
	)
}
