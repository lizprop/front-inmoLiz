import React from 'react'
import NoHayProps from '../NoHayProps';
import CardEmprendimiento from '../Card-Emprendimiento';
import './styles.css';


function ListaEmprendimientos({ allEmp }) {

    return (
        <div className='contListaP-emp'>
            {
                allEmp[0] ?
                    allEmp?.map(p => {
                        return (
                            <div className='cont-card-emp' key={p.id}>
                                <CardEmprendimiento
                                    key={p.id}
                                    id={p.id}
                                    direccionF={p.direccionF}
                                    locacion={p.locacion}
                                    tituloPublicacion={p.tituloPublicacion}
                                    tipo={p.tipoProp}
                                    imagen={p.imagenes[0].imagen}
                                />
                            </div>
                        )
                    }) : (
                        <div className='no-props'>
                            <NoHayProps />
                        </div>
                    )
            }
        </div>
    )
}

export default ListaEmprendimientos