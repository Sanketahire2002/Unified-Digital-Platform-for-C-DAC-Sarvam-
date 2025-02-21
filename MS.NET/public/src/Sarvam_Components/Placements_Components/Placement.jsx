import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './Placement.css';

import company1 from './Companyimg/rjs.png';
import company2 from './Companyimg/coupa.png';
import company3 from './Companyimg/cape.png';
import company4 from './Companyimg/amdocs.png';
import company5 from './Companyimg/cdac.png';
import company6 from './Companyimg/tm.png';
import company7 from './Companyimg/capgmini.png';
import company8 from './Companyimg/ibm.png';

import img1 from './Companyimg/img1.jpeg';
import img2 from './Companyimg/img2.jpeg';
import img3 from './Companyimg/img3.jpeg';
import img4 from './Companyimg/gallery4.jpeg';

const Placement = () => {
  return (
    <section className="admin-placement-section py-5">
      <Container>
        <Row className="mb-6">
          <Col xs={12} sm={6} lg={6}>
            <div className="admin-placement-card mb-4 shadow">
              <div
                className="admin-placement-card-img-top"
                style={{
                  backgroundImage: `url(${img4})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '250px',
                }}
                alt="Workshops"
              ></div>
              <div className="admin-placement-card-body" style={{ height: '250px' }}>
                <h5 className="admin-placement-card-title" >Workshops</h5>
                <p className="admin-placement-card-text" style={{ textAlign: 'justify' }}>
                  In the dynamic IT field, change is the only constant, making it crucial for professionals to stay competitive. The challenges are increasingly demanding, yet the rewards for staying at the forefront are highly promising. In today’s fast-paced environment, both technical and interpersonal skills are vital for delivering effective solutions and providing time-critical support, ensuring professionals' long-term growth.
                </p>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={6} lg={6}>
            <div className="admin-placement-card mb-4 shadow">
              <div
                className="admin-placement-card-img-top"
                style={{
                  backgroundImage: "url('https://www.sunbeaminfo.in/uploads/product_photo/20240506161125_495028619873.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '250px',
                }}
                alt="Internship"
              ></div>
              <div className="admin-placement-card-body" style={{ height: '250px' }}>
                <h5 className="admin-placement-card-title">Internship</h5>
                <p className="admin-placement-card-text " style={{ textAlign: 'justify' }}>
                  It is really difficult to sustain competitive edge of an industry. No matter you are an employer, employee or an entrepreneur.
                  Technology, innovations and business trends has added diversified change to the organizational process. Individual should acquire proficiency, mainly in technical and develop personal skills to adapt these industry dynamics.In today’s fast-paced environment, both technical and interpersonal skills are vital for delivering effective solutions and providing time-critical support, ensuring professionals' long-term growth.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
const Company = () => {
  return (
    <div className="company-container mt-5 mb-5">
      <div className="company-logos">
        <div className="logos">
          <img src={company1} alt="Company 1" />
          <img src={company2} alt="Company 2" />
          <img src={company3} alt="Company 3" />
          <img src={company4} alt="Company 4" />
          <img src={company5} alt="Company 5" />
          <img src={company6} alt="Company 6" />
          <img src={company7} alt="Company 7" />
          <img src={company8} alt="Company 8" />
        </div>
        <div className="logos">
          <img src={company1} alt="Company 1" />
          <img src={company2} alt="Company 2" />
          <img src={company3} alt="Company 3" />
          <img src={company4} alt="Company 4" />
          <img src={company5} alt="Company 5" />
          <img src={company6} alt="Company 6" />
          <img src={company7} alt="Company 7" />
          <img src={company8} alt="Company 8" />
        </div>
      </div>
    </div>
  );
}




const PlacementInfo = () => {
  return (
    <div className="admin-placement-panel-body py-5">
      <h1>Placement</h1>
      <p>
        The Centre for Development of Advanced Computing (C-DAC) is renowned for its comprehensive training programs...
      </p>
      <h3>Placement Highlights:</h3>
      <ul className="admin-placement-list-style">
        <li>
          <strong>High Placement Rate:</strong> C-DAC has consistently achieved a placement rate of over 85%...
        </li>
        <li>
          <strong>Competitive Salary Packages:</strong> The average salary package offered to C-DAC graduates...
        </li>
        <li>
          <strong>Diverse Recruiters:</strong> Over 300 companies participate in C-DAC's Common Campus Placement...
        </li>
      </ul>
      <Row>
        {[img1, img2, img3].map((image, index) => (
          <Col key={index} xs={12} sm={4}>
            <div className="admin-placement-list-image-box">
              <img
                src={image}
                alt={`Placement ${index + 1}`}
                className="img-responsive center-block w-100"
                style={{ backgroundSize: 'contain', objectFit: 'cover' }}
              />
            </div>
          </Col>
        ))}
      </Row>
      <Col xs={12}>
        <div className="admin-placement-list-style">
          <ul>
            <li>
              <strong>Hands-On Experience</strong> - Practical learning through project-based activities...
            </li>
            <li>
              <strong>Structured Training</strong> - Receive comprehensive training sessions tailored...
            </li>
            <li>
              <strong>Project Development</strong> - Work on mini and elaborative projects using conceptual knowledge...
            </li>
            <li>
              <strong>Mentorship</strong> - Guidance from experts throughout the internship period.
            </li>
            <li>
              <strong>Evaluation and Feedback</strong> - Participate in regular review meetings via Zoom...
            </li>
            <li>
              <strong>Reporting</strong> - Project Evaluation Report will be shared with the respective college...
            </li>
          </ul>
        </div>
      </Col>
    </div>
  );
};

const PlacementPage = () => {
  return (
    <div className="admin-placement-page mt-5">
      <PlacementInfo />
      <Company />
      <Placement />
    </div>
  );
};

export default PlacementPage;
