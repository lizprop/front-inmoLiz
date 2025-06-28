import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProps, getPropsMap } from '../../Redux/Actions';
import LandingA from '../../Components/LandingA';
import LandingC from '../../Components/LandingC';
import Loading from '../../Components/Loading';
import LandingMuestraTarjetas from '../../Components/LandingMuestraTarjetas';
import ListaPropiedades from '../../Components/ListaPropiedades';
import Paginacion from '../../Components/Paginacion';
import FiltrosSelect from '../../Components/FiltrosSelect';
import MapaPropiedades from '../../Components/MapProps';
import './styles.css';

function Home() {

    const loading = useSelector(state => state.loading);
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
    
    //efecto para iniciar pag desde scroll 0
    useEffect(() => {
        requestAnimationFrame(() => {
            window.scrollTo(0, 0);
        });
    }, []);

    useEffect(() => {
        dispatch(getProps(limit, offset, operacion, tipoPropiedad, precioMin, precioMax, ambientes, destacadas));
        dispatch(getPropsMap(limit, offset, operacion, tipoPropiedad, precioMin, precioMax, ambientes, destacadas));
    }, [dispatch, limit, offset, operacion, tipoPropiedad, ambientes, precioMin, precioMax, destacadas]);

    //vuelve el scroll hacia arriba
    useEffect(() => {
        window.scrollTo(0, 600);
    }, [currentPage]);

    return (
        loading ? (
            <Loading />
        ) : (
            <div className='cont-home page'>
                <LandingA />

                <div className='cont-titulo-filtros-listaProps'>
                    <h1 className='titulo-busqueda' data-translate>Busqueda de propiedades personalizada</h1>
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
                        {/* lista props */}
                        <div className='cont-listaProps-home'>
                            <ListaPropiedades allProps={allProps} vista={"ambas"} id='listaProps' />
                            {
                                allProps.length > 0 && (
                                    <Paginacion
                                        allProps={allProps}
                                        currentPage={currentPage}
                                        onPageChange={setCurrentPage}
                                        totalPropiedades={totalPropiedades}
                                        propiedadesPorPagina={propiedadesPorPagina}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>

                {/* <div className='cont-titulo-filtros-listaProps'>
                    <h1 className='titulo-busqueda' data-translate>Nuestras propiedades en el mapa</h1>
                    <div className='cont-propsMapa'>
                        <MapaPropiedades propiedades={allPropsMap.propiedades} />
                    </div>                    
                </div> */}

                <LandingC />
                <LandingMuestraTarjetas />
            </div>
        )
    )
}

export default Home