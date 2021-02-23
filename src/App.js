
import { Map, GoogleApiWrapper,Marker, InfoWindow } from 'google-maps-react';
import React,{ useState } from 'react';
import useMap from './components/useMap';
import Places from './places.json'

const mapStyles = {
  width: '100%',
  height: '100%'
};

export const MapContainer = () => {
  const { position } = useMap()
  const [ markers,setMarkers ] = useState(() => Places)
  const [showInfo,setShowInfo] = useState(false)
  const [activeMarker,setActiveMarker] = useState({})
  const [selectedPlace,setSelectPlace] = useState({})

 const mapClicked = (mapProps,map, clickEvent) => {
    const lat = clickEvent.latLng.lat()
    const lng = clickEvent.latLng.lng()
    const place = { latitude: lat, longitude:lng}
    console.log(markers)
  }
  const markerClick = (props,marker) => {
    setSelectPlace(marker)
    setActiveMarker(marker)
    setShowInfo(true)
  }
  const onClose = () => {
    if(showInfo){
      setShowInfo(false)
      setActiveMarker(null)
    }
  }
  

    return (
      <Map
        google={window.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: position.latitude,
            lng: position.longitude
          }
        }
        centerAroundCurrentLocation={true}
        onClick={mapClicked}
        >
          <Marker
            position={{lat:position.latitude, lng:position.longitude}}
            title="You are here"
          />
        {markers.map((marker,index) => (
       
           <Marker
           onClick={markerClick}
           key={index}
           name={marker.name}
           position={{lat:marker.latitude,lng:marker.longitude}}
           cursor="pointer"
           animation="1"
         />
        ))
        }
        <InfoWindow
          marker={selectedPlace}
          visible={showInfo}
          onClose={onClose}
         >
           <div>
             {selectedPlace.name}
           </div>

         </InfoWindow>
        
      </Map>
    );
}



export default GoogleApiWrapper(
  (props) => ({
    apiKey: 'AIzaSyA-EeQO_ChqL-mUJWLPQO1P_UTjBmebbA0',
  }
))(MapContainer)
