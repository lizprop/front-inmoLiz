import React, { useState } from 'react';
import NoHayProps from '../NoHayProps';
import Card from '../Card';
import './estilos.css';

const arrayFiltros = [
    'Depto', 'Casa', 'PH', 'Local',
    'Oficina', 'Cochera', 'Terreno', 'Galpón',
];

function ListaFavoritos({ allProps }) {
    const [filtro, setFiltro] = useState(''); // Estado para saber qué filtro está aplicado

    // Propiedades filtradas:
    const propsFiltrados = filtro
        ? allProps.filter(p => p.tipo.nombre === filtro)
        : allProps; // si no hay filtro, muestro todas

    return (
        <div className='cont-listaProps-fav'>
            <h1 data-translate>Tus propiedades favoritas</h1>
            {/* Botones de filtros */}
            <div className="cont-filtros-fav">
                {/* btn Todas */}
                <button onClick={() => setFiltro('')} className={filtro === '' ? 'activo' : ''} data-translate>
                    Todas
                </button>
                {
                    arrayFiltros.map((tipo) => (
                        <button
                            key={tipo}
                            onClick={() => setFiltro(tipo)}
                            className={filtro === tipo ? 'activo' : ''}
                            data-translate
                        >
                            {tipo}
                        </button>
                    ))
                }
            </div>

            {/* Lista de propiedades */}
            <div className='cont-card-lista-props-fav'>
                {
                    propsFiltrados.length ? (
                        propsFiltrados.map(p => (
                            <div className='cont-card-Fav-listaProps' key={p.id}>
                                <Card
                                    id={p.id}
                                    tituloPublicacion={p.tituloPublicacion}
                                    ubicacion={p.ubicacion}
                                    operacion={p.operacion}
                                    moneda={p.moneda}
                                    precio={p.precio}
                                    imagenes={p.imagenes}
                                    cantCocheras={p.cantCocheras}
                                    ambientes={p.ambientes}
                                    dormitorios={p.dormitorios}
                                    tipoPropiedad={p.tipoPropiedad}
                                    supTotal={p.supTotal}
                                    supDescubierta={p.supDescubierta}
                                    supCubierta={p.supCubierta}
                                    supSemiCub={p.supSemiCub}
                                    baños={p.baños}
                                />
                            </div>
                        ))
                    ) : (
                        <div className='no-props'>
                            <NoHayProps />
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default ListaFavoritos;
