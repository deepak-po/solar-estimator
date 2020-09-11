import React from 'react'
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
  color: #00000047;
}
`


export default function Title() {
  return   <STitle>An App to Calculate Solar Generation.</STitle>  
}
