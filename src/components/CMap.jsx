import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import MapMenu from './MapMenu'
import StartButton from './StartButton'
import PolygonData from './PolygonData'
import mapStyles from './mapStyles'
import mapOptions from './mapOptions'
import drawingManagerOptions from './drawingManagerOptions'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {displayPolyData} from '../redux'
const  myLocation = { lat: 43.642567, lng: -79.387054}
const GOOGLE_MAP_API_KEY = 'AIzaSyDTxXrae_o9iGsSG0d1ZwcN-DrWSkirb2c'

const AreaSelectButton = styled(StartButton)`
  height: 50px;
  /* color:red; */
  /* background-color:pink; */
`

const Logo = styled.h1`
  position:fixed;
  bottom: 0px;
  z-index:1;
`
const Div = styled.div`
  display:flex;
  /* justify-content:flex-end; */
  flex-direction:column;
  width:100%;
  height:100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const MapContainer = styled.div`
  top:30px;
  align-self: auto;
  margin:auto;
  width:700px;
  height:400px;
  border: 1px solid gray;
  border-radius: 10px;
  `


export default function GoogleMaps(props) {

    // refs
    const dispatch = useDispatch()
    const [poly, setPoly] = useState({isDrawn:false})
    const isDrawn = useSelector(state => state.mapDrawReducer.isDrawn)
    const googleMapRef = React.createRef();
    const googleMap = useRef(null);
    const marker = useRef(null);

    // A function to create map and add all the library compoents and eventlistners
    const createGoogleMap = () => {

        const map = new window.google.maps.Map(googleMapRef.current, {...{styles: mapStyles},...mapOptions()})
        const drawingManager = new window.google.maps.drawing.DrawingManager(drawingManagerOptions())

        var redrawCount = 1
        window.google.maps.event.addListener(drawingManager, 'polygoncomplete', (polygon)=> {

          const getPath = () => {
              const area = window.google.maps.geometry.spherical.computeArea(polygon.getPath()) //m2
              const len = window.google.maps.geometry.spherical.computeLength(polygon.getPath()) //m
              const coordinates = []
              polygon.getPath().getArray().forEach( point => coordinates.push({lat:point.lat(), lng:point.lng()}))
              const data = {area,len,coordinates,isDrawn:true}
              setPoly(data)
              return data
          }

          let x = getPath() //preform calcs
          console.log(x)
          // TODO: STORE calcs in state
          drawingManager.setMap(null) //disable map after draw
          polygon.setOptions({id: redrawCount, editable: true, draggable: true});
          window.google.maps.event.addListener(polygon.getPath(), "insert_at", getPath);
          window.google.maps.event.addListener(polygon.getPath(), "remove_at", getPath);
          window.google.maps.event.addListener(polygon.getPath(), "set_at", getPath);
          redrawCount++;
          
        })
        
        // Create Input Element and Add to Google Map Object
        const googleMapInput = document.createElement('input')
        googleMapInput.setAttribute("id", "pac-input")
        window.document.body.appendChild(googleMapInput)
        const input = document.getElementById('pac-input')
        const searchBox = new window.google.maps.places.SearchBox(input);
        map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(input);
        
        // Create Drawing Mananger for Polygons
        drawingManager.setMap(map)
        drawingManager.setDrawingMode(window.google.maps.drawing.OverlayType.POLYGON)


        let markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    // Clear out the old markers.
    markers.forEach(marker => {
      marker.setMap(null);
    });
    markers = [];
    // For each place, get the icon, name and location.
    const bounds = new window.google.maps.LatLngBounds();
    places.forEach(place => {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      const icon = {
        url: place.icon,
        size: new window.google.maps.Size(71, 71),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(17, 34),
        scaledSize: new window.google.maps.Size(25, 25)
      };
      // Create a marker for each place.
      markers.push(
        new window.google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location
        })
      );


      })
    })

      // Get Current Postion
      const infoWindow = new window.google.maps.InfoWindow
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          // infoWindow.setPosition(pos);
          // infoWindow.setContent('Your Location');
          // infoWindow.open(map);
          map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        // handleLocationError(false, infoWindow, map.getCenter());
      }
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        }


    }



    const createMarker = () =>
        new window.google.maps.Marker({
            position: {lat: myLocation.lat, lng: myLocation.lng},
            map: googleMap.current
        })

    // useEffect Hook
    useEffect(() => {
        const googleMapScript = document.createElement('script')
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=geometry,drawing,places`
        window.document.body.appendChild(googleMapScript)
        
        googleMapScript.addEventListener('load', () => {
            googleMap.current = createGoogleMap()
            marker.current = createMarker()
        })

        return ()=>{
          //TODO: Clean up
          //element.removeEventListener("mousedown", handleMouseDown, true);  
        }
    },[]);


    dispatch(displayPolyData(poly))
    return (

        <MapContainer id="google-map" ref={googleMapRef}/>


 
      
    )
}

// <Div>
// {poly.isDrawn && <PolygonData/> }
// <MapContainer id="google-map" ref={googleMapRef}>
//     <Logo>
//       Bears{" "}
//       <span role="img" aria-label="tent">
//         ⛺️
//       </span>
//     </Logo>
// </MapContainer>
//  {poly.isDrawn ? <AreaSelectButton className= {"sdfas"} text={"continue"} /> : null}
//  <Menu>TEST</Menu>
// </Div>



