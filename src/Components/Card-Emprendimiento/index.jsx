import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { capitalizar } from '../../Helps';
import LocationOnIcon from '@mui/icons-material/LocationOn';
//import Favorito from '../Favoritos';
//import MeGusta from '../BotonMeGusta';
import './styles.css'

function CardEmp({ id, direccionF, imagen, tituloPublicacion, descripcion }) {

    //estado para el hover
    const [showDetail, setShowDetail] = useState(false);

    return (
        <div className='contCardHome cardEmp'>
            {/* img + animacion + abre detalle */}
            <NavLink to={`/detalleEmp/${id}`} className='navLink-car'>
                <div
                    onMouseEnter={() => setShowDetail(true)}
                    onMouseLeave={() => setShowDetail(false)}
                >
                    {/* imagen */}
                    <div className='card-image'>
                        <img src={imagen} alt='not found' className='card-img' />
                    </div>

                    {/* msj detalle si hay hover */}
                    <div className={`detail ${showDetail ? 'show' : ''}`}>
                        <p className='palabra-abre-detalle' data-translate>Detalle</p>
                    </div>
                </div>
            </NavLink>

            {/* info 1 */}
            <div className='card-info1'>
                <div className='cont-titulo-publicacion-card'>
                    <div className='cont-titulo-card'>
                        <h5 className='tituloPublicacion' data-translate>{capitalizar(tituloPublicacion)}</h5>
                    </div>
                    <div className='cont-direcc-icono-card'>
                        <LocationOnIcon sx={{ color: 'grey' }} />
                        <p className='direcc-card' data-translate>{direccionF}</p>
                    </div>
                </div>
                
                {/* precio */}
                <div className='cont-precio-fav'>
                    <p className='p-descrip-emp'>{capitalizar(descripcion)}</p>
                </div>
            </div>
        </div>
    )
}

export default CardEmp;
