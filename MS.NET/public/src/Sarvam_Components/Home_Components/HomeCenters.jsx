import React from "react";

// Import images properly
import MyImage from "./CdacImages/CdacCenter.jpeg";
import img1 from "./CdacImages/img1.jpeg";
import img2 from "./CdacImages/img2.jpeg";
import img3 from "./CdacImages/img3.jpeg";
import img4 from "./CdacImages/img4.jpeg";
import img5 from "./CdacImages/img5.jpeg";
import img6 from "./CdacImages/img6.jpeg";
import img7 from "./CdacImages/img7.jpeg";
import img8 from "./CdacImages/img8.jpeg";
import img9 from "./CdacImages/img9.jpeg";
import img10 from "./CdacImages/img10.jpeg";
import img11 from "./CdacImages/img11.jpeg";
import img12 from "./CdacImages/img12.jpeg";

const HomeCenters = () => {
  const centers = [
    { id: "BL", img: img1, name: "Bengaluru" },
    { id: "CH", img: img2, name: "Chennai" },
    { id: "DL", img: img3, name: "Delhi" },
    { id: "HY", img: img4, name: "Hyderabad" },
    { id: "KL", img: img5, name: "Kolkata" },
    { id: "ML", img: img6, name: "Mohali" },
    { id: "MB", img: img7, name: "Mumbai" },
    { id: "ND", img: img8, name: "Noida" },
    { id: "PT", img: img9, name: "Patna" },
    { id: "PN", img: img10, name: "Pune" },
    { id: "SL", img: img11, name: "Silchar" },
    { id: "TVM", img: img12, name: "Thiruvananthapuram" },
  ];

  return (
    <div className="row d-flex" style={{ minHeight: "0vh" }}>
      {/* Director General Section */}
      <div
        className="col-md-12 col-lg-6 col-12 aos-init aos-animate"
        data-aos="fade-up"
        data-aos-delay=""
        style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
      >
        <div className="card border-0 aos-init aos-animate">
          <span data-aos="zoom-in" data-aos-delay="200" className="aos-init aos-animate">
            <img
              src={MyImage}
              className="card-img-top square-image img-fluid" // Added img-fluid class for responsiveness
              alt="DG Pic"
              style={{
                width: "100%",   // Ensures the image takes full width
                height: "auto",  // Keeps the aspect ratio intact
                borderRadius: "20px",  // Rounded corners
                objectFit: "cover",  // Ensures the image covers the area without distortion
                paddingTop: "40px",
              }}
            />
          </span>
          <div className="bottom-left fs-5 bg-dark" style={{ paddingLeft: "20px" }}>
            <div className="bottom-left fs-5 bg-dark">
              <strong style={{ color: "white" }}>E. Magesh</strong>
              <br />
              <small style={{ color: "white" }}>Director General, C-DAC</small>
            </div>
          </div>
          <div className="card-body">
            <h3
              className="card-title text-uppercase font-blue"
              style={{ lineHeight: "35px", color: "blue" }}
            >
              Message from Director General
            </h3>
            <p className="card-text pt-1" style={{ color: "black", textAlign: "justify" }}>
              I would like to express my gratitude to the Ministry of
              Electronics &amp; Information Technology (MeitY) for reposing
              confidence in me and assigning the role of Director General of
              Centre for Development of Advanced Computing (C-DAC).C-DAC with its focus in Advanced Computing is uniquely positioned to establish dependable and secure Exascale Ecosystem offering services in various domains.
            </p>
          </div>
        </div>
      </div>

      {/* Centers Section */}
      <div
        className="col-md-12 col-lg-6 col-12 centers-bg px-5 aos-init aos-animate"
        data-aos="fade-up"
        data-aos-delay="100"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "100%",  // Ensure the center section also stretches
        }}
      >
        <div className="pt-5 sec_titles text-uppercase">
          <h2 >Our Centers</h2><div className="row pt-3 pb-0">
            {centers.map((center, index) => (
              <div
                key={center.id}
                className="col-md-3 col-6 text-center mb-4 aos-init aos-animate"
                data-aos="zoom-in"
                data-aos-delay={200 + index * 100}
              >
                <img
                  src={center.img}
                  className="card-img-top rounded-circle border border-5 border-white center-img shadow"
                  alt={`${center.name} center`}
                />
                <p className="pt-2" style={{ color: "black" }}>
                  {center.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCenters;
