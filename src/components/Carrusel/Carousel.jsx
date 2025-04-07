import React from 'react';
import RollingGallery from "../../Components/RollingGallery/RollingGallery";
import './Carousel.css'; // Asegúrate de importar el archivo CSS

const Carousel = () => {
    return (
            <RollingGallery autoplay={true} pauseOnHover={true}/>
    );
};

export default Carousel;
