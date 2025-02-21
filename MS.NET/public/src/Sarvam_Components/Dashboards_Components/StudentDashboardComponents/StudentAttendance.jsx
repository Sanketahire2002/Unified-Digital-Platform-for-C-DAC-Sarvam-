import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaArrowUp, FaArrowDown } from 'react-icons/fa'; // Importing icons

const StudentAttendance = () => {
    const [prn, setPrn] = useState('');
    const [role, setRole] = useState('');
    useEffect(() => {
        const storedPrn = sessionStorage.getItem('prn');
        const storedRole = sessionStorage.getItem('role');

        if (storedPrn) setPrn(storedPrn);
        if (storedRole) setRole(storedRole);
    }, []);

    const location = useLocation();
    //const { prn } = location.state || { prn: 100000000004 };
    const [attendanceData, setAttendanceData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5); // Default page size
    const [totalPages, setTotalPages] = useState(0);
    const [sortColumn, setSortColumn] = useState('date'); // Default column to sort by
    const [sortOrder, setSortOrder] = useState('asc'); // Default sorting order
    const [statusFilter, setStatusFilter] = useState(''); // Filter for status (present/absent)
    const [startDate, setStartDate] = useState(''); // Start date for date range filter
    const [endDate, setEndDate] = useState(''); // End date for date range filter

    useEffect(() => {
        const fetchData = async () => {
            if (prn) {
                try {
                    const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage

                    const response = await fetch('http://localhost:5000/api/masterattendance/get-by-prn', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`, // Add Bearer token to Authorization header
                        },
                        body: JSON.stringify({ prn }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setAttendanceData(data); // Save fetched data to state
                        setTotalPages(Math.ceil(data.length / pageSize)); // Calculate total pages
                    } else {
                        console.error('Failed to fetch data. Status:', response.status);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };


        fetchData();
    }, [prn, pageSize]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePrevious = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const handlePageSizeChange = (e) => {
        setPageSize(parseInt(e.target.value));
        setCurrentPage(1); // Reset to first page when page size changes
    };

    // Sort the data based on the selected column and sort order
    const sortedData = [...attendanceData]
        .filter((record) => {
            // Filter by status if a filter is applied
            if (statusFilter === 'present') {
                return record.status === true;
            } else if (statusFilter === 'absent') {
                return record.status === false;
            }

            // Filter by date range if start and end dates are set
            if (startDate && endDate) {
                const recordDate = new Date(record.date);
                const start = new Date(startDate);
                const end = new Date(endDate);
                return recordDate >= start && recordDate <= end;
            }

            return true; // No filter applied, return all records
        })
        .sort((a, b) => {
            if (sortColumn === 'date') {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
            } else if (sortColumn === 'status') {
                return sortOrder === 'asc' ? a.status - b.status : b.status - a.status;
            }
            return 0;
        });

    // Pagination logic
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, sortedData.length);
    const currentRecords = sortedData.slice(startIndex, endIndex);

    // Calculate total days, present, absent, and percentage
    const totalDays = sortedData.length;
    const presentCount = sortedData.filter(record => record.status === true).length;
    const absentCount = totalDays - presentCount;
    const percentage = totalDays > 0 ? ((presentCount / totalDays) * 100).toFixed(2) : 0;

    // Handle sorting
    const handleSort = (column) => {
        const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortOrder(newSortOrder);
    };

    // Handle filter change
    const handleFilterChange = (e) => {
        setStatusFilter(e.target.value);
        setCurrentPage(1); // Reset to first page when filter changes
    };

    // Clear filter
    const clearFilter = () => {
        setStatusFilter('');
        setStartDate('');
        setEndDate('');
    };
    // Clear all filters
    const clearAllFilters = () => {
        setStatusFilter('');
        setStartDate('');
        setEndDate('');
        setCurrentPage(1); // Reset to first page when filters are cleared
    };

    const [showForm, setShowForm] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isConfirmed = window.confirm('Are you sure you want to submit this leave request?');

        if (!isConfirmed) {
            return; // If not confirmed, exit the function and do not submit
        }

        const leaveRequest = {
            prn,
            fromDate,
            endDate: toDate,
            subject,
            description,
        };

        try {
            const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage

            const response = await fetch('http://localhost:5000/api/MasterLeaveRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Add Bearer token to Authorization header
                },
                body: JSON.stringify(leaveRequest),
            });

            if (response.ok) {
                alert('Leave request submitted successfully');
                setShowForm(false); // Close the form
            } else {
                alert('Failed to submit leave request');
            }
        } catch (error) {
            console.error('Error:', error); // Handle any errors
        }
    };


    const today = new Date();
    const minFromDate = new Date(today);
    minFromDate.setDate(today.getDate() + 1); // Tomorrow

    const maxFromDate = new Date(today);
    maxFromDate.setMonth(today.getMonth() + 1); // One month from today

    const minToDate = fromDate ? new Date(fromDate) : minFromDate;
    const maxToDate = fromDate ? new Date(fromDate) : maxFromDate;
    maxToDate.setMonth(minToDate.getMonth() + 1); // One month after fromDate

    const handleFromDateChange = (e) => {
        setFromDate(e.target.value);
        if (toDate && new Date(e.target.value) > new Date(toDate)) {
            setToDate('');
        }
    };




    const [showRequestPopup, setShowRequestPopup] = useState(false);
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [activeTab, setActiveTab] = useState('previousRequests'); // To manage active tab



    const handleViewRequests = async () => {
        try {
            const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage

            const response = await fetch('http://localhost:5000/api/MasterLeaveRequest/GetByPrn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Add Bearer token to Authorization header
                },
                body: JSON.stringify({ prn }),
            });

            if (response.ok) {
                const data = await response.json();
                setLeaveRequests(data);
                setShowRequestPopup(true);
            } else {
                console.error('Failed to fetch leave requests. Status:', response.status);
                alert('Data Not Found');
            }
        } catch (error) {
            console.error('Error fetching leave requests:', error); // Handle any errors
        }
    };


    const closePopup = () => {
        setShowRequestPopup(false);
    };

    // Separate the requests into two categories: accepted/declined and pending
    const acceptedDeclinedRequests = leaveRequests.filter(request =>
        request.status === 'Accepted' || request.status === 'Declined'
    );
    const pendingRequests = leaveRequests.filter(request => request.status === 'Pending');

    const handleWithdraw = async (requestId) => {
        // Ask for confirmation before withdrawing
        const isConfirmed = window.confirm('Are you sure you want to withdraw this request?');

        if (isConfirmed) {
            try {
                const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage

                const response = await fetch('http://localhost:5000/api/MasterLeaveRequest/Delete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Add Bearer token to Authorization header
                    },
                    body: JSON.stringify({ requestId }), // Sending requestId in the request body
                });

                if (response.ok) {
                    console.log(`Request with ID ${requestId} has been withdrawn.`);
                    setShowRequestPopup(false); // Close the request popup after withdrawal
                } else {
                    console.error('Failed to withdraw the request');
                }
            } catch (error) {
                console.error('Error during withdrawal:', error);
            }
        }
    };


    const fetchPendingRequests = async () => {
        try {
            const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage

            const response = await fetch('http://localhost:5000/api/MasterLeaveRequest/GetByPrn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Add Bearer token to Authorization header
                },
                body: JSON.stringify({ prn: userPrn }),  // Pass the PRN if needed
            });

            if (response.ok) {
                const data = await response.json();
                // Assuming you have a state variable for pendingRequests
                setPendingRequests(data.filter(request => request.status === 'Pending'));
            } else {
                console.error('Failed to fetch pending requests');
            }
        } catch (error) {
            console.error('Error while fetching pending requests:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>

            <>
                {showForm && (
                    <div className="modal" style={{ display: 'block', position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog" style={{ maxWidth: '500px', margin: '100px auto', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
                            <div className="modal-content">
                                <div className="modal-header d-flex justify-content-between">
                                    <h5 className="modal-title">Leave Request</h5>
                                    <button type="button" className="close" onClick={() => setShowForm(false)}>&times;</button>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="modal-body">
                                        <input type="hidden" value={prn} name="prn" />

                                        <div className="mb-3">
                                            <label htmlFor="fromDate" className="form-label"><strong>From Date:</strong></label>
                                            <input
                                                type="date"
                                                id="fromDate"
                                                className="form-control"
                                                value={fromDate}
                                                onChange={handleFromDateChange}
                                                min={minFromDate.toISOString().split('T')[0]} // Tomorrow
                                                max={maxFromDate.toISOString().split('T')[0]} // One month from today
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="toDate" className="form-label"><strong>To Date:</strong></label>
                                            <input
                                                type="date"
                                                id="toDate"
                                                className="form-control"
                                                value={toDate}
                                                onChange={(e) => setToDate(e.target.value)}
                                                min={minToDate.toISOString().split('T')[0]} // From start date
                                                max={maxToDate.toISOString().split('T')[0]} // One month after start date
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="subject" className="form-label"><strong>Subject:</strong></label>
                                            <textarea
                                                id="subject"
                                                className="form-control"
                                                value={subject}
                                                onChange={(e) => setSubject(e.target.value.slice(0, 255))} // Limit to 255 characters
                                                maxLength="255"
                                                required
                                                style={{ width: '100%', minHeight: '40px' }} // Adjust width and height
                                            />


                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label"><strong>Description:</strong></label>
                                            <textarea
                                                id="description"
                                                className="form-control"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value.slice(0, 255))} // Limit to 255 characters
                                                maxLength="255"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Close</button>
                                        <button type="submit" className="btn btn-primary">Apply for Leave</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </>

            <>
                {/* Popup for leave requests */}
                {showRequestPopup && (
                    <div className="position-fixed top-50 start-0 end-0" style={{ zIndex: 9999 }}>
                        <div className="popup-content position-absolute top-50 start-50 translate-middle bg-white p-4 rounded shadow-lg w-75">
                            <button onClick={closePopup} className="btn-close position-absolute top-0 end-0 m-2"></button>

                            {/* Tabs for Previous and Pending Requests */}
                            <ul className="nav nav-tabs" id="leaveRequestsTabs" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button
                                        className={`nav-link ${activeTab === 'previousRequests' ? 'active' : ''}`}
                                        id="previousRequests-tab"
                                        onClick={() => setActiveTab('previousRequests')}
                                        role="tab"
                                    >
                                        Previous Requests
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className={`nav-link ${activeTab === 'pendingRequests' ? 'active' : ''}`}
                                        id="pendingRequests-tab"
                                        onClick={() => setActiveTab('pendingRequests')}
                                        role="tab"
                                    >
                                        Pending Requests
                                    </button>
                                </li>
                            </ul>

                            <div className="tab-content mt-3">
                                {/* Previous Requests Tab */}
                                {activeTab === 'previousRequests' && (
                                    <div className="tab-pane fade show active" role="tabpanel" aria-labelledby="previousRequests-tab">
                                        <h4>Previous Requests</h4>
                                        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                            <table className="table table-striped table-bordered" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                                                <thead className="table-dark">
                                                    <tr>
                                                        <th style={{ width: '15%' }}>From Date</th>
                                                        <th style={{ width: '15%' }}>To Date</th>
                                                        <th style={{ width: '20%', borderRight: '1px solid #dee2e6' }}>Subject</th>
                                                        <th style={{ width: '25%' }}>Description</th>
                                                        <th style={{ width: '15%' }}>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {acceptedDeclinedRequests.map((request) => (
                                                        <tr key={request.requestId}>
                                                            <td style={{ wordWrap: 'break-word' }}>
                                                                {new Date(request.fromDate).getDate().toString().padStart(2, '0')}-{(new Date(request.fromDate).getMonth() + 1).toString().padStart(2, '0')}-{new Date(request.fromDate).getFullYear()}
                                                            </td>
                                                            <td style={{ wordWrap: 'break-word' }}>
                                                                {new Date(request.endDate).getDate().toString().padStart(2, '0')}-{(new Date(request.endDate).getMonth() + 1).toString().padStart(2, '0')}-{new Date(request.endDate).getFullYear()}
                                                            </td>
                                                            <td style={{ width: '20%', textAlign: 'justify', borderRight: '1px solid #dee2e6' }}>{request.subject}</td>
                                                            <td style={{ wordWrap: 'break-word' }}>{request.description}</td>
                                                            <td>
                                                                <span className={`badge ${request.status === 'Accepted' ? 'bg-success' : 'bg-danger'}`}>
                                                                    {request.status}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* Pending Requests Tab */}
                                {activeTab === 'pendingRequests' && (
                                    <div className="tab-pane fade show active" role="tabpanel" aria-labelledby="pendingRequests-tab">
                                        <h4>Pending Requests</h4>
                                        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                            <table className="table table-striped table-bordered" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                                                <thead className="table-dark">
                                                    <tr>
                                                        <th style={{ width: '15%' }}>From Date</th>
                                                        <th style={{ width: '15%' }}>To Date</th>
                                                        <th style={{ width: '20%', borderRight: '1px solid #dee2e6' }}>Subject</th>
                                                        <th style={{ width: '25%' }}>Description</th>
                                                        <th style={{ width: '15%' }}>Status</th>
                                                        <th style={{ width: '10%' }}>Action</th> {/* Added Action column */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {pendingRequests.map((request) => (
                                                        <tr key={request.requestId}>
                                                            <td>{new Date(request.fromDate).getDate().toString().padStart(2, '0')}-{(new Date(request.fromDate).getMonth() + 1).toString().padStart(2, '0')}-{new Date(request.fromDate).getFullYear()}</td>
                                                            <td>{new Date(request.endDate).getDate().toString().padStart(2, '0')}-{(new Date(request.endDate).getMonth() + 1).toString().padStart(2, '0')}-{new Date(request.endDate).getFullYear()}</td>
                                                            <td style={{ width: '20%', textAlign: 'justify', borderRight: '1px solid #dee2e6' }}>{request.subject}</td>
                                                            <td>{request.description}</td>
                                                            <td>
                                                                <span className="badge bg-warning">{request.status}</span>
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-danger btn-sm"
                                                                    onClick={() => handleWithdraw(request.requestId)}  // Event handler for the delete action
                                                                >
                                                                    Withdraw
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

            </>

            {prn ? (
                <>
                    <div className="container mt-4">
                        <h2
                            style={{
                                marginTop: "80px",
                                marginBottom: "40px",
                                color: "#2c3e50", // Dark color
                                fontFamily: "'Montserrat', sans-serif", // Modern font
                                textAlign: "center", // Center the text
                                fontWeight: "bold",
                                fontSize: "3rem", // Larger font size
                                textTransform: "uppercase",
                                textShadow: "5px 5px 10px rgba(0, 0, 0, 0.2), -5px -5px 10px rgba(255, 255, 255, 0.3)", // 3D text shadow
                                letterSpacing: "3px", // Add some space between letters
                            }}
                        >
                            Attendance Analysis</h2>
                        <div className="row">
                            {/* Total Days Card */}
                            <div className="col-md-3">
                                <div className="card shadow border-0 text-center">
                                    <div className="card-body bg-primary text-white rounded">
                                        <h5 className="card-title">Total Days</h5>
                                        <p className="card-text display-6 fw-bold">{totalDays}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Present Card */}
                            <div className="col-md-3">
                                <div className="card shadow border-0 text-center">
                                    <div className="card-body bg-success text-white rounded">
                                        <h5 className="card-title">Present</h5>
                                        <p className="card-text display-6 fw-bold">{presentCount}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Absent Card */}
                            <div className="col-md-3">
                                <div className="card shadow border-0 text-center">
                                    <div className="card-body bg-danger text-white rounded">
                                        <h5 className="card-title">Absent</h5>
                                        <p className="card-text display-6 fw-bold">{absentCount}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Attendance Percentage Card */}
                            <div className="col-md-3">
                                <div className="card shadow border-0 text-center">
                                    <div className="card-body bg-warning text-dark rounded">
                                        <h5 className="card-title">Percentage</h5>
                                        <p className="card-text display-6 fw-bold">{percentage}%</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Personalized Message */}
                        <div className="mt-4 text-center">
                            {percentage === 100 ? (
                                <div className="alert alert-success" role="alert">
                                    🌟 Outstanding! Your attendance is a perfect 100%! You're an inspiration to everyone! Keep shining! 🌟
                                </div>
                            ) : percentage >= 75 ? (
                                <div className="alert alert-success" role="alert">
                                    Excellent! Your attendance is {percentage}%. Keep up the great work! 🎉
                                </div>
                            ) : percentage >= 50 ? (
                                <div className="alert alert-warning" role="alert">
                                    Good effort! Your attendance is {percentage}%, but try to attend more classes to improve! 💪
                                </div>
                            ) : (
                                <div className="alert alert-danger" role="alert">
                                    Warning! Your attendance is only {percentage}%. Please focus on attending more classes. ⚠️
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="d-flex justify-content-center mt-3">
                        <button className="btn btn-info mx-2" onClick={() => setShowForm(true)}>Request for Leave</button>
                        <button onClick={handleViewRequests} className="btn btn-primary mx-2">View Leave Requests History</button>
                    </div>





                    <div className="my-4 d-flex justify-content-center mt-5 mb-4">
                        <div className="d-flex align-items-center flex-wrap gap-3 justify-content-center">
                            {/* Filter by Status */}
                            <div className="d-flex align-items-center">
                                <label htmlFor="statusFilter" className="me-2"><strong>Filter by Status:</strong></label>
                                <select
                                    id="statusFilter"
                                    value={statusFilter}
                                    onChange={handleFilterChange}
                                    className="form-select w-auto"
                                >
                                    <option value="">All</option>
                                    <option value="present">Present</option>
                                    <option value="absent">Absent</option>
                                </select>
                            </div>

                            {/* Start Date */}
                            <div className="d-flex align-items-center">
                                <label htmlFor="startDate" className="me-2"><strong>Start Date:</strong></label>
                                <input
                                    id="startDate"
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => {
                                        setStartDate(e.target.value);
                                        if (endDate && new Date(e.target.value) > new Date(endDate)) {
                                            setEndDate('');
                                        }
                                    }}
                                    className="form-control w-auto"
                                />
                            </div>

                            {/* End Date */}
                            <div className="d-flex align-items-center">
                                <label htmlFor="endDate" className="me-2"><strong>End Date:</strong></label>
                                <input
                                    id="endDate"
                                    type="date"
                                    value={endDate}
                                    min={startDate || undefined}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="form-control w-auto"
                                />
                            </div>

                            {/* Clear All Filters Button */}
                            <button
                                onClick={clearAllFilters}
                                className="btn btn-danger ms-3"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    </div>


                    {attendanceData.length > 0 ? (
                        <>
                            <table style={{ width: '50%', marginTop: '20px', textAlign: 'center', borderRadius: '8px', overflow: 'hidden', margin: '0 auto' }}>
                                <thead style={{ backgroundColor: 'black', color: 'white' }}>
                                    <tr>
                                        <th style={{ padding: '10px', width: '50px', textAlign: 'center' }}>Sr. No.</th>
                                        <th
                                            style={{ padding: '10px', width: '200px', textAlign: 'center', cursor: 'pointer' }}
                                            onClick={() => handleSort('date')}
                                        >
                                            Date
                                            {sortColumn === 'date' && (sortOrder === 'asc' ? <FaArrowUp /> : <FaArrowDown />)}
                                        </th>
                                        <th
                                            style={{ padding: '10px', width: '150px', textAlign: 'center', cursor: 'pointer' }}
                                            onClick={() => handleSort('status')}
                                        >
                                            Status
                                            {sortColumn === 'status' && (sortOrder === 'asc' ? <FaArrowUp /> : <FaArrowDown />)}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentRecords.map((record, index) => (
                                        <tr key={record.attendanceId} style={{ backgroundColor: record.status ? '#e6f7e6' : '#f7e6e6' }}>
                                            <td style={{ padding: '10px', width: '50px', textAlign: 'center' }}>
                                                {startIndex + index + 1}
                                            </td>
                                            <td style={{ padding: '10px', width: '200px', textAlign: 'center' }}>{record.date}</td>
                                            <td style={{ padding: '10px', width: '150px', textAlign: 'center' }}>
                                                {record.status ? (
                                                    <FaCheckCircle style={{ color: 'green', fontSize: '20px' }} />
                                                ) : (
                                                    <FaTimesCircle style={{ color: 'red', fontSize: '20px' }} />
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Pagination Controls */}
                            <div className='mb-5' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
                                <div style={{ marginRight: '10px' }}>
                                    <input
                                        type="number"
                                        value={pageSize}
                                        onChange={handlePageSizeChange}
                                        min="1"
                                        max="100"
                                        step="1"
                                        style={{ padding: '5px', marginRight: '10px', width: '60px' }}
                                        onInput={(e) => {
                                            if (e.target.value < 1) {
                                                e.target.value = 1;  // Ensure the value is not less than 1
                                            }
                                            if (e.target.value > 100) {
                                                e.target.value = 100;  // Ensure the value is not greater than 50
                                            }
                                        }}
                                    />
                                    Rows per page
                                </div>

                                <button
                                    className="btn btn-primary"
                                    onClick={handlePrevious}
                                    disabled={currentPage === 1}
                                    style={{ marginRight: '10px' }}
                                >
                                    Previous
                                </button>

                                <div style={{ display: 'inline-block', overflowX: 'auto', maxWidth: '300px', whiteSpace: 'nowrap' }}>
                                    {[...Array(totalPages)].map((_, index) => {
                                        const page = index + 1;
                                        return (
                                            <button
                                                key={page}
                                                onClick={() => handlePageChange(page)}
                                                style={{
                                                    padding: '5px 10px',
                                                    margin: '0 5px',
                                                    backgroundColor: currentPage === page ? '#007bff' : '#f0f0f0',
                                                    color: currentPage === page ? 'white' : 'black',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '4px',
                                                }}
                                            >
                                                {page}
                                            </button>
                                        );
                                    })}
                                </div>

                                <button
                                    className="btn btn-primary"
                                    onClick={handleNext}
                                    disabled={currentPage === totalPages}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    ) : (
                        <p>No attendance data available.</p>
                    )}
                </>
            ) : (
                <p style={{ fontSize: '24px' }}>No PRN availableNo PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available.No PRN available..</p>

            )}
        </div>
    );
};

export default StudentAttendance;
