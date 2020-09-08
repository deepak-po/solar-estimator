import React from "react"
import PromptButton from "./components/PromptButton.jsx"
// import Chart from './components/Chart.jsx'
import { useSelector, useDispatch } from "react-redux"
import GoogleMap from "./components/CMap"
import { Grid, Cell } from "styled-css-grid"
import Title from "./components/Title.jsx"
import SplashHeader from "./components/SplashHeader.jsx"
import { showMapEdit } from "./redux"
import styled from 'styled-components'
import { Wobble, FadeIn, FadeOut } from 'animate-css-styled-components';
import { ModalProvider } from 'styled-react-modal'
import Modal from './components/Modal.jsx'
import {toggleInstModal} from './redux'
import video from './test.mp4'
import Video from './components/Video.jsx'
const ContentCell = styled(Cell)`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column-reverse;
	padding: 10px;
`
const ContentCellFlexBox = styled.div`
	padding-top:10px;
	max-width: 800px;
	width: 90%;
	display: flex;
	align-items: flex-start;
`
// const Video = styled.video`
// width:100px;
// `

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

			<ContentCell className='content' area="content">
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
											styles={{ width: "100vh"}}
											onClick={() => dispatch(toggleInstModal())}
										>
											Instructions
										</h1>
										<Modal
											action={() => dispatch(toggleInstModal())}//function
											state={'instModalState'}//String
											content={<Video></Video>}//string or Component
										/>
										</Wobble>
									</ContentCellFlexBox>
 
									<GoogleMap /> 
								</>
							)
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
						default: return null
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
									handleClick={() => dispatch(showMapEdit())}
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
