import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProps, getPropsDestacadas, getPropsMap } from '../../Redux/Actions';
import LandingA from '../../Components/LandingA/indexOriginal';
import LandingC from '../../Components/LandingC';
import Loading from '../../Components/Loading';
import LandingMuestraTarjetas from '../../Components/LandingMuestraTarjetas';
import ListaPropiedades from '../../Components/ListaPropiedades';
import Paginacion from '../../Components/Paginacion';
import FiltrosSelect from '../../Components/FiltrosSelect';
import MapaPropiedades from '../../Components/MapProps';
import ListaPropsDestacadas from '../../Components/ListaPropsDestacadas';
import './styles.css';

function Home() {

    const loading = useSelector(state => state.loading);
    const allPropsDestacadas = useSelector(state => state.propsDestacadas);
    const allProps = useSelector(state => state.propiedades);
    const allPropsMap = useSelector(state => state.propsMap);
    const totalPropiedades = useSelector(state => state.totPropiedades);
    //estados para las propiedades
    const [operacion, setOperacion] = useState('');
    const [tipoPropiedad, setTipoPropiedad] = useState('Todas');
    const [ambientes, setAmbientes] = useState(); //en el back lo convierto a int
    const [precioMin, setPrecioMin] = useState();
    const [precioMax, setPrecioMax] = useState();
    const [destacadas, setDestacadas] = useState(false);

    //estados para paginación
    const [currentPage, setCurrentPage] = useState(1);
    const propiedadesPorPagina = 12;
    const limit = propiedadesPorPagina;
    const offset = (currentPage - 1) * limit;
    const dispatch = useDispatch();
    const listaPropsRef = useRef(null);
    const paginaInicialRef = useRef(currentPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    //efecto para iniciar pag desde scroll 0
    useEffect(() => {
        requestAnimationFrame(() => {
            window.scrollTo(0, 0);
        });
    }, []);

    useEffect(() => {
        dispatch(getPropsDestacadas());
        dispatch(getProps(limit, offset, operacion, tipoPropiedad, precioMin, precioMax, ambientes));
        dispatch(getPropsMap(limit, offset, operacion, tipoPropiedad, precioMin, precioMax, ambientes));
    }, [dispatch, limit, offset, operacion, tipoPropiedad, ambientes, precioMin, precioMax, destacadas]);

    // Mantiene la vista en la lista al cambiar de pagina.
    useEffect(() => {
        if (paginaInicialRef.current === currentPage) return;

        requestAnimationFrame(() => {
            listaPropsRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }, [currentPage, allProps]);

    return (
        loading ? (
            <Loading />
        ) : (
            <div className='cont-home page'>
                <LandingA />
                {/* filtros */}
                <div className='cont-filtros-props'>
                    <div className='cont-filtros-home'>
                        <FiltrosSelect
                            muestraVntaAlq='true'
                            precioMin={precioMin}
                            precioMax={precioMax}
                            destacadas={destacadas}
                            setPrecioMin={setPrecioMin}
                            setPrecioMax={setPrecioMax}
                            setCurrentPage={setCurrentPage}
                            setOperacion={setOperacion}
                            setTipoPropiedad={setTipoPropiedad}
                            setAmbientes={setAmbientes}
                            setDestacadas={setDestacadas}
                        />
                    </div>
                </div>

                {/* Lista props Destacadas */}
                <div className='cont-home-destacadas-y-titulo'>
                    <div className="cont-titulos">
                        <div className="linea-destacadas "></div>
                        <h2 className="titulo-props-destacadas" data-translate>Propiedades destacadas</h2>
                        <div className="linea-destacadas "></div>
                    </div>
                    <div className='cont-home-destacadas'>
                        <ListaPropsDestacadas allPropsDestacadas={allPropsDestacadas.propsDestacadas} vista={"ambas"} />
                    </div>
                </div>

                {/* Lista props */}
                <div className='cont-titulo-filtros-listaProps' ref={listaPropsRef}>
                    <div className="cont-titulos">
                        <div className="linea-destacadas "></div>
                        <h2 className="titulo-props-destacadas" data-translate>Nuestras Propiedades</h2>
                        <div className="linea-destacadas "></div>
                    </div>
                    <div className='cont-filtros-props'>
                        {/* lista props */}
                        <div className='cont-listaProps-home'>
                            <ListaPropiedades allProps={allProps} vista={"ambas"} id='listaProps' />
                            {
                                allProps.length > 0 && (
                                    <Paginacion
                                        allProps={allProps}
                                        currentPage={currentPage}
                                        onPageChange={handlePageChange}
                                        totalPropiedades={totalPropiedades}
                                        propiedadesPorPagina={propiedadesPorPagina}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>

                {/* Mapa */}
                <div className='cont-titulo-filtros-listaProps'>
                    <h1 className='titulo-busqueda' data-translate>Nuestras propiedades en el mapa</h1>
                    <div className='cont-propsMapa'>
                        <MapaPropiedades propiedades={allPropsMap.propiedades} />
                    </div>
                </div>
                
                <LandingC />
                <LandingMuestraTarjetas />
            </div>
        )
    )
}

export default Home
