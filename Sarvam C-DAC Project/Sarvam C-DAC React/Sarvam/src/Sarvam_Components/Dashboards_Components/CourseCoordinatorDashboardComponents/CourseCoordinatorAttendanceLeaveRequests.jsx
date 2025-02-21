import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CourseCoordinatorAttendanceLeaveRequests = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [students, setStudents] = useState([]);
    const [showPending, setShowPending] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Retrieve the token from sessionStorage
                const token = sessionStorage.getItem('token');

                // Fetch both the leave requests and students data with Bearer token
                const [leaveRequestsResponse, studentsResponse] = await Promise.all([
                    fetch('http://localhost:8080/api/MasterLeaveRequest', {
                        headers: {
                            'Authorization': `Bearer ${token}`, // Add Bearer token to Authorization header
                        },
                    }),
                    fetch('http://localhost:8080/api/MasterProfiles/students', {
                        headers: {
                            'Authorization': `Bearer ${token}`, // Add Bearer token to Authorization header
                        },
                    })
                ]);

                // Convert both responses to JSON
                const leaveRequestsData = await leaveRequestsResponse.json();
                const studentsData = await studentsResponse.json();

                // Set the state with the fetched data
                setLeaveRequests(leaveRequestsData);
                setStudents(studentsData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // useEffect to log state updates
    useEffect(() => {
        console.log("Updated Leave Requests State:", leaveRequests);
    }, [leaveRequests]);

    useEffect(() => {
        console.log("Updated Students State:", students);
    }, [students]);

    // Filter data by status
    const pendingRequests = leaveRequests.filter(request => request.status === 'Pending');
    const acceptedOrDeclinedRequests = leaveRequests.filter(request =>
        request.status === 'Accepted' || request.status === 'Declined'
    );

    // Get the student info by matching PRN
    const getStudentName = (prn) => {
        const student = students.find(student => student.prn === prn);
        return student ? `${student.firstName} ${student.lastName}` : 'Unknown';
    };

    // Handle Accept and Decline actions
    const handleAction = async (requestId, action) => {
        const confirmed = window.confirm(`Are you sure you want to ${action} this request?`);

        if (confirmed) {
            try {
                // Retrieve the token from sessionStorage
                const token = sessionStorage.getItem('token');

                // Make the POST request to update the status with Bearer token
                const response = await fetch(`http://localhost:8080/api/MasterLeaveRequest/${action}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Add Bearer token to Authorization header
                    },
                    body: JSON.stringify({ requestId }),
                });

                if (response.ok) {
                    alert(`${action}ed successfully!`);

                    // Re-fetch the leave requests after successful status update
                    const fetchData = await fetch('http://localhost:8080/api/MasterLeaveRequest', {
                        headers: {
                            'Authorization': `Bearer ${token}`, // Ensure Bearer token is included in the re-fetch
                        },
                    });
                    const updatedData = await fetchData.json();
                    setLeaveRequests(updatedData); // Update state with the new list of leave requests
                } else {
                    alert('Error while updating the request status.');
                }
            } catch (error) {
                console.error(`Error while ${action}ing the request:`, error);
                alert(`Error while ${action}ing the request.`);
            }
        }
    };

    return (
        <div className="container mt-5">

            {/* Toggle buttons to switch between sections */}
            <div className="mb-4  d-flex justify-content-center">
                <button
                    className={`btn ${showPending ? 'btn-primary' : 'btn-secondary'} me-2`}
                    onClick={() => setShowPending(true)}
                >
                    Pending Requests
                </button>
                <button
                    className={`btn ${showPending ? 'btn-secondary' : 'btn-primary'}`}
                    onClick={() => setShowPending(false)}
                >
                    Accepted/Declined Requests
                </button>
            </div>

            {/* Show Pending Requests */}
            {showPending ? (
                <div>
                    <table
                        className="table table-striped table-bordered table-hover"
                        style={{
                            borderRadius: '10px',
                            overflow: 'hidden',
                            maxHeight: '500px',
                            display: 'block',
                            overflowY: 'auto'
                        }}
                    >
                        <thead className="table-dark">
                            <tr>
                                <th style={{ width: '6%', borderRight: '1px solid #dee2e6' }}>Sr. No.</th>
                                <th style={{ width: '12%', textAlign: 'center', borderRight: '1px solid #dee2e6' }}>PRN</th>
                                <th style={{ width: '10%', borderRight: '1px solid #dee2e6' }}>From Date</th>
                                <th style={{ width: '10%', borderRight: '1px solid #dee2e6' }}>End Date</th>
                                <th style={{ width: '20%', borderRight: '1px solid #dee2e6' }}>Subject</th>
                                <th style={{ width: '20%', borderRight: '1px solid #dee2e6' }}>Description</th>
                                <th style={{ width: '5%', borderRight: '1px solid #dee2e6', textAlign: 'center' }}>Status</th>
                                <th style={{ width: '10%', textAlign: 'center' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingRequests.map((request, index) => (
                                <tr key={request.requestId}>
                                    <td style={{ borderRight: '1px solid #dee2e6' }}>{index + 1}</td> {/* This shows the serial number */}
                                    <td style={{ borderRight: '1px solid #dee2e6' }}>
                                        <div className="d-flex flex-column align-items-center">
                                            <span className="fw-bold mb-4">{request.masterProfile.prn}</span> {/* PRN */}
                                            <span className="fw-bold">{request.masterProfile.firstName}</span> {/* First Name */}
                                            <span className="fw-bold">{request.masterProfile.lastName}</span> {/* Last Name */}
                                        </div>
                                    </td>


                                    <td style={{ borderRight: '1px solid #dee2e6' }}>{new Date(request.fromDate).toLocaleDateString('en-GB').replace(/\//g, '-')}</td>
                                    <td style={{ borderRight: '1px solid #dee2e6' }}>{new Date(request.endDate).toLocaleDateString('en-GB').replace(/\//g, '-')}</td>
                                    <td style={{ width: '20%', textAlign: 'justify', borderRight: '1px solid #dee2e6' }}>{request.subject}</td>
                                    <td style={{ width: '20%', textAlign: 'justify', borderRight: '1px solid #dee2e6' }}>{request.description}</td>
                                    <td style={{ borderRight: '1px solid #dee2e6' }}>
                                        <span className="badge bg-warning text-dark">{request.status}</span>
                                    </td>
                                    <td>
                                        <div className="d-flex flex-column">

                                            <button
                                                className="btn mb-2 rounded-pill shadow-lg text-white bg-primary bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 hover:bg-primary"
                                                onClick={() => handleAction(request.requestId, 'Accept')}
                                            >
                                                <i className="bi bi-star me-2"></i>Accept
                                            </button>



                                            <button
                                                className="btn btn-danger mb-2 rounded-pill shadow-lg text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-l hover:from-red-700 hover:via-red-600 hover:to-red-500"
                                                onClick={() => handleAction(request.requestId, 'Decline')}
                                            >
                                                <i className="bi bi-x-circle me-2"></i>Decline
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>
            ) : (
                <div>
                    <table
                        className="table table-striped table-bordered table-hover"
                        style={{
                            borderRadius: '10px',
                            overflow: 'hidden',
                            maxHeight: '500px',
                            display: 'block',
                            overflowY: 'auto'
                        }}
                    >
                        <thead className="table-dark">
                            <tr>
                                <th style={{ width: '5%', borderRight: '1px solid #dee2e6' }}>Sr. No.</th>
                                <th style={{ width: '5%', textAlign: 'center', borderRight: '1px solid #dee2e6' }}>PRN</th>
                                <th style={{ width: '8%', borderRight: '1px solid #dee2e6' }}>From Date</th>
                                <th style={{ width: '8%', borderRight: '1px solid #dee2e6' }}>End Date</th>
                                <th style={{ width: '20%', borderRight: '1px solid #dee2e6' }}>Subject</th>
                                <th style={{ width: '20%', borderRight: '1px solid #dee2e6' }}>Description</th>
                                <th style={{ width: '4%', borderRight: '1px solid #dee2e6', textAlign: 'center' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {acceptedOrDeclinedRequests.map((request, index) => (
                                <tr key={request.requestId}>
                                    <td>{index + 1}</td> {/* Serial Number */}
                                    <td style={{ borderRight: '1px solid #dee2e6' }}>
                                        <div className="d-flex flex-column align-items-center">
                                            <span className="fw-bold mb-4">{request.masterProfile.prn}</span> {/* PRN */}
                                            <span className="fw-bold">{getStudentName(request.masterProfile.prn).split(' ')[0]}</span> {/* First Name */}
                                            <span className="fw-bold">{getStudentName(request.masterProfile.prn).split(' ')[1]}</span> {/* Last Name */}
                                        </div>
                                    </td>
                                    <td style={{ borderRight: '1px solid #dee2e6' }}>{new Date(request.fromDate).toLocaleDateString('en-GB').replace(/\//g, '-')}</td>
                                    <td style={{ borderRight: '1px solid #dee2e6' }}>{new Date(request.endDate).toLocaleDateString('en-GB').replace(/\//g, '-')}</td>
                                    <td>{request.subject}</td>
                                    <td>{request.description}</td>
                                    <td>
                                        <span
                                            className={`badge ${request.status === 'Accepted' ? 'bg-success' : 'bg-danger'}`}
                                        >
                                            {request.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            )}
        </div>
    );
};

export default CourseCoordinatorAttendanceLeaveRequests;
