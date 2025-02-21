import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function TPOPlacements() {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    companyName: "",
    date: "",
    ctc: "",
    role: "",
    jobDescription: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editCompanyId, setEditCompanyId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [companiesPerPage, setCompaniesPerPage] = useState(10);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const [searchQuery, setSearchQuery] = useState("");

  const [roleFilter, setRoleFilter] = useState("");
  const [ctcRange, setCtcRange] = useState({ min: "", max: "" });
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [statusFilter, setStatusFilter] = useState(""); // State to track selected status filter

  const [uniqueRoles, setUniqueRoles] = useState([]); // State to store unique roles
  const apiBaseUrl = "http://localhost:8080/api/companies";

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}`);
      setCompanies(response.data);

      // Extract unique roles from companies data
      const roles = [...new Set(response.data.map((company) => company.role))];
      setUniqueRoles(roles);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredCompanies = companies.filter((company) => {
    const matchesSearchQuery =
      company.date.toLowerCase().includes(searchQuery) ||
      company.companyName.toLowerCase().includes(searchQuery) ||
      company.role.toLowerCase().includes(searchQuery) ||
      company.ctc.toString().toLowerCase().includes(searchQuery) ||
      company.jobDescription.toLowerCase().includes(searchQuery);

    const computeCompanyStatus = (date) => {
      const today = new Date();
      const companyDate = new Date(date);

      if (companyDate.toDateString() === today.toDateString()) return "In process";
      if (companyDate < today) return "Completed";
      return "Upcoming";
    };

    const matchesStatusFilter = statusFilter
      ? computeCompanyStatus(company.date) === statusFilter
      : true;

    const matchesRoleFilter =
      roleFilter === "" || company.role.toLowerCase() === roleFilter.toLowerCase();

    const matchesCTCRange =
      (ctcRange.min === "" || company.ctc >= parseFloat(ctcRange.min)) &&
      (ctcRange.max === "" || company.ctc <= parseFloat(ctcRange.max));

    const matchesDateRange =
      (dateRange.start === "" || new Date(company.date) >= new Date(dateRange.start)) &&
      (dateRange.end === "" || new Date(company.date) <= new Date(dateRange.end));

    return (
      matchesSearchQuery &&
      matchesStatusFilter &&
      matchesRoleFilter &&
      matchesCTCRange &&
      matchesDateRange
    );
  });


  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const totalCompanies = companies.length;

  const beforeToday = companies.filter((company) => {
    const companyDate = new Date(company.date);
    companyDate.setHours(0, 0, 0, 0);
    return companyDate < today;
  }).length;

  const afterToday = companies.filter((company) => {
    const companyDate = new Date(company.date);
    companyDate.setHours(0, 0, 0, 0);
    return companyDate > today;
  }).length;

  const todayCount = companies.filter((company) => {
    const companyDate = new Date(company.date);
    companyDate.setHours(0, 0, 0, 0);
    return companyDate.getTime() === today.getTime();
  }).length;


  const computeStatus = (date) => {
    const today = new Date();
    const companyDate = new Date(date);
    if (companyDate.toDateString() === today.toDateString()) return "In process";
    if (companyDate < today) return "Completed";
    return "Upcoming";
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedCompanies = [...companies].sort((a, b) => {
      if (key === "ctc") {
        return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
      }
      if (key === "date") {
        return direction === "asc"
          ? new Date(a[key]) - new Date(b[key])
          : new Date(b[key]) - new Date(a[key]);
      }
      if (key === "companyName") {
        return direction === "asc"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }
      if (key === "status") {
        const statusOrder = { "Completed": 1, "In process": 2, "Upcoming": 3 };
        return direction === "asc"
          ? statusOrder[computeStatus(a.date)] - statusOrder[computeStatus(b.date)]
          : statusOrder[computeStatus(b.date)] - statusOrder[computeStatus(a.date)];
      }
      return 0;
    });

    setCompanies(sortedCompanies);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addCompany = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiBaseUrl}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setCompanies([...companies, response.data]);
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error("Error adding company:", error);
    }
  };

  const editCompany = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${apiBaseUrl}/${editCompanyId}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setCompanies(companies.map((company) => (company.companyId === editCompanyId ? response.data : company)));
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error("Error editing company:", error);
    }
  };

  const deleteCompany = async (id) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      try {
        await axios.delete(`${apiBaseUrl}/${id}`);
        setCompanies(companies.filter((company) => company.companyId !== id));
      } catch (error) {
        console.error("Error deleting company:", error);
      }
    }
  };


  const handleEditClick = (company) => {
    setIsEditMode(true);
    setEditCompanyId(company.companyId);
    setFormData({
      companyName: company.companyName,
      date: company.date.slice(0, 16),
      ctc: company.ctc,
      role: company.role,
      jobDescription: company.jobDescription,
    });
    setShowForm(true);
  };

  const handleCTCChange = (e) => {
    const { value } = e.target;
    const regex = /^\d+(\.\d{0,2})?$/;
    if (regex.test(value)) {
      setFormData({ ...formData, ctc: value });
    }
  };

  const handleAddClick = () => {
    resetForm();
    setIsEditMode(false);
    setShowForm(true);
  };

  const handleCompaniesPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setCompaniesPerPage(value);
      setCurrentPage(1);
    }
  };

  const resetForm = () => {
    setFormData({
      companyName: "",
      date: "",
      ctc: "",
      role: "",
      jobDescription: "",
    });
    setIsEditMode(false);
    setEditCompanyId(null);
    setShowForm(false);
  };

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);
  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const clearFilters = () => {
    setRoleFilter("");
    setCtcRange({ min: "", max: "" });
    setDateRange({ start: "", end: "" });
    setSearchQuery("");
    setStatusFilter("");
  };


  return (
    <div className="container my-5" style={{ maxWidth: "1500px" }}>
      <header className="text-center mb-4">
        <h1 className="text-primary pt-5">Placement Dashboard</h1>
      </header>
       {/* Statistics Section */}
       <div className="row mb-5">
            <div className="col-md-3 text-center">
              <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">Total Companies</div>
                <div className="card-body">
                  <h4>{totalCompanies}</h4>
                </div>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <div className="card shadow-sm">
                <div className="card-header bg-success text-white">In process</div>
                <div className="card-body">
                  <h4>{todayCount}</h4>
                </div>
              </div>
            </div>
            
            <div className="col-md-3 text-center">
              <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">Upcoming</div>
                <div className="card-body">
                  <h4>{afterToday}</h4>
                </div>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <div className="card shadow-sm">
                <div className="card-header bg-danger text-white">Completed</div>
                <div className="card-body">
                  <h4> {beforeToday}</h4>
                </div>
              </div>
            </div>
          </div>

      <div className="text-center mb-3">
        <button onClick={handleAddClick} className="btn btn-success">
          Add Company
        </button>
      </div>

      {showForm && (
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-info text-white text-center">
            <h5>{isEditMode ? "Edit Company Details" : "Add New Company"}</h5>
          </div>
          <div className="card-body">
            <form onSubmit={isEditMode ? editCompany : addCompany}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="companyName" className="fw-bold mb-2 ms-2">Company Name</label>
                  <input
                    id="companyName"
                    type="text"
                    name="companyName"
                    className="form-control"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Company Name"
                    required
                    maxLength={100}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="date" className="fw-bold mb-2 ms-2">Date</label>
                  <input
                    id="date"
                    type="date"
                    name="date"
                    className="form-control"
                    value={formData.date}
                    onChange={handleChange}
                    placeholder="Date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    max={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="ctc" className="fw-bold mb-2 ms-2">CTC</label>
                  <input
                    id="ctc"
                    type="number"
                    step="0.01"
                    name="ctc"
                    className="form-control"
                    value={formData.ctc}
                    onChange={handleCTCChange}
                    placeholder="CTC"
                    required
                    min="300000"
                    max="5000000"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="role" className="fw-bold mb-2 ms-2">Role</label>
                  <input
                    id="role"
                    type="text"
                    name="role"
                    className="form-control"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="Role"
                    required
                    maxLength={50}
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="jobDescription" className="fw-bold mb-2 ms-2">Job Description</label>
                  <textarea
                    id="jobDescription"
                    name="jobDescription"
                    className="form-control"
                    value={formData.jobDescription}
                    onChange={handleChange}
                    placeholder="Job Description"
                    required
                    maxLength={65000}
                  />
                </div>
              </div>
              <div className="text-center mt-3">
                <button type="submit" className="btn btn-success">
                  {isEditMode ? "Update Company" : "Add Company"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn btn-secondary ms-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="text-left mb-3 ">
        <label htmlFor="form-control" className="form-label text-start fw-bold">Search</label>
        <input
          type="text"
          id="form-control"
          placeholder="Search by Date, Company Name, Role, CTC, Description"
          value={searchQuery}
          onChange={handleSearchChange}
          className="form-control"
        />
      </div>


      <div className="row mb-3 align-items-center d-flex">
        {/* Role Filter Dropdown */}
        <div className="col-md-2">
          <label className="form-label fw-bold">Role</label>
          <select
            className="form-control"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">All Roles</option>
            {uniqueRoles.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter Dropdown */}
        <div className="col-md-2">
          <label className="form-label fw-bold">Status</label>
          <select
            className="form-control"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Upcoming">Upcoming</option>
            <option value="In process">In Process</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* CTC Range Inputs */}
        <div className="col-md-3">
          <label className="form-label fw-bold">CTC Range</label>
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              placeholder="Min CTC"
              value={ctcRange.min}
              min="300000"
              max="4999999"
              onChange={(e) => setCtcRange({ ...ctcRange, min: e.target.value })}
            />
            <span style={{ padding: '0 10px', marginTop: '9px' }}>to</span>
            <input
              type="number"
              className="form-control"
              placeholder="Max CTC"
              value={ctcRange.max}
              min="300001"
              max="5000000"
              onChange={(e) => setCtcRange({ ...ctcRange, max: e.target.value })}
            />
          </div>
        </div>

        {/* Date Range Inputs */}
        <div className="col-md-3">
          <label className="form-label fw-bold">Date Range</label>
          <div className="input-group">
            <input
              type="date"
              className="form-control"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            />
            <span style={{ padding: '0 10px', marginTop: '9px' }}>to</span>
            <input
              type="date"
              className="form-control"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            />
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="col-md-2 text-center mt-2">
          <button className="btn btn-primary mt-4" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>



      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h5 className="m-0">Companies List</h5>
          <h5 className="m-0">Total Companies: {companies.length}</h5>
        </div>

        <div className="card-body">
          {currentCompanies.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th style={{ textAlign: "center", verticalAlign: "middle" }}>Sr. No.</th>
                    <th onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>
                      Date {sortConfig.key === "date" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                    </th>
                    <th onClick={() => handleSort("companyName")} style={{ cursor: "pointer" }}>
                      Company Name {sortConfig.key === "companyName" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                    </th>
                    <th style={{ width: '200px' }}>Role</th>
                    <th onClick={() => handleSort("ctc")} style={{ cursor: "pointer", textAlign: "center" }}>
                      CTC {sortConfig.key === "ctc" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                    </th>
                    <th>Description</th>
                    <th onClick={() => handleSort("status")} style={{ cursor: "pointer", textAlign: "center" }}>Status {sortConfig.key === "status" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}</th>
                    <th style={{ textAlign: "center", verticalAlign: "middle" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCompanies.map((company, index) => (
                    <tr key={company.companyId}>
                      <td style={{ textAlign: "center", verticalAlign: "middle" }}>{indexOfFirstCompany + index + 1}</td>
                      <td>{company.date.split('-').reverse().join('-')}</td>
                      <td title={company.companyName}>
                        {company.companyName.length > 20
                          ? `${company.companyName.slice(0, 20)}...`
                          : company.companyName}
                      </td>
                      <td title={company.role}>
                        {company.role.length > 20
                          ? `${company.role.slice(0, 20)}...`
                          : company.role}
                      </td>
                      <td style={{ textAlign: "right", verticalAlign: "middle", paddingRight: "50px" }}>
                        {company.ctc.toFixed(2)} ₹
                      </td>

                      <td title={company.jobDescription}>
                        {company.jobDescription.length > 5
                          ? `${company.jobDescription.slice(0, 10)}...`
                          : company.jobDescription}
                      </td>

                      <td
                        style={{
                          cursor: "pointer",
                          textAlign: "center",
                          color:
                            computeStatus(company.date) === "In process"
                              ? "green"
                              : computeStatus(company.date) === "Completed"
                                ? "red"
                                : computeStatus(company.date) === "Upcoming"
                                  ? "blue"
                                  : "black",
                        }}
                      >
                        {computeStatus(company.date)}
                      </td>

                      <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                        <button
                          onClick={() => handleEditClick(company)}
                          className="btn btn-warning btn-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCompany(company.companyId)}
                          className="btn btn-danger btn-sm ms-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted text-center">No companies available.</p>
          )}

          <nav>
            <ul className="pagination justify-content-center">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? "active" : ""}`}>
                  <button className="page-link" onClick={() => handlePageChange(pageNumber)}>
                    {pageNumber}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="text-center mb-3">
            <label>
              Companies per page:
              <input
                type="number"
                value={companiesPerPage}
                onChange={handleCompaniesPerPageChange}
                className="form-control d-inline-block mx-2"
                style={{ width: "100px" }}
                min="1"
              />
            </label>
          </div>




        </div>
      </div>
    </div>
  );
}

export default TPOPlacements;
