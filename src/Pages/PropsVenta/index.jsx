import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProps } from '../../Redux/Actions';
import Filtros from '../../Components/Filtros';
import ListaPropiedades from '../../Components/ListaPropiedades';
import Paginacion from '../../Components/Paginacion';
import Loading from '../../Components/Loading';
import './styles.css';

function PropsVenta() {

    const loading = useSelector(state => state.loading);
    const [operacion, setOperacion] = useState('Venta');
    const [tipoPropiedad, setTipoPropiedad] = useState('todas');
    const [ambientes, setAmbientes] = useState('0');
    const [precioMin, setPrecioMin] = useState(10000);
    const [precioMax, setPrecioMax] = useState(1000000);
    const [currentPage, setCurrentPage] = useState(1);
    const allProps = useSelector(state => state.propiedades);
    const totalPropiedades = useSelector(state => state.totPropiedades);
    const dispatch = useDispatch();
    const propiedadesPorPagina = 12;
    const limit = propiedadesPorPagina;
    const offset = (currentPage - 1) * limit;

    //efecto para iniciar la Pag desd la parte SUPERIOR
    useEffect(() => {
        // Desplaza la página hacia la parte superior cuando el componente se monta
        window.scrollTo(0, 0);
    }, []); // El array vacío asegura que se ejecute solo al montar el componente
    
    useEffect(() => {
        dispatch(getProps(limit, offset, operacion, tipoPropiedad, ambientes, precioMin, precioMax));
    }, [dispatch, limit, offset, operacion, tipoPropiedad, ambientes, precioMin, precioMax]);

    return (
        <div className='cont-page-venta'>
            {
                loading ? (
                    <Loading />
                ) : (
                    <div className='cont-titulo-filtros-listaProps'>
                    <h1 className='titulo-busqueda'>Propiedades en venta</h1>
                    <div className='cont-filtros-props'>
                        <div className='cont-filtros-home'>
                            <Filtros
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
                )
            }
        </div>
    )
}

export default PropsVenta;