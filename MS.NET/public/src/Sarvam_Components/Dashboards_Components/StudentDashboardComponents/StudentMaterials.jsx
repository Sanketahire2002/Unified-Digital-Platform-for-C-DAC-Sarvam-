// AdminStudyMaterials.jsx
import React, { useEffect, useState } from 'react';

const AdminMaterials = () => {
   const [prn, setPrn] = useState('');
    const [role, setRole] = useState('');
  
    useEffect(() => {
      const storedPrn = localStorage.getItem('prn');
      const storedRole = localStorage.getItem('role');
  
      if (storedPrn) setPrn(storedPrn);
      if (storedRole) setRole(storedRole);
    }, []);
  
  return (
    <div className="admin-study-materials">
      
      <h1>Study Materials</h1>
      <p>PRN: {prn}</p>
      <p>This section is for uploading study materials.</p>
    </div>
  );
};

export default AdminMaterials;
