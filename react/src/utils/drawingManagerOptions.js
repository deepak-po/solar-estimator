export default ()=> {
  return {

    drawingMode: window.google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
    position: window.google.maps.ControlPosition.TOP_RIGHT,
    drawingModes: [ 'polygon']
    },
    markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
    polygonOptions: {
    fillColor: '#f8dd74',
    fillOpacity: .4,
    strokeWeight: 2,
    strokeColor: '#4fc5b5',
    clickable: true,
    editable: true,
    zIndex: 1
    }
  }
}