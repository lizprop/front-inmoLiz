import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProperty, resetProperty } from '../../Redux/Actions';
import { InmobiliariaContext } from '../../Context';
import { formatMoney } from '../../Helps';
import Carrusel from '../../Components/Carrusel';
import MapProp from '../../Components/MapaProp';
import FormularioContacto from '../../Components/FormularioContacto';
import ModalVideo from '../../Components/ModalVideo';
import IconoUbicacion from '../../Images/Iconos/iconoUbicacion.png';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Loading from '../../Components/Loading';
import './estilos.css';

function DetalleProp(){

    const loading = useSelector(state => state.loading);
    const { id } = useParams();  //let id = props.match.params.id 
    const propiedad = useSelector(state => state.propiedad);
    //obt el tipo de moneda
    const moneda =  propiedad?.operacion?.[0]?.precios?.[0]?.moneda; 
    //otengo el precio de la prop
    const precio =  propiedad?.operacion?.[0]?.precios?.[0]?.precio; 
    const navigate = useNavigate();
    const dispatch = useDispatch();    
    const contexto = useContext(InmobiliariaContext); 
    //estado para el tooltipText
    const [showTooltipVideo, setShowTooltipVideo] = useState(false);
    //estado para el tooltipText
    const [showTooltipVolver, setShowTooltipVolver] = useState(false);
    const tooltipTextVideo = "Ver video propiedad";
    const tooltipTextVolver = "Volver atrás";

    const handleMouseEnter = () => {
        setShowTooltipVideo(true);
    };
    const handleMouseLeave = () => {
        setShowTooltipVideo(false);
    };
    const handleMouseEnterVolver = () => {
        setShowTooltipVolver(true);
    };
    const handleMouseLeaveVolver = () => {
        setShowTooltipVolver(false);
    };

    const handleClickAtras = (e) => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/'); // Ruta por defecto si no hay historial previo.
        }
    };

    useEffect(() => {
        dispatch(getProperty(id));
        // Desplazarse hacia la parte superior de la página al cargar el componente
        window.scrollTo(0, 0);

        return () => { dispatch(resetProperty()); }
    }, [dispatch, id]);


    return (
        <>
            {
                loading ? (
                    <>
                        <Loading />
                    </>
                ) : (
                    <div className='contGralDetalle'>
                        <div className='cont-detail'>
                            {/* datos principales */}
                            <div className='info-1'>
                                {/* Titulo prop */}
                                <div className='cont-titulo-detalle'>
                                    <p className='detalle-titulo-prop' data-translate>
                                        {propiedad.tituloPublicacion}
                                    </p>
                                </div>

                                <div className='cont-btns-direccion'>
                                    {/* btn-atrás */}
                                    <button
                                        onClick={handleClickAtras}
                                        className='btn-volver'
                                        onMouseEnter={handleMouseEnterVolver}
                                        onMouseLeave={handleMouseLeaveVolver}
                                    >
                                        <ArrowBackIcon />
                                    </button>
                                    {/* msj toolTip */}
                                    {
                                        showTooltipVolver && <div className="tooltipVolver">{tooltipTextVolver}</div>
                                    }
                                    {/* dirección */}
                                    <div className='cont-titulo-icono-direcc'>
                                        <img src={IconoUbicacion} alt='' style={{ width: '40px', height: '40px' }} />
                                        <span className='detalle-titulo-direccion' data-translate>
                                            {propiedad.direccion}
                                        </span>
                                    </div>
                                    {/* btn-video */}
                                    <button
                                        onClick={() => contexto.handleIsOpen()}
                                        className='btn-video'
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <OndemandVideoIcon className='icono-video' />
                                    </button>
                                    {/* msj toolTip */}
                                    {
                                        showTooltipVideo && <div className="tooltip">{tooltipTextVideo}</div>
                                    }
                                </div>
                            </div>

                            {/* carrusel y formulario */}
                            <div className='cont-imgs-info'>
                                <div className='cont-imagenes'>
                                    {
                                        propiedad?.imagenes
                                            ?
                                            <Carrusel imagenes={propiedad.imagenes} />
                                            :
                                            <p>No img</p>
                                    }
                                </div>

                                <div className='cont-form-contacto'>
                                    <FormularioContacto
                                        tituloPublicacion={propiedad.tituloPublicacion}
                                        codigoReferencia={propiedad.codigoReferencia}
                                    />
                                </div>
                            </div>

                            {/* descrip prop */}
                            <div className='cont-titulo-descripcion-form'>
                                <div className='cont-descrip'>
                                    <p className='titulo-descrip-prop' data-translate>Descripción Propiedad</p>
                                    {/* Renderizar HTML dentro de la descripción */}
                                        <p
                                            className="p-descrip-detalle"
                                            data-translate
                                            dangerouslySetInnerHTML={{
                                                __html: propiedad?.descripcion
                                                    ? propiedad.descripcion.replace(/\n/g, '<br />')
                                                    : '', // Muestra una cadena vacía si descripcion no está definida
                                            }}
                                        />

                                </div>

                                <div className='cont-descrip'>
                                    <p className='titulo-descrip-prop'>Detalle Propiedad</p>
                                    <div className='col-descrip-prop'>
                                        <div className='col-descrip-prop-1'>
                                            <div className='cont-p-col-1'>
                                                <p className='p-col-1' data-translate>Precio:</p>
                                                <p className='p-col-1'>{moneda}{formatMoney(precio)}</p>
                                            </div>
                                            <div className='cont-p-col-1'>
                                                <p className='p-col-1' data-translate>Sup. Cubierta:</p>
                                                <p className='p-col-1'>{propiedad.supCubierta}{propiedad.unidadMedida}</p>
                                            </div>
                                            <div className='cont-p-col-1'>
                                                <p className='p-col-1' data-translate>Sup. Total:</p>
                                                <p className='p-col-1'>{propiedad.supTotal}{propiedad.unidadMedida}</p>
                                            </div>
                                            <div className='cont-p-col-1'>
                                                <p className='p-col-1' data-translate>Dormitorios:</p>
                                                <p className='p-col-1'>{propiedad.dormitorios}</p>
                                            </div>
                                        </div>
                                        <div className='col-descrip-prop-1'>
                                            <div className='cont-p-col-1'>
                                                <p className='p-col-1' data-translate>Ambientes:</p>
                                                <p className='p-col-1'>{propiedad.ambientes}</p>
                                            </div>
                                            <div className='cont-p-col-1'>
                                                <p className='p-col-1' data-translate>Baños:</p>
                                                <p className='p-col-1'>{propiedad.baños}</p>
                                            </div>
                                            <div className='cont-p-col-1'>
                                                <p className='p-col-1' data-translate>Tipo Op:</p>
                                                {
                                                    propiedad.operacion?.map(o => {
                                                        return (
                                                            <div key={o.operacion_id}>
                                                                <p className='p-col-1' data-translate>{propiedad.operacion[0]?.operacion}</p>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className='cont-p-col-1'>
                                                <p className='p-col-1' data-translate>Tipo:</p>
                                                <p className='p-col-1' data-translate>{propiedad.tipo?.nombre}</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* google map */}
                            <div className='cont-map'>
                                <p className='p-titulo-mapa' data-translate>Ubicacion Propiedad</p>
                                <MapProp lat={propiedad.geoLat} lng={propiedad.geoLong} />
                            </div>

                            {/* Modal Video */}
                            {
                                contexto.isOpenModalVideo &&
                                <ModalVideo video={propiedad.videos[0]?.player_url} />
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default DetalleProp;