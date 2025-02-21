import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './HomeGallery.css'; // Importing CSS for styling

import gallery1 from './gallery/gallery1.jpeg';
import gallery2 from './gallery/gallery2.jpeg';
import gallery3 from './gallery/gallery3.jpeg';
import gallery4 from './gallery/gallery4.jpeg';
import gallery5 from './gallery/gallery5.jpeg';
import gallery6 from './gallery/gallery6.jpeg';


export function HomeGallery() {
  // List of image URLs for the gallery
  const images = [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6,
  ];

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Our Gallery</h1>
      
      {/* Gallery grid using React-Bootstrap */}
      <Container>
        <Row className="justify-content-center">
          {images.map((img, index) => (
            <Col key={index} xs={12} md={4} className="gallery-item">
              <img src={img} alt={`Gallery ${index + 1}`} className="gallery-image" />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
