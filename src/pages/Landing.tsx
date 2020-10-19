import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiLoader } from  'react-icons/fi'
import LocationContext from '../contexts/LocationContext'

import '../styles/pages/landing.scss'

import logoImg from '../images/logo.svg'

export default () => {
    const {city, state, isLoading} = useContext(LocationContext)

    return (
        <div id="page-landing">
            <div className="content-wrapper">
                <img src={logoImg} alt="Happy" />
                <main>
                    <h1>Leve feliciade para o mundo</h1>
                    <p>Visite orfanatos e mude o dia de muitas crianças.</p>
                </main>
                <div className="location">
                    <span>
                        {isLoading && <FiLoader />}
                        <strong>{city}</strong>
                    </span>
                    <span>{state}</span>
                </div>
                <Link to="/app" className="enter-app">
                    <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
                </Link>
            </div>
        </div>
    )
}