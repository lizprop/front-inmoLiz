import React from 'react'
import MapaPropiedades from '../../Components/MapProps';
import { useSelector } from 'react-redux';


function MapaPAge() {
    const allPropsMap = useSelector(state => state.propsMap);
    return (
        <div className='cont-titulo-filtros-listaProps'>
            <h1 className='titulo-busqueda' data-translate>Nuestras propiedades en el mapa</h1>
            <div className='cont-propsMapa'>
                <MapaPropiedades propiedades={allPropsMap.propiedades} />
            </div>
        </div>
    )
}

export default MapaPAge