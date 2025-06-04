import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { formatMoney } from '../../Helps';
import IconoUbicacion from '../../Images/Iconos/iconoUbicacion.png';
import Favorito from '../Favoritos';
import HomeIcon from '@mui/icons-material/Home';
import TagIcon from '@mui/icons-material/Tag';
import HotelIcon from '@mui/icons-material/Hotel';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import IconoSup from '../../Images/Iconos/IconoSup';
import MeGusta from '../BotonMeGusta';
import './styles.css'

function Card({ id, direccionF, cantCocheras, operacion, imagenes, tituloPublicacion, ambientes, dormitorios, supTotal, supCubierta, supDescubierta, unidadMedida, tipo }) {

    //estado para el hover
    const [showDetail, setShowDetail] = useState(false);

    return (
        <div className='contCard'>
            {/* img + animacion + abre detalle */}
            <NavLink to={`/detalle/${id}`} className='navLink-car'>
                <div
                    onMouseEnter={() => setShowDetail(true)}
                    onMouseLeave={() => setShowDetail(false)}
                >
                    {/* imagen */}
                    <div className='card-image'>
                        <img src={imagenes[0].original} alt='not found' className='card-img' />
                    </div>

                    {/* msj detalle si hay hover */}
                    <div className={`detail ${showDetail ? 'show' : ''}`}>
                        <p className='palabra-abre-detalle' data-translate>Detalle</p>
                    </div>
                </div>
            </NavLink>

            {/* titulo */}
            <div className='cont-operacion'>
                <h2 className='titulo-card' data-translate>{operacion[0].operacion}</h2>
            </div>

            {/* info 1 */}
            <div className='card-info1'>
                <div className='cont-titulo-publicacion-card'>
                    <h5 className='tituloPublicacion' data-translate>{tituloPublicacion}</h5>
                </div>
                <div className='cont-info1'>
                    <img src={IconoUbicacion} alt='iconoUbi' style={{width:'30px', height:'30px'}}/>
                    <p className='direccion-card' data-translate>
                        {/* Barrio: {ubicacion.barrio} | */} {direccionF}
                    </p>
                </div>
                {/* precio */}
                <div className='cont-precio-fav'>
                    <div className='cont-precio'>
                        <p className='precio'>
                            {operacion[0].precios[0].moneda} {formatMoney(operacion[0].precios[0].precio)}
                        </p>
                    </div>
                    {/* favorito */}
                    <div className='cont-fav'>
                        <MeGusta id={id}/>
                        <Favorito 
                            id={id}
                            direccionF={direccionF}
                            cantCocheras={cantCocheras}
                            operacion={operacion}
                            imagenes={imagenes}
                            tituloPublicacion={tituloPublicacion}
                            ambientes={ambientes}
                            dormitorios={dormitorios}
                            unidadMedida={unidadMedida}
                            tipo={tipo}
                        />
                    </div>
                </div>
            </div>
            
            {/* info 2 */}
            <div className='card-info2'>
                <div className='div-info2'>
                    <HomeIcon />                    
                    <p className='info2' data-translate>Sup. Tot</p>
                    <p className='info2'>
                        {supTotal}m
                        <sup>2</sup>
                    </p>
                </div>

                {
                    tipo?.nombre === "Terreno" ? (
                        <>
                            <div className='div-info2'>
                                <IconoSup />
                                <p className='info2' data-translate>Sup. Cub</p>
                                <p className='info2'>
                                    {supCubierta}m
                                    <sup>2</sup>
                                </p>
                            </div>
                            <div className='div-info2'>
                                <IconoSup />
                                <p className='info2' data-translate>Sup. Desc</p>
                                <p className='info2'>
                                    {supDescubierta}m
                                    <sup>2</sup>
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='div-info2'>
                                <TagIcon />
                                <p className='info2' data-translate>Ambientes</p>
                                <p className='info2'>{ambientes}</p>
                            </div>

                            <div className='div-info2'>
                                <HotelIcon />
                                <p className='info2' data-translate>Dormitorios</p>
                                <p className='info2'>{dormitorios}</p>
                            </div>

                            <div className='div-info2'>
                                <DirectionsCarIcon />
                                <p className='info2' data-translate>Cocheras</p>
                                <p className='info2'>{cantCocheras}</p>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Card;
