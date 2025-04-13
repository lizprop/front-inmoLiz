import React from 'react';
import WhatsAppButton from '../BotonWhastApp';
import './estilos.css';

function Nosotros() {
  return (
    <div className='cont-nosotros'>
      <div className='cont-textos-nosotros'>
        <p className="p-texto-nosotros" data-translate>
          Nos dedicamos a realizar gestiones inmobiliarias,
          <br/>
          con un enfoque en propiedades de diseño único.
        </p>
        
        <p className="p-texto-nosotros" data-translate>Creemos en la importancia de caminar juntos hacia el cumplimiento de tus objetivos, para que sientas nuestro respaldo en cada paso del proceso.</p>
      </div>
      <WhatsAppButton/>
    </div>
  )
}

export default Nosotros