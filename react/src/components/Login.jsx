/** @format */

import React, { useState } from "react"
import ReactSignupLoginComponent from "react-signup-login-component"
import styled from "styled-components"

const MainDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	/* background-color:red; */
`
const InputDiv = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`
const ButtonDiv = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: space-between;
`
const SButton = styled.div`
	display: flex;
	width: 120px;
	height: 30px;
	align-items: center;
	justify-content: center;
	border: solid black 1px;
	margin-top: 10px;
	border-radius: 2px;
	background-color: ${props => props.theme.colors.buttonBG};
	&:hover {
		opacity: 0.5;
		cursor: pointer;
	}
`

const SInput = styled.input`
	width: 300px;
	height: 30px;
	margin-bottom: 10px;
	border: solid black 1px;
	border-radius: 2px;
`

const Input = props => {
	return (
		<div>
			<div styles={{ margin: "10px" }}>{props.label}</div>
			<SInput className={props.class} />
		</div>
	)
}

const Button = props => {
	return <SButton onClick={props.handler}>{props.label}</SButton>
}

export default function Login() {
	const [showLogin, setShowLogin] = useState(true)

	return (
		<>
			{showLogin ? (
				<MainDiv>
					<InputDiv>
						<Input label="email" class="loginEmail" />
						<Input label="password" class="loginPassword" />
						<ButtonDiv>
							<Button
								label="Log In"
								handler={() => {
									//TODO: make fetch request
								}}
							/>

							<Button
								label="Sign Up"
								handler={() => {
									setShowLogin(!showLogin)
								}}
							/>
						</ButtonDiv>
					</InputDiv>
				</MainDiv>
			) : (
				<MainDiv>
					<InputDiv>
						<Input label="email" class="signupEmail" />
						<Input label="password" class="signupPassword" />
						<Input
							label="re-enter password"
							class="resignupPassword"
						/>
						<ButtonDiv>
							<Button
								label="Back"
								handler={() => {
									setShowLogin(!showLogin)
								}}
							/>

							<Button
								label="Create Account"
								handler={() => {
									//TODO: Make fetch request
								}}
							/>
						</ButtonDiv>
					</InputDiv>
				</MainDiv>
			)}
		</>
	)
}
