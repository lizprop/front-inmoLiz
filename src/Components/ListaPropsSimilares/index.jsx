import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import CardChicaImagenGrande from '../CardChicaImgGrande';
import './styles.css';


function ListaPropsSimilares({ precioProp, tipoProp, vista, id }) {
    const allProps = useSelector(state => state.propiedades);
    const contenedorRef = useRef(null);

    const propsFiltraPrecio = allProps?.filter(p => {
        const precio = Number(p.operacion[0]?.precios[0]?.precio);
        return !isNaN(precio) && precio >= precioProp - 30000 && precio <= precioProp + 80000 && precio !== precioProp ;
    });
    //ahora filtro por tipo propiedad
    const propsFiltradas = propsFiltraPrecio.filter(p => p.tipo.nombre === tipoProp);

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
                                <CardChicaImagenGrande {...p} vista={vista} />
                            </div>
                        ))}
                    </div>
                    <button className="flecha derecha" onClick={() => scroll(300)}>▶</button>
                </>
            ) : (
                <div className='no-props-similares'>
                    <h2>No hay propiedades similares para recomendarte</h2>
                </div>
            )}
        </div>
    );
}

export default ListaPropsSimilares;
