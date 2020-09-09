/** @format */

import React from "react"
import styled from "styled-components"
import { useSelector } from "react-redux"
import { DataBox, DataBoxButton } from "./DataBox"

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
	const data = useSelector((state) => state.pageReducer.data)
	return (
		<Div>
			<DataBox
				title="Area:"
				data={`${Math.round(
					data.area / 4046.86
				).toLocaleString()} acres`}
			/>
			<DataBox
				title="Perimeter:"
				data={`${Math.round(data.len / 1000).toLocaleString()} km`}
			/>
			<DataBox
				title="Centroid:"
				data={`${Math.round(data.centroid.lat).toFixed(1)},
				       ${Math.round(data.centroid.lng).toFixed(1)}`}
			/>
			<DataBoxButton
				title="Clear"
				handler={() => {
					data.polygon.setMap(null)
					data.drawingManager.setMap(data.map)
				}}
			/>
			<DataBoxButton
				title="Submit"
				handler={() => data.polygon.setMap(null)}
			/>
		</Div>
	)
}
