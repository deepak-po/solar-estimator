import React  from 'react'
import styled from 'styled-components'
import {useDispatch} from 'react-redux'
import {toggleModal} from '../redux'
import Title from './Title'
import SplashHeader from './SplashHeader'
import {useSelector} from 'react-redux'


const SStartButton = styled.div`
 
  width:100vw;
  height:100vh;
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
  width:100vw;
  height:100vh;
  display: flex;
  flex-flow:column;
  justify-content: center;
  align-items: center;`



export default function PolygonData() {
  const data = useSelector(state => state.mapDrawReducer)
  console.log(data)
  return (
    <>
        <div>
          {Math.round(data.area/4046.86)}
        </div>
        <div>
          {Math.round(data.len/4046.86)}
        </div>
        {/* <div>
          {Math.round(data.area/4046.86)}
        </div> */}
    </>
  )
}

