import React from 'react';
import { NavLink } from 'react-router-dom';
//import LogoSinFondo from '../../Images/logoSoloNombre.JPG'
import LanguageSelector from '../CambiaIdioma';
import MenuHamburguesa from '../MenuHamburguesa';
import './styles.css';

function NavbarInf() {

    return (
        <div className='cont-navbarInf'>
            <div className='sub-cont-navbarInf'>
                {/* menu hambur */}
                <div className='col-1-navbarInf'>
                    <MenuHamburguesa />
                </div>
                {/* logo + items */}                
                <div className='col-2-navbarInf'>
                    <div className='col-2-logo-navbarInf'>
                        <NavLink to='/' className='navlink-navbarInf'>
                            {/* <img src={LogoSinFondo} alt='Logo' className='logo-navbarInfR' /> */}
                            <div className='cont-ortizLizmar'>
                                <p className='nav-nombre'>ORTIZ LIZMAR</p>
                                <p className='p-propiedades'>PROPIEDADES</p>
                            </div>
                        </NavLink>
                    </div>
                    {/* items */}
                    <div className='items-nav'>
                        <ul className='ul-navbarInf'>
                            <li data-translate>
                                <NavLink to='/ventas' className={'navlink-navbarInf'}>
                                    Venta
                                </NavLink>
                            </li>
                            <li data-translate>
                                <NavLink to='/alquiler' className={'navlink-navbarInf'}>
                                    Alquiler
                                </NavLink>
                            </li>
                            <li data-translate>
                                <NavLink to='/emprendimientos' className={'navlink-navbarInf'}>
                                    Emprendimientos
                                </NavLink>
                            </li>
                            <li data-translate>
                                <NavLink to='/internacional' className={'navlink-navbarInf'}>
                                    Internacional
                                </NavLink>
                            </li>
                            <li data-translate>
                                <NavLink to='/favoritos' className={'navlink-navbarInf'}>
                                    Favoritos
                                </NavLink>
                            </li>
                            <li data-translate>
                                <NavLink to='/nosotros' className={'navlink-navbarInf'}>
                                    Nosotros
                                </NavLink>
                            </li>
                            <li data-translate>
                                <NavLink to='/contacto' className={'navlink-navbarInf'}>
                                    Contacto
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* btn-idiomas */}
                <div className='col-3-navbarInf'>
                    <LanguageSelector />
                </div>
            </div>
        </div>
    );
}

export default NavbarInf;
