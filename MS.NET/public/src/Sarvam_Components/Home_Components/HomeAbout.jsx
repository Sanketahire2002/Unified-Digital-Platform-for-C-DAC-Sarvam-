import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomeAbout.css'; // Custom CSS for additional styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faBullseye, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const HomeAbout = () => {
    return (
        <div className="home-about-container my-5">
            <div className="row g-4">
                {/* Vision Flip Card */}
                <div className="col-md-4">
                    <div className="home-about-flip-card">
                        <div className="home-about-flip-card-inner">
                            {/* Front Side */}
                            <div className="home-about-flip-card-front d-flex flex-column justify-content-center align-items-center">
                                <FontAwesomeIcon icon={faEye} className="home-about-icon" />
                                <h3 className="home-about-card-title mt-3">Our Vision</h3>
                            </div>
                            {/* Back Side */}
                            <div className="home-about-flip-card-back">
                                <h3>Our Vision</h3>
                                <p>
                                    We aim to inspire creativity and innovation while shaping a
                                    brighter, sustainable future for everyone.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mission Flip Card */}
                <div className="col-md-4">
                    <div className="home-about-flip-card">
                        <div className="home-about-flip-card-inner">
                            {/* Front Side */}
                            <div className="home-about-flip-card-front d-flex flex-column justify-content-center align-items-center">
                                <FontAwesomeIcon icon={faBullseye} className="home-about-icon" />
                                <h3 className="home-about-card-title mt-3">Our Mission</h3>
                            </div>
                            {/* Back Side */}
                            <div className="home-about-flip-card-back">
                                <h3>Our Mission</h3>
                                <p>
                                    To deliver excellence, empower communities, and foster
                                    sustainable growth for future generations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* About Us Flip Card */}
                <div className="col-md-4">
                    <div className="home-about-flip-card">
                        <div className="home-about-flip-card-inner">
                            {/* Front Side */}
                            <div className="home-about-flip-card-front d-flex flex-column justify-content-center align-items-center">
                                <FontAwesomeIcon icon={faInfoCircle} className="home-about-icon" />
                                <h3 className="home-about-card-title mt-3">About Us</h3>
                            </div>
                            {/* Back Side */}
                            <div className="home-about-flip-card-back">
                                <h3>About Us</h3>
                                <p>
                                    We are passionate about delivering exceptional services,
                                    fostering innovation, and creating memorable experiences.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeAbout;
