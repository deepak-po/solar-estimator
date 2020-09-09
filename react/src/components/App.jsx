/** @format */

import React from "react"
import styled, { ThemeProvider } from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import { Grid, Cell } from "styled-css-grid"
import { showMapEdit } from "../utils/redux"
import { Wobble } from "animate-css-styled-components" //FadeIn, FadeOut
import { ModalProvider } from "styled-react-modal"

import Chart from './Chart'
import TrackerChart from './TrackerChart'
import { toggleInstModal } from "../utils/redux"
import PromptText from "./PromptText"
import PolygonData from "./PolygonData"
import Title from "./Title"
import PromptButton from "./PromptButton"
import SplashHeader from "./SplashHeader"
import Modal from "./Modal"
import GoogleMap from "./GoogleMap"
import Video from "./Video"
import video from "../data/test.mp4"
import theme from "../utils/styledTheme"

const ContentCell = styled(Cell)`
	display: flex;
	height: 100%;
	width: 100%;
	justify-content: center;
	align-items: center;
	align-content: space-between;
	flex-direction: column-reverse;
`
const PromptCell = styled(Cell)`
	display: flex;
	height: 100%;
	width: 100%;
	justify-content: center;
	align-items: center;
	/* align-content:space-between; */
	/* flex-direction: column-reverse; */
`

export default function App() {
	const pageState = useSelector((state) => state.pageReducer)
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
						"footer footer  footer",
					]}
				>
					<Cell area="header">
						{(() => {
							switch (pageState.header) {
								case "on":
									return <SplashHeader />
								default:
									return null
							}
						})()}
					</Cell>

					<ContentCell className="content" area="content">
						{(() => {
							switch (pageState.content) {
								case "start":
									return <Title />
								case "map":
									return <TrackerChart />
								default:
									return null
							}
						})()}
					</ContentCell>

					<Cell area="rightbar">
						{(() => {
							switch (pageState.rightbar) {
								case "polydata":
									return null
								default:
									return null
							}
						})()}
					</Cell>

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
										<PromptButton
											text={"Start Here"}
											handler={() =>
												dispatch(showMapEdit())
											}
										/>
									)
								case "showinst":
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
								case "drawstart":
									return <PolygonData />
								default:
									return null
							}
						})()}
					</PromptCell>

					<Cell area="footer">
						{(() => {
							switch (pageState.footer) {
								default:
									return null
							}
						})()}
					</Cell>
				</Grid>

				<Modal
					//width='100%'
					background-color="red"
					state={"instModalState"} //String
					action={() => dispatch(toggleInstModal())} //function
					content={<Video className="tracker-video" video={video} />} //string or Component
				/>
			</ModalProvider>
		</ThemeProvider>
	)
}
