import React, { useEffect } from 'react';
import FormularioContacto from '../../Components/FormularioContacto'
import MapaProp from '../../Components/MapaProp';
import RoomIcon from '@mui/icons-material/Room';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import './estilos.css';


function Contactanos() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='contGralFormulario'>
            <div className='subcont-contacto'>
                <div className='subCont'>
                    <div className='cont-dataOficina'>
                        <div className='cont-contacto-info-1'>
                            <h2>Nuestra oficina</h2>
                            <div className='sub-cont-info-Contacto-1'>
                                <RoomIcon sx={{ marginRight: '5px' }} />
                                <p>Gral. Roca 1238 - Mar del Plata</p>
                            </div>
                        </div>

                        <div className='cont-contacto-info-2'>
                            <h2>Información de contacto</h2>
                            <div className='sub-cont-info-Contacto-2'>
                                <EmailIcon sx={{ marginRight: '5px' }} />
                                <p>info@ortizlizmar.com</p>
                            </div>
                            <div className='sub-cont-info-Contacto-2'>
                                <CallIcon sx={{ marginRight: '5px' }} />
                                <p>2236162426</p>
                            </div>
                        </div>

                        <div className='divLinks'>
                            <h2>Seguinos</h2>
                            <div className='cont-iconos-redes'>
                                <a
                                    href="https://www.facebook.com/OrtizLizmarPropiedades"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ marginLeft: '5px' }}
                                >
                                    <InstagramIcon sx={{ 'color': 'rgb(6, 6, 6)' }} />
                                </a>
                                <a
                                    href='http://api.whatsapp.com/send?phone=2236162426'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ marginLeft: '5px' }}
                                >
                                    <WhatsAppIcon sx={{ 'color': 'rgb(6, 6, 6)' }} />
                                </a>
                                <a
                                    href='https://www.youtube.com/@OLpropiedades/videos'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ marginLeft: '5px' }}
                                >
                                    <YouTubeIcon sx={{ 'color': 'rgb(6, 6, 6)' }} />
                                </a>
                                <a
                                    href='https://www.facebook.com/OrtizLizmarPropiedades'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ marginLeft: '5px' }}
                                >
                                    <FacebookIcon sx={{ 'color': 'rgb(6, 6, 6)' }} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='cont-mapaOfi'>
                        <MapaProp lat={-38.019081} lng={-57.543701} /> 
                    </div>
                </div>
                <div className='cont-formulario-page'>
                    <FormularioContacto />
                </div>
            </div>
        </div>
    )
}

export default Contactanos