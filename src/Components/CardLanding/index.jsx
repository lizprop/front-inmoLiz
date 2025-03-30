import React from 'react'
import './styles.css'
import { NavLink } from 'react-router-dom'

function CardLanding({imagen, titulo, url}) {
  return (
    <div className='cont-tarjeta'>
        <div className='cont-img-tarjeta'>
            <img className='img-tarjeta' src={imagen} alt='Imagen de la propiedad'/>
        </div>
        <div className='cont-titulo-tarjeta'>
            <h2 className='titulo-tarjeta'>{titulo}</h2>
        </div>
        <div className='cont-btn'>
            <NavLink to={`/${url}`} style={{textDecoration: 'none'}}>
              <button className='btn-comprar'>Ingresar</button>
            </NavLink>
        </div>
    </div>
  )
}

export default CardLanding