import React from 'react';
import { NavLink } from 'react-router-dom';
import WhatsAppButton from '../BotonWhastApp';
import './estilos.css';

function Nosotros() {
  return (
    <div className='cont-nosotros'>
      <div className='capa-nosotros' />

      <div className='cont-nosotros-contenido'>
        <div className='cont-textos-nosotros'>
          <p className='eyebrow-nosotros' data-translate>Nosotros</p>
          <h2 className='titulo-nosotros' data-translate>
            Asesoramiento inmobiliario con criterio y cercania
          </h2>

          <p className='p-texto-nosotros' data-translate>
            Nos dedicamos a realizar gestiones inmobiliarias, con un enfoque en propiedades de diseño unico.
          </p>
          <p className='p-texto-nosotros' data-translate>
            Creemos en la importancia de caminar juntos hacia el cumplimiento de tus objetivos, para que sientas nuestro respaldo en cada paso del proceso.
          </p>

          <div className='fila-datos-nosotros'>
            <div className='dato-nosotros'>
              <p className='dato-numero'>+55</p>
              <p className='dato-texto' data-translate>Años de experiencia</p>
            </div>
            <div className='dato-nosotros'>
              <p className='dato-numero'>360</p>
              <p className='dato-texto' data-translate>Acompañamiento integral</p>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppButton />
    </div>
  );
}

export default Nosotros;
