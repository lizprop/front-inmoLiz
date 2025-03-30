import React from 'react';
import Card from '../Card';
import NoHayProps from '../NoHayProps';
import './styles.css';

function ListaPropiedades({allProps}) {

    return (
        <div className='contGralListaP'>       
            <div className='contListaP'>
                {
                    allProps[0] ?
                    allProps.map(p => {
                        return (
                            <div className='cont-card' key={p.id}>
                                <Card className='card' key={p.id}
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
                                />
                            </div>
                        )
                    }) : (
                        <div className='no-props'>
                            <NoHayProps/>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ListaPropiedades