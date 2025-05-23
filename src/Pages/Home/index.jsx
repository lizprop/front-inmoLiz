import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProps } from '../../Redux/Actions';
import LandingA from '../../Components/LandingA';
import LandingC from '../../Components/LandingC';
import Loading from '../../Components/Loading';
import LandingMuestraTarjetas from '../../Components/LandingMuestraTarjetas';
//import Filtros from '../../Components/Filtros';
import ListaPropiedades from '../../Components/ListaPropiedades';
import Paginacion from '../../Components/Paginacion';
import './styles.css';
import FiltrosSelect from '../../Components/FiltrosSelect';


function Home() {

    const loading = useSelector(state => state.loading);
    const allProps = useSelector(state => state.propiedades);
    const totalPropiedades = useSelector(state => state.totPropiedades);
    //estados para las propiedades
    const [operacion, setOperacion] = useState('');
    const [tipoPropiedad, setTipoPropiedad] = useState('Todas'); 
    const [ambientes, setAmbientes] = useState(); //en el back lo convierto a int
    const [precioMin, setPrecioMin] = useState();
    const [precioMax, setPrecioMax] = useState();
    //estados para paginación
    const [currentPage, setCurrentPage] = useState(1);
    const propiedadesPorPagina = 12;
    const limit = propiedadesPorPagina;
    const offset = (currentPage - 1) * limit;
    const dispatch = useDispatch();

    //efecto para iniciar pag desde scroll 0
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        dispatch(getProps(limit, offset, operacion, tipoPropiedad, precioMin, precioMax, ambientes));
    }, [dispatch, limit, offset, operacion, tipoPropiedad, ambientes, precioMin, precioMax]);

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
                            {/* <Filtros
                                muestraVntaAlq='true'
                                precioMin={precioMin}
                                precioMax={precioMax}
                                setPrecioMin={setPrecioMin}
                                setPrecioMax={setPrecioMax}
                                setCurrentPage={setCurrentPage}
                                setOperacion={setOperacion}
                                setTipoPropiedad={setTipoPropiedad}
                                setAmbientes={setAmbientes}
                            /> */}
                            <FiltrosSelect
                                muestraVntaAlq='true'
                                precioMin={precioMin}
                                precioMax={precioMax}
                                setPrecioMin={setPrecioMin}
                                setPrecioMax={setPrecioMax}
                                setCurrentPage={setCurrentPage}
                                setOperacion={setOperacion}
                                setTipoPropiedad={setTipoPropiedad}
                                setAmbientes={setAmbientes}
                            />
                        </div>
                        {/* lista props */}
                        <div className='cont-listaProps-home'>
                            <ListaPropiedades allProps={allProps} id='listaProps' />
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

                <LandingC />
                <LandingMuestraTarjetas />
            </div>
        )
    )
}

export default Home