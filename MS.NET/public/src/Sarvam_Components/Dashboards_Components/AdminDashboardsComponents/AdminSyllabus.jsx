import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';  // Replace with your API base URL

const AdminSyllabus = () => {
  const [modules, setModules] = useState([]);
  const [subpointName, setSubpointName] = useState('');
  const [subpointId, setSubpointId] = useState(null);
  const [moduleName, setModuleName] = useState('');
  const [moduleStartDate, setModuleStartDate] = useState('');
  const [moduleEndDate, setModuleEndDate] = useState('');
  const [instructorId, setInstructorId] = useState(null);
  const [moCoId, setMoCoId] = useState(null);
  const [noOfDays, setNoOfDays] = useState(5);
  const [durationHours, setDurationHours] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [moCos, setMoCos] = useState([]);
  const [showSubpointModal, setShowSubpointModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showUpdateSubpointModal, setShowUpdateSubpointModal] = useState(false);

  const [showDeleteModule, setShowDeleteModule] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const [modulesPerPage, setModulesPerPage] = useState(5); // Default modules per page
  const [currentPage, setCurrentPage] = useState(1); // Current page


  const toggleDeleteModuleColumn = () => {
    setShowDeleteModule((prev) => !prev);
  };

  const toggleActionsColumn = () => {
    setShowActions((prev) => !prev);
  };


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





  useEffect(() => {
    fetchModules();
    fetchInstructors();
    fetchMoCos();
  }, []);

  const fetchModules = async () => {
    try {
      const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage

      const response = await axios.get(`${API_BASE_URL}/MasterModule`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Add Bearer token to Authorization header
          'Content-Type': 'application/json', // Optional for GET requests
        },
      });

      setModules(response.data); // Store the fetched modules in state
      console.log(response.data); // Log the fetched data
    } catch (error) {
      console.error('Error fetching modules:', error); // Handle any errors
    }
  };


  const fetchInstructors = async () => {
    try {
      const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage

      const response = await axios.get(`${API_BASE_URL}/MasterProfiles/Instructor`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Add Bearer token to Authorization header
          'Content-Type': 'application/json', // Optional for GET requests
        },
      });

      setInstructors(response.data); // Store the fetched instructors in state
    } catch (error) {
      console.error('Error fetching instructors:', error); // Handle any errors
    }
  };


  const fetchMoCos = async () => {
    try {
      const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage

      const response = await axios.get(`${API_BASE_URL}/MasterProfiles/MoCo`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Add Bearer token to Authorization header
          'Content-Type': 'application/json', // Optional for GET requests
        },
      });

      setMoCos(response.data); // Store the fetched MoCos in state
    } catch (error) {
      console.error('Error fetching MoCos:', error); // Handle any errors
    }
  };


  const addModule = async () => {
    const newModule = {
      moduleName,
      moduleStartDate: new Date(moduleStartDate),
      moduleEndDate: new Date(moduleEndDate),
      instructorId,
      moCoId,
      noOfDays,
      durationHours,
    };

    console.log(newModule);

    try {
      const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage

      await axios.post(`${API_BASE_URL}/MasterModule`, newModule, {
        headers: {
          'Authorization': `Bearer ${token}`, // Add Bearer token to Authorization header
          'Content-Type': 'application/json', // Optional for POST requests
        },
      });

      fetchModules(); // Refresh the module list
      setShowModal(false); // Close the modal after successful addition
    } catch (error) {
      console.error('Error adding module:', error); // Handle any errors
    }
  };


  const addSubpoint = async () => {
    if (!subpointName || !selectedModuleId) {
      alert("Please fill in all fields");
      return;
    }

    const newSubpoint = {
      moduleId: selectedModuleId,
      moduleSubpointName: subpointName,
    };

    try {
      const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage

      await axios.post(`${API_BASE_URL}/MasterModuleSubpoint`, newSubpoint, {
        headers: {
          'Authorization': `Bearer ${token}`, // Add Bearer token to Authorization header
          'Content-Type': 'application/json', // Optional for POST requests
        },
      });

      setSubpointName(''); // Reset subpoint name
      setSelectedModuleId(null); // Reset selected module ID
      setShowSubpointModal(false); // Close the modal after successful addition
      fetchModules(); // Refresh the module list after adding the subpoint
    } catch (error) {
      console.error('Error adding subpoint:', error); // Handle any errors
    }
  };


  const openAddSubpointModal = (moduleId) => {
    setSelectedModuleId(moduleId);
    setShowSubpointModal(true);
  };


  const updateSubpoint = async () => {
    const updatedSubpoint = {
      subId: subpointId,
      moduleSubpointName: subpointName,
      moduleId: selectedModuleId,
    };

    try {
      const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage

      console.log(updatedSubpoint);

      await axios.put(`${API_BASE_URL}/MasterModuleSubpoint/${subpointId}`, updatedSubpoint, {
        headers: {
          'Authorization': `Bearer ${token}`, // Add Bearer token to Authorization header
          'Content-Type': 'application/json', // Optional for PUT requests
        },
      });

      setSubpointName(''); // Reset subpoint name
      setSubpointId(null); // Reset subpoint ID
      setSelectedModuleId(null); // Reset selected module ID
      setShowUpdateSubpointModal(false); // Close the update modal
      fetchModules(); // Refresh the module list after updating the subpoint
    } catch (error) {
      console.error('Error updating subpoint:', error); // Handle any errors
    }
  };

  const deleteSubpoint = async (subpointId) => {
    try {
      const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage

      await axios.delete(`${API_BASE_URL}/MasterModuleSubpoint/${subpointId}`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Add Bearer token to Authorization header
        },
      });

      fetchModules(); // Refresh the module list after deleting the subpoint
    } catch (error) {
      console.error('Error deleting subpoint:', error); // Handle any errors
    }
  };
  const deleteModule = async (moduleId) => {
    try {
      const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage

      await axios.delete(`${API_BASE_URL}/MasterModule/${moduleId}`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Add Bearer token to Authorization header
        },
      });

      fetchModules(); // Refresh the module list after deleting the module
    } catch (error) {
      console.error('Error deleting module:', error); // Handle any errors
    }
  };


  const openUpdateSubpointModal = (subpointId, moduleSubpointName, moduleId) => {
    setSubpointId(subpointId);
    setSubpointName(moduleSubpointName);
    setSelectedModuleId(moduleId);
    setShowUpdateSubpointModal(true);
  };

  const updateModule = async () => {
    const updatedModule = {
      moduleId: selectedModuleId,
      moduleName,
      moduleStartDate: new Date(moduleStartDate),
      moduleEndDate: new Date(moduleEndDate),
      instructorId,
      moCoId,
      noOfDays,
      durationHours,
    };

    try {
      const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage

      await axios.put(`${API_BASE_URL}/MasterModule/${selectedModuleId}`, updatedModule, {
        headers: {
          'Authorization': `Bearer ${token}`, // Add Bearer token to Authorization header
          'Content-Type': 'application/json', // Optional for PUT requests
        },
      });

      fetchModules(); // Refresh the module list after updating the module
      setShowUpdateModal(false); // Close the update modal
      setSelectedModuleId(null); // Reset selected module ID
    } catch (error) {
      console.error('Error updating module:', error); // Handle any errors
    }
  };



  const openUpdateModuleModal = (module) => {
    setSelectedModuleId(module.moduleId);
    setModuleName(module.moduleName);
    setModuleStartDate(new Date(module.moduleStartDate).toISOString().split('T')[0]);
    setModuleEndDate(new Date(module.moduleEndDate).toISOString().split('T')[0]);
    setInstructorId(module.instructorId);
    setMoCoId(module.moCoId);
    setNoOfDays(module.noOfDays);
    setDurationHours(module.durationHours);
    setShowUpdateModal(true);
  };

  return (
    <div className="" style={{ width: "90%", margin: "0 auto" }}>
      <h2
        style={{
          marginTop: "80px",
          marginBottom: "30px",
          color: "#2c3e50", // Dark color
          fontFamily: "'Montserrat', sans-serif", // Modern font
          fontWeight: "bold",
          fontSize: "3rem", // Larger font size
          textTransform: "uppercase",
          textShadow: "5px 5px 10px rgba(0, 0, 0, 0.2), -5px -5px 10px rgba(255, 255, 255, 0.3)", // 3D text shadow
          letterSpacing: "3px", // Add some space between letters
        }}
      >
        Master Modules</h2>

      {/* Modal for Adding Module */}
      {showModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Module</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="moduleName" className="form-label fw-bold">Module Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="moduleName"
                    value={moduleName}
                    onChange={e => setModuleName(e.target.value)}
                  />
                  {!moduleName && <small className="text-danger">Module name is required.</small>}
                </div>
                <div className="mb-3">
                  <label htmlFor="moduleStartDate" className="form-label fw-bold">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="moduleStartDate"
                    value={moduleStartDate}
                    onChange={e => setModuleStartDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]} // Start date cannot be before today
                  />
                  {!moduleStartDate && <small className="text-danger">Start date is required.</small>}
                </div>
                <div className="mb-3">
                  <label htmlFor="moduleEndDate" className="form-label fw-bold">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="moduleEndDate"
                    value={moduleEndDate}
                    onChange={e => setModuleEndDate(e.target.value)}
                    min={moduleStartDate} // End date must be later than start date
                  />
                  {!moduleEndDate && <small className="text-danger">End date is required.</small>}
                  {moduleStartDate && moduleEndDate && new Date(moduleEndDate) < new Date(moduleStartDate) && (
                    <small className="text-danger">End date cannot be earlier than start date.</small>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="instructorId" className="form-label fw-bold">Instructor</label>
                  <select
                    className="form-control"
                    value={instructorId}
                    onChange={e => setInstructorId(e.target.value)}
                  >
                    <option value={null}>Select Instructor</option>
                    {instructors.map(instructor => (
                      <option key={instructor.prn} value={instructor.prn}>
                        {instructor.firstName} {instructor.lastName} ({instructor.prn})
                      </option>
                    ))}
                  </select>
                  {!instructorId && <small className="text-danger">Instructor is required.</small>}
                </div>
                <div className="mb-3">
                  <label htmlFor="moCoId" className="form-label fw-bold">Module Co-ordinator</label>
                  <select
                    className="form-control"
                    value={moCoId}
                    onChange={e => setMoCoId(e.target.value)}
                  >
                    <option value={null}>Select Module Co-ordinator</option>
                    {moCos.map(moCo => (
                      <option key={moCo.prn} value={moCo.prn}>
                        {moCo.firstName} {moCo.lastName} ({moCo.prn})
                      </option>
                    ))}
                  </select>
                  {!moCoId && <small className="text-danger">Module Co-ordinator is required.</small>}
                </div>
                <div className="mb-3">
                  <label htmlFor="noOfDays" className="form-label fw-bold">Number of Days</label>
                  <input
                    type="number"
                    className="form-control"
                    id="noOfDays"
                    value={noOfDays}
                    min="1"
                    max="125"
                    step="1"
                    onChange={e => setNoOfDays(e.target.value)}
                  />
                  {(!noOfDays || noOfDays <= 0) && (
                    <small className="text-danger">Please enter a valid number of days.</small>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="durationHours" className="form-label fw-bold">Duration (Hours)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="durationHours"
                    value={durationHours}
                    min="1"
                    max="125"
                    step="1"
                    onChange={e => setDurationHours(e.target.value)}
                  />
                  {(!durationHours || durationHours <= 0) && (
                    <small className="text-danger">Please enter a valid duration in hours.</small>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    if (
                      moduleName &&
                      moduleStartDate &&
                      moduleEndDate &&
                      new Date(moduleEndDate) >= new Date(moduleStartDate) &&
                      instructorId &&
                      moCoId &&
                      noOfDays > 0 &&
                      durationHours > 0
                    ) {
                      addModule();
                    } else {
                      alert("Please fill all fields correctly.");
                    }
                  }}
                >
                  Add Module
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Updating Subpoint */}
      {showUpdateSubpointModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Subpoint</h5>
                <button type="button" className="btn-close" onClick={() => setShowUpdateSubpointModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="subpointName" className="form-label fw-bold">Subpoint Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="subpointName"
                    value={subpointName}
                    onChange={e => setSubpointName(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowUpdateSubpointModal(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={updateSubpoint}>Update Subpoint</button>
              </div>
            </div>
          </div>
        </div>
      )}




      {/* Modal for Updating Module */}
      {showUpdateModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Module</h5>
                <button type="button" className="btn-close" onClick={() => setShowUpdateModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="moduleName" className="form-label fw-bold">Module Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="moduleName"
                    value={moduleName}
                    onChange={e => setModuleName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="moduleStartDate" className="form-label fw-bold">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="moduleStartDate"
                    value={moduleStartDate}
                    onChange={e => setModuleStartDate(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="moduleEndDate" className="form-label fw-bold">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="moduleEndDate"
                    value={moduleEndDate}
                    onChange={e => setModuleEndDate(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="instructorId" className="form-label fw-bold">Instructor</label>
                  <select
                    className="form-control"
                    value={instructorId}
                    onChange={e => setInstructorId(e.target.value)}
                  >
                    <option value={null}>Select Instructor</option>
                    {instructors.map(instructor => (
                      <option key={instructor.prn} value={instructor.prn}>
                        {instructor.firstName} {instructor.lastName} ({instructor.prn})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="moCoId" className="form-label fw-bold">Module Co-ordinator</label>
                  <select
                    className="form-control"
                    value={moCoId}
                    onChange={e => setMoCoId(e.target.value)}
                  >
                    <option value={null}>Select Module Co-ordinator</option>
                    {moCos.map(moCo => (
                      <option key={moCo.prn} value={moCo.prn}>
                        {moCo.firstName} {moCo.lastName} ({moCo.prn})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="noOfDays" className="form-label fw-bold">Number of Days</label>
                  <input
                    type="number"
                    className="form-control"
                    id="noOfDays"
                    value={noOfDays}
                    onChange={e => setNoOfDays(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="durationHours" className="form-label fw-bold">Duration (Hours)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="durationHours"
                    value={durationHours}
                    onChange={e => setDurationHours(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowUpdateModal(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={updateModule}>Update Module</button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Modal for Adding Subpoint */}
      {showSubpointModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Subpoint</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowSubpointModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="subpointName" className="form-label fw-bold">
                    Subpoint Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="subpointName"
                    value={subpointName}
                    onChange={(e) => setSubpointName(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowSubpointModal(false)}
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={addSubpoint}>
                  Add Subpoint
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Pagination Controls */}
      <div className="mb-3">
        <button className="btn btn-primary mb-3 me-4" onClick={() => setShowModal(true)}>
          Add Module
        </button>
        <button
          className="btn btn-primary mb-3 me-4"
          onClick={toggleActionsColumn}
        >
          {showActions ? "Hide Subpoints Actions" : "Show Subpoints Actions"}
        </button>
        <button
          className="btn btn-secondary mb-3 me-4"
          onClick={toggleDeleteModuleColumn}
        >
          {showDeleteModule ? "Hide Module Change" : "Show Module Change"}
        </button>
      </div>

      {/* Module Table */}
      <table className="table table-striped table-bordered" style={{ borderRadius: '10px', overflow: 'hidden' }}>
        <thead className="table-dark">
          <tr>
            <th className="text-center align-middle">Module</th>
            <th className="text-center align-middle">Subpoints</th>
            {showActions && <th className="text-center align-middle">Actions</th>}
            <th className="text-center align-middle">Actions</th>
            {showDeleteModule && (
              <th className="text-center align-middle">Module Changes</th>
            )}
          </tr>
        </thead>
        <tbody>
          {currentModules.map((module) => (
            <React.Fragment key={module.moduleId}>
              {/* Check if the module has subpoints */}
              {module.masterModuleSubpoints.length === 0 ? (
                // Module without subpoints
                <tr>
                  <td className="align-middle">
                    <div>
                      <strong>Module Name:</strong> {module.moduleName}
                      <br />
                      <strong>Start Date:</strong> {new Date(module.moduleStartDate).toLocaleDateString('en-GB').replace(/\//g, '-')}
                      <br />
                      <strong>End Date:</strong> {new Date(module.moduleEndDate).toLocaleDateString('en-GB').replace(/\//g, '-')}
                      <br />
                      <strong>Instructor:</strong> {module.instructorName} {module.instructorLastName}
                      <br />
                      <strong>Module Co-ordinator:</strong> {module.moCoName} {module.lastName}
                      <br />
                      <strong>Days:</strong> {module.noOfDays}
                      <br />
                      <strong>Total Hours:</strong> {module.durationHours}
                    </div>
                  </td>
                  <td className="align-middle"></td> {/* Empty subpoints column */}
                  {showActions && <td className="align-middle"></td>} {/* No actions */}
                  {/* Add Subpoint button */}
                  <td className="text-center align-middle">
                    <button
                      className="btn btn-info"
                      onClick={() => openAddSubpointModal(module.moduleId)}
                    >
                      Add Subpoint
                    </button>
                  </td>
                  {showDeleteModule && (
                    <td className="text-center align-middle">
                      <button
                        className="btn btn-info mb-4"
                        onClick={() => openUpdateModuleModal(module)}
                      >
                        Update Module
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteModule(module.moduleId)}
                      >
                        Delete Module
                      </button>
                    </td>
                  )}
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
                          style={{ width: "40%" }}
                        >
                          <div>
                            <strong>Module Name:</strong> {module.moduleName}
                            <br />
                            <strong>Start Date:</strong>{" "}
                            {new Date(module.moduleStartDate).toLocaleDateString('en-GB').replace(/\//g, '-')}
                            <br />
                            <strong>End Date:</strong>{" "}
                            {new Date(module.moduleEndDate).toLocaleDateString('en-GB').replace(/\//g, '-')}
                            <br />
                            <strong>Instructor:</strong> {module.instructorName} {module.instructorLastName}
                            <br />
                            <strong>Module Co-ordinator:</strong> {module.moCoName} {module.lastName}
                            <br />
                            <strong>Days:</strong> {module.noOfDays}
                            <br />
                            <strong>Total Hours:</strong> {module.durationHours}
                          </div>
                        </td>
                      </>
                    )}
                    <td>{subpoint.moduleSubpointName}</td>
                    {showActions && (
                      <td className="text-center">
                        <button
                          className="btn btn-warning btn-sm ms-2"
                          onClick={() =>
                            openUpdateSubpointModal(
                              subpoint.subId,
                              subpoint.moduleSubpointName,
                              subpoint.moduleId
                            )
                          }
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-danger btn-sm ms-2"
                          onClick={() => deleteSubpoint(subpoint.subId)}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                    {index === 0 && (
                      <>
                        <td
                          rowSpan={module.masterModuleSubpoints.length}
                          className="text-center align-middle"
                          style={{ width: "10%" }}
                        >
                          <button
                            className="btn btn-info"
                            onClick={() => openAddSubpointModal(module.moduleId)}
                          >
                            Add Subpoint
                          </button>
                        </td>
                        {showDeleteModule && (
                          <td
                            rowSpan={module.masterModuleSubpoints.length}
                            className="text-center align-middle"
                            style={{ width: "10%" }}
                          >
                            <button
                              className="btn btn-info mb-4"
                              onClick={() => openUpdateModuleModal(module)}
                            >
                              Update Module
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => deleteModule(module.moduleId)}
                            >
                              Delete Module
                            </button>
                          </td>
                        )}
                      </>
                    )}
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

      {/* Pagination Navigation */}
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

export default AdminSyllabus;
