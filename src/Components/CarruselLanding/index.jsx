import React, { useState, useEffect } from 'react';
import Img1 from '../../Images/prop4_landing.webp';
import Img2 from '../../Images/prop5_landing.webp';
import './styles.css';

function CarruselLanding() {
    const images = [Img1, Img2];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <img 
            src={images[currentIndex]} 
            alt="not found" 
            className="imgCarruselLanding"
        />
    );
}

export default CarruselLanding;
