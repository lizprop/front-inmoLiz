import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import IconoUbicacion from '../../Images/Iconos/iconoUbicacion.png';
import IconoSup from '../../Images/Iconos/IconoSup';
import IconoAmb from '../../Images/Iconos/IconoAmb';
import IconoDormitorio from '../../Images/Iconos/IconoDormitorios';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import './styles.css';

function CardEmprendimiento({ id, imagen, direccionF, locacion, tituloPublicacion, tipo }) {

    //estado para el hover
    const [showDetail, setShowDetail] = useState(false);

    return (
        <div className='contCard'>
            {/* titulo */}
            <div className='card-title'>
                <h2 className='titulo-card'>Emprendimiento</h2>
            </div>

            {/* img + animacion + abre detalle */}
            <NavLink to={`/detalleEmp/${id}`} className='navLink-car'>
                <div
                    onMouseEnter={() => setShowDetail(true)}
                    onMouseLeave={() => setShowDetail(false)}
                >
                    {/* imagen */}
                    <div className='card-image'>
                        <img src={imagen} alt='not found' className='card-img emp-img' />
                    </div>

                    {/* msj detalle si hay hover */}
                    <div className={`detail ${showDetail ? 'show' : ''}`}>
                        <p className='palabra-abre-detalle'>Detalle</p>
                    </div>
                </div>
            </NavLink>

            {/* info 1 */}
            <div className='card-info1'>
                <div className='cont-titulo-publicacion'>
                    <span className='tituloPublicacion'>{tituloPublicacion}</span>
                </div>
                <div className='cont-info1'>
                    <img src={IconoUbicacion} alt='iconoUbi' style={{width:'30px', height:'30px'}}/>
                    <span className='direccion-card'>
                        {/* Barrio: {ubicacion.barrio} | */} {direccionF}
                    </span>
                </div>

                <div className='cont-precio-fav locacion-card'>
                    <p className='locacion-p'>{locacion}</p>
                </div>
            </div>
            
            {/* info 2 */}
            <div className='card-info2'>
                <div className='div-info2'>
                    <IconoSup />
                    <p className='info2'>Superficie</p>
                </div>

                <div className='div-info2'>
                    <IconoAmb />
                    <p className='info2'>Ambientes</p>
                </div>

                <div className='div-info2'>
                    <IconoDormitorio />
                    <p className='info2'>Dormitorios</p>
                </div>

                <div className='div-info2'>
                    <DirectionsCarIcon sx={{ color: 'rgba(171, 132, 94, 1)', width: '28px', height: '28px' }} />
                    <p className='info2'>Cocheras</p>
                </div>
            </div>
        </div>
    )
}

export default CardEmprendimiento;
