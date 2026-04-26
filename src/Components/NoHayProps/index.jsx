import React from 'react';
import { NavLink } from 'react-router-dom';
import './estilos.css';

function NoHayProps() {
    return (
        <section className='cont-noHayProps' aria-label='Sin propiedades disponibles'>
            <div className='noHayProps-visual' aria-hidden='true'>
                <div className='noHayProps-card noHayProps-card-main'></div>
                <div className='noHayProps-card noHayProps-card-back'></div>
                <div className='noHayProps-pin'></div>
            </div>

            <div className='cont-texto-noProps'>
                <span className='noHayProps-eyebrow' data-translate>Sin resultados</span>
                <h2 data-translate>No encontramos propiedades con esos filtros</h2>
                <p data-translate>
                    Probá ampliar el rango de precio, cambiar la operación o consultar con nuestro equipo para encontrar una alternativa similar.
                </p>

                <div className='noHayProps-actions'>
                    <NavLink to='/contacto' className='noHayProps-btn noHayProps-btn-primary' data-translate>
                        Consultar opciones
                    </NavLink>
                    <NavLink to='/ventas' className='noHayProps-btn noHayProps-btn-secondary' data-translate>
                        Ver ventas
                    </NavLink>
                </div>
            </div>
        </section>
    )
}

export default NoHayProps;
