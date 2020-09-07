import React  from 'react';
import StartButton from './components/StartButton.jsx'
// import Chart from './components/Chart.jsx'
import {useSelector} from 'react-redux'
import Map from './components/Map.jsx'
import GoogleMap from './components/CMap'
import { Grid, Cell } from "styled-css-grid";
import TitlePage from './components/Title.jsx'
import SplashHeader from './components/SplashHeader.jsx'
// const GOOGLE_MAP_URL = `https/maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`



export default function App() {

  const isOn = useSelector(state => state.modalReducer.isOn)
  
  return (
  // isOn ? <StartButton text={"Start Here"}/> : <GoogleMap/>


  <Grid
  height={'100vh'}
  width={'100vw'}
  columns={"1fr 5fr 1fr"}
  rows={"45px 5fr 1fr 45px"}
  gap={"10px"}
  areas={[
    "header header  header",
    "rightbar content leftbar",
    "button button button",    
    "footer footer  footer"
  ]}>
      <Cell area="header">{!isOn ? null: <SplashHeader/>}</Cell>
      <Cell area="content"> {isOn ? <TitlePage/> : <GoogleMap/>} </Cell>
      <Cell area="rightbar">Menu</Cell>
      <Cell area="leftbar">Ads</Cell>
      <Cell area="button">{isOn ? <StartButton text={"Start Here"}/> : null}</Cell>
      <Cell area="footer"></Cell>
  </Grid>
 
  )
  
}
