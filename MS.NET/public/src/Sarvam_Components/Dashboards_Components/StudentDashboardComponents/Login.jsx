import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [prn, setPrn] = useState('100000000001');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy login logic
    if (prn) {
      // For now, any PRN and password will succeed
      navigate('/go-to-student-dashboard/student-attendance?prn=100000000001');
    } else {
      alert('Please enter PRN and Password.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Student Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="prn">PRN Number:</label>
          <input
            type="text"
            id="prn"
            value={prn}
            onChange={(e) => setPrn(e.target.value)}
            placeholder="Enter your PRN"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={123}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
