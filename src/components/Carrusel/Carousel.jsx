import React from 'react';
import './Carousel.css';

const Carousel = () => {
    // Arreglo con las imágenes
    const images = [
        "/src/assets/ModelImages/porfirio-diaz1.jpeg",
        "/src/assets/ModelImages/cruz-de-piedra4.jpeg",
        "/src/assets/ModelImages/iglesia1.jpeg",
        "/src/assets/ModelImages/sto-domingo1.jpeg",
        "/src/assets/ModelImages/teatro-macedonio-alcala-3.jpeg",
        "/src/assets/ModelImages/armadura2.jpeg",
        "/src/assets/ModelImages/porfirio-diaz3.jpeg",
        "/src/assets/ModelImages/iglesia2.jpeg",
        "/src/assets/ModelImages/cruz-de-piedra5.jpeg",
        "/src/assets/ModelImages/teatro-macedonio-alcala-1.jpeg",
    ];

    return (
        <div className="card-3d">
            {images.map((src, index) => (
                <div key={index}>
                    <img src={src} alt={`imagen-${index + 1}`} />
                </div>
            ))}
        </div>
    );
};

export default Carousel;