import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminResults = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [sortedData, setSortedData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [newResult, setNewResult] = useState({
      prn: "",
      moduleName: "", // Use moduleName to fetch moduleId
      internals20: "",
      lab40: "",
      ccee60: "",
    });
  
  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = () => {
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
  };

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
        resultId: curr.resultId,
        moduleId: curr.masterModule?.moduleId || "",
        moduleName: curr.masterModule.moduleName,
        lab40: curr.lab40,
        internals20: curr.internals20,
        ccee60: curr.ccee60,
      });

      acc[curr.prn].totalMarks += curr.lab40 + curr.internals20 + curr.ccee60;
      acc[curr.prn].totalCCEE += curr.ccee60;
      acc[curr.prn].totalModules += 1;

      acc[curr.prn].percentage =
        (acc[curr.prn].totalMarks / (acc[curr.prn].totalModules * 100)) * 100;
      acc[curr.prn].cceePercentage =
        (acc[curr.prn].totalCCEE / (acc[curr.prn].totalModules * 40)) * 100;

      return acc;
    }, {});

    return Object.values(grouped);
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


  const handleUpdate = async () => {
    if (!editData) return;
    try {
      const updatedPayload = {
        resultId: editData.resultId,
        prn: editData.prn, // Ensure PRN is included correctly
        moduleId: editData.moduleId,
        internals20: updatedData.internals20 ?? editData.internals20,
        lab40: updatedData.lab40 ?? editData.lab40,
        ccee60: updatedData.ccee60 ?? editData.ccee60,
      };

      console.log("Updated payload:", updatedPayload);

      await axios.put(
        `http://localhost:5000/api/MasterResult/${editData.resultId}`,
        updatedPayload
      );
      fetchResults();
      setEditData(null);
      setUpdatedData({});
    } catch (error) {
      console.error("Error updating result:", error);
      setError("Failed to update result.");
    }
  };

  const handleDelete = async (resultId) => {
    try {
      await axios.delete(`http://localhost:5000/api/MasterResult/${resultId}`);
      fetchResults();
    } catch (error) {
      console.error("Error deleting result:", error);
    }
  };

  // Fetch moduleId based on moduleName
  const getModuleIdByName = (moduleName) => {
    return axios
      .get(`http://localhost:5000/api/MasterModule/byName/${moduleName}`)
      .then((response) => response.data.moduleId)
      .catch((error) => {
        console.error("Error fetching module by name:", error);
        return null;
      });
  };

  // Handle Add Result
  const handleAddResult = async () => {
    try {
        // Fetch the moduleId by the module name
        const moduleId = await getModuleIdByName(newResult.moduleName);

        // Handle the case when the module is not found
        if (!moduleId) {
            console.error("Module not found");
            setError("Module not found");
            return;
        }

        // Update the newResult with the fetched moduleId
        const resultWithModuleId = { ...newResult, moduleId };

        // Post the result with the moduleId to the API
        await axios.post("http://localhost:5000/api/MasterResult", resultWithModuleId);

        // Fetch the updated results from the server
        const updatedResults = await axios.get("http://localhost:5000/api/MasterResult");

        // Use functional update to ensure React properly updates the state
        setResults(() => [...updatedResults.data]);

        // Reset the form and error state
        setNewResult({
            prn: "",
            moduleName: "",
            internals20: "",
            lab40: "",
            ccee60: "",
        });
        setError("");
        setEditData(null);
        setUpdatedData({});
        fetchResults();
        // Close the modal manually after saving the result
        document.getElementById("addResultModalCloseBtn").click();
    } catch (error) {
        console.error("Error adding result:", error);
        setError("Failed to add result. Please try again.");
    }
  };




  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Results</h1>
      {/* {error && <div className="alert alert-danger">{error}</div>} */}

      {/* Add Result Button */}
      <button className="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#addResultModal">
        Add Result
      </button>

      {/* Add Result Modal */}
      <div className="modal fade" id="addResultModal" tabIndex="-1" aria-labelledby="addResultModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addResultModalLabel">Add New Result</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-group mb-3">
                <label htmlFor="prn">PRN</label>
                <input
                  type="text"
                  className="form-control"
                  id="prn"
                  value={newResult.prn}
                  onChange={(e) => setNewResult({ ...newResult, prn: e.target.value })}
                />
              </div>
              {/* Dropdown for Module */}
              <div className="form-group mb-3">
                <label htmlFor="moduleName">Module</label>
                <input
                  type="text"
                  className="form-control"
                  id="moduleName"
                  value={newResult.moduleName}
                  onChange={(e) => setNewResult({ ...newResult, moduleName: e.target.value })}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="internals20">Internals (20)</label>
                <input
                  type="number"
                  className="form-control"
                  id="internals20"
                  value={newResult.internals20}
                  onChange={(e) => setNewResult({ ...newResult, internals20: e.target.value })}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="lab40">Lab (40)</label>
                <input
                  type="number"
                  className="form-control"
                  id="lab40"
                  value={newResult.lab40}
                  onChange={(e) => setNewResult({ ...newResult, lab40: e.target.value })}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="ccee60">CCEE (60)</label>
                <input
                  type="number"
                  className="form-control"
                  id="ccee60"
                  value={newResult.ccee60}
                  onChange={(e) => setNewResult({ ...newResult, ccee60: e.target.value })}
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>} {/* Error Message */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                id="addResultModalCloseBtn"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleAddResult}>
                Save Result
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <table className="table table-striped table-bordered table-hover shadow-lg">
        <thead className="table-dark">
          <tr>
            <th>PRN</th>
            <th>Student Name</th>
            <th>Percentage
              <span
                className="ms-2"
                style={{ cursor: "pointer" }}
                onClick={() => sortData("percentage")}
              >
                {sortOrder === "desc" ? "↓" : "↑"}
              </span>
            </th>
            <th>Show Progress</th>
          </tr>
        </thead>
        <tbody>
          {currentResults.length > 0 ? (
          currentResults.map((student, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{student.prn}</td>
                <td>{student.name}</td>
                <td>{student.percentage.toFixed(2)}%</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() =>
                      setExpandedRow(expandedRow === student.prn ? null : student.prn)
                    }
                  >
                    {expandedRow === student.prn ? "Hide" : "Show"}
                  </button>
                </td>
              </tr>
              {expandedRow === student.prn && (
                <tr>
                  <td colSpan="4">
                    <table className="table table-bordered table-sm">
                      <thead>
                        <tr>
                          <th>Module</th>
                          <th>Lab (40)</th>
                          <th>Internals (20)</th>
                          <th>CCEE (40)</th>
                          <th>Total</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {student.modules.map((module) => (
                          <tr key={module.resultId}>
                            <td>{module.moduleName}</td>
                            <td>
                              {editData?.resultId === module.resultId ? (
                                <input
                                  type="number"
                                  value={updatedData.lab40 ?? module.lab40}
                                  onChange={(e) =>
                                    setUpdatedData({
                                      ...updatedData,
                                      lab40: e.target.value,
                                    })
                                  }
                                />
                              ) : (
                                module.lab40
                              )}
                            </td>
                            <td>
                              {editData?.resultId === module.resultId ? (
                                <input
                                  type="number"
                                  value={updatedData.internals20 ?? module.internals20}
                                  onChange={(e) =>
                                    setUpdatedData({
                                      ...updatedData,
                                      internals20: e.target.value,
                                    })
                                  }
                                />
                              ) : (
                                module.internals20
                              )}
                            </td>
                            <td>
                              {editData?.resultId === module.resultId ? (
                                <input
                                  type="number"
                                  value={updatedData.ccee60 ?? module.ccee60}
                                  onChange={(e) =>
                                    setUpdatedData({
                                      ...updatedData,
                                      ccee60: e.target.value,
                                    })
                                  }
                                />
                              ) : (
                                module.ccee60
                              )}
                            </td>
                            <td>{module.lab40 + module.internals20 + module.ccee60}</td>
                            <td>
                              {editData?.resultId === module.resultId ? (
                                <button className="btn btn-success me-2" onClick={handleUpdate}>
                                  Save
                                </button>
                              ) : (
                                <button
                                  className="btn btn-warning me-2"
                                  onClick={() => setEditData({ ...module, prn: student.prn })}
                                >
                                  Edit
                                </button>
                              )}
                              <button className="btn btn-danger" onClick={() => handleDelete(module.resultId)}>
                                Delete
                              </button>
                            </td>

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

export default AdminResults;
