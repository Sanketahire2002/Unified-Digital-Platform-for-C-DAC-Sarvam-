import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import banner1 from './images/banner1.jpeg';
import banner2 from './images/banner2.jpeg';
import banner3 from './images/banner3.jpeg';
import banner4 from './images/banner4.jpeg';
import banner5 from './images/banner5.jpeg';
import banner6 from './images/banner6.jpeg';
import banner7 from './images/banner7.jpeg';
import banner8 from './images/banner8.jpeg';
import banner9 from './images/banner9.jpeg';
import banner10 from './images/banner10.jpeg';
import banner11 from './images/banner11.jpeg';
import banner12 from './images/banner12.jpeg';
import banner13 from './images/banner13.jpeg';
import banner14 from './images/banner14.jpeg';

import './HomeCarousel.css';

const images = [
    banner1, banner2, banner3, banner4, banner5, banner6, banner7, banner8, banner9, banner10, banner11, banner12, banner13, banner14,
];

const HomeCarousel = () => {
    return (
        <div className="container-fluid p-0">
            <Carousel interval={1000} fade>
                {images.map((image, index) => (
                    <Carousel.Item key={index}>
                        <img
                            className="d-block w-100 carousel-image"
                            src={image}
                            alt={`Slide ${index + 1}`}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default HomeCarousel;
