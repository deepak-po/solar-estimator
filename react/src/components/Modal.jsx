/** @format */

import React from "react"
import ComponentModal from "styled-react-modal"
import { useSelector } from "react-redux"
import styled from "styled-components"

const StyledModal = ComponentModal.styled`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${(props) => props['min-width']};
  max-width: ${(props) => props['max-width']};
  height: 60%;
  min-height:200px;
  max-height:600px;
  border-radius: 10px;
  position:relative;
  width: ${(props) => props['width']};
  background-color: ${(props) => props["background-color"] || "green"};
`

const CloseModal = styled.div`
	width: auto;
	position: absolute;
	padding: 5px;
	top: 0px;
	right: 0px;
`
const Content = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	/* background-color:red; */
	padding: 5px;
	top: 0px;
	right: 0px;
`

export default function Modal(props) {
	const modalState = useSelector((state) => state.pageReducer[props.state])

	return (
		<div>
			<StyledModal
				isOpen={modalState}
				onBackgroundClick={props.action}
				onEscapeKeydown={props.action}
        background-color={props["background-color"]}
        width={props.width}
        min-width={props['min-width']}
        max-width={props['max-width']}
			>
				<Content>{props.content}</Content>
				<CloseModal onClick={props.action}>
					<svg width="24" height="24" viewBox="0 0 24 24">
						<path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z" />
					</svg>
				</CloseModal>
			</StyledModal>
		</div>
	)
}
