import React, { useRef } from 'react';
import CardEmprendimiento from '../Card-Emprendimiento';
import './styles.css';


function ListaEmprendimientos({ allEmp }) {

    const scrollRef = useRef(null);
    const scroll = (direction) => {
        const container = scrollRef.current;
        const scrollAmount = container.offsetWidth * 0.8;

        if (direction === 'left') {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="cont-lista-props-destacadas empLista">
            <div className="carrusel-botones">
                <button className="boton-carrusel" onClick={() => scroll('left')}>&#10094;</button>

                <div className="carrusel-container" ref={scrollRef}>
                    {allEmp?.map((prop) => (
                        <div className="carrusel-item" key={prop.id}>
                            <CardEmprendimiento {...prop} />
                        </div>
                    ))}
                </div>

                <button className="boton-carrusel" onClick={() => scroll('right')}>&#10095;</button>
            </div>
        </div>
    )
}

export default ListaEmprendimientos