import React from 'react'
import {Link} from 'react-router-dom'
import {FiPlus} from 'react-icons/fi'
import {Map, TileLayer} from 'react-leaflet'

import mapMarkerImg from '../images/map-marker.svg'

import '../styles/pages/orphanagesMap.scss'
import 'leaflet/dist/leaflet.css'

export default () => {
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>
                <footer>
                    <strong>Cidade</strong>
                    <p>Estado</p>
                </footer>
            </aside>
            <Map
                center={[-23.5515193939209, -46.633140563964844]}
                zoom={15}
                style={{width: '100%', height: '100%'}}
            >
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
            </Map>
            <Link to="" className="create-orphanage">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    )
}