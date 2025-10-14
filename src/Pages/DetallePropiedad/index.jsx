import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProperty, resetProperty } from '../../Redux/Actions';
import { InmobiliariaContext } from '../../Context';
import { capitalizar, formatMoney } from '../../Helps';
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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const contexto = useContext(InmobiliariaContext);

    const venta = propiedad?.operacion?.find(op => op.operacion === "Venta");
    const alquiler = propiedad?.operacion?.find(op => op.operacion === "Alquiler");

    const [copiado, setCopiado] = useState(false);
    const [soportaShare, setSoportaShare] = useState(false);

    // 🟢 Verificar soporte de la API al montar
    useEffect(() => {
        setSoportaShare(!!navigator.share);
    }, []);

    const handleClickAtras = () => navigate(-1);

    // 🟢 Función para compartir la propiedad
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

    // Función para reemplazar puntos por saltos de línea
    function formatearDescripcion(texto) {
        if (!texto || typeof texto !== 'string') return '';
        const partes = texto.split(/(?<=[.:])\s*/);
        const resultado = [];
        let enLista = false;

        for (let parte of partes) {
            const linea = parte.trim();
            if (!linea) continue;

            if (linea.endsWith(':')) {
                resultado.push(`<p>${linea}</p>`);
                enLista = true;
            } else if (enLista) {
                resultado.push(`<p class="p-viñeta">🔸 ${linea}</p>`);
            } else {
                resultado.push(`<div>${linea}</div>`);
            }
        }
        return resultado.join('');
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
                        {/* datos principales */}
                        <div className='info-1'>
                            <div className='cont-btn_Y_tituilo-precio'>
                                <div className='cont-btn_Y_tituilo'>
                                    {/* btn atrás */}
                                    <div>
                                        <button
                                            type='button'
                                            onClick={handleClickAtras}
                                            className='btn-volver'
                                        >
                                            <ArrowBackIcon sx={{ color: 'white' }} />
                                        </button>
                                    </div>

                                    {/* Título prop */}
                                    <div className='cont-titulo-detalle'>
                                        <p className='detalle-titulo-prop' data-translate>
                                            {capitalizar(propiedad.tituloPublicacion)}
                                        </p>
                                    </div>

                                    {/* 🟢 Botón compartir */}
                                    <div className='cont-btn-share'>
                                        <button
                                            type='button'
                                            onClick={handleShare}
                                            className='btn-share'
                                        >
                                            <ShareIcon sx={{ color: 'white' }} />
                                        </button>
                                        {copiado && (
                                            <span className='mensaje-copiado'>
                                                ¡Enlace copiado!
                                            </span>
                                        )}
                                    </div>
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
                                {/* precio */}
                                <div className='cont-precio-detallee'>
                                    {venta && (
                                        <div style={{ color: 'white', display: 'flex', justifyContent: 'center', alignContent: 'center', marginRight: '10px', fontSize: '18px' }}>
                                            <p style={{ fontSize: '18px' }}>Venta: {venta.precios[0].moneda}{formatMoney(venta.precios[0].precio)}</p>
                                        </div>
                                    )}
                                    {alquiler && (
                                        <div style={{ color: 'white', display: 'flex', justifyContent: 'center', alignContent: 'center', marginRight: '10px', fontSize: '18px' }}>
                                            <p style={{ fontSize: '18px' }}>Alquiler: {alquiler.precios[0].moneda}{formatMoney(alquiler.precios[0].precio)}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* carrusel y formulario */}
                        <div className='cont-imgs-info'>
                            <div className='cont-imagenes'>
                                {/* botones multimedia */}
                                <div className='cont-multimedia'>
                                    {propiedad?.video?.length > 0 && (
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
                                    {propiedad.operacion?.map((o, i) => (
                                        <div key={o.operacion_id}>
                                            <p className='p-col-value' data-translate>
                                                {propiedad.operacion[i]?.operacion} /
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

                        {/* descrip */}
                        <div className="cont-texto-descrip-detalle">
                            <p className='titulo-descrip-prop'>Detalle Propiedad</p>
                            <div
                                className="subCont-texto-descrip-detalle"
                                dangerouslySetInnerHTML={{ __html: formatearDescripcion(propiedad.descripcion) }}
                            />
                        </div>

                        {/* google map */}
                        <div className='cont-map-detalle'>
                            <p className='p-titulo-mapa' data-translate>Ubicación Propiedad</p>
                            <div className='cont-mapa-detalle'>
                                <MapProp lat={propiedad.geoLat} lng={propiedad.geoLong} />
                            </div>
                        </div>

                        {/* Lista propiedades similares */}
                        <div className="cont-lista-props-similares">
                            <h2 className='titulo-props-similares' data-translate>Propiedades recomendadas para tu búsqueda</h2>
                            <div className="cont-comp-props-similares">
                                <ListaPropsSimilares precioProp={precio} tipoProp={tipoProp} vista={"ambas"} idProp={id} />
                            </div>
                        </div>

                        {/* Modal Video */}
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
