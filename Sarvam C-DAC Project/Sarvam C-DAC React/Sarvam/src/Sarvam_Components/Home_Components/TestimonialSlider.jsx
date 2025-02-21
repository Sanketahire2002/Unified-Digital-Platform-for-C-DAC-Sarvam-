import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";

const TestimonialSlider = () => {
  const testimonials = [
    {
      name: "Alia Tejwani",
      quote: "CDAC has provided me with the skills and confidence to succeed in my career.",
      image: "/images/pic1.jpeg",
      role: "Software Engineer",
    },
    {
      name: "Manik Patel",
      quote: "The training at CDAC is rigorous but incredibly rewarding. Highly recommended!",
      image: "/images/pic3.jpeg",
      role: "Full-Stack Developer",
    },
    {
      name: "Shikha Bhosle",
      quote: "CDAC has a perfect balance of theory and practical exposure. It changed my life.",
      image: "/images/pic5.jpeg",
      role: "Back End Develpper",
    },
    {
      name: "Ved Prakash",
      quote: "Thanks to CDAC, I landed my dream job right after graduation.",
      image: "/images/pic4.jpeg",
      role: "Front End Developer",
    },
    {
      name: "Priyanka Jaiswal",
      quote: "The mentorship and guidance at CDAC are unparalleled.",
      image: "/images/pic2.jpeg",
      role: "Java Developer",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Number of cards visible at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container my-5 mb-5">
      <h2 className="text-center mb-4 gallery-title mb-5">What Our Students Say About CDAC</h2>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="px-3">
            <div className="card text-center shadow-sm">
              <img
                src={testimonial.image}
                className="card-img-top rounded-circle mx-auto mt-3"
                alt={testimonial.name}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                }}
              />
              <div className="card-body">
                <h5 className="card-title" style={{ color: "black" }}>{testimonial.name}</h5>
                <p className="text-muted">{testimonial.role}</p>
                <p className="card-text" style={{ color: "black" }}>
                  "{testimonial.quote}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialSlider;
