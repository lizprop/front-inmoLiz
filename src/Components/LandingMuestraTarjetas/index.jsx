import React, { useEffect, useRef, useState } from 'react';
import CardLanding from '../CardLanding';
import ImgCardVenta from '../../Images/prop3_landing.webp';
import ImgCardAlquiler from '../../Images/prop2-landing.webp';
import ImgCardEmprendimientos from '../../Images/prop1_landing.webp';
import ImgCardExterior from '../../Images/prop4_landing.webp';
import './styles.css';

const categorias = [
    {
        imagen: ImgCardVenta,
        titulo: 'Propiedades en Venta',
        texto: 'Casas, departamentos y oportunidades seleccionadas para comprar con confianza.',
        url: 'ventas',
        etiqueta: 'Comprar'
    },
    {
        imagen: ImgCardAlquiler,
        titulo: 'Propiedades en Alquiler',
        texto: 'Opciones listas para mudarte, con ubicaciones y condiciones claras.',
        url: 'alquiler',
        etiqueta: 'Alquilar'
    },
    {
        imagen: ImgCardEmprendimientos,
        titulo: 'Emprendimientos',
        texto: 'Proyectos con potencial para vivir, invertir o planificar a futuro.',
        url: 'emprendimientos',
        etiqueta: 'Invertir'
    },
    {
        imagen: ImgCardExterior,
        titulo: 'Propiedades en el Exterior',
        texto: 'Alternativas internacionales para ampliar tu búsqueda inmobiliaria.',
        url: 'internacional',
        etiqueta: 'Exterior'
    }
];

function LandingMuestraTarjetas() {
    const tarjetasRef = useRef([]);
    const [visibleIndex, setVisibleIndex] = useState([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.dataset.index);
                        setVisibleIndex((prev) => (
                            prev.includes(index) ? prev : [...prev, index]
                        ));
                    }
                });
            },
            { threshold: 0.22 }
        );

        tarjetasRef.current.forEach((tarjeta) => {
            if (tarjeta) observer.observe(tarjeta);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section className='cont-muestra-tarjetas'>
            <div className='muestra-tarjetas-header'>
                <span className='muestra-tarjetas-eyebrow' data-translate>Explorá por categoría</span>
                <h2 className='titulo-tarjetas' data-translate>Encontrá el tipo de propiedad que estás buscando</h2>
                <p className='muestra-tarjetas-texto' data-translate>
                    Organizamos la búsqueda para que puedas ir directo a la operación o proyecto que mejor se adapta a tu momento.
                </p>
            </div>

            <div className='cont-tarjetas'>
                {categorias.map((categoria, index) => (
                    <div
                        key={categoria.url}
                        data-index={index}
                        ref={(el) => (tarjetasRef.current[index] = el)}
                        className={`cont-tarjeta-categoria ${visibleIndex.includes(index) ? 'animada' : ''}`}
                    >
                        <CardLanding {...categoria} />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default LandingMuestraTarjetas;
