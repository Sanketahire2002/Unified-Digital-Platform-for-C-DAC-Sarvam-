// AdminMainDashboard.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import logo from './logo.png'; // Replace with the actual path to your logo
import logo2 from './admin-logo.jpeg'; // Replace with the path to the logo you want before the name
import { FaHome, FaBook, FaClipboard, FaList, FaClipboardList, FaClipboardCheck, FaUserLock, FaRegClipboard, FaFileAlt, FaBell, FaPowerOff, FaChartBar, FaSuitcase, FaUsers, FaUserCircle } from 'react-icons/fa'; // Import necessary icons
import Notifications from './Notifications'; // Import the Notifications component
import './index.css'; // Import the CSS file

import CourseCoordinatorProfile from './CourseCoordinatorProfile';
import CourseCoordinatorDashboard from './CourseCoordinatorDashboard';
import CourseCoordinatorAssignment from './CourseCoordinatorAssignment';
import CourseCoordinatorAttendance from './CourseCoordinatorAttendance';
import CourseCoordinatorFeedback from './CourseCoordinatorFeedback';
import CourseCoordinatorMaterials from './CourseCoordinatorMaterials';
import CourseCoordinatorMeetings from './CourseCoordinatorMeetings';
import CourseCoordinatorPlacements from './CourseCoordinatorPlacements';
import CourseCoordinatorQuiz from './CourseCoordinatorQuiz';
import CourseCoordinatorResults from './CourseCoordinatorResults';
import CourseCoordinatorSecurity from './CourseCoordinatorSecurity';
import CourseCoordinatorStaff from './CourseCoordinatorStaff';
import CourseCoordinatorSyllabus from './CourseCoordinatorSyllabus';
import CourseCoordinatorUsers from './CourseCoordinatorUsers';

const CourseCoordinatorMainDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationSidebarOpen, setNotificationSidebarOpen] = useState(false); // State for notification sidebar
const [prn, setPrn] = useState('');
    const [role, setRole] = useState('');
    useEffect(() => {
        const storedPrn = sessionStorage.getItem('prn');
        const storedRole = sessionStorage.getItem('role');

        if (storedPrn) setPrn(storedPrn);
        if (storedRole) setRole(storedRole);
    }, []);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Do you want to logout?');

    if (confirmLogout) {
      sessionStorage.clear(); // Clear all session data
      window.location.href = '/';
    } else {
      console.log('Logout cancelled');
    }
  };

  const toggleNotificationSidebar = () => {
    setNotificationSidebarOpen(!notificationSidebarOpen); // Toggle notification sidebar visibility
  };

  return (
    <div>
      <header className="bg-dark text-white fixed-top p-3 w-100">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          {/* Logo and Company Name aligned to the left */}
          <div className="d-flex align-items-center hover-target" onClick={toggleSidebar} style={{ cursor: 'pointer' }}>
            <img src={logo} alt="Company Logo" width="40" height="40" className="me-2 rounded-circle" />
            <h3 className="m-0 fw-bold hover-target">सर्वम्</h3>
          </div>

          {/* Name 'Sanket Ahire' in the center, with a logo before the name */}
          <div className="d-flex justify-content-center flex-grow-1 align-items-center">
            {/* <Link to="/go-to-coursecoordinator-dashboard/coursecoordinator-profile" className="d-flex align-items-center text-decoration-none">
              <img src={logo2} alt="Sanket Logo" width="40" height="40" className="me-2 rounded-circle" /> */}
              <h3 className="m-0 fw-bold">{prn}</h3>
            {/* </Link> */}
          </div>

          {/* Bell Icon, Notification Badge, and Logout Button */}
          <div className="d-flex align-items-center" style={{ cursor: 'pointer' }}>
            {/* Bell Icon with Notification Badge */}
            <div className="position-relative me-5 hover-target" onClick={toggleNotificationSidebar}>
              {/* <FaBell size={30} /> */}
              <span className="notification-badge position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger">
                
              </span>
            </div>

            {/* Logout Button with FaPowerOff Icon */}
            <button className="btn btn-outline-light hover-target" onClick={handleLogout}>
              <FaPowerOff size={25} className="me-1" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className={`sidebar bg-dark text-white p-3 vh-100 ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {/* Sidebar Links (Full) */}
        <div className={`sidebar-links ${sidebarOpen ? 'show-links' : ''}`}>
          <h4 className="text-center mb-4">Sidebar</h4>
          <ul className="list-unstyled">
            {/* <li><Link to="/go-to-coursecoordinator-dashboard/dashboard"><FaHome size={30} />{sidebarOpen && <span className="ms-2">Dashboard</span>}</Link></li> */}
            <li><Link to="/go-to-coursecoordinator-dashboard/coursecoordinator-syllabus"><FaBook size={30} />{sidebarOpen && <span className="ms-2">Syllabus</span>}</Link></li>
            <li><Link to="/go-to-coursecoordinator-dashboard/coursecoordinator-attendance"><FaClipboard size={30} />{sidebarOpen && <span className="ms-2">Attendance</span>}</Link></li>
            {/* <li><Link to="/go-to-coursecoordinator-dashboard/coursecoordinator-assignment"><FaClipboardList size={30} />{sidebarOpen && <span className="ms-2">Assignment</span>}</Link></li> */}
            {/* <li><Link to="/go-to-coursecoordinator-dashboard/coursecoordinator-materials"><FaClipboardCheck size={30} />{sidebarOpen && <span className="ms-2">Materials</span>}</Link></li> */}
            <li><Link to="/go-to-coursecoordinator-dashboard/coursecoordinator-quiz"><FaRegClipboard size={30} />{sidebarOpen && <span className="ms-2">Quiz</span>}</Link></li>
            {/* <li><Link to="/go-to-coursecoordinator-dashboard/coursecoordinator-security"><FaUserLock size={30} />{sidebarOpen && <span className="ms-2">Security</span>}</Link></li> */}
            {/* <li><Link to="/go-to-coursecoordinator-dashboard/coursecoordinator-meetings"><FaList size={30} />{sidebarOpen && <span className="ms-2">Meetings</span>}</Link></li> */}
            {/* <li><Link to="/go-to-coursecoordinator-dashboard/coursecoordinator-feedback"><FaFileAlt size={30} />{sidebarOpen && <span className="ms-2">Feedback</span>}</Link></li> */}
            <li><Link to="/go-to-coursecoordinator-dashboard/coursecoordinator-results"><FaChartBar size={30} />{sidebarOpen && <span className="ms-2">Results</span>}</Link></li>
            {/* <li><Link to="/go-to-coursecoordinator-dashboard/coursecoordinator-placements"><FaSuitcase size={30} />{sidebarOpen && <span className="ms-2">Placements</span>}</Link></li> */}
            {/* <li><Link to="/go-to-coursecoordinator-dashboard/coursecoordinator-staff"><FaUsers size={30} />{sidebarOpen && <span className="ms-2">Staff</span>}</Link></li> */}
            {/* <li><Link to="/go-to-coursecoordinator-dashboard/coursecoordinator-users"><FaUserCircle size={30} />{sidebarOpen && <span className="ms-2">Users</span>}</Link></li> */}
          </ul>
        </div>
      </div>

      {/* Notification Sidebar */}
      {notificationSidebarOpen && (
        <div className="notification-sidebar bg-dark text-white p-4 vh-100 position-fixed top-0 end-0" style={{ width: '300px', zIndex: 110 }}>
          <Notifications /> {/* Show Notifications Component */}
          <button
            className="btn btn-outline-light mt-3"
            onClick={toggleNotificationSidebar} // Close the notification sidebar
          >
            Close
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className={`main-content p-4 flex-grow-1 ${sidebarOpen ? 'content-expanded' : 'content-collapsed'}`}>
        {/* Sidebar and other content */}
        <Routes>
        <Route path="/" element={<CourseCoordinatorSyllabus />} />
          <Route path="/coursecoordinator-profile" element={<CourseCoordinatorProfile />} />
          <Route path="/dashboard" element={<CourseCoordinatorDashboard />} />
          <Route path="/coursecoordinator-syllabus" element={<CourseCoordinatorSyllabus />} />
          <Route path="/coursecoordinator-attendance" element={<CourseCoordinatorAttendance />} />
          <Route path="/coursecoordinator-assignment" element={<CourseCoordinatorAssignment />} />
          <Route path="/coursecoordinator-materials" element={<CourseCoordinatorMaterials />} />
          <Route path="/coursecoordinator-quiz" element={<CourseCoordinatorQuiz />} />
          <Route path="/coursecoordinator-security" element={<CourseCoordinatorSecurity />} />
          <Route path="/coursecoordinator-meetings" element={<CourseCoordinatorMeetings />} />
          <Route path="/coursecoordinator-feedback" element={<CourseCoordinatorFeedback />} />
          <Route path="/coursecoordinator-results" element={<CourseCoordinatorResults />} />
          <Route path="/coursecoordinator-placements" element={<CourseCoordinatorPlacements />} />
          <Route path="/coursecoordinator-staff" element={<CourseCoordinatorStaff />} />
          <Route path="/coursecoordinator-users" element={<CourseCoordinatorUsers />} />
          {/* Add other routes */}
        </Routes>
      </div>
    </div>
  );
};

export default CourseCoordinatorMainDashboard;
