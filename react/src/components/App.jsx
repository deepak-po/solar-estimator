/** @format */

import React from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import { Grid, Cell } from "styled-css-grid"
import { showMapEdit } from "../utils/redux"
import { Wobble } from "animate-css-styled-components" //FadeIn, FadeOut
import { ModalProvider } from "styled-react-modal"

// import Chart from './components/Chart.jsx'
import { toggleInstModal } from "../utils/redux"
import Title from "./Title.jsx"
import PromptButton from "./PromptButton.jsx"
import SplashHeader from "./SplashHeader.jsx"
import Modal from "./Modal.jsx"
import GoogleMap from "./GoogleMap"
import Video from "./Video.jsx"
import video from "../data/test.mp4"

const ContentCell = styled(Cell)`
	display: flex;
	height: 90%;
	width: 90%;
	justify-content: center;
	align-items: center;
	flex-direction: column-reverse;
	padding: 10px;
`
const ContentCellFlexBox = styled.div`
	padding-top: 10px;
	max-width: 800px;
	width: 90%;
	display: flex;
	align-items: flex-start;
`

export default function App() {
	const pageState = useSelector((state) => state.pageReducer)
	const dispatch = useDispatch()

	return (
		<ModalProvider>

			<Grid
				height={"100vh"}
				width={"100vw"}
				columns={"minmax(100px, 1fr) 5fr minmax(100px, 1fr)"}
				rows={" 50px  5fr 1fr 45px"}
				gap={"10px"}
				areas={[
					"header header  header",
					"rightbar content leftbar",
					"prompts prompts prompts",
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
								return (
									<>
										<ContentCellFlexBox>
											<Wobble duration="0.8s" delay="1s">
												<h1
													styles={{ width: "100vh" }}
													onClick={() =>
														dispatch(
															toggleInstModal()
														)
													}
												>
													Instructions
												</h1>
												<Modal
													background-color="white"
													state={"instModalState"} //String
													action={() =>
														dispatch(
															toggleInstModal()
														)
													} //function
													content={
														<Video
															className="tracker-video"
															video={video}
															// width="100%"
														/>
													} //string or Component
												/>
											</Wobble>
										</ContentCellFlexBox>

										<GoogleMap />
									</>
								)

							default:
								return null
						}
					})()}
				</ContentCell>


				<Cell area="rightbar">
					{(() => {
						switch (pageState.rightbar) {
							default:
								return null
						}
					})()}
				</Cell>


				<Cell area="leftbar">
					{(() => {
						switch (pageState.left) {
							case "polydata":
								return
							default:
								return null
						}
					})()}
				</Cell>


				<Cell area="prompts">
					{(() => {
						switch (pageState.prompts) {
							case "start":
								return (
									<PromptButton
										text={"Start Here"}
										handleClick={() =>
											dispatch(showMapEdit())
										}
									/>
								)
							default:
								return null
						}
					})()}
				</Cell>


				<Cell area="footer">
					{(() => {
						switch (pageState.footer) {
							default:
								return null
						}
					})()}
				</Cell>


			</Grid>
      
		</ModalProvider>
	)
}
