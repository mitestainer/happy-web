import React from 'react';
import Routes from './routes'
import { LocationProvider } from './contexts/LocationContext'

import './styles/global.scss'
import 'leaflet/dist/leaflet.css'

function App() {
  return (
    <LocationProvider>
      <Routes />
    </LocationProvider>
  );
}

export default App;
