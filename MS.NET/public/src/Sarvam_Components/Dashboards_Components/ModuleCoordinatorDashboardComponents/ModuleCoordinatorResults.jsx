import React, { useEffect, useState } from "react";
import axios from "axios";

const ModuleCoordinatorResults = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(5);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/MasterResult")
      .then((response) => {
        setResults(response.data);
        setSortedData(groupResultsByPrn(response.data));
      })
      .catch((error) => {
        console.error("Error fetching results:", error);
        setError("Failed to load results.");
      });
  }, []);

  const groupResultsByPrn = (data) => {
    const grouped = data.reduce((acc, curr) => {
      if (!acc[curr.prn]) {
        acc[curr.prn] = {
          prn: curr.prn,
          name: `${curr.masterProfile.firstName} ${curr.masterProfile.lastName}`,
          totalMarks: 0,
          totalCCEE: 0,
          totalModules: 0,
          percentage: 0,
          cceePercentage: 0,
          modules: [],
        };
      }

      acc[curr.prn].modules.push({
        moduleName: curr.masterModule.moduleName,
        date: curr.createdAt,
        lab40: curr.lab40,
        internals20: curr.internals20,
        ccee60: curr.ccee60,
      });

      acc[curr.prn].totalMarks += curr.lab40 + curr.internals20 + curr.ccee60;
      acc[curr.prn].totalCCEE += curr.ccee60;
      acc[curr.prn].totalModules += 1;

      acc[curr.prn].percentage = (acc[curr.prn].totalMarks / (acc[curr.prn].totalModules * 100)) * 100;
      acc[curr.prn].cceePercentage = (acc[curr.prn].totalCCEE / (acc[curr.prn].totalModules * 40)) * 100;

      return acc;
    }, {});

    return Object.values(grouped);
  };

  const toggleProgressTable = (prn) => {
    setExpandedRow(expandedRow === prn ? null : prn);
  };

  const sortData = (field) => {
    const sorted = [...sortedData];
    sorted.sort((a, b) => (sortOrder === "desc" ? b[field] - a[field] : a[field] - b[field]));
    setSortedData(sorted);
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  // Pagination logic
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = sortedData.slice(indexOfFirstResult, indexOfLastResult);
  
  const nextPage = () => {
    if (currentPage < Math.ceil(sortedData.length / resultsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Results</h1>
      
      <table className="table table-striped table-bordered table-hover shadow-lg">
        <thead className="table-dark">
          <tr>
            <th>PRN</th>
            <th>Student Name</th>
            <th>Total Marks</th>
            <th>CCEE Percentage</th>
            <th>
              Percentage
              <span
                className="ms-2"
                style={{ cursor: "pointer" }}
                onClick={() => sortData("percentage")}
              >
                {sortOrder === "desc" ? "↓" : "↑"}
              </span>
            </th>
            <th>Show Total Progress</th>
          </tr>
        </thead>
        <tbody>
          {currentResults.length > 0 ? (
            currentResults.map((student, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>{student.prn}</td>
                  <td>{student.name}</td>
                  <td>{student.totalMarks}</td>
                  <td>{student.cceePercentage.toFixed(2)}%</td>
                  <td>{student.percentage.toFixed(2)}%</td>
                  <td>
                    <button className="btn btn-info" onClick={() => toggleProgressTable(student.prn)}>
                      {expandedRow === student.prn ? "Hide Progress" : "Show Progress"}
                    </button>
                  </td>
                </tr>
                {expandedRow === student.prn && (
                  <tr>
                    <td colSpan="6">
                      <table className="table table-bordered table-sm mt-3">
                        <thead className="table-dark">
                          <tr>
                            <th>Module Name</th>
                            <th>Lab Exam (40)</th>
                            <th>Internal Marks (20)</th>
                            <th>CCEE Marks (40)</th>
                            <th>Marks (100)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {student.modules.map((module, idx) => (
                            <tr key={idx}>
                              <td>{module.moduleName}</td>
                              <td>{module.lab40}</td>
                              <td>{module.internals20}</td>
                              <td>{module.ccee60}</td>
                              <td>{module.lab40 + module.internals20 + module.ccee60}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="6">No results found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mb-4">
        <label>Results per page: </label>
        <input
          type="number"
          value={resultsPerPage}
          onChange={(e) => {
            setResultsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          min="1"
          className="ms-2"
        />
      </div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-primary" onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {Math.ceil(sortedData.length / resultsPerPage)}</span>
        <button className="btn btn-primary" onClick={nextPage} disabled={currentPage === Math.ceil(sortedData.length / resultsPerPage)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ModuleCoordinatorResults;
