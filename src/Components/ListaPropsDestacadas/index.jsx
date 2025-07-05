import React, { useRef } from 'react';
import CardEmp from '../Card-Emprendimiento';
import './styles.css';


function ListaPropsDestacadas({ allPropsDestacadas }) {
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
        <div className="cont-lista-props-destacadas">
            <div className="carrusel-botones">
                <button className="boton-carrusel" onClick={() => scroll('left')}>&#10094;</button>

                <div className="carrusel-container" ref={scrollRef}>
                    {allPropsDestacadas?.map((prop) => (
                        <div className="carrusel-item" key={prop.id}>
                            <CardEmp 
                                id={prop.id}
                                direccionF={prop.direccionF}
                                imagen={prop.imagenes[0].imagen}
                                tituloPublicacion={prop.tituloPublicacion}
                                descripcion={prop.descripcion}
                            />
                        </div>
                    ))}
                </div>

                <button className="boton-carrusel" onClick={() => scroll('right')}>&#10095;</button>
            </div>
        </div>
    );
}

export default ListaPropsDestacadas;
