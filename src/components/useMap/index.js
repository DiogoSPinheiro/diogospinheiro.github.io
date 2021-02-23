import { useEffect, useState } from 'react'

const initialState = {
    latitude:"",
    longitude:""
}

const useMap = () => {
    const [position,setPosition] = useState(initialState)
    
    useEffect(() => {
        if (navigator.geolocation){
            navigator.geolocation.watchPosition(onSuccess,onError, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 3000
            }) 
            function onSuccess(position){
                const { latitude, longitude } = position.coords
                setPosition({
                    latitude,
                    longitude
                })
                console.log("Sucesss")
              }
              function onError(error){
                console.log("Error", error.code)

                }
        }
          else {
            setPosition({
                latitude: -23.5379201,
                longitude: -46.6732467,
            })
          }
         
    },[])
        
    return {
        position
    }
}
export default useMap