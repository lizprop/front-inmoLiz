import React, { useRef } from 'react';
import CardChicaImagenGrande from '../CardChicaImgGrande';
import './styles.css';

function ListaPropsDestacadas({ allPropsDestacadas, vista }) {

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
                            <CardChicaImagenGrande {...prop} vista={vista}/>
                        </div>
                    ))}
                </div>

                <button className="boton-carrusel" onClick={() => scroll('right')}>&#10095;</button>
            </div>
        </div>
    );
}

export default ListaPropsDestacadas;
