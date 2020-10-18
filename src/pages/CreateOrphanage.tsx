import React, { FormEvent, useState, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiPlus } from "react-icons/fi";
import mapIconOptions from '../utils/mapIconOptions'
import {LeafletMouseEvent} from 'leaflet'
import api from "../services/api";

import '../styles/pages/create-orphanage.scss';

export default () => {
  const history = useHistory()
  
  const [position, setPosition] = useState({latitude: 0, longitude: 0})
  const [name, setname] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [openingHours, setOpeningHours] = useState('')
  const [openOnWeekends, setOpenOnWeekends] = useState(true)
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  const handleMapClick = (e: LeafletMouseEvent) => {
    const {lat, lng} = e.latlng
    setPosition({latitude: lat, longitude: lng})
  }

  const handleSelectImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const selectedImages = Array.from(e.target.files)
    setImages(selectedImages)
    const selectedImagesPreview = selectedImages.map(img => URL.createObjectURL(img))
    setPreviewImages(selectedImagesPreview)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const {latitude, longitude} = position

    const data = new FormData()
    data.append('name', name)
    data.append('about', about)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('instructions', instructions)
    data.append('opening_hours', openingHours)
    data.append('open_on_weekends', String(openOnWeekends))
    images.forEach(img => data.append('images', img))
    
    await api.post('/orphanages', data)

    alert('Cadastro realizado com sucesso!')

    history.push('/app')
  }

    return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-23.5515193939209, -46.633140563964844]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== 0 && <Marker interactive={false} icon={mapIconOptions} position={[position.latitude, position.longitude]} />}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={e => setname(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} value={about} onChange={e => setAbout(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((img, i) => {
                  return (
                    <img key={`image_${i}`} src={img} alt={name} />
                  )
                })}
                <label className="new-image" htmlFor="image[]">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input multiple type="file" name="" id="image[]" onChange={handleSelectImages} />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={e => setInstructions(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário das visitas</label>
              <input id="opening_hours" value={openingHours} onChange={e => setOpeningHours(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className={openOnWeekends ? "active" : ''} onClick={() => setOpenOnWeekends(true)}>Sim</button>
                <button type="button" className={!openOnWeekends ? "active" : ''} onClick={() => setOpenOnWeekends(false)}>Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
