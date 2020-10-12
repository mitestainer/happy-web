import React from 'react'
import {Link} from 'react-router-dom'
import {FiArrowRight} from  'react-icons/fi'

import '../styles/pages/landing.scss'

import logoImg from '../images/logo.svg'

export default () => {
    return (
        <div id="page-landing">
            <div className="content-wrapper">
                <img src={logoImg} alt="Happy" />
                <main>
                    <h1>Leve feliciade para o mundo</h1>
                    <p>Visite orfanatos e mude o dia de muitas crianças.</p>
                </main>
                <div className="location">
                    <strong>Cidade</strong>
                    <span>Estado</span>
                </div>
                <Link to="/app" className="enter-app">
                    <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
                </Link>
            </div>
        </div>
    )
}