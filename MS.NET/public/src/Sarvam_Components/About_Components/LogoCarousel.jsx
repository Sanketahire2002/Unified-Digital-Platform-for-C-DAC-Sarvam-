import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import core Swiper styles
import 'swiper/css/navigation'; // Optional navigation styles
import 'swiper/css/autoplay'; // Optional autoplay styles

//npm install swiper

// Import images from the AboutUsImage folder
import MeitY from './AboutUsImage/MeitY.png';
import Azadi from './AboutUsImage/azadi.png';
import ITUWTSA from './AboutUsImage/ITUWTSA.png';
import BhimUpi from './AboutUsImage/bhimUpi.png';
import DigitalIndia from './AboutUsImage/digitalindia.png';
import IndiaGov from './AboutUsImage/indiagov.png';
import SwachhBharat from './AboutUsImage/swachhBharat.png';

const LogoCarousel = () => {
  // Define logos using imported images
  const logos = [
    { href: "https://www.meity.gov.in/", src: MeitY, alt: "MeitY Logo" },
    { href: "https://amritmahotsav.nic.in/", src: Azadi, alt: "Azadi Logo" },
    { href: "#", src: ITUWTSA, alt: "ITUWTSA Logo" },
    { href: "https://www.bhimupi.org.in/", src: BhimUpi, alt: "BHIM App" },
    { href: "https://digitalindia.gov.in/", src: DigitalIndia, alt: "Digital India" },
    { href: "https://www.india.gov.in/", src: IndiaGov, alt: "India.gov.in" },
    { href: "https://swachhbharatmission.gov.in/", src: SwachhBharat, alt: "Swachh Bharat" },
  ];

  return (
    <div className="container-fluid bg-dark py-4">
      <div className="row text-center">
        <Swiper
          spaceBetween={20}
          slidesPerView={4}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            // Breakpoints for different screen sizes
            320: { slidesPerView: 1, spaceBetween: 10 }, // Mobile
            480: { slidesPerView: 2, spaceBetween: 15 }, // Small Tablets
            768: { slidesPerView: 3, spaceBetween: 20 }, // Tablets
            1024: { slidesPerView: 4, spaceBetween: 20 }, // Laptops
            1440: { slidesPerView: 5, spaceBetween: 25 }, // Desktops
          }}
          className="logo-carousel"
        >
          {logos.map((logo, index) => (
            <SwiperSlide key={index}>
              <a href={logo.href} target="_blank" rel="noopener noreferrer">
                <img src={logo.src} alt={logo.alt} className="img-fluid" />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default LogoCarousel;
