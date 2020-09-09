import React, { useEffect, useRef, createRef } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"

import mapStyles from "../utils/mapStyles"
import mapOptions from "../utils/mapOptions"
import drawingManagerOptions from "../utils/drawingManagerOptions"
import { drawStart } from "../utils/redux"

const  myLocation = { lat: 43.642567, lng: -79.387054}
const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY

const MapContainer = styled.div`
	align-self: auto;
  /* max-width: 800px; */
  /* min-width:200px; */
	width: 100%;
  /* max-height: 700px; */
  min-height:200px;
	height: 100%;
	border: 1px solid gray;
	border-radius: 10px;
`


export default function GoogleMap(props) {

    // refs
    const dispatch = useDispatch()
    const googleMapRef = createRef()
    const googleMap = useRef(null)
    const marker = useRef(null)

    // A function to create map and add all the library components and eventListeners
    const createGoogleMap = () => {

        const map = new window.google.maps.Map(googleMapRef.current, {...{styles: mapStyles},...mapOptions()})
        const drawingManager = new window.google.maps.drawing.DrawingManager(drawingManagerOptions())

        var redrawCount = 1
        window.google.maps.event.addListener(drawingManager, 'polygoncomplete', (polygon)=> {

          const getPath = () => {
              const area = window.google.maps.geometry.spherical.computeArea(polygon.getPath()) //m2
              const len = window.google.maps.geometry.spherical.computeLength(polygon.getPath()) //m
              const path = []
              polygon.getPath().getArray().forEach( point => path.push({lat:point.lat(), lng:point.lng()}))
              const bounds = new window.google.maps.LatLngBounds()
              polygon.getPath().getArray().forEach(point=>bounds.extend(point))
              const centroid = {lat:bounds.getCenter().lat(), lng: bounds.getCenter().lng()}
              return {area, len, path, centroid, polygon:polygon,map:map, drawingManager:drawingManager}
          }

          //preform calcs
          // TODO: STORE calcs in state
          drawingManager.setMap(null) //disable map after draw
          polygon.setOptions({id: redrawCount, editable: true, draggable: true})
          window.google.maps.event.addListener(polygon.getPath(), 'insert_at', ()=>{dispatch(drawStart(getPath()))})
          window.google.maps.event.addListener(polygon.getPath(), "remove_at", ()=>{dispatch(drawStart(getPath()))});
          window.google.maps.event.addListener(polygon.getPath(), "set_at", ()=>{dispatch(drawStart(getPath()))});
          dispatch(drawStart(getPath()))
          redrawCount++
          
          
        })
        
        // Create Input Element and Add to Google Map Object
        const googleMapInput = document.createElement('input')
        googleMapInput.setAttribute('id', 'pac-input')
        window.document.body.appendChild(googleMapInput)
        const input = document.getElementById('pac-input')
        const searchBox = new window.google.maps.places.SearchBox(input)
        map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(input)
        
        // Create Drawing Manager for Polygons
        drawingManager.setMap(map)
        drawingManager.setDrawingMode(window.google.maps.drawing.OverlayType.POLYGON)


        let markers = []
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', () => {
    const places = searchBox.getPlaces()

    if (places.length === 0) {
      return
    }
    // Clear out the old markers.
    markers.forEach(marker => {
      marker.setMap(null)
    })
    markers = []
    // For each place, get the icon, name and location.
    // const bounds = new window.google.maps.LatLngBounds()
      places.forEach((place) => {
      if (!place.geometry) {
        console.log("Returned place contains no geometry")
        return
      }
      const icon = {
        url: place.icon,
        size: new window.google.maps.Size(71, 71),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(17, 34),
        scaledSize: new window.google.maps.Size(25, 25),
      }
      // Create a marker for each place.
      markers.push(
        new window.google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      )
    })
    })

      // Get Current Position
      const infoWindow = new window.google.maps.InfoWindow()
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }

          // infoWindow.setPosition(pos)
          // infoWindow.setContent('Your Location')
          // infoWindow.open(map)
          map.setCenter(pos)
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter())
        })
      } else {
        // Browser doesn't support Geolocation
        // handleLocationError(false, infoWindow, map.getCenter())
      }
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos)
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.')
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
          //element.removeEventListener('mousedown', handleMouseDown, true)  
          //clear google map redux state
        }
    }, [])


    
    return <MapContainer id='google-map' ref={googleMapRef}/>

}


