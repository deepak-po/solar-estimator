/** @format */

import React from "react"
import styled from "styled-components"
import { Grid, Cell } from "styled-css-grid"
import Button from "./Button"
import { useSelector, useDispatch } from "react-redux"
import { displayError, displayGenChart } from "../utils/redux"
import { API_URL } from "../utils/config"

const Row = styled.div`
	height: 10px;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-left: 30px;
	justify-content: flex-start;
`
const CenterCell = styled(Cell)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`
const Title = styled.div`
	text-align: center;
	margin-top: 10px;
	font-size: 18px;
`

const Text = styled.div`
	margin-right: 5px;
`

const Name = props => {
	return (
		<>
			<Row>
				<Text>{props.title} : </Text>
				<Text>{props.value}</Text>
				<Text>{props.units}</Text>
			</Row>
		</>
	)
}

export default function ProjectSubmit(props) {
	const data = useSelector(state => state.pageReducer.data)
	const dispatch = useDispatch()

	const handleSubmit = () => {
		const name = document.getElementById("projectName").value
		const tracker = document.getElementById("tracker").checked
		if (!name) alert("please enter a project name")

		const payload = {
			area: data.area,
			perimeter: data.perimeter,
			centroid: data.centroid,
			path: data.path,
			tracker,
			name,
			user: localStorage.id,
		}

		fetch(`${API_URL}/data`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(res => res.json())
			.then(data => dispatch(displayGenChart(data)))
			.catch(err => dispatch(displayError()))
	}

	return (
		<Grid
			height={"100%"}
			width={"100%"}
			columns={"1fr"}
			rows={" 2fr 1fr 1fr 1fr 1fr 1.5fr"}
			gap={"10px"}
			areas={[
				"header",
				"area",
				"perimeter",
				"centroid",
				"name",
				"submit",
			]}
		>
			<CenterCell area="header">
				<Title>Review and Submit Project Details</Title>
			</CenterCell>
			<Cell area="area">
				<Name title="Area" value="10" units="acres" />
			</Cell>
			<Cell area="perimeter">
				<Name title="Perimeter" value="10" units="km" />
			</Cell>
			<Cell area="centroid">
				<Name title="Centroid" value="10" />
			</Cell>

			<Cell area="name">
				<Row>
					<div>
						<label style={{ marginRight: "9px" }} for="name">
							Name
						</label>

						<input
							type="text"
							id="projectName"
							name="projectName"
							required
							size="22"
							style={{
								border: "1px solid black",
								borderRadius: "2px",
								height: "25px",
							}}
						/>

						<input
							type="checkbox"
							id="tracker"
							name="tracker"
							style={{ marginLeft: "9px" }}
						/>
						<label style={{ marginLeft: "9px" }} for="scales">
							tracker
						</label>
					</div>
				</Row>
			</Cell>
			<CenterCell area="submit">
				<Button
					handler={handleSubmit}
					text="Submit"
					height="30px"
					width="120px"
					textSize="14px"
				/>
			</CenterCell>
		</Grid>
	)
}
