import React from 'react';
import Card from '../Card';
import NoHayProps from '../NoHayProps';
import './styles.css';

function ListaPropiedades({ allProps, vista }) {

    return (
        <div className='contGralListaP'>
            <div className='contListaP'>
                {
                    allProps ? (
                        allProps?.map(p => (
                            <div className='cont-card-listaProps' key={p.id}>
                                <Card
                                    id={p.id}
                                    direccionF={p.direccionF}
                                    operacion={p.operacion}
                                    imagenes={p.imagenes}
                                    tituloPublicacion={p.tituloPublicacion}
                                    ambientes={p.ambientes}
                                    dormitorios={p.dormitorios}
                                    unidadMedida={p.unidadMedida}
                                    cantCocheras={p.cantCocheras}
                                    supTotal={p.supTotal}
                                    tipo={p.tipo}
                                    vista={vista}
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
    )
}

export default ListaPropiedades