import React from 'react';
import './styles.css';
import { NavLink } from 'react-router-dom';

function CardLanding({ imagen, titulo, texto, url, etiqueta }) {
  return (
    <NavLink to={`/${url}`} className='cont-tarjeta' aria-label={titulo}>
      <div className='cont-img-tarjeta'>
        <img className='img-tarjeta' src={imagen} alt={titulo} />
      </div>

      <div className='cont-titulo-tarjeta'>
        <span className='categoria-tarjeta' data-translate>{etiqueta}</span>
        <h3 className='titulo-tarjeta' data-translate>{titulo}</h3>
        <p className='texto-tarjeta' data-translate>{texto}</p>
      </div>

      <span className='btn-comprar' data-translate>
        Ingresar
        <span className='btn-comprar-icon' aria-hidden='true'>→</span>
      </span>
    </NavLink>
  )
}

export default CardLanding;
