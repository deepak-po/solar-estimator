import React from 'react'
import {GoogleMap, useLoadScript, DrawingManager, Polygon} from '@react-google-maps/api'
// import {google, Polygon} from 'react-google-maps'
import styled from 'styled-components'
import ReactLoading from 'react-loading';
// import { RotateSpinLoader } from 'react-css-loaders';
import {useDispatch} from 'react-redux'
import {toggleModal} from '../redux'
import mapStyles from "./mapStyles";
import findCentroid  from 'centroid2d'
import area from 'area-polygon'
const geoarea = require('geo-area')(/*options*/{x: 'lng', y: 'lat'});

// import {FormContext} from 'antd/lib/form/context'
const Logo = styled.h1`
position:fixed;
bottom: 0px;
z-index:1;
`

const Menu = styled.div`
  width:100px;
  height:100vh;
  display: flex;
  justify-content: center;
  align-items: center;`


const Div = styled.div`
  width:100vw;
  height:100vh;
  display: flex;
  justify-content: center;
  align-items: center;`

// const Size = styled.div`
//   left: 200px;
//   width:700px;
//   height:500px;
//   border: 1px solid gray;
//   border-radius: 10px;`

// FOR MAP
const libraries = ['places', 'drawing', 'geometry']
const mapContainerStyle = {width: "80vw",height: "80vh", borderRadius:"30px"}
const center = {lat: 43, lng: -79}
const options = {styles: mapStyles, disableDefaultUI: true,zoomControl: true,}

// FOR DRAWING MANAGER
const drawingMode = 'polygon'

export default function Map() {
  let latestPolygon;
  // const dispatch = useDispatch()

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: 'AIzaSyDTxXrae_o9iGsSG0d1ZwcN-DrWSkirb2c',
    libraries,
  })




  const onLoad = drawingManager => {console.log(drawingManager)}
  const getPaths = (polygon) => {
    // const x =  new google.maps.polygon.geometry.spherical.computeArea(polygon.getPath())
    latestPolygon && latestPolygon.setMap(null)
    polygon.setEditable(true)
    latestPolygon = polygon



    let coordinates = []
    const polygonBounds = polygon.getPath();
    polygonBounds.forEach( ( coordinate, i ) => {
      const data = {
        lat: polygonBounds.getAt(i).lat(),
        lng: polygonBounds.getAt(i).lng()
      }
      coordinates.push(data)
    })

    //TODO: Put in state/make post request
    // console.log(coordinates)
    const polygonArray = []
    coordinates.map( point =>  polygonArray.push([point.lat,point.lng]))
    const polyArea = area(polygonArray)
    let centroid = findCentroid(polygonArray) // [2.5, 2.5]
    const marker = {lat:centroid[0],lng:centroid[1]}
    const polyGeoArea = geoarea(marker)
    console.log("poly--->", polyArea)
    console.log("geo--->", polyGeoArea)

  }

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  const test = map => {
    // const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    // console.log(map)
  }
  if (loadError) return "Please Try Again"
  if (!isLoaded) return <Div><ReactLoading type={"bubbles"} color={"red"} height={'20%'} width={'20%'} /></Div>





  const paths = [
    [
      {lat: 37.772, lng: -122.214},
      {lat: 21.291, lng: -157.821},
      {lat: -18.142, lng: 178.431},
      {lat: -27.467, lng: 153.027}
    ],
    [
      {lat: 78.772, lng: -122.214},
      {lat: 90.291, lng: -150.821},
      {lat: -60, lng: -140.431},
      {lat: 78.772, lng: -122.214}
    ],
  ]
  const polyOptions = {
    fillColor: "lightblue",
    fillOpacity: 1,
    strokeColor: "red",
    strokeOpacity: 1,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 1
  }
  
  const onPolyLoad = polygon => {
    console.log("polygon: ", polygon);
  }




  return (
    <>
    <Div>
        <GoogleMap
            className="myMap"
            mapContainerStyle = {mapContainerStyle}
            zoom = {8}
            center = {center}
            options={options}
            onLoad={test}
        >
      <Logo>
        Bears{" "}
        <span role="img" aria-label="tent">
          ⛺️
        </span>
      </Logo>

            <DrawingManager
                drawingMode={drawingMode}
                onPolygonComplete={getPaths}
                onLoad={onLoad}
                onMarkerComplete={()=>console.log("Dfsdsfs")}
                defaultOptions={{
                        drawingControl: false,
                        drawingControlOptions: {
                            // style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                            // position: {"TOP_CENTER"}
                            // drawingModes: [google.maps.drawing.OverlayType.POLYGON]
                        }
                    }}
              />
              
                  {paths.map( path => {
                    
                    return (
                        <Polygon 
 
                            onLoad={onPolyLoad}
                            paths={paths}
                            options={polyOptions}
                        />
                    )
                    
                  })}
              

        </GoogleMap>
        <Menu>
          TEST
          </Menu>
    </Div>
    </>
  )
}

 

 

