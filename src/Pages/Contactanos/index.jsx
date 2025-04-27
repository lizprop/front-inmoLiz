import React, { useEffect } from 'react';
import FormularioContacto from '../../Components/FormularioContacto'
import './estilos.css';


function Contactanos() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='contGralFormulario'>
            <div className='cont-formulario-page'>
                <FormularioContacto />
            </div>
        </div>
    )
}

export default Contactanos