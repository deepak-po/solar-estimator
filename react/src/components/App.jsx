/** @format */

import React from "react"
import styled, { ThemeProvider } from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import { Grid, Cell } from "styled-css-grid"
import { showMapEdit } from "../utils/redux"
import { Wobble } from "animate-css-styled-components" //FadeIn, FadeOut
import { ModalProvider } from "styled-react-modal"
import ReactLoading from "react-loading"

import Chart from "./Chart"
import Table from "./Table"
import TrackerChart from "./TrackerChart"
import StatusTile from "./StatusTitle"
import {
	toggleInstModal,
	toggleLogInModal,
	toggleProjectSubmitModal,
} from "../utils/redux"
import PromptText from "./PromptText"
import ButtonsPolygonSubmit from "./ButtonsPolygonSubmit"
import Title from "./Title"
import Button from "./Button"
import SplashHeader from "./SplashHeader"
import Modal from "./Modal"
import GoogleMap from "./GoogleMap"
import Video from "./Video"
import video from "../data/test.mp4"
import theme from "../utils/styledTheme"
import Login from "./Login"
import Error from "./Error"
import ProjectSubmit from "./ProjectSubmitModal"
import DataBox from "./DataBox"
import DataBoxGen from "./DataBoxGen"
import ButtonsSwitchViews from "./ButtonsSwitchViews"

const ContentCell = styled(Cell)`
	display: flex;
	max-height: 100%;
	width: 100%;
	justify-content: center;
	align-items: flex-start;
	align-content: flex-start;
	flex-direction: column-reverse;
	scrollbar-width: none;
	overflow-y: scroll;
	::-webkit-scrollbar {
		width: 0px; /* Remove scrollbar space */
		background: transparent; /* Optional: just make scrollbar invisible */
	}
	background-size: cover;
`
const PromptCell = styled(Cell)`
	display: flex;
	height: 100%;
	width: 100%;
`
const FooterCell = styled(Cell)`
	display: flex;
	height: 100%;
	width: 100%;
	justify-content: center;
	align-items: flex-start;
	align-content: flex-start;
	justify-content: center;
`

const RightCell = styled(Cell)`
	display: flex;
	height: 100%;
	width: 100%;
	justify-content: center;
	align-items: flex-start;
	align-content: flex-start;
	justify-content: flex-start;
`

export default function App() {
	const pageState = useSelector(state => state.pageReducer)
	const dispatch = useDispatch()

	return (
		<ThemeProvider theme={theme}>
			<ModalProvider>
				<Grid
					height={"100vh"}
					width={"100vw"}
					columns={"minmax(100px, 1fr) 5fr minmax(100px, 1fr)"}
					rows={" 50px  5fr 1fr 45px"}
					gap={"10px"}
					areas={[
						"header header  header",
						"leftbar content rightbar",
						"leftbar prompts rightbar",
						". footer  .",
					]}
				>
					<Cell area="header">
						{(() => {
							switch (pageState.header) {
								case "on":
									return null
								default:
									return null
							}
						})()}
					</Cell>

					<ContentCell className="content" area="content">
						{(() => {
							switch (pageState.content) {
								case "start":
									return <Table />
								case "map":
									return <GoogleMap />
								case "genChart":
									return <Chart />
								case "error":
									return <Error />
								default:
									return null
							}
						})()}
					</ContentCell>

					<RightCell area="rightbar">
						{(() => {
							switch (pageState.rightbar) {
								case "polyData":
									return <DataBox />
								case "genData":
									return <DataBoxGen />
								default:
									return null
							}
						})()}
					</RightCell>

					<Cell area="leftbar">
						{(() => {
							switch (pageState.leftbar) {
								default:
									return null
							}
						})()}
					</Cell>

					<PromptCell area="prompts">
						{(() => {
							switch (pageState.prompts) {
								case "start":
									return (
										<>
											<Button
												text={"Estimate Projects"}
												height="100px"
												width="340px"
												textSize="32px"
												margin="0px 20px"
												handler={() =>
													dispatch(showMapEdit())
												}
											/>
											<Button
												text={"View Projects"}
												height="100px"
												width="340px"
												textSize="32px"
												margin="0px 20px"
												handler={() =>
													localStorage.token ? (
														<Table />
													) : (
														dispatch(
															toggleLogInModal()
														)
													)
												}
											/>
										</>
									)
								case "showInst":
									return (
										<Wobble duration="0.5s" delay=".8s">
											<PromptText
												content="Instructions"
												handler={() =>
													dispatch(toggleInstModal())
												}
											/>
										</Wobble>
									)
								case "drawStart":
									return <ButtonsPolygonSubmit />
                  case "views":
                    return <ButtonsSwitchViews />
								case "off":
									return null
								default:
									return null
							}
						})()}
					</PromptCell>

					<FooterCell area="footer">
						{(() => {
							switch (pageState.footer) {
								case "on":
									return (
										<>
											<StatusTile text="Draw" />
											<StatusTile text="Review" />
											<StatusTile text="Submit" />
										</>
									)
								default:
									return null
							}
						})()}
					</FooterCell>
				</Grid>

				<Modal
					//width='100%'
					background-color="white"
					state={"instModal"} //String
					action={() => dispatch(toggleInstModal())} //function
					content={<Video className="tracker-video" video={video} />} //string or Component
				/>

				<Modal
					//width='100%'
					background-color="white"
					state={"logInModal"} //String
					action={() => dispatch(toggleLogInModal())} //function
					content={<Login />} //string or Component
				/>
				<Modal
					//width='100%'
					redux={pageState}
					background-color="white"
					state={"projectSubmitModal"} //String
					action={() => dispatch(toggleProjectSubmitModal())} //function
					content={<ProjectSubmit />} //string or Component
					width="50%"
					max-width="400px"
					min-width="300px"
				/>
			</ModalProvider>
		</ThemeProvider>
	)
}
