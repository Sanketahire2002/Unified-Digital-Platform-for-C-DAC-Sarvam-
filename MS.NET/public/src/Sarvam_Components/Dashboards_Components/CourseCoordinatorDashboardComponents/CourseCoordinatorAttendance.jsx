import React, { useState } from 'react';
import AttendanceTable from './CourseCoordinatorAttendanceAnalysis';
import StudentAttendance from './CourseCoordinatorAttendanceLeaveRequests';
import 'bootstrap/dist/css/bootstrap.min.css';

const CourseCoordinatorAttendance = () => {
  const [selectedTab, setSelectedTab] = useState('attendanceAnalysis');

  // Handle tab selection
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg rounded">
        <div className="card-header text-center">
        <h1 className="mb-0" style={{ marginTop: '30px' }}>Attendance</h1>
        </div>

        <div className="card-body">
          {/* Tab Buttons */}
          <ul className="nav nav-pills mb-4 d-flex justify-content-center">
            <li className="nav-item me-3">
              <a
                className={`nav-link ${selectedTab === 'attendanceAnalysis' ? 'active' : ''}`}
                onClick={() => handleTabChange('attendanceAnalysis')}
                style={{
                  cursor: 'pointer',
                  backgroundColor: selectedTab === 'attendanceAnalysis' ? '' : 'gray',
                  color: 'white',
                }}
              >
                <strong>Student Attendance Analysis</strong>
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${selectedTab === 'markAttendance' ? 'active' : ''}`}
                onClick={() => handleTabChange('markAttendance')}
                style={{
                  cursor: 'pointer',
                  backgroundColor: selectedTab === 'markAttendance' ? '' : 'gray',
                  color: 'white',
                }}
              >
                <strong>Leave Requests</strong>
              </a>
            </li>
          </ul>

          {/* Tab Content */}
          {selectedTab === 'attendanceAnalysis' && <AttendanceTable />}
          {selectedTab === 'markAttendance' && <StudentAttendance />}
        </div>


      </div>
    </div>
  );
};

export default CourseCoordinatorAttendance;
