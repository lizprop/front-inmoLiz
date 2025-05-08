import React from 'react';
import { Link } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Logo from '../../Images/logoNuevo.jpeg';
import './styles.css';

function Footbar() {
    return (
        <footer className='contFooter'>
            <div className="footer">
                <div className='divF'>
                    {/* logo */}
                    <a href='/home'>
                        <img src={Logo} alt='' className='logo-footbar' />
                    </a>
                    <ul>
                        {/* Contactanos */}
                        <li>
                            <div className='divLinks'>
                                <h2>
                                    <p className='titulo-col-foot' data-translate>Encontranos en</p>
                                </h2>
                                <p className='info-contactos'>
                                    Gral. Roca 1238 - Mar del Plata
                                </p>

                                <p className='info-contactos'>
                                    Whatsapp +54 9 223 6162426
                                </p>

                                <p className='info-contactos'>
                                    mail
                                </p>
                            </div>
                        </li>
                        {/* Redes */}
                        <li>
                            <div className='divLinks'>
                            <h2>
                                <p className='titulo-col-foot' data-translate>Seguinos</p>
                            </h2>
                            <div className='cont-iconos-redes'>
                                <a href='https://www.instagram.com/jf.negociosinmobiliarios/'>
                                    <InstagramIcon sx={{'color':'rgba(255, 255, 255, 1)'}}/>
                                </a>
                                <a href='http://api.whatsapp.com/send?phone=2236162426'>
                                    <WhatsAppIcon sx={{'color':'rgba(255, 255, 255, 1)'}}/>
                                </a>
                                </div>
                            </div>
                        </li>
                        {/* Links */}
                        <li>
                            <div className='divLinks'>
                                <h2>
                                    <p className='titulo-col-foot' data-translate>Links</p>
                                </h2>

                                <Link to={'/ventas'} className='link-footbar' data-translate>Ventas</Link>
                                <Link to={'/alquiler'} className='link-footbar' data-translate>Alquileres</Link>
                                <Link to={'/emprendimientos'} className='link-footbar' data-translate>Emprendimientos</Link>
                                <Link to={'/contacto'} className='link-footbar' data-translate>Contacto</Link>
                                <Link to={'/nosotros'} className='link-footbar' data-translate>Nosotros</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>    
            
            <div className='cont-info-derechos'>
                <p data-translate className='info-derechos'>
                    Todas las medidas enunciadas son meramente orientativas, 
                    las medidas exactas serán las que se expresen en el respectivo 
                    título de propiedad de cada inmueble. Todas las fotos, 
                    imagenes y videos son meramente ilustrativos y no contractuales. 
                    Los precios enunciados son meramente orientativos y no contractuales..
                    © 2025 Ortiz Lizmar Propiedades. DESARROLLO WEB: Marcos Forastiere
                </p>
            </div>
        </footer>
    )
}

export default Footbar;