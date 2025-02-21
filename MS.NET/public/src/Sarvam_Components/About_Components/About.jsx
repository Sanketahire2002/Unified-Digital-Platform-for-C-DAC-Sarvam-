import React from "react";
import './About.css'; // Assuming your CSS file is named 'AboutUS.css'
import LogoCarousel from "./LogoCarousel";

import aboutUs from './AboutUsImage/about_us.jpg'; // Ensure correct path for the image

const About = () => {
  const cardsData = [
    {
      title: "Organizational Chart",
      text: "Centre for Development of Advanced Computing (C-DAC) Organizational Chart",
      content:
        "C-DAC's organizational structure is designed to facilitate efficient research, development, and operations. It includes specialized groups for supercomputing, language computing, and software technologies.",
      delay: 200,
    },
    {
      title: "Our Vision, Mission & Values",
      text: "C-DAC has a well-defined and understood vision, which C-DACians strive to achieve.",
      content:
        "C-DAC envisions empowering India with advanced computing technologies, focusing on innovation, excellence, and inclusivity in IT and electronics development.",
      delay: 300,
    },
    {
      title: "Awards & Accolades",
      text: "C-DAC's achievements, awards won and accolades received are highlighted here.",
      content:
        "C-DAC has received numerous awards for excellence in supercomputing, Indian language technologies, and contributions to IT innovation in India.",
      delay: 400,
    },
    {
      title: "Success Stories & Testimonials",
      text: "Our customers are our best and most credible ambassadors.",
      content:
        "C-DAC has contributed significantly to India's IT success stories, from PARAM supercomputers to GIST technologies, impacting industries and academia alike.",
      delay: 500,
    },
    {
      title: "Annual Reports",
      text: "C-DAC's annual performance over each year, summarized in the Annual Reports.",
      content:
        "C-DAC's annual reports showcase its achievements in supercomputing, health informatics, and national projects, reflecting its dedication to innovation and technology.",
      delay: 600,
    },
  ];

  return (
    <div id="content" className="container-fluid sp">
      {/* Parallax About Section */}
      <div className="container-fluid parallax-about bh-26 d-lg-block d-sm-none d-none" style={{ marginTop: "85px" }}>
        <div className="row" data-aos="zoom-in" data-aos-delay="200">
          <p
            id="tag"
            className="text-white banner-tittle"
            data-aos="zoom-in-up"
            data-aos-delay="400"
          >
            About C-DAC
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="row cp">
        <div className="container-fluid">
          <div className="row">
            {/* Left Section - About Us Text */}
            <div
              className="col-md-4 mb-5 col-sm-12 col-s-12 pb-3 aos-init aos-animate"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <div className="card shadow">
                {/* Ensure correct image src */}
                <img
                  src={aboutUs}
                  className="card-img-top"
                  alt="About Us"
                  style={{
                    width: "100%",   // Set the desired width
                    height: "400px",  // Set the desired height (make sure width = height to make it square)
                    borderRadius: "15px",  // Set the rounded corners
                    objectFit: "cover"  // Ensures the image covers the area without distortion
                  }}
                />

                <div className="card-body card-px">
                  <div className="pb-1 mb-4 g_title text-uppercase">
                    <h2>About Us</h2>
                  </div>
                  <p>
                    Centre for Development of Advanced Computing (C-DAC) is the premier R&amp;D organization of the Ministry of Electronics and Information Technology (MeitY) for carrying out R&amp;D in IT, Electronics, and associated areas.
                  </p>
                  <ul>
                    <li>
                      The setting up of C-DAC in 1988 itself was to build Supercomputers in context of denial of import of Supercomputers by USA. Since then C-DAC has been undertaking building of multiple generations of Supercomputers starting from PARAM with 1 GF in 1988.
                    </li>
                    <li>
                      Almost at the same time, C-DAC started building Indian Language Computing Solutions with setting up of GIST group (Graphics and Intelligence based Script Technology); National Centre for Software Technology (NCST) set up in 1985 had also initiated work in Indian Language Computing around the same period.
                    </li>
                    <li>
                      Electronic Research and Development Centre of India (ER&amp;DCI) with various constituents starting as adjunct entities of various State Electronic Corporations, had been brought under the hold of Department of Electronics and Telecommunications (now MeitY) in around 1988. They were focusing on various aspects of applied electronics, technology, and applications.
                    </li>
                    <li>
                      With the passage of time as a result of creative ecosystem that got set up in C-DAC, more areas such as Health Informatics, etc., got created; while right from the beginning the focus of NCST was on Software Technologies; similarly C-DAC started its education &amp; training activities in 1994 as a spin-off with the passage of time, it grew to a large effort to meet the growing needs of Indian Industry for finishing schools.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Section - Cards */}
            <div className="col-md-8 col-sm-12 col-s-12">
              <div className="row">
                {cardsData.map((card, index) => (
                  <div
                    className="col-md-6 pb-5 aos-init aos-animate"
                    data-aos="fade-right"
                    data-aos-delay={card.delay}
                    key={index}
                  >
                    <div className="card border mx-sm-1 p-3 shadow card-hight">
                      <div className="card-body">
                        <h5 className="card-title" style={{ color: 'black', fontWeight: 'bold'  }}>
                          {card.title}
                        </h5>
                        <p className="card-text" style={{ color: 'black' }}>{card.text}</p>
                        <p className="card-content">{card.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
