import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEmprendimiento, resetEmprendimientos, } from '../../Redux/Actions';
import { InmobiliariaContext } from '../../Context';
import { formatDate } from '../../Helps';
import MapProp from '../../Components/MapaProp';
import IconoUbicacion from '../../Images/Iconos/iconoUbicacion.png';
import ModalVideo from '../../Components/ModalVideo';
import FormularioContacto from '../../Components/FormularioContacto';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Loading from '../../Components/Loading';
import CarruselEmp from '../../Components/CarruselEmp';

import './estilos.css';


function DetalleEmp(){

    const loading = useSelector(state => state.loading);
    const { id } = useParams();  //let id = props.match.params.id 
    const emprendimiento = useSelector(state => state.emprendimiento);
    const navigate = useNavigate();
    const dispatch = useDispatch();    
    const contexto = useContext(InmobiliariaContext); 
    //estado para el tooltipText
    const [showTooltipVideo, setShowTooltipVideo] = useState(false);
    //estado para el tooltipText
    const [showTooltipVolver, setShowTooltipVolver] = useState(false);
    const tooltipTextVideo = "Ver video emprendimiento";
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
        dispatch(getEmprendimiento(id));
        // Desplazarse hacia la parte superior de la página al cargar el componente
        window.scrollTo(0, 0);

        return () => { dispatch(resetEmprendimientos()); }
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
                                    <span className='detalle-titulo-prop'>
                                        {emprendimiento.tituloPublicacion} || Fecha entrega: {formatDate(emprendimiento.fechaEntrega)}
                                    </span>
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
                                        <span className='detalle-titulo-direccion'>
                                            {emprendimiento.direccionF}
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
                                        emprendimiento?.imagenes
                                            ?
                                            <CarruselEmp imagenes={emprendimiento.imagenes} />
                                            :
                                            <p>No img</p>
                                    }
                                </div>

                                <div className='cont-form-contacto'>
                                    <FormularioContacto
                                        tituloPublicacion={emprendimiento.tituloPublicacion}
                                        
                                    />
                                </div>
                            </div>

                            {/* descrip prop */}
                            <div className='cont-titulo-descripcion-form descripEmp'>
                                <div className='cont-descrip detalleEmp'>
                                    <p className='titulo-descrip-prop'>Descripción emprendimiento</p>
                                    {/* Renderizar HTML dentro de la descripción */}
                                        <p
                                            className="p-descrip-detalle"
                                            dangerouslySetInnerHTML={{
                                                __html: emprendimiento?.descripcion
                                                    ? emprendimiento.descripcion.replace(/\n/g, '<br />')
                                                    : '', // Muestra una cadena vacía si descripcion no está definida
                                            }}
                                        />

                                </div>

                            </div>

                            {/* google map */}
                            <div className='cont-map'>
                                <p className='p-titulo-mapa'>Ubicacion emprendimiento</p>
                                <MapProp lat={emprendimiento.geolat} lng={emprendimiento.geolong} />
                            </div>

                            {/* Modal Video */}
                            {
                                contexto.isOpenModalVideo &&
                                <ModalVideo video={emprendimiento.videos[0]?.player_url} />
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default DetalleEmp;