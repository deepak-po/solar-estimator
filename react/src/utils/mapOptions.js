const  myLocation = { lat: 43.642567, lng: -79.387054}

export default ()=> { return {
  height: '100%',
  zoom: 14,
  center: {lat: myLocation.lat, lng: myLocation.lng },

  disableDefaultUI: true,
  mapOptions : {
    // zoomControl: true,
    // mapTypeControl: true,
    scaleControl: true,
    // streetViewControl: true,
    // rotateControl: true,
    fullscreenControl: true
  },
  // mapTypeControl: true,
  // mapTypeControlOptions: {
  //   style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU,
  //   position: window.google.maps.ControlPosition.BOTTOM_LEFT,
  //   mapTypeIds: ['roadmap', 'terrain']
  // },
  zoomControl: true,
  zoomControlOptions: {
      // position: window.google.maps.ControlPosition.BOTTOM_RIGHT
  },
   
}}

