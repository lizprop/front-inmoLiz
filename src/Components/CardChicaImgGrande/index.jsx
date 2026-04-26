import React, { useState } from 'react';
import { capitalizar, formatMoney } from '../../Helps';
import { NavLink } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './styles.css';

const CardChicaImagenGrande = ({
    id,
    direccionF,
    operacion,
    imagenes = [],
    tituloPublicacion,
    vista
}) => {
    const [imgIndex, setImgIndex] = useState(0);
    const [showDetail, setShowDetail] = useState(false);

    const operaciones = operacion || [];
    const venta = operaciones.find(op => op.operacion === "Venta");
    const alquiler = operaciones.find(op => op.operacion === "Alquiler");

    const handleNext = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setImgIndex((prev) => (prev + 1) % imagenes.length);
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setImgIndex((prev) => (prev - 1 + imagenes.length) % imagenes.length);
    };

    return (
        <div className="cards-scroll-wrapper">
            <div className="cont-card-imgGrande">
                <div className="cont-imgG">
                    <NavLink to={`/detalle/${id}`} className='navLink-car'>
                        <div
                            onMouseEnter={() => setShowDetail(true)}
                            onMouseLeave={() => setShowDetail(false)}
                        >
                            <div className='card-image-chica'>
                                <img
                                    src={imagenes[imgIndex]?.original}
                                    alt={tituloPublicacion || 'Propiedad destacada'}
                                    className='card-imgGrande'
                                />
                            </div>

                            <div className={`detail-chica ${showDetail ? 'show-chica' : ''}`}>
                                <p className='palabra-abre-detalle' data-translate>Ver detalle</p>
                            </div>
                        </div>
                    </NavLink>

                    <div className="badge operacionCG">
                        {operaciones.length > 1 ? (
                            "Venta/Alq"
                        ) : operaciones[0]?.operacion === 'Venta' ? (
                            "Venta"
                        ) : operaciones[0]?.operacion === 'Alquiler' ? (
                            "Alquiler"
                        ) : null}
                    </div>

                    <div className="badge precioCG">
                        {vista === "Venta" && venta && (
                            <p className='precio-cardG'>
                                {venta.precios[0]?.moneda} {formatMoney(venta.precios[0]?.precio)}
                            </p>
                        )}
                        {vista === "Alquiler" && alquiler && (
                            <p className='precio-cardG'>
                                {alquiler.precios[0]?.moneda} {formatMoney(alquiler.precios[0]?.precio)}
                            </p>
                        )}
                        {vista === "ambas" && venta && alquiler && (
                            <p className='precio-cardG'>
                                {venta.precios[0]?.moneda} {formatMoney(venta.precios[0]?.precio)} / {alquiler.precios[0]?.moneda} {formatMoney(alquiler.precios[0]?.precio)}
                            </p>
                        )}
                        {vista === "ambas" && venta && !alquiler && (
                            <p className='precio-cardG'>
                                {venta.precios[0]?.moneda} {formatMoney(venta.precios[0]?.precio)}
                            </p>
                        )}
                        {vista === "ambas" && alquiler && !venta && (
                            <p className='precio-cardG'>
                                {alquiler.precios[0]?.moneda} {formatMoney(alquiler.precios[0]?.precio)}
                            </p>
                        )}
                    </div>

                    {imagenes.length > 1 && (
                        <>
                            <button className="img-nav left" onClick={handlePrev} aria-label="Imagen anterior">&lsaquo;</button>
                            <button className="img-nav right" onClick={handleNext} aria-label="Imagen siguiente">&rsaquo;</button>
                        </>
                    )}
                </div>

                <div className='cont-titulo-publicacion-cardIG'>
                    <div className='cont-titulo-card'>
                        <h3 className='tituloPublicacion-cardIG' data-translate>{capitalizar(tituloPublicacion)}</h3>
                    </div>
                    <div className='cont-direcc-icono-card'>
                        <LocationOnIcon className="icono-direccion-cardIG" />
                        <p className='direcc-card' data-translate>{direccionF}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardChicaImagenGrande;
