import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Contact.css';  // Import custom CSS
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';  // Import map, phone, and envelope icons

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNo: '',  // Changed from mobile to phoneNo
    email: '',
    subject: '',
    message: ''    // Changed from description to message
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(''); // Added state for success message

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors = {};

    // Name validation: Only characters and max length 255
    if (formData.name && !/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name must contain only letters and spaces.';
    }
    if (formData.name && formData.name.length > 255) {
      newErrors.name = 'Name cannot exceed 255 characters.';
    }

    // Email validation: Ensure it's a valid email and max length 255
    if (formData.email) {
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address.';
      }
      if (formData.email.length > 255) {
        newErrors.email = 'Email cannot exceed 255 characters.';
      }
    }

    // PhoneNo validation: Optional, but if provided, max length 20 characters and numeric only
    if (formData.phoneNo && (!/^\d+$/.test(formData.phoneNo) || formData.phoneNo.length > 20)) {
      newErrors.phoneNo = 'Phone number should contain only numbers and cannot exceed 20 characters.';
    }

    // Subject validation: Max length 255 characters
    if (formData.subject && formData.subject.length > 255) {
      newErrors.subject = 'Subject cannot exceed 255 characters.';
    }

    // Message validation: Ensure length is under 65535 characters
    if (formData.message && formData.message.length > 65535) {
      newErrors.message = 'Message cannot exceed 65535 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await fetch('http://localhost:8080/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          setSuccessMessage('Your message has been sent successfully!');
          setFormData({
            name: '',
            phoneNo: '',   // Reset phoneNo field
            email: '',
            subject: '',
            message: ''    // Reset message field
          });
          setErrors({});
        } else {
          alert(JSON.stringify(formData))
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while sending your message.');
      }
    }
  };

  return (
    <div className="contact-container">
      <div className="container my-5">
        <div className="row">
          {/* Contact Details Section */}
          <div className="col-md-6 mb-4 contact-details">
            <h2 className="contact-heading">Contact Us</h2>

            {/* Google Map Embed */}
            <div className="map-container mb-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3585.23130370455!2d73.05167127497606!3d19.02589938216842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c24cce39457b%3A0x8bd69eab297890b0!2sCentre%20for%20Development%20of%20Advanced%20Computing%20(CDAC)!5e1!3m2!1sen!2sin!4v1732627100098!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

            <p className="contact-info">
              <FaMapMarkerAlt />
              <a className="contact-us-main-page-custom-link"
                href="https://www.google.com/maps?q=Raintree+Marg%2C+Near+Bharati+Vidyapeeth%2C+Opp.+Kharghar+Railway+Station%2C+Sector+7%2C+CBD+Belapur%2C+Navi+Mumbai+-+400+614%2C+Maharashtra%2C+India"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'black', textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseOver={(e) => e.target.style.color = 'blue'}
                onMouseOut={(e) => e.target.style.color = 'black'}
              >
                Raintree Marg, Near Bharati Vidyapeeth, Opp. Kharghar Railway Station, Sector 7, CBD Belapur, Navi Mumbai - 400 614, Maharashtra, India
              </a>
            </p>
            <p>
              <FaPhoneAlt /> +91-22-27565303
            </p>
            <p>
              <FaEnvelope /> <a href="mailto: info@sarvam.com" class="contact-us-main-page-custom-link"> info@sarvam.com</a>
            </p>
          </div>

          {/* Form Section */}
          <div className="col-md-6">
            <h3 className="form-heading">Get In Touch</h3>
            {successMessage && <div className="alert alert-success">{successMessage}</div>} {/* Display success message */}
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                {errors.name && <small className="text-danger">{errors.name}</small>}
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNo" className="form-label">Phone Number</label>
                {/* Changed name to phoneNo */}
                <input
                  className="form-control"
                  id="phoneNo"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleInputChange}
                  pattern="[\d]{10}" // Optional, for 10-digit phone number
                />
                {errors.phoneNo && <small className="text-danger">{errors.phoneNo}</small>}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </div>
              <div className="mb-3">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
                {errors.subject && <small className="text-danger">{errors.subject}</small>}
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>   {/* Changed from description to message */}
                <textarea
                  className="form-control"
                  id="message"  // Changed id to message
                  name="message"  // Changed name to message
                  rows="4"
                  value={formData.message}  // Changed value to message
                  onChange={handleInputChange}
                  required
                ></textarea>
                  
                {errors.message && <small className="text-danger">{errors.message}</small>}
              </div>
              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-send">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
