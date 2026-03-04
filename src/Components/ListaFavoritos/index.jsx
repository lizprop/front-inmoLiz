import React, { useState } from 'react';
import NoHayProps from '../NoHayProps';
import Card from '../Card';
import './estilos.css';

const arrayFiltros = [
    'Depto', 'Casa', 'PH', 'Local',
    'Oficina', 'Cochera', 'Terreno', 'Galpón',
];

function ListaFavoritos({ allProps }) {
    const [filtro, setFiltro] = useState('');

    const propsFiltrados = filtro
        ? allProps.filter((p) => p.tipo.nombre === filtro)
        : allProps;

    return (
        <div className='cont-listaProps-fav'>
            <div className='encabezado-favoritos'>
                <p className='eyebrow-favoritos' data-translate>Mis guardadas</p>
                <h1 className='titulo-favoritos' data-translate>Tus propiedades favoritas</h1>
                <p className='subtitulo-favoritos' data-translate>
                    Revisa y filtra tus propiedades guardadas para encontrar mas rapido lo que buscas.
                </p>
                <p className='cantidad-favoritos'>
                    {propsFiltrados.length} resultado{propsFiltrados.length !== 1 ? 's' : ''}
                </p>
            </div>

            <div className='panel-filtros-favoritos'>
                <p className='label-filtros-favoritos' data-translate>Filtrar por tipo</p>
                <div className='cont-filtros-fav'>
                    <button onClick={() => setFiltro('')} className={filtro === '' ? 'activo' : ''} data-translate>
                        Todas
                    </button>
                    {arrayFiltros.map((tipo) => (
                        <button
                            key={tipo}
                            onClick={() => setFiltro(tipo)}
                            className={filtro === tipo ? 'activo' : ''}
                            data-translate
                        >
                            {tipo}
                        </button>
                    ))}
                </div>
            </div>

            <div className='cont-card-lista-props-fav'>
                {propsFiltrados.length ? (
                    propsFiltrados.map((p) => (
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
                )}
            </div>
        </div>
    );
}

export default ListaFavoritos;
