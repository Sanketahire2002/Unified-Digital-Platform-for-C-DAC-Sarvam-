import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import chroma from 'chroma-js';

const ModuleCoordinatorAttendanceMarkAttendance = () => {
    const [students, setStudents] = useState([]);
    const [date, setDate] = useState('');
    const [attendanceData, setAttendanceData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Sorting state
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

    // Search state
    const [searchTerm, setSearchTerm] = useState('');


    // Calculate the min and max date range
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    const formattedToday = today.toISOString().split('T')[0];
    const formattedSevenDaysAgo = sevenDaysAgo.toISOString().split('T')[0];

    // Fetch students from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage

                const response = await axios.get('http://localhost:8080/api/MasterProfiles/students', {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Add Bearer token to Authorization header
                    },
                });

                setStudents(response.data);
                setAttendanceData(response.data.map(student => ({
                    PRN: student.prn,
                    status: true,
                    date: ''
                })));
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };

        fetchData();
    }, []);


    const handleCheckboxChange = (prn) => {
        setAttendanceData(prevData =>
            prevData.map(item =>
                item.PRN === prn ? { ...item, status: !item.status } : item
            )
        );
    };

    const handleSubmit = () => {
        if (!date) {
            alert('Please select a date.');
            return;
        }

        setIsModalVisible(true); // Show modal on submit click
    };

    const confirmSubmit = () => {
        // Convert date to UTC (optional)
        const utcDate = new Date(date);
        utcDate.setMinutes(utcDate.getMinutes() - utcDate.getTimezoneOffset()); // Adjust for timezone offset

        const attendanceToSubmit = attendanceData.map(item => ({
            prn: item.PRN,
            date: utcDate.toISOString().split('T')[0],  // Only send date in YYYY-MM-DD format
            status: item.status
        }));

        console.log('Attendance to submit:', attendanceToSubmit);

        // Send the POST request without Authorization header
        axios.post('http://localhost:8080/api/MasterAttendance', attendanceToSubmit)
            .then(() => {
                window.location.reload();
                alert('Attendance marked successfully');
                setIsFormVisible(false);
                setIsModalVisible(false); // Close modal after submission
            })
            .catch(error => {
                console.error('Error submitting attendance:', error);
            });
    };



    const cancelSubmit = () => {
        setIsModalVisible(false); // Close modal without action
    };


    const handleCancel = () => {
        const isConfirmed = window.confirm('Are you sure you want to cancel?');
        if (isConfirmed) {
            //setIsFormVisible(false);
            window.location.reload();
        }
    };

    // Sorting logic
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sortedData = [...students].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        setStudents(sortedData);
    };

    const getSortArrow = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? '↑' : '↓';
        }
        return '';
    };

    // Calculate attendance data for visualization
    const totalStudents = students.length;
    const totalPresent = attendanceData.filter(item => item.status).length;
    const totalAbsent = totalStudents - totalPresent;
    const attendancePercentage = totalStudents > 0 ? (totalPresent / totalStudents) * 100 : 0;




    const colors = chroma.scale(['#34D399', '#EF4444']).colors(2); // Green to Red gradient

    const pieChartData = [
        { name: 'Present', value: totalPresent, fill: colors[0] },
        { name: 'Absent', value: totalAbsent, fill: colors[1] }
    ];





    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Filter students based on the search term
    const filteredStudents = students.filter(student =>
        student.prn.toString().includes(searchTerm) ||
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredStudents.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const formatDateWithDay = (date) => {
        if (!date) return '';
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className="container mt-5">

            <div className="card p-4 shadow-lg">
                <h2 className="text-center mb-4 text-primary">Mark Attendance</h2>
                <div className="row">
                    <div className="col-md-7">
                        <div className="d-flex">
                            <div className="d-flex align-items-center mb-4">
                                <label htmlFor="attendanceDate" className="form-label text-primary mb-0 fw-bold fs-5 me-3">
                                    Select Date:
                                </label>
                                <DatePicker
                                    id="attendanceDate"
                                    selected={date}
                                    onChange={(date) => setDate(date)}
                                    //minDate={sevenDaysAgo}
                                    //maxDate={today}
                                    className="form-control form-control-lg shadow-sm rounded-3 border-2 border-primary"
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText="Select a date"
                                />
                                <span className="ms-3 text-alert-dark fw-bold">
                                    {date ? `${formatDateWithDay(date)}` : 'No date selected'}
                                </span>
                            </div>


                        </div>
                        <div className="card" style={{ maxWidth: '600px' }}>
                            <div className="card-body fw-bold">
                                <h5 className="text-center mb-4">Attendance Analysis</h5>
                                <div className="row">
                                    <div className="col-6">Total Students:</div>
                                    <div className="col-6 text-end text-primary">{totalStudents}</div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-6">Present:</div>
                                    <div className="col-6 text-end text-success">{totalPresent}</div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-6">Absent:</div>
                                    <div className="col-6 text-end text-danger">{totalAbsent}</div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-6">Attendance Percentage:</div>
                                    <div className="col-6 text-end text-primary">{attendancePercentage.toFixed(2)}%</div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 d-flex align-items-center">
                            <label
                                htmlFor="searchInput"
                                className="form-label fw-bold text-primary me-3"
                                style={{ whiteSpace: 'nowrap' }}
                            >
                                Search Students:
                            </label>
                            <input
                                id="searchInput"
                                type="text"
                                className="form-control"
                                placeholder="Search by PRN, First Name, or Last Name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ flex: 1, maxWidth: '460px' }}
                            />
                        </div>
                    </div>
                    <div className="col-md-5">
                        <h5 className="text-center mb-4">Attendance Chart</h5>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="40%"
                                    outerRadius="70%"
                                    paddingAngle={5}
                                    labelLine={false}
                                    animationDuration={500}
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="top" height={0} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="table-responsive mt-4">
                    <table
                        className="table table-striped table-bordered"
                        style={{ borderRadius: '10px', overflow: 'hidden' }}
                    >
                        <thead className="table-dark">
                            <tr style={{ cursor: 'pointer' }}>
                                <th
                                    style={{ width: '20%' }}
                                    onClick={() => handleSort('prn')}
                                >
                                    PRN {getSortArrow('prn')}
                                </th>
                                <th
                                    style={{ width: '30%' }}
                                    onClick={() => handleSort('firstName')}
                                >
                                    First Name {getSortArrow('firstName')}
                                </th>
                                <th
                                    style={{ width: '30%' }}
                                    onClick={() => handleSort('lastName')}
                                >
                                    Last Name {getSortArrow('lastName')}
                                </th>
                                <th style={{ width: '20%' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentStudents.map((student) => (
                                <tr key={student.prn}>
                                    <td>{student.prn}</td>
                                    <td>{student.firstName}</td>
                                    <td>{student.lastName}</td>

                                    <td>
                                        <label style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            fontSize: '16px',
                                            color: '#555',
                                            cursor: 'pointer',
                                        }}>
                                            <input
                                                type="checkbox"
                                                checked={attendanceData.find(item => item.PRN === student.prn)?.status}
                                                onChange={() => handleCheckboxChange(student.prn)}
                                                style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    marginRight: '8px',
                                                    borderRadius: '3px',
                                                    border: '2px solid #007bff',
                                                    outline: 'none',
                                                    cursor: 'pointer',
                                                    transition: 'background-color 0.3s ease, border-color 0.3s ease',
                                                }}
                                            />
                                            <span style={{
                                                fontWeight: 'bold',
                                                color: attendanceData.find(item => item.PRN === student.prn)?.status ? '#444' : 'red',
                                            }}>
                                                {attendanceData.find(item => item.PRN === student.prn)?.status ? 'Present' : 'Absent'}
                                            </span>
                                        </label>
                                    </td>



                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="d-flex align-items-center">
                        <label className="form-label me-2">Items per page:</label>
                        <input
                            type="number"
                            className="form-control"
                            style={{ width: '80px' }}
                            value={itemsPerPage}
                            min="1"
                            max="500"
                            onChange={(e) => {
                                const value = Math.max(1, Math.min(Number(e.target.value), 500));
                                setItemsPerPage(value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>

                    <div className="d-flex align-items-center">
                        <button
                            className="btn btn-primary me-2"
                            onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
                        >
                            Previous
                        </button>

                        <div
                            className="d-flex overflow-auto"
                            style={{
                                maxWidth: '400px',
                                whiteSpace: 'nowrap',
                                scrollbarWidth: 'thin', // For Firefox
                                scrollbarColor: '#1d72b8 #f1f1f1', // For Firefox (thumb and track colors)
                            }}
                        >
                            {pageNumbers.map((number) => (
                                <button
                                    key={number}
                                    className={`btn me-1 ${currentPage === number ? 'btn-success' : 'btn-outline-primary'}`}
                                    onClick={() => {
                                        paginate(number);
                                        const button = document.getElementById(`page-${number}`);
                                        if (button) {
                                            button.scrollIntoView({
                                                behavior: 'smooth', // Smooth scrolling animation
                                                inline: 'center',   // Scroll the button into the center of the container
                                            });
                                        }
                                    }}
                                    id={`page-${number}`} // Assign a unique ID for each button
                                >
                                    {number}
                                </button>
                            ))}
                        </div>



                        <button
                            className="btn btn-primary"
                            onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, pageNumbers.length))}
                        >
                            Next
                        </button>
                    </div>



                    <div>
                        <button className="btn btn-success me-2" onClick={handleSubmit}>Submit Attendance</button>
                        <button className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                    </div>

                    {/* Modal for confirmation */}
                    {isModalVisible && (
                        <div
                            className="modal fade show d-block"
                            tabIndex="-1"
                            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                        >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Confirm Submission</h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            aria-label="Close"
                                            onClick={cancelSubmit}
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <p>
                                            <strong>Date: </strong>
                                            {date
                                                ? `${date.toLocaleDateString('en-US', { weekday: 'long' })}, ${date.toISOString().split('T')[0]}`
                                                : 'Not selected'}
                                        </p>

                                        <p><strong>Total Students:</strong> {totalStudents}</p>
                                        <p><strong>Present:</strong> {totalPresent}</p>
                                        <p><strong>Absent:</strong> {totalAbsent}</p>
                                        <p><strong>Attendance Percentage:</strong> {attendancePercentage.toFixed(2)}%</p>
                                        <p><strong>Absent Students:</strong></p>
                                        <ol
                                            style={{
                                                maxHeight: '200px', // Limit the height to fit about 10 items, adjust based on the actual height of each list item
                                                overflowY: 'auto',  // Enable vertical scrolling if the content exceeds maxHeight
                                            }}
                                        >
                                            {attendanceData
                                                .filter(student => !student.status)
                                                .map(student => {
                                                    const studentDetails = students.find(s => s.prn === student.PRN);
                                                    return (
                                                        <li key={student.PRN}>
                                                            <strong>PRN:</strong> {student.PRN} - {studentDetails?.firstName} {studentDetails?.lastName}
                                                        </li>
                                                    );
                                                })}
                                        </ol>

                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            className="btn btn-danger"
                                            onClick={cancelSubmit}
                                        >
                                            No
                                        </button>
                                        <button
                                            className="btn btn-success"
                                            onClick={confirmSubmit}
                                        >
                                            Yes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                </div>
            </div>

        </div>
    );
};

export default ModuleCoordinatorAttendanceMarkAttendance;
