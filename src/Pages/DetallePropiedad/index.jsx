import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
import ShareIcon from '@mui/icons-material/Share';
import Loading from '../../Components/Loading';
import ListaPropsSimilares from '../../Components/ListaPropsSimilares';
import './estilos.css';

function DetalleProp() {
    const loading = useSelector(state => state.loading);
    const { id } = useParams();
    const propiedad = useSelector(state => state.propiedad);
    const precio = propiedad?.operacion?.[0]?.precios?.[0]?.precio;
    const tipoProp = propiedad?.tipo?.nombre;
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const contexto = useContext(InmobiliariaContext);

    const venta = propiedad?.operacion?.find(op => op.operacion === "Venta");
    const alquiler = propiedad?.operacion?.find(op => op.operacion === "Alquiler");

    const [copiado, setCopiado] = useState(false);

    const handleClickAtras = () => {
        const rutaOrigen = location.state?.from;

        if (rutaOrigen && rutaOrigen !== location.pathname) {
            navigate(rutaOrigen, { replace: true });
            return;
        }

        if (window.history.state?.idx > 0) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    const handleShare = async () => {
        const url = window.location.href;
        const title = propiedad?.tituloPublicacion || "Propiedad disponible";
        const text = `Mirá esta propiedad en Ortiz Lizmar Propiedades: ${title}`;

        if (navigator.share && window.isSecureContext) {
            try {
                if (navigator.canShare && !navigator.canShare({ title, text, url })) {
                    throw new Error("El contenido no puede compartirse");
                }
                await navigator.share({ title, text, url });
            } catch (error) {
                console.log("Compartir cancelado o falló:", error);
            }
        } else {
            try {
                await navigator.clipboard.writeText(url);
                setCopiado(true);
                setTimeout(() => setCopiado(false), 2000);
            } catch (err) {
                console.log("No se pudo copiar el enlace:", err);
            }
        }
    };

    function formatearDescripcion(texto) {
        if (!texto || typeof texto !== 'string') return '';

        return texto
            .replace(/\r\n/g, '\n')
            .replace(/\n{3,}/g, '\n\n')
            .trim();
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        dispatch(getProperty(id));
        return () => { dispatch(resetProperty()); };
    }, [dispatch, id]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className='contGralDetalle'>
                    <div className='cont-detail'>
                        <div className='info-1'>
                            <div className='cont-btn_Y_tituilo-precio'>
                                <div className='cont-btn_Y_tituilo'>
                                    <div>
                                        <button
                                            type='button'
                                            onClick={handleClickAtras}
                                            className='btn-volver'
                                        >
                                            <ArrowBackIcon />
                                            <span data-translate>Volver</span>
                                        </button>
                                    </div>

                                    <div className='cont-titulo-detalle'>
                                        <p className='detalle-titulo-prop' data-translate>
                                            {propiedad.tituloPublicacion}
                                        </p>
                                    </div>

                                    <div className='cont-btn-share'>
                                        <button
                                            type='button'
                                            onClick={handleShare}
                                            className='btn-share'
                                        >
                                            <ShareIcon />
                                        </button>
                                        {copiado && (
                                            <span className='mensaje-copiado'>
                                                Enlace copiado
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className='cont-btns-direccion'>
                                <div className='cont-titulo-icono-direcc'>
                                    <RoomIcon className='detalle-icono-direccion' />
                                    <p className='detalle-titulo-direccion' data-translate>
                                        {propiedad.direccion}
                                    </p>
                                </div>

                                <div className='cont-precio-detallee'>
                                    {venta && (
                                        <div className='detalle-precio-chip'>
                                            <span data-translate>Venta</span>
                                            <strong>{venta.precios[0].moneda}{formatMoney(venta.precios[0].precio)}</strong>
                                        </div>
                                    )}
                                    {alquiler && (
                                        <div className='detalle-precio-chip'>
                                            <span data-translate>Alquiler</span>
                                            <strong>{alquiler.precios[0].moneda}{formatMoney(alquiler.precios[0].precio)}</strong>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='cont-imgs-info'>
                            <div className='cont-imagenes'>
                                <div className='cont-multimedia'>
                                    {propiedad?.videos?.length > 0 && (
                                        <button
                                            onClick={() => contexto.handleIsOpen()}
                                            className='btn-video'
                                        >
                                            <VideocamIcon />
                                            Ver video
                                        </button>
                                    )}
                                </div>

                                {propiedad?.imagenes ? (
                                    <Carrusel imagenes={propiedad.imagenes} />
                                ) : (
                                    <p>No img</p>
                                )}
                            </div>
                            {/* Formulario contacto */}
                            <div className='cont-form-contacto'>
                                <FormularioContacto
                                    tituloPublicacion={propiedad.tituloPublicacion}
                                    codigoReferencia={propiedad.codigoReferencia}
                                />
                            </div>
                        </div>
                        {/* Detalle prop */}
                        <div className='cont-descrip'>
                            <p className='titulo-descrip-prop'>Detalle Propiedad</p>
                            <div className='col-descrip-fila1'>
                                <div className='cont-p-col-1'>
                                    <p className='p-col-key' data-translate>Ambientes:</p>
                                    <p className='p-col-value'>{propiedad.ambientes}</p>
                                </div>
                                <div className='cont-p-col-2'>
                                    <p className='p-col-key' data-translate>Dormitorios:</p>
                                    <p className='p-col-value'>{propiedad.dormitorios}</p>
                                </div>
                                <div className='cont-p-col-3'>
                                    <p className='p-col-key' data-translate>Baños:</p>
                                    <p className='p-col-value'>{propiedad.baños}</p>
                                </div>
                            </div>

                            <div className='col-descrip-fila3'>
                                <div className='cont-p-col-1'>
                                    <p className='p-col-key' data-translate>Tipo Op:</p>
                                    {propiedad.operacion?.map(o => (
                                        <div key={o.operacion_id}>
                                            <p className='p-col-value' data-translate>
                                                {o.operacion} /
                                            </p>
                                        </div>
                                    ))}
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
                        {/* Descrip */}
                        <div className="cont-texto-descrip-detalle">
                            <p className='titulo-descrip-prop'>Descripción</p>
                            <p className="subCont-texto-descrip-detalle">
                                {formatearDescripcion(propiedad.descripcion)}
                            </p>
                        </div>
                        {/* Mapa */}
                        <div className='cont-map-detalle'>
                            <p className='p-titulo-mapa' data-translate>Ubicación Propiedad</p>
                            <div className='cont-mapa-detalle'>
                                <MapProp lat={propiedad.geoLat} lng={propiedad.geoLong} />
                            </div>
                        </div>
                        {/* Props similares */}
                        <div className="cont-lista-props-similares">
                            <h2 className='titulo-props-similares' data-translate>Propiedades recomendadas para tu búsqueda</h2>
                            <div className="cont-comp-props-similares">
                                <ListaPropsSimilares precioProp={precio} tipoProp={tipoProp} vista={"ambas"} idProp={id} />
                            </div>
                        </div>

                        {contexto.isOpenModalVideo && (
                            <ModalVideo video={propiedad.videos[0]?.player_url} />
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default DetalleProp;
