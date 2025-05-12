import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProperty, resetProperty } from '../../Redux/Actions';
import { InmobiliariaContext } from '../../Context';
import { formatMoney } from '../../Helps';
import Carrusel from '../../Components/Carrusel';
import MapProp from '../../Components/MapaProp';
import FormularioContacto from '../../Components/FormularioContacto';
import ModalVideo from '../../Components/ModalVideo';
import RoomIcon from '@mui/icons-material/Room';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Loading from '../../Components/Loading';
import './estilos.css';

function DetalleProp() {

    const loading = useSelector(state => state.loading);
    const { id } = useParams();  //let id = props.match.params.id 
    const propiedad = useSelector(state => state.propiedad);
    //obt el tipo de moneda
    const moneda = propiedad?.operacion?.[0]?.precios?.[0]?.moneda;
    //otengo el precio de la prop
    const precio = propiedad?.operacion?.[0]?.precios?.[0]?.precio;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const contexto = useContext(InmobiliariaContext);


    const handleClickAtras = (e) => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/'); // Ruta por defecto si no hay historial previo.
        }
    };

    //efecto para iniciar la Pag desd la parte SUPERIOR
    useEffect(() => {
        // Desplaza la página hacia la parte superior cuando el componente se monta
        window.scrollTo(0, 0);
    }, []); // El array vacío asegura que se ejecute solo al montar el componente
    
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
                                <div className='cont-btn_Y_tituilo-precio'>
                                    <div className='cont-btn_Y_tituilo'>
                                        {/* btn atrás */}
                                        <div>
                                            <button
                                                onClick={handleClickAtras}
                                                className='btn-volver'
                                            >
                                                <ArrowBackIcon sx={{ color: 'white' }} />
                                            </button>
                                        </div>
                                        {/* Titulo prop */}
                                        <div className='cont-titulo-detalle'>
                                            <p className='detalle-titulo-prop' data-translate>
                                                {propiedad.tituloPublicacion}
                                            </p>
                                        </div>
                                    </div>
                                    {/* precio */}
                                    <div className='cont-precio-detalle'>
                                        <p className='precio-detalle'>
                                            {moneda}{formatMoney(precio)}
                                        </p>
                                    </div>
                                </div>

                                <div className='cont-btns-direccion'>
                                    {/* dirección */}
                                    <div className='cont-titulo-icono-direcc'>
                                        <RoomIcon sx={{ color: 'white', marginLeft: '40px' }} />
                                        <p className='detalle-titulo-direccion' data-translate>
                                            {propiedad.direccion}
                                        </p>
                                    </div>
                                    {/* btn-video */}
                                    <div className='cont-btnVideo-E-icono'>
                                        <button
                                            onClick={() => contexto.handleIsOpen()}
                                            className='btn-video'
                                        >
                                            <VideocamIcon />
                                            Ver video
                                        </button>
                                    </div>
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

                            {/* caract */}
                            <div className='cont-descrip'>
                                <p className='titulo-descrip-prop'>Detalle Propiedad</p>
                                <div className='col-descrip-fila1'>
                                    <div className='cont-p-col-1'>
                                        <p className='p-col-key' data-translate>Precio:</p>
                                        <p className='p-col-value'>{moneda}{formatMoney(precio)}</p>
                                    </div>
                                    <div className='cont-p-col-2'>
                                        <p className='pp-col-key' data-translate>Sup. Cubierta:</p>
                                        <p className='p-col-value'>{propiedad.supCubierta}{propiedad.unidadMedida}</p>
                                    </div>
                                    <div className='cont-p-col-3'>
                                        <p className='p-col-key' data-translate>Sup. Total:</p>
                                        <p className='p-col-value'>{propiedad.supTotal}{propiedad.unidadMedida}</p>
                                    </div>
                                </div>

                                <div className='col-descrip-fila2'>
                                    <div className='cont-p-col-1'>
                                        <p className='p-col-key' data-translate>Dormitorios:</p>
                                        <p className='p-col-value'>{propiedad.dormitorios}</p>
                                    </div>
                                    <div className='cont-p-col-2'>
                                        <p className='pp-col-key' data-translate>Ambientes:</p>
                                        <p className='p-col-value'>{propiedad.ambientes}</p>
                                    </div>
                                    <div className='cont-p-col-3'>
                                        <p className='p-col-key' data-translate>Baños:</p>
                                        <p className='p-col-value'>{propiedad.baños}</p>
                                    </div>
                                </div>

                                <div className='col-descrip-fila3'>
                                    <div className='cont-p-col-1'>
                                        <p className='p-col-key' data-translate>Tipo Op:</p>
                                        {
                                            propiedad.operacion?.map(o => {
                                                return (
                                                    <div key={o.operacion_id}>
                                                        <p className='p-col-value' data-translate>{propiedad.operacion[0]?.operacion}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='cont-p-col-2'>
                                        <p className='p-col-key' data-translate>Tipo:</p>
                                        <p className='p-col-value' data-translate>{propiedad.tipo?.nombre}</p>
                                    </div>
                                    <div className='cont-p-col-3'>
                                        <p className='p-col-key' data-translate>Sup. Total:</p>
                                        <p className='p-col-value'>{propiedad.supTotal}{propiedad.unidadMedida}</p>
                                    </div>
                                </div>
                            </div>

                            {/* descrip */}
                            <div className='cont-descrip'>
                                <p className='titulo-descrip-prop' data-translate>Descripción Propiedad</p>
                                <div className='cont-texto-descrip-detalle'>
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
                            </div>

                            {/* google map */}
                            <div className='cont-map-detalle'>
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