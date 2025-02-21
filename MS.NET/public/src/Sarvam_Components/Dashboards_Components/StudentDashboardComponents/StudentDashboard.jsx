  
// AdminDashboard.jsx
import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {

  const [prn, setPrn] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const storedPrn = localStorage.getItem('prn');
    const storedRole = localStorage.getItem('role');

    if (storedPrn) setPrn(storedPrn);
    if (storedRole) setRole(storedRole);
  }, []);
  return (
    <div className="admin-dashboard">
      <h1>Welcome to the Student Dashboard</h1>
      <p>PRN: {prn}</p>
      {/* <p>Role: {role}</p> */}
      <h1>Welcome to the Student Dashboard</h1>
      <h1>Welcome to the Student Dashboard</h1>
      <h1>Welcome to the Student Dashboard</h1>
      <p>This is the main dashboard for the Student panel.</p>
    </div>
  );
};

export default AdminDashboard;
