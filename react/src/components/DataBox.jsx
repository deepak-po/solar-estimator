/** @format */

import React from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"

const Div = styled.div`
	box-sizing: border-box;
	max-width: auto;
	min-width: 100px;
	min-height: 50px;
	max-height: 100%;
	display: flex;
	flex-flow: Column;
  margin:10px 0 0 0;

	/* background-color: ${props => props.theme.colors.buttonBG}; */
	/* border-radius: 10px; */
`

const DataDiv = styled.div`
	box-sizing: border-box;
	width: 100%;
	min-height: 25px;
	height: 50%;
	display: flex;
	flex-flow: Column;
	justify-content: flex-start;
	align-items: flex-start;
	font-size: 12px;
	padding: 5px;
	text-align: left;
	color: ${props => props.theme.colors.buttonText};
`

const DataDivTop = styled(DataDiv)`
	border-bottom: 2px solid ${props => props.theme.colors.buttonText};
`

const Data = props => {
	return (
		<Div>
			<DataDivTop>{props.title}</DataDivTop>
			<DataDiv>{props.data ? props.data : null}</DataDiv>
		</Div>
	)
}

export default function DataBox(props) {
	const data = useSelector(state => state.pageReducer.data)

	return (
		<>
			<div>
				<Data
					title="Area (sq. km)"
					data={
						data
							? data.area.toLocaleString(
									undefined,
									{
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									}
							  )
							: null
					}
				/>
				<Data
					title="Perimeter (km)"
					data={
						data
							? data.perimeter.toLocaleString(undefined, {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
							  })
							: null
					}
				/>
				<Data
					title="Center (deg.)"
					data={
						data
							? `lat: ${data.centroid.lat.toLocaleString(
									undefined,
									{
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									}
							  )}
               lng: ${data.centroid.lng.toLocaleString(undefined, {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				})}`
							: null
					}
				/>
			</div>
		</>
	)
}
