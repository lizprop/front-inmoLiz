import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../Images/logo-blanco.webp';
import LanguageSelector from '../CambiaIdioma';
import MenuHamburguesa from '../MenuHamburguesa';
import './styles.css';

function NavbarInf() {

    return (
        <div className='cont-navbarInf'>
            <div className='sub-cont-navbarInf'>
                <div className='col-1-navbarInf'>
                    <MenuHamburguesa />
                </div>
                <div className='col-2-logo-navbarInf'>
                    <NavLink to='/' className='navlink-navbarInf'>
                        <img src={Logo} alt='Logo' className='logo-navbarInf' />
                    </NavLink>
                </div>
                <div className='col-2-navbarInf'>
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
                <div className='col-3-navbarInf'>
                    <LanguageSelector />
                </div>
            </div>
        </div>
    );
}

export default NavbarInf;
