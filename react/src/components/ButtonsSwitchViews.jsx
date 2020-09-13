/** @format */

import React from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"

import {
	clearPolyArea,
	displayGenChart,
	displayError,
	toggleProjectSubmitModal,
} from "../utils/redux"

import Button from "./Button"

const Div = styled.div`
	width: 100%;
	height: 100%;
	min-height: 30px;
	display: flex;
	flex-flow: row;
	justify-content: flex-start;
	align-items: flex-start;
	justify-content: flex-end;
	padding-left: 20px;
	font-size: 55px;
`

export default function ButtonsSwitchViews(props) {
	// const dispatch = useDispatch()
	return (
		<Div>
			<Button
				text="Map"
				height="30px"
				width="100px"
				textSize="14px"
				margin="0px 0px 0px 10px"
				handler={() => {
				
				}}
			/>
			<Button
				text="Table"
				height="30px"
				width="100px"
				textSize="14px"
				margin="0px 0px 0px 10px"
				handler={() => {}}
			/>
		</Div>
	)
}
