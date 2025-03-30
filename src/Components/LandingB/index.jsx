import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../Images/logo-blanco.webp';
import './estilos.css';


function LandingB() {
    return (
        <div className='cont-landing-b'>
            <div className='subCont-landing-b'>
                <div className='cont-titulo-landing-b'>
                    <h2 className="texto-somos">SOMOS</h2>
                </div>
                <div className='cont-logo-landing-b'>
                    <img src={Logo} alt='not found' className='logo-landing-B' />
                </div>
                <div className='cont-texto-landing-b'>
                    <p className="texto-p-landing-b">
                        Con más de 50 años de trayectoria, nuestra inmobiliaria se especializa en la comercialización de propiedades exclusivas,
                        ofreciendo un servicio personalizado y de excelencia. Nuestro compromiso con la calidad y la confianza nos ha convertido en referentes del mercado,
                        brindando a cada cliente asesoramiento experto y soluciones a medida.
                        Contamos con un equipo de profesionales altamente capacitados para garantizar operaciones seguras y exitosas. Ya sea para la compra, venta o inversión,
                        ponemos a su disposición nuestra experiencia y una selecta cartera de inmuebles únicos.
                    </p>
                </div>
                <div className='cont-btn-contactanos'>
                    <NavLink to={'/contacto'}>
                        <button className='btn-contactanos-home'>Contactanos</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default LandingB;