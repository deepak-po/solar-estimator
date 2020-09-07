import React from 'react'
import {useSelector} from 'react-redux'
import styled from 'styled-components'

const STitle = styled.h1`
padding-bottom:50px;
color: #234567;
font-size:70px;
text-align:center;
left:0px;
padding:20px;
.text {
  font-size:170px;
  /* padding: 10px;
  background: url("https://media.giphy.com/media/4H3Ii5eLChYul9p7NL/giphy.gif");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
  color: #00000047;
  text-transform: uppercase;
  font-size: 8rem;
  font-weight: 900;
	font-family: 'Righteous', cursive;
  letter-spacing: 1px;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  text-align: center; */
}
`


export default function Title() {
  
  const isOn = useSelector(state => state.modalReducer.isOn)

  return isOn ? <STitle>An App to Calculate Solar Generation.</STitle> : null

}
