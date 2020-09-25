/** @format */

import React, { useState } from "react"
import ReactSignupLoginComponent from "react-signup-login-component"
import styled from "styled-components"
import { API_URL } from "../utils/config"
import {	toggleLogInModal} from "../utils/redux"
import { useSelector, useDispatch } from "react-redux"
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
  margin: 10px;
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
	width: 370px;
	height: 30px;
	margin-bottom: 10px;
	border: solid black 1px;
	border-radius: 2px;
`

const Input = props => {
	return (
		<div>
			<div styles={{ margin: "10px" }}>{props.label}</div>
			<SInput id={props.id} />
		</div>
	)
}

const Button = props => {
	return <SButton onClick={props.handler}>{props.label}</SButton>
}

export default function Login() {
	const [showLogin, setShowLogin] = useState(true)
  const dispatch = useDispatch()
	return (
		<>
			{showLogin ? (
				<MainDiv>
					<InputDiv>
						<Input label="email" id="loginEmail" />
						<Input label="password" id="loginPassword" />
						<ButtonDiv>
            <Button
								label="Demo"
								handler={() => {
									const email = document.getElementById(
										"loginEmail"
									).value
									const password = document.getElementById(
										"loginPassword"
									).value

									const payload = {
										email: "unitedstates@country.com",
										password: "password",
									}

									fetch(`${API_URL}/data/login`, {
										method: "POST",
										headers: {
											"Content-Type": "application/json",
										},
										body: JSON.stringify(payload),
									})
										.then(res => res.json())
										.then(data => {
											localStorage.token = data.token
                      localStorage.id = data.id
                      dispatch(toggleLogInModal())
										})
										.catch(err => console.log(err))
								}}
							/>
							<Button
								label="Log In"
								handler={() => {
									const email = document.getElementById(
										"loginEmail"
									).value
									const password = document.getElementById(
										"loginPassword"
									).value

									const payload = {
										email,
										password,
									}

									fetch(`${API_URL}/data/login`, {
										method: "POST",
										headers: {
											"Content-Type": "application/json",
										},
										body: JSON.stringify(payload),
									})
										.then(res => res.json())
										.then(data => {
											localStorage.token = data.token
                      localStorage.id = data.id
                      dispatch(toggleLogInModal())
										})
										.catch(err => console.log(err))
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
						<Input label="username" id="signupUsername" />
						<Input label="email" id="signupEmail" />
						<Input label="password" id="signupPassword" />
						<Input
							label="re-enter password"
							id="resignupPassword"
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
									const username = document.getElementById(
										"signupUsername"
									).value
									const email = document.getElementById(
										"signupEmail"
									).value
									const password = document.getElementById(
										"signupPassword"
									).value

									const payload = {
										username,
										email,
										password,
									}

									fetch(`${API_URL}/data/signup`, {
										method: "POST",
										headers: {
											"Content-Type": "application/json",
										},
										body: JSON.stringify(payload),
									})
										.then(res => res.json())
										.then(data => {
											localStorage.token = data.token
                      localStorage.id = data.id
                      
										})
										.catch(err => console.log(err))
								}}
							/>
						</ButtonDiv>
					</InputDiv>
				</MainDiv>
			)}
		</>
	)
}
