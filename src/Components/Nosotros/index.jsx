import React from 'react';
import { NavLink } from 'react-router-dom';
import WhatsAppButton from '../BotonWhastApp';
import './estilos.css';

function Nosotros() {
  return (
    <div className='cont-nosotros'>
      <div className='cont-mitad-sup'>
        <div className='cont-textos-nosotros'>
          <p className="p-texto-nosotros" data-translate>
            Nos dedicamos a realizar gestiones inmobiliarias,
            <br />
            con un enfoque en propiedades de diseño único.
          </p>
          <p className="p-texto-nosotros" data-translate>
            Creemos en la importancia de caminar juntos hacia el cumplimiento de tus objetivos, para que sientas nuestro respaldo en cada paso del proceso.
          </p>
        </div>
      </div>

      <div className='cont-mitad-inf'>
        <div className='cont-nombre-inmo'>
          <NavLink to='/' className='navlink-navbarInf'>
          {/* <img src={LogoSinFondo} alt='Logo' className='logo-navbarInfR' /> */}
          <div className='cont-ortizLizmar'>
            <p className='nav-nombre'>ORTIZ LIZMAR</p>
            <p className='p-propiedades'>PROPIEDADES</p>
          </div>
        </NavLink>
        </div>
      </div>

      <WhatsAppButton/>
    </div>
  )
}

export default Nosotros