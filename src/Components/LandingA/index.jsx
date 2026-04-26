import React from 'react'
import CarruselLnding from '../CarruselLanding'
//import logoNuevo from '../../Images/logoNuevo.jpeg';
import './styles.css'

function LandigA() {
    const scrollToProperties = () => {
        window.scrollTo({
            top: window.innerHeight * 0.92,
            behavior: 'smooth'
        });
    };

    return (
        <div className='cont-landing-A'>
            <div className='cont-carruselLanding'>
                <CarruselLnding />
            </div>

            <div className='landing-overlay'>
                <div className='landing-content' data-translate>
                    <div className='landing-copy'>
                        <span className='landing-eyebrow' data-translate>Ortiz LizMar inmobiliaria</span>
                        <h1 className='tituloLanding' data-translate>
                            55 a&ntilde;os acompa&ntilde;ando decisiones inmobiliarias.
                        </h1>
                        <p className='textoLanding-p' data-translate>
                            Encontr&aacute; propiedades seleccionadas en las zonas que mejor se ajustan a tu forma de vivir, invertir o proyectar.
                        </p>

                        <div className='landing-actions'>
                            <button type='button' className='landing-btn landing-btn-primary' onClick={scrollToProperties} data-translate>
                                Ver propiedades
                            </button>
                            <a href='/contacto' className='landing-btn landing-btn-secondary' data-translate>
                                Hablar con un asesor
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            <div className='cont-flecha-home'>
                <div className='flecha-home'>
                    <div className='linea linea1'></div>
                    <div className='linea linea2'></div>
                </div>
            </div>
        </div>
    )
}

export default LandigA
