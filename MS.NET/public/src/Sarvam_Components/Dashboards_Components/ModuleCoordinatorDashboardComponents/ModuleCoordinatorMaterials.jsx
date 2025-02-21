import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Replace with your actual API base URL

const StudentSyllabus = () => {
  const [modules, setModules] = useState([]);
  const [modulesPerPage, setModulesPerPage] = useState(5); // Default modules per page
  const [currentPage, setCurrentPage] = useState(1); // Current page

  // Pagination logic
  const totalPages = Math.ceil(modules.length / modulesPerPage);
  const currentModules = modules.slice(
    (currentPage - 1) * modulesPerPage,
    currentPage * modulesPerPage
  );

  const handleModulesPerPageChange = (e) => {
    setModulesPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page
  };

  // Fetch modules on component mount
  useEffect(() => {
    fetchModules();
  }, []);

  // Fetch modules from API
  const fetchModules = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/MasterModule`);
      setModules(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Student Syllabus</h2>

      {/* Modules Table */}
      <table className="table table-striped table-bordered" style={{ borderRadius: '10px', overflow: 'hidden' }}>
        <thead className="table-dark">
          <tr>
            <th className="text-center align-middle">Module Name</th>
            <th className="text-center align-middle">Start Date</th>
            <th className="text-center align-middle">End Date</th>
            <th className="text-center align-middle">Instructor</th>
            <th className="text-center align-middle">MoCo</th>
            <th className="text-center align-middle">Days</th>
            <th className="text-center align-middle">Total Hours</th>
            <th className="text-center align-middle">Subpoints</th>
          </tr>
        </thead>
        <tbody>
          {currentModules.map((module) => (
            <React.Fragment key={module.moduleId}>
              {module.masterModuleSubpoints.length === 0 ? (
                // Module with no subpoints
                <tr>
                  <td className="align-middle" rowSpan={1}>
                    {module.moduleName}
                  </td>
                  <td className="align-middle" rowSpan={1}>
                    {new Date(module.moduleStartDate).toLocaleDateString()}
                  </td>
                  <td className="align-middle" rowSpan={1}>
                    {new Date(module.moduleEndDate).toLocaleDateString()}
                  </td>
                  <td className="align-middle" rowSpan={1}>
                    {module.instructorName}
                  </td>
                  <td className="align-middle" rowSpan={1}>
                    {module.moCoName}
                  </td>
                  <td className="align-middle" rowSpan={1}>
                    {module.noOfDays}
                  </td>
                  <td className="align-middle" rowSpan={1}>
                    {module.durationHours}
                  </td>
                  <td className="align-middle" rowSpan={1}></td> {/* No subpoints */}
                </tr>
              ) : (
                // Module with subpoints
                module.masterModuleSubpoints.map((subpoint, index) => (
                  <tr key={subpoint.subId}>
                    {index === 0 && (
                      <>
                        <td
                          rowSpan={module.masterModuleSubpoints.length}
                          className="align-middle"
                        >
                          {module.moduleName}
                        </td>
                        <td
                          rowSpan={module.masterModuleSubpoints.length}
                          className="align-middle"
                        >
                          {new Date(module.moduleStartDate).toLocaleDateString()}
                        </td>
                        <td
                          rowSpan={module.masterModuleSubpoints.length}
                          className="align-middle"
                        >
                          {new Date(module.moduleEndDate).toLocaleDateString()}
                        </td>
                        <td
                          rowSpan={module.masterModuleSubpoints.length}
                          className="align-middle"
                        >
                          {module.instructorName}
                        </td>
                        <td
                          rowSpan={module.masterModuleSubpoints.length}
                          className="align-middle"
                        >
                          {module.moCoName}
                        </td>
                        <td
                          rowSpan={module.masterModuleSubpoints.length}
                          className="align-middle"
                        >
                          {module.noOfDays}
                        </td>
                        <td
                          rowSpan={module.masterModuleSubpoints.length}
                          className="align-middle"
                        >
                          {module.durationHours}
                        </td>
                      </>
                    )}
                    <td>{subpoint.moduleSubpointName}</td>
                  </tr>
                ))
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <label className="me-2">
        Modules per page:{" "}
        <input
          type="number"
          value={modulesPerPage}
          onChange={handleModulesPerPageChange}
          min="1"
          className="form-control d-inline-block"
          style={{ width: "80px" }}
        />
      </label>
      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-outline-primary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-outline-primary"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StudentSyllabus;
