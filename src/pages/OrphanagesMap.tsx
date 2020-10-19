import React, {useContext, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {FiPlus, FiArrowRight} from 'react-icons/fi'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import mapIconOptions from '../utils/mapIconOptions'
import api from '../services/api'
import LocationContext from '../contexts/LocationContext'

import mapMarkerImg from '../images/map-marker.svg'

import '../styles/pages/orphanagesMap.scss'

interface Orphanage {
    id: number
    latitude: number
    longitude: number
    name: string
}

export default () => {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])
    const {lat, lon, city, state} = useContext(LocationContext)

    useEffect(() => {
        api.get('/orphanages').then(res => {
            setOrphanages(res.data)
        })
    }, [])

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>
                <footer>
                    <strong>{city}</strong>
                    <p>{state}</p>
                </footer>
            </aside>
            <Map
                center={[lat, lon]}
                zoom={15}
                style={{width: '100%', height: '100%'}}
            >
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
                {orphanages.map(item => {
                    return (
                        <Marker key={`orphanage_${item.id}`} position={[item.latitude, item.longitude]} icon={mapIconOptions}>
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {item.name}
                                <Link to={`orphanages/${item.id}`}>
                                    <FiArrowRight size={20} color="#fff" />
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}
            </Map>
            <Link to="orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    )
}