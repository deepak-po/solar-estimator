/** @format */

import React from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import { DataBox, DataBoxButton } from "./DataBox"
import { clearPolyArea, displayGenChart } from "../utils/redux"
import { API_URL } from "../utils/config"
const Div = styled.div`
	width: 100%;
	height: 100%;
	min-height: 30px;
	display: flex;
	flex-flow: row;
	justify-content: flex-start;
	align-items: flex-start;
	justify-content: space-between;
	font-size: 55px;
`

export default function PolygonData() {
	const data = useSelector(state => state.pageReducer.data)
	const dispatch = useDispatch()
	return (
		<Div>
			<DataBox
				title="Area:"
				data={
					data
						? `${Math.round(
								data.area / 4046.86
						  ).toLocaleString()} acres`
						: null
				}
			/>
			<DataBox
				title="Perimeter:"
				data={
					data
						? `${Math.round(data.len / 1000).toLocaleString()} km`
						: null
				}
			/>
			<DataBox
				title="Centroid:"
				data={
					data
						? `${Math.round(data.centroid.lat).toFixed(1)},
				       ${Math.round(data.centroid.lng).toFixed(1)}`
						: null
				}
			/>
			<DataBoxButton
				title="Clear"
				handler={() => {
					data.polygon.setMap(null)
					data.drawingManager.setMap(data.map)
					dispatch(clearPolyArea())
				}}
			/>
			<DataBoxButton
				title="Submit"
				handler={() => {
					fetch(`${API_URL}/data`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
					})
						.then(res => res.json())
						.then(data => {

							dispatch(displayGenChart(data))
							console.log(data)
						})
						.catch(err => console.log(err))
				}}
			/>
		</Div>
	)
}
