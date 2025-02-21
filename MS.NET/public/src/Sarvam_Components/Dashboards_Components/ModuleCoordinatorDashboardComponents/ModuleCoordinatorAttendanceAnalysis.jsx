import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx'; // Import XLSX library
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { PolarArea } from 'react-chartjs-2';
import chroma from 'chroma-js';
// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, CategoryScale);


function AttendanceTable() {
    const [attendanceData, setAttendanceData] = useState([]);
    const [studentsData, setStudentsData] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'prn', direction: 'asc' }); // Sorting state
    const [pageSize, setPageSize] = useState(10); // Default page size
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [attendanceFilter, setAttendanceFilter] = useState(''); // Holds the selected percentage filter
    const [dateFilter, setDateFilter] = useState('');
    const [fromDateFilter, setFromDateFilter] = useState('');
    const [toDateFilter, setToDateFilter] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem('token'); // Retrieve token from session storage

        if (token) {
            // Fetch attendance data
            fetch('http://localhost:5000/api/MasterAttendance', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Add Bearer token
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => setAttendanceData(data))
                .catch((error) => console.error('Error fetching attendance data:', error));

            // Fetch students data
            fetch('http://localhost:5000/api/MasterProfiles/students', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Add Bearer token
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => setStudentsData(data))
                .catch((error) => console.error('Error fetching students data:', error));
        } else {
            console.error('No token found in session storage');
        }
    }, []);

    const calculateMonthWiseAttendance = (attendanceData) => {
        // Step 1: Initialize a map to hold attendance counts for each month
        const monthWiseData = {};

        // Step 2: Process the attendance data
        attendanceData.forEach((record) => {
            const month = new Date(record.updatedAt).toLocaleString('default', { month: 'long' }); // Extract month from the date
            const present = record.role === 'Student' && record.present === true ? 1 : 0; // Example logic for present/absent status
            const absent = 1 - present; // If not present, it is absent

            if (!monthWiseData[month]) {
                monthWiseData[month] = { present: 0, absent: 0 };
            }

            monthWiseData[month].present += present;
            monthWiseData[month].absent += absent;
        });

        // Step 3: Convert the map to an array for chart data
        const tableData = Object.keys(monthWiseData).map((month) => ({
            month,
            present: monthWiseData[month].present,
            absent: monthWiseData[month].absent,
        }));

        // Sort the data by month if necessary (optional)
        const monthsOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        tableData.sort((a, b) => monthsOrder.indexOf(a.month) - monthsOrder.indexOf(b.month));

        return tableData;
    };




    // Percentage Filter Options
    const percentageRanges = [
        { label: '0% - 25%', value: '0-25' },
        { label: '25% - 50%', value: '25-50' },
        { label: '50% - 75%', value: '50-75' },
        { label: '75% - 100%', value: '75-100' }
    ];

    // Apply percentage filter
    const applyFilters = (data) => {
        let filteredData = data;

        // Apply percentage filter
        filteredData = filteredData.filter((item) => {
            const attendancePercentage = parseFloat(item.attendancePercentage);
            if (attendanceFilter) {
                switch (attendanceFilter) {
                    case '0-25':
                        if (attendancePercentage < 0 || attendancePercentage >= 25) return false;
                        break;
                    case '25-50':
                        if (attendancePercentage < 25 || attendancePercentage >= 50) return false;
                        break;
                    case '50-75':
                        if (attendancePercentage < 50 || attendancePercentage >= 75) return false;
                        break;
                    case '75-100':
                        if (attendancePercentage < 75 || attendancePercentage > 100) return false;
                        break;
                    default:
                        break;
                }
            }

            // Apply date filter (From and To date)
            if (fromDateFilter || toDateFilter) {
                const fromDate = fromDateFilter ? new Date(fromDateFilter) : null;
                const toDate = toDateFilter ? new Date(toDateFilter) : null;

                const attendanceDates = item.attendanceDetails.map((detail) => new Date(detail.date));

                // Check if any attendance date falls within the selected date range
                const isInRange = attendanceDates.some((date) => {
                    if (fromDate && toDate) {
                        return date >= fromDate && date <= toDate;
                    }
                    if (fromDate) {
                        return date >= fromDate;
                    }
                    if (toDate) {
                        return date <= toDate;
                    }
                    return true;
                });

                if (!isInRange) return false;
            }

            return true;
        });

        return filteredData;
    };





    // Step 2: Process and combine data
    const combineData = () => {
        // Group attendance data by PRN
        const groupedAttendance = attendanceData.reduce((acc, curr) => {
            if (!acc[curr.prn]) {
                acc[curr.prn] = { present: 0, absent: 0, total: 0, details: [] };
            }
            acc[curr.prn].total++;
            acc[curr.prn][curr.status ? 'present' : 'absent']++;
            // Use the original date from the database without any modification
            acc[curr.prn].details.push({ date: curr.date, status: curr.status ? 'Present' : 'Absent' });
            return acc;
        }, {});

        // Combine with student info
        return studentsData.map((student) => {
            const attendance = groupedAttendance[student.prn] || { present: 0, absent: 0, total: 0, details: [] };
            const attendancePercentage = attendance.total ? (attendance.present / attendance.total) * 100 : 0;

            return {
                prn: student.prn,
                firstName: student.firstName,
                lastName: student.lastName,
                present: attendance.present,
                absent: attendance.absent,
                total: attendance.total,
                attendancePercentage: attendancePercentage.toFixed(2),
                attendanceDetails: attendance.details
            };
        });
    };

    const tableData = combineData();

    // Sorting function
    const handleSort = (column) => {
        let direction = 'asc';
        if (sortConfig.key === column && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key: column, direction });

        const sortedData = [...tableData].sort((a, b) => {
            if (a[column] < b[column]) return direction === 'asc' ? -1 : 1;
            if (a[column] > b[column]) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        return sortedData;
    };

    // Handle PRN click
    const handlePRNClick = (student) => {
        console.log(student);  // Verify that the correct student is being passed
        setSelectedStudent(student);
    };

    const handleDownload = () => {
        // Create a worksheet and add the data to it
        const ws = XLSX.utils.json_to_sheet(tableData);

        // Create a new workbook and append the worksheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance Data');

        // Download the workbook as an Excel file
        XLSX.writeFile(wb, 'attendance_data.xlsx');
    };

    // Get the sorted data based on the current sort state
    const sortedTableData = [...tableData].sort((a, b) => {
        const { key, direction } = sortConfig;
        if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
        return 0;
    });

    const filteredData = applyFilters(sortedTableData.filter((item) => {
        const query = searchQuery.toLowerCase();
        return (
            item.prn.toString().toLowerCase().includes(query) ||
            item.firstName.toLowerCase().includes(query) ||
            item.lastName.toLowerCase().includes(query) ||
            item.present.toString().includes(query) ||
            item.absent.toString().includes(query) ||
            item.total.toString().includes(query) ||
            item.attendancePercentage.toString().includes(query)
        );
    }));

    const clearFilters = () => {
        setAttendanceFilter('');
        setFromDateFilter('');
        setToDateFilter('');
        setSearchQuery('');
    };




    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };
    // Pagination logic
    const totalPages = Math.ceil(filteredData.length / pageSize);
    const currentTableData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);


    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handlePageSizeChange = (e) => {
        const newPageSize = parseInt(e.target.value, 10);
        if (newPageSize >= 1 && newPageSize <= 500) {
            setPageSize(newPageSize);
            setCurrentPage(1); // Reset to first page when page size changes
        }
    };

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }




    const getHorizontalBarChartData = () => ({
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Attendance',
                data: [12, 19, 3, 5, 2],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40'],
                borderColor: 'rgba(0, 0, 0, 0.1)',
                borderWidth: 1,
            },
        ],
    });

    const getDoughnutChartData = () => {
        const presentCount = tableData.reduce((acc, row) => acc + row.present, 0);
        const absentCount = tableData.reduce((acc, row) => acc + row.absent, 0);

        const totalCount = presentCount + absentCount;
        const presentPercentage = (presentCount / totalCount) * 100;
        const absentPercentage = (absentCount / totalCount) * 100;

        const colors = ['#34D399', '#F87171']; // Tailwind green for Present, red for Absent
        const hoverColors = ['#059669', '#B91C1C']; // Darker shades for hover

        return {
            labels: ['Present', 'Absent'],
            datasets: [
                {
                    label: 'Attendance vs Absent',
                    data: [presentPercentage, absentPercentage],
                    backgroundColor: colors,
                    hoverBackgroundColor: hoverColors,
                },
            ],
        };
    };


    return (
        <div className="container mt-5">

            {/* Charts Section: Bar and Pie Chart */}
            <div className="row mb-5">

                <div className="col-md-6">
                    <h4>Total Attendance vs Absent</h4>
                    <Bar
                        data={getHorizontalBarChartData()}
                        height={50}  // Set height to 70
                        width={50}   // Set width to 70
                        options={{
                            indexAxis: 'y', // This makes the bars horizontal
                            responsive: true,
                        }}
                    />
                </div>
                <div className="col-md-6">
                    <h4>Attendance vs Absent</h4>
                    <Doughnut
                        data={getDoughnutChartData()}
                        height={50}  // Set height to 70
                        width={50}   // Set width to 70
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                tooltip: {
                                    callbacks: {
                                        label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%`,
                                    },
                                },
                            },
                        }}
                    />
                </div>
            </div>




            {/* Search, Clear Search, Download Excel */}
            <div className="mb-4 mt-5 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center w-75  mt-5">
                    <label htmlFor="search" className="form-label me-2 fw-bold">
                        Search:
                    </label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Search by PRN, First Name, Last Name, Present, Absent, Total Days, Attendance Percentage"
                        className="form-control w-100" // Set search bar to 100% width of the container
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="d-flex  mt-5">
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => setSearchQuery('')} // Clear the search query
                    >
                        Clear Search
                    </button>
                    <button className="btn btn-success" onClick={handleDownload}>
                        Download as Excel
                    </button>
                </div>
            </div>



            {/* Filters Section: Attendance Percentage and Date Range */}
            <div className="mb-4 d-flex align-items-center">
                {/* Attendance Percentage Filter */}
                <div className="me-3">
                    <strong>Filter Attendance by Percentage: </strong>
                    <select
                        className="form-select mt-2"
                        value={attendanceFilter}
                        onChange={(e) => setAttendanceFilter(e.target.value)}
                    >
                        <option value="">Select Range</option>
                        {percentageRanges.map((range) => (
                            <option key={range.value} value={range.value}>
                                {range.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Attendance Date Range Filter */}
                <div className="me-3 ms-5">
                    <strong>Filter Attendance by Date Range: </strong>
                    <div className="d-flex">
                        <input
                            type="date"
                            className="form-control w-50  mt-2"
                            value={fromDateFilter}
                            onChange={(e) => setFromDateFilter(e.target.value)}
                        />
                        <span className="mx-2  mt-3">to</span>
                        <input
                            type="date"
                            className="form-control w-50  mt-2"
                            value={toDateFilter}
                            onChange={(e) => setToDateFilter(e.target.value)}
                        />
                    </div>
                </div>

                {/* Clear Filters Button aligned to the right */}
                <button className="btn btn-primary ms-auto mt-4" onClick={clearFilters}>
                    Clear Filters
                </button>
            </div>




            <table className="table table-striped table-bordered table-hover" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                <thead className="table-dark">
                    <tr style={{ cursor: 'pointer' }}>
                        <th style={{ width: '5%' }}>Sr. No.</th>
                        <th
                            style={{ width: '15%' }}
                            onClick={() => setSortConfig({ key: 'prn', direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' })}
                        >
                            PRN {sortConfig.key === 'prn' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            style={{ width: '15%' }}
                            onClick={() => setSortConfig({ key: 'firstName', direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' })}
                        >
                            First Name {sortConfig.key === 'firstName' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            style={{ width: '15%' }}
                            onClick={() => setSortConfig({ key: 'lastName', direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' })}
                        >
                            Last Name {sortConfig.key === 'lastName' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            style={{ width: '10%' }}
                            onClick={() => setSortConfig({ key: 'present', direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' })}
                        >
                            Present {sortConfig.key === 'present' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            style={{ width: '10%' }}
                            onClick={() => setSortConfig({ key: 'absent', direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' })}
                        >
                            Absent {sortConfig.key === 'absent' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            style={{ width: '10%' }}
                            onClick={() => setSortConfig({ key: 'total', direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' })}
                        >
                            Total Days {sortConfig.key === 'total' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            style={{ width: '10%' }}
                            onClick={() => setSortConfig({ key: 'attendancePercentage', direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' })}
                        >
                            Percentage {sortConfig.key === 'attendancePercentage' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentTableData.map((row, index) => {
                        // Get the attendance percentage and map it to a color
                        const percentage = row.attendancePercentage;
                        const backgroundColor = `rgb(${255 - percentage * 2.5}, ${percentage * 2.5}, 0)`; // Green to red gradient

                        return (
                            <tr key={index}>
                                <td style={{ width: '5%' }}>{(currentPage - 1) * pageSize + index + 1}</td> {/* Serial Number */}
                                <td style={{ width: '15%', cursor: 'pointer' }} onClick={() => handlePRNClick(row)}>{row.prn}</td>
                                <td style={{ width: '15%' }}>{row.firstName}</td>
                                <td style={{ width: '15%' }}>{row.lastName}</td>
                                <td style={{ width: '10%' }}>{row.present}</td>
                                <td style={{ width: '10%' }}>{row.absent}</td>
                                <td style={{ width: '10%' }}>{row.total}</td>
                                <td style={{ width: '10%', backgroundColor: backgroundColor }}>
                                    {row.attendancePercentage} %
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>



            {/* Pagination Controls */}
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <strong>Page Size:</strong>
                    <input
                        type="number"
                        value={pageSize}
                        onChange={handlePageSizeChange}
                        min="1"
                        max="500"
                        className="form-control d-inline w-auto ms-2"
                        style={{ width: '80px' }}
                    />
                </div>

                <div className="d-flex align-items-center">
                    <button
                        className="btn btn-primary me-2"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Previous
                    </button>

                    <div
                        style={{
                            maxWidth: '350px',
                            overflowX: 'auto',
                            scrollbarWidth: 'thin', // Firefox
                            scrollbarColor: '#28a745 #f1f1f1', // Firefox (green track with light gray thumb)
                        }}
                    >
                        <ul className="pagination mt-3">
                            {pageNumbers.map((number) => (
                                <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                                    <button
                                        className={`page-link ${number === currentPage ? 'bg-success text-white' : ''}`}
                                        onClick={() => handlePageChange(number)}
                                    >
                                        {number}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button
                        className="btn btn-primary ms-2"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Modal for Student Details */}
            {selectedStudent && (
                <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }} aria-hidden="false">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    Attendance Details for {selectedStudent.firstName} {selectedStudent.lastName}
                                </h5>
                                <button
                                    type="button"
                                    className="close ms-auto"
                                    data-bs-dismiss="modal"
                                    onClick={() => setSelectedStudent(null)}
                                >
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <strong>PRN:</strong> {selectedStudent.prn}
                                </div>
                                <div className="mb-3">
                                    <strong>First Name:</strong> {selectedStudent.firstName}
                                </div>
                                <div className="mb-3">
                                    <strong>Last Name:</strong> {selectedStudent.lastName}
                                </div>
                                <div className="mb-3">
                                    <strong>Present:</strong> {selectedStudent.present}
                                </div>
                                <div className="mb-3">
                                    <strong>Absent:</strong> {selectedStudent.absent}
                                </div>
                                <div className="mb-3">
                                    <strong>Total Days:</strong> {selectedStudent.total}
                                </div>
                                <div className="mb-3">
                                    <strong>Attendance Percentage:</strong> {selectedStudent.attendancePercentage} %
                                </div>
                                <ol style={{ maxHeight: '150px', overflowY: 'auto' }}>
                                    {selectedStudent.attendanceDetails.map((detail, index) => (
                                        <li key={index}>
                                            {(() => {
                                                const date = new Date(detail.date);
                                                const day = String(date.getDate()).padStart(2, '0');
                                                const month = String(date.getMonth() + 1).padStart(2, '0');
                                                const year = date.getFullYear();
                                                return `${day}-${month}-${year}`; // Use "-" instead of "/"
                                            })()} - {detail.status}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={() => setSelectedStudent(null)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AttendanceTable;
