import React  from 'react'
import styled from 'styled-components'
import {useDispatch} from 'react-redux'
import {toggleModal} from '../redux'
import Title from './Title'
import SplashHeader from './SplashHeader'

const SStartButton = styled.div`
 
  width:60px;
  height:60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  color: #4fc5b5;
  background-color: #f8dd74;
  height:200px;
  width:500px;
  border-radius:5px;
  &:hover {
    opacity: 0.5;
    cursor: crosshair;}`

const Div = styled.div`
  /* width:100vw;
  height:100vh; */
  display: flex;
  flex-flow:column;
  justify-content: center;
  align-items: center;`


export default function StartButton(props) {

  const dispatch = useDispatch()

  return (
    <Div>
      {/* <SplashHeader></SplashHeader> */}
      {/* <Title></Title> */}
        <SStartButton  text={props.text} onClick={()=>dispatch(toggleModal())}>
          {props.text}
        </SStartButton>
    </Div> 
  )
}
