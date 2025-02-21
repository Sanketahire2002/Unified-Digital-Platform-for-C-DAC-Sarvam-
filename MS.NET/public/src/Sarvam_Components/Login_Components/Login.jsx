import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserAlt, FaLock, FaGoogle, FaLinkedin, FaGithub, FaFacebook } from 'react-icons/fa';
import video from './login.mp4';
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [prn, setPrn] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Define navigate here

  const handlePrnChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,12}$/.test(value)) { // Allow only 12 digits
      setPrn(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    // Validate PRN
    // if (prn.length !== 12) {
    //   setError('PRN must be exactly 12 digits.');
    //   setLoading(false);
    //   return;
    // }

    // // Validate password
    // if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(password)) {
    //   setError('Password must be at least 8 characters, with at least one uppercase letter, one lowercase letter, and one number.');
    //   setLoading(false);
    //   return;
    // }
    //http://localhost:8080/api/login

    try {
      const response = await fetch('http://localhost:5000/api/LoginAuth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prn, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || 'Login successful!');
        console.log("printing data: ",data);
        console.log(data.message);
        console.log(data.role);
        const userRole = data.role; // Extract role from backend response
        
        sessionStorage.setItem('prn', prn);
        sessionStorage.setItem('role', userRole);
        sessionStorage.setItem('token', data.token);

        // Redirect based on user role
        if (userRole.toLowerCase() === 'admin') {
          navigate('/go-to-admin-dashboard');
        } else if (userRole.toLowerCase() === 'student') {
          navigate('/go-to-student-dashboard', { state: { prn: data.prn } });
        } else if (userRole.toLowerCase() === 'modulecoordinator') {
          navigate('/go-to-modulecoordinator-dashboard');
        } else if (userRole.toLowerCase() === 'coursecoordinator') {
          navigate('/go-to-coursecoordinator-dashboard');
        } else if (userRole.toLowerCase() === 'instructor') {
          navigate('/go-to-instructor-dashboard');
        } else if (userRole.toLowerCase() === 'tpo') {
          navigate('/go-to-tpo-dashboard');
        } else {
          setError('Unknown user role: ' + userRole);
        }
      } else {
        const errorMsg = await response.text();
        setError(errorMsg || 'Login failed');
      }
    } catch (err) {
      setError('Error: Unable to connect to the server');
    } finally {
      setLoading(false);
    }

    
  };

  return (
    <div className="position-relative" style={{ height: '100vh', overflow: 'hidden' }}>
      <video
        src={video}
        type="video/mp4"
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      />
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
        <div
          className="card shadow-lg p-4"
          style={{
            width: '100%',
            maxWidth: '450px',
            borderRadius: '15px',
            background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
          }}
        >
          <h2 className="text-center mb-4" style={{ fontFamily: 'Arial, sans-serif', color: '#fff' }}>Login</h2>

          {error && <div className="alert alert-danger">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4 position-relative">
              <label htmlFor="prn" className="form-label text-white">PRN (12-digit)</label>
              <div className="input-group">
                <span className="input-group-text"><FaUserAlt /></span>
                <input
                  type="text"
                  id="prn"
                  className="form-control"
                  value={prn}
                  onChange={handlePrnChange}
                  required
                  maxLength="12"
                  placeholder="Enter 12-digit PRN"
                />
              </div>
            </div>

            <div className="mb-4 position-relative">
              <label htmlFor="password" className="form-label text-white">Password</label>
              <div className="input-group">
                <span className="input-group-text"><FaLock /></span>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="text-center mt-4">
              <button
                type="submit"
                className="btn btn-light"
                disabled={loading}
                style={{
                  backgroundColor: '#fff',
                  color: '#2575fc',
                  borderRadius: '30px',
                  padding: '8px 60px',
                  fontSize: '20px',
                  width: 'auto',
                }}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
