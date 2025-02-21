import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomeTeam.css'; // Import custom CSS for flip effect

// Import images
import SanketImage from './team-images/Sanket.jpeg';
import Komal from './team-images/Komal.jpg';
import Chaitanya from './team-images/Chaitanya.jpg';
import Rounak from './team-images/Rounak.jpg';
import Chitransh from './team-images/Chitransh.jpg';

const HomeTeam = () => {
    const teamMembers = [
        { name: 'Sanket Ahire', role: 'Project Lead', image: SanketImage, description: 'Leader of the team, responsible for guiding and organizing the team.' },
        { name: 'Komal Bheje', role: 'Developer', image: Komal, description: 'Expert in coding and application development.' },
        { name: 'Chaitanya Chaudhari ', role: 'Developer', image: Chaitanya, description: 'Responsible for designing user-friendly interfaces and graphics.' },
        { name: 'Rounak Ghosh', role: 'Developer', image: Rounak, description: 'Ensures the quality of the product through rigorous testing.' },
        { name: 'Chitransh Singh', role: 'Developer', image: Chitransh, description: 'Manages the project timeline and ensures the team delivers on schedule.' },
    ];

    return (
        <div className="container">
            <h1 className="gallery-title" style={{ textAlign: 'center', margin: '0', padding: '0', marginBottom: '40px' }}>Meet Our Team</h1>
            <div className="row d-flex justify-content-between">
                {teamMembers.map((member, index) => (
                    <div key={index} className="col-lg-2 col-md-3 col-sm-4 mb-4">
                        <div className="card-container">
                            <div className="card flip-card">
                                <div className="card-front">
                                    <img
                                        src={member.image}
                                        className="card-img-top rounded-circle mx-auto mt-4"
                                        alt={member.name}
                                        style={{ width: '120px', height: '120px' }}
                                    />
                                    <div className="card-body text-center">
                                        <h5 className="card-title text-black">{member.name}</h5>
                                        <p className="card-text text-black">{member.role}</p>
                                    </div>
                                </div>
                                <div className="card-back">
                                    <div className="card-body text-center">
                                        <h5 className="card-title text-white">{member.name}</h5>
                                        <p className="card-text text-white">{member.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeTeam;
