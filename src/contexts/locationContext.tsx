import React, {createContext, useEffect, useState} from 'react'
import axios from 'axios'

interface LocationContextData {
    lat: number
    lon: number
    city: string
    state: string
    isLoading: boolean
}

const LocationContext = createContext<LocationContextData>({} as LocationContextData)

export const LocationProvider: React.FC = ({ children }) => {
    const [location, setLocation] = useState({
        lat: -23.5515193939209,
        lon: -46.633140563964844,
        city: 'São Paulo',
        state: 'São Paulo',
        isLoading: false
    })

    const showPosition = async (position: any) => {
        setLocation({...location, isLoading: true})
        const {latitude, longitude} = position.coords
        const loc:any = await axios.get(`https://us1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_LOCATIONIQ_TOKEN}&lat=${latitude}&lon=${longitude}&format=json`)
        const locObj = {
            lat: latitude,
            lon: longitude,
            city: loc.data.address.city_district,
            state: loc.data.address.state,
            isLoading: false
        }
        setLocation(locObj)
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition)
        }
    }, [])

    return (
    <LocationContext.Provider value={location}>
        {children}
    </LocationContext.Provider>
)}

export default LocationContext