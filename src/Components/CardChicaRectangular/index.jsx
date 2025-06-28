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

function CardChica({ id, direccionF, cantCocheras, operacion, imagenes, tituloPublicacion, ambientes, dormitorios, supTotal, supCubierta, supDescubierta, unidadMedida, tipo, vista }) {

    //estado para el hover
    const [showDetail, setShowDetail] = useState(false);
    const venta = operacion.find(op => op.operacion === "Venta");
    const alquiler = operacion.find(op => op.operacion === "Alquiler");

    return (
        <div className='contCard-chica'>
            {/* img + animacion + abre detalle */}
            <NavLink to={`/detalle/${id}`} className='navLink-car'>
                <div
                    onMouseEnter={() => setShowDetail(true)}
                    onMouseLeave={() => setShowDetail(false)}
                >
                    {/* imagen */}
                    <div className='card-image-chica'>
                        <img src={imagenes[0].original} alt='not found' className='card-img-chica' />
                    </div>

                    {/* msj detalle si hay hover */}
                    <div className={`detail-chica ${showDetail ? 'show-chica' : ''}`}>
                        <p className='palabra-abre-detalle' data-translate>Detalle</p>
                    </div>
                </div>
            </NavLink>

            {/* titulo */}
            <div className='cont-operacion-chica'>
                {operacion.length > 1 ? (
                    <h2 className='titulo-card-chica' data-translate>Venta/Alq</h2>
                ) : operacion[0]?.operacion === 'Venta' ? (
                    <h2 className='titulo-card-chica' data-translate>Venta</h2>
                ) : operacion[0]?.operacion === 'Alquiler' ? (
                    <h2 className='titulo-card-chica' data-translate>Alquiler</h2>
                ) : null}
            </div>

            {/* info 1 */}
            <div className='card-info1-chica'>
                <div className='cont-titulo-publicacion-card-chica'>
                    <h5 className='tituloPublicacion-chica' data-translate>{tituloPublicacion}</h5>
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
                        {vista === "Venta" && venta && (
                            <p className='precio'>
                                {venta.precios[0]?.moneda} {formatMoney(venta.precios[0]?.precio)}
                            </p>
                        )}

                        {vista === "Alquiler" && alquiler && (
                            <p className='precio'>
                                {alquiler.precios[0]?.moneda} {formatMoney(alquiler.precios[0]?.precio)}
                            </p>
                        )}

                        {vista === "ambas" && venta && alquiler && (
                            <p className='precio'>
                                {venta.precios[0]?.moneda} {formatMoney(venta.precios[0]?.precio)} / {alquiler.precios[0]?.moneda} {formatMoney(alquiler.precios[0]?.precio)}
                            </p>
                        )}

                        {vista === "ambas" && venta && !alquiler && (
                            <p className='precio'>
                                {venta.precios[0]?.moneda} {formatMoney(venta.precios[0]?.precio)}
                            </p>
                        )}

                        {vista === "ambas" && alquiler && !venta && (
                            <p className='precio'>
                                {alquiler.precios[0]?.moneda} {formatMoney(alquiler.precios[0]?.precio)}
                            </p>
                        )}
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
                    <p className='info2-chica' data-translate>Sup. Tot</p>
                    <p className='info2-chica'>
                        {supTotal}m
                        <sup>2</sup>
                    </p>
                </div>

                {
                    tipo?.nombre === "Terreno" ? (
                        <>
                            <div className='div-info2'>
                                <IconoSup sx={{ fontSize: 12}}/>
                                <p className='info2-chica' data-translate>Sup. Cub</p>
                                <p className='info2-chica'>
                                    {supCubierta}m
                                    <sup>2</sup>
                                </p>
                            </div>
                            <div className='div-info2'>
                                <IconoSup sx={{ fontSize: 12}}/>
                                <p className='info2-chica' data-translate>Sup. Desc</p>
                                <p className='info2-chica'>
                                    {supDescubierta}m
                                    <sup>2</sup>
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='div-info2'>
                                <TagIcon />
                                <p className='info2-chica' data-translate>Ambientes</p>
                                <p className='info2-chica'>{ambientes}</p>
                            </div>

                            <div className='div-info2'>
                                <HotelIcon />
                                <p className='info2-chica' data-translate>Dormitorios</p>
                                <p className='info2-chica'>{dormitorios}</p>
                            </div>

                            <div className='div-info2'>
                                <DirectionsCarIcon />
                                <p className='info2-chica' data-translate>Cocheras</p>
                                <p className='info2-chica'>{cantCocheras}</p>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default CardChica;
