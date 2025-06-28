import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import NoHayProps from '../NoHayProps';
import CardChica from '../CardChica';
import './styles.css';

function ListaPropsSimilares({ precioProp, vista }) {
    const allProps = useSelector(state => state.propiedades);
    const contenedorRef = useRef(null);

    const propsFiltradas = allProps?.filter(p => {
        const precio = Number(p.operacion[0]?.precios[0]?.precio);
        return !isNaN(precio) && precio > precioProp - 20000 && precio < precioProp + 80000 && precio !== precioProp;
    });

    const scroll = (offset) => {
        contenedorRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    };

    return (
        <div className="wrapper-similares">
            {propsFiltradas && propsFiltradas.length > 0 ? (
                <>
                    <button className="flecha izquierda" onClick={() => scroll(-300)}>◀</button>
                    <div className='contListaPsimilares' ref={contenedorRef}>
                        {propsFiltradas.map(p => (
                            <div className='cont-card' key={p.id}>
                                <CardChica {...p} vista={vista} />
                            </div>
                        ))}
                    </div>
                    <button className="flecha derecha" onClick={() => scroll(300)}>▶</button>
                </>
            ) : (
                <div className='no-props'>
                    <NoHayProps />
                </div>
            )}
        </div>
    );
}

export default ListaPropsSimilares;
