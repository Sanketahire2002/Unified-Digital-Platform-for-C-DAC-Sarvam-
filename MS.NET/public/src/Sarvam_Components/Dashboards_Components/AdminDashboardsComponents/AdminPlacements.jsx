import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminPlacements() {
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

  const apiBaseUrl = "http://localhost:8080/api/companies";

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}`);
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredCompanies = companies.filter((company) => {
    return (
      company.date.toLowerCase().includes(searchQuery) ||
      company.companyName.toLowerCase().includes(searchQuery) ||
      company.role.toLowerCase().includes(searchQuery) ||
      company.ctc.toString().toLowerCase().includes(searchQuery) ||
      company.jobDescription.toLowerCase().includes(searchQuery)
    );
  });

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

  return (
    <div className="container my-5">
      <header className="text-center mb-4">
        <h1 className="text-primary pt-5">Placement Dashboard</h1>
      </header>

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
                  <input
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
                  <input
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
                  <input
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
                  <input
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
                  <textarea
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

      <div className="text-center mb-3">
        <input
          type="text"
          placeholder="Search by Date, Company Name, Role, CTC, Description"
          value={searchQuery}
          onChange={handleSearchChange}
          className="form-control"
        />
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white text-center">
          <h5>Companies List</h5>
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

export default AdminPlacements;
