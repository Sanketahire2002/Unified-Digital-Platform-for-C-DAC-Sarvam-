import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHome, FaInfoCircle, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaBuilding, FaSignInAlt, FaSchool, FaQuestionCircle, FaLock, FaFileSignature } from 'react-icons/fa'; // Importing social media and link icons
import { Link } from 'react-router-dom';
import { FiYoutube } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#111', // Black background for footer
      color: '#fff',
      padding: '20px 10px',
      fontSize: '14px',
      textAlign: 'left',
      marginTop: '0px',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginBottom: '10px',
      }}>

        {/* Section 1: Our Mission */}
        <div style={{
          flex: '1 1 30%',
          marginBottom: '20px',
          paddingLeft: '50px',
        }}>
          <h3 style={{ color: '#007BFF', fontSize: '24px', fontWeight: 'bold' }}>Our Mission</h3>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.6',
            textAlign: 'justify',
            color: '#ccc',
          }}>
            Centre for Development of Advanced Computing (C-DAC) is the premier R&D organization of the Ministry of Electronics and Information Technology (MeitY) for carrying out R&D in IT, Electronics and associated areas. Different areas of C-DAC, had originated at different times, many of which came out as a result of identification of opportunities.
            <br></br>
            C-DAC has today emerged as a premier R&D organization in IT&E (Information Technologies and Electronics) in the country working on strengthening national technological capabilities in the context of global developments in the field and responding to change in the market need in selected foundation areas.
          </p>
          {/* Social Media Icons */}
          <h3 style={{ color: '#007BFF', fontSize: '24px', fontWeight: 'bold' }}>Connect with us</h3>
          <div style={{ marginTop: '15px' }}>
            <a href="https://www.youtube.com/redirect?event=channel_description&redir_token=QUFFLUhqa0Uyb2FSTkRXQnFmWFZYLWxLUTRoWnZqOFBYd3xBQ3Jtc0ttdUpIbWNkZFFlQUpETXgxcTBveDdQNmpJbzh5dVBQdE1jRll3WUEybnJxRFpOWkl2MTFiLVdYV1g0dkRzbEhyTkdNT2NjdE5hTDBoQUxpY3lOY2luakhzNUhFUzdOLS00dUZlb1hGVGdOTkdmNjNXWQ&q=https%3A%2F%2Fwww.facebook.com%2FCentre-for-Development-of-Advanced-Computing-Mumbai-1256498174464522" target="_blank" rel="noopener noreferrer" style={{ marginRight: '15px' }}>
              <FaFacebook size={30} style={{ color: '#fff', transition: 'color 0.3s ease' }} />
            </a>
            <a href="https://www.youtube.com/redirect?event=channel_description&redir_token=QUFFLUhqbXdLSU9jdWp3M2VuYlAwcGlhNTN5bkxYbVktUXxBQ3Jtc0tsVHJROFVYRnJfOHNrRnpiS3NoaDNWZC1ubHVBTnlsZWc3a2loOWYxa3R1QUtMNDJwSjdCYjdTRWJ1TkxCdVY5TnU1aFppckJ4bmkyUkxRaG93Q1pqQXRwVzRBSXIyMGF2blU2UGJvUFRLQXZpZkRUMA&q=https%3A%2F%2Fwww.twitter.com%2Fcdacmumbai" target="_blank" rel="noopener noreferrer" style={{ marginRight: '15px' }}>
              <FaTwitter size={30} style={{ color: '#fff', transition: 'color 0.3s ease' }} />
            </a>
            <a href="https://www.youtube.com/redirect?event=channel_description&redir_token=QUFFLUhqbU9nY2p2ZENxNnlHZTY2M2lNX0V2em4wWUVMZ3xBQ3Jtc0tsYkNTVDVZZ2ZFOTc2Y1VnaldWT2FNX3VqdXhmVWpMSEF5a0VENG11MGppYWJBaEZKR1hwam44WkY1UzJHTmtVT3dKVFcyTURuLU5NU1JlVkFmcTR0WHlEdWtUNTl1X1NqcXp4MnMtVWpkZnhTM252TQ&q=https%3A%2F%2Fwww.instagram.com%2Fcdacmumbai" target="_blank" rel="noopener noreferrer" style={{ marginRight: '15px' }}>
              <FaInstagram size={30} style={{ color: '#fff', transition: 'color 0.3s ease' }} />
            </a>
            <a href="https://www.linkedin.com/in/cdac-mumbai-education-and-training-4b26111ba?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BY8EbBeNwRemYxgAyRUgZwg%3D%3D" target="_blank" rel="noopener noreferrer" style={{ marginRight: '15px' }}>
              <FaLinkedin size={30} style={{ color: '#fff', transition: 'color 0.3s ease' }} />
            </a>
            <a href="https://youtube.com/@cdacmumbaiet5321?feature=shared" target="_blank" rel="noopener noreferrer" style={{ marginRight: '15px' }}>
              <FiYoutube size={30} style={{ color: '#fff', transition: 'color 0.3s ease' }} />
            </a>
          </div>
        </div>

        {/* Section 2: Quick Links */}
        <div style={{
          flex: '1 1 30%',
          marginBottom: '10px',
          paddingLeft: '90px',
        }}>
          <h3 style={{ color: '#007BFF', fontSize: '24px', fontWeight: 'bold' }}>Quick Links</h3>
          <ul style={{ listStyleType: 'none', padding: 0, color: '#ccc' }}>
            <li style={{ marginBottom: '10px' }}>
              <Link
                to="/"
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '25px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                onMouseEnter={(e) => (e.target.style.color = 'rgb(0, 255, 30)')}
                onMouseLeave={(e) => (e.target.style.color = '#fff')}
              >
                <FaHome style={{ marginRight: '10px' }} /> Home
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link
                to="/about"
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '25px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                onMouseEnter={(e) => (e.target.style.color = 'rgb(0, 255, 30)')}
                onMouseLeave={(e) => (e.target.style.color = '#fff')}
              >
                <FaInfoCircle style={{ marginRight: '10px' }} /> About
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link
                to="/contact"
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '25px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                onMouseEnter={(e) => (e.target.style.color = 'rgb(0, 255, 30)')}
                onMouseLeave={(e) => (e.target.style.color = '#fff')}
              >
                <FaPhoneAlt style={{ marginRight: '10px' }} /> Contact Us
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link
                to="/placement"
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '25px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                onMouseEnter={(e) => (e.target.style.color = 'rgb(0, 255, 30)')}
                onMouseLeave={(e) => (e.target.style.color = '#fff')}
              >
                <FaBuilding style={{ marginRight: '10px' }} /> Placements
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link
                to="/login"
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '25px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                onMouseEnter={(e) => (e.target.style.color = 'rgb(0, 255, 30)')}
                onMouseLeave={(e) => (e.target.style.color = '#fff')}
              >
                <FaSignInAlt style={{ marginRight: '10px' }} /> Login
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link
                to="/admission"
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '25px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                onMouseEnter={(e) => (e.target.style.color = 'rgb(0, 255, 30)')}
                onMouseLeave={(e) => (e.target.style.color = '#fff')}
              >
                <FaSchool style={{ marginRight: '10px' }} /> Admission
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link
                to="/faq"
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '25px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                onMouseEnter={(e) => (e.target.style.color = 'rgb(0, 255, 30)')}
                onMouseLeave={(e) => (e.target.style.color = '#fff')}
              >
                <FaQuestionCircle style={{ marginRight: '10px' }} /> FAQ
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link
                to="/privacy"
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '25px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                onMouseEnter={(e) => (e.target.style.color = 'rgb(0, 255, 30)')}
                onMouseLeave={(e) => (e.target.style.color = '#fff')}
              >
                <FaLock style={{ marginRight: '10px' }} /> Privacy Policy
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link
                to="/terms"
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '25px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                onMouseEnter={(e) => (e.target.style.color = 'rgb(0, 255, 30)')}
                onMouseLeave={(e) => (e.target.style.color = '#fff')}
              >
                <FaFileSignature style={{ marginRight: '10px' }} /> Terms and Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Section 3: Contact Us */}
        <div style={{
          flex: '1 1 30%',
          marginBottom: '20px',
          paddingLeft: '20px',
        }}>
          <h3 style={{ color: '#007BFF', fontSize: '24px', fontWeight: 'bold' }}>Contact Us</h3>
          <div>
            {/* OpenStreetMap Embed for Mumbai */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3585.23130370455!2d73.05167127497606!3d19.02589938216842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c24cce39457b%3A0x8bd69eab297890b0!2sCentre%20for%20Development%20of%20Advanced%20Computing%20(CDAC)!5e1!3m2!1sen!2sin!4v1732627100098!5m2!1sen!2sin"
              width="80%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
          <div style={{ marginTop: '10px' }}>
            <p><strong style={{ fontSize: '30px' }}>Sarvam</strong></p>
            <p style={{ wordBreak: 'break-word', fontSize: '15px', lineHeight: '1.6' }}>
              <FaMapMarkerAlt />
              <a
                href="https://www.google.com/maps?q=Raintree+Marg%2C+Near+Bharati+Vidyapeeth%2C+Opp.+Kharghar+Railway+Station%2C+Sector+7%2C+CBD+Belapur%2C+Navi+Mumbai+-+400+614%2C+Maharashtra%2C+India"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s', marginLeft: '10px' }}
                onMouseEnter={(e) => (e.target.style.color = 'rgb(0, 255, 30)')}
                onMouseLeave={(e) => (e.target.style.color = '#fff')}
              >

                Raintree Marg, Near Bharati Vidyapeeth, Opp. Kharghar Railway Station, <br />
                Sector 7, CBD Belapur, Navi Mumbai - 400 614, Maharashtra, India
              </a>
            </p>


            <p style={{ fontSize: '15px' }} onMouseEnter={(e) => (e.target.style.color = 'rgb(0, 255, 30)')} onMouseLeave={(e) => (e.target.style.color = '#fff')}><FaPhoneAlt style={{ marginRight: '10px' }} />+91-22-27565303</p>
            <p style={{ fontSize: '15px' }}><FaEnvelope style={{ marginRight: '10px' }} /><a
              href="mailto:info@mycompany.com"
              style={{ color: 'white', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.target.style.color = 'rgb(0, 255, 30)')}
              onMouseLeave={(e) => (e.target.style.color = '#fff')}
            >
              info@sarvam.com
            </a></p>
          </div>
        </div>
      </div>

      {/* Copyright Line */}
      <div style={{
        textAlign: 'center',
        marginTop: '10px',
        borderTop: '1px solid #444',
        paddingTop: '10px',
        fontSize: '20px',
        color: '#ccc',
      }}>
        <p>&copy; {new Date().getFullYear()} Website owned & maintained by: Centre for Development of Advanced Computing (C-DAC). All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
