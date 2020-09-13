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
	margin: 10px 0 0 0;
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

export default function DataBoxGen(props) {
	const data = useSelector(state => state.pageReducer.genData.generation)

	return (
		<>
			<div>
				<Data
					title="Weather Station"
					data={data ? data.station_info.city : null}
				/>
				<Data
					title="Capacity (kW)"
					data={
						data
							? data.inputs.system_capacity
									.toLocaleString()
									.split(".")[0]
							: null
					}
				/>
				<Data
					title="Annual Gen. (kWh/y)"
					data={
						data
							? data.outputs.ac_annual
									.toLocaleString()
									.split(".")[0]
							: null
					}
				/>
				<Data
					title="Capacity Factor (%)"
					data={
						data
							? data.outputs.capacity_factor
									.toLocaleString()
									.split(".")[0]
							: null
					}
				/>
			</div>
		</>
	)
}
