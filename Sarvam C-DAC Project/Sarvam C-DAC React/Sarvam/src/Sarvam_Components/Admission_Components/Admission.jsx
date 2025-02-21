import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CCATData from "./CCATData";

const Admission = () => {
  const [formNumber, setFormNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState(""); // State for API messages
  const [admissionData, setAdmissionData] = useState(null); // Store admission data

  // Handling Form Number Input (Restrict to 10 digits)
  const handleFormNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length <= 10) {
      setFormNumber(value);
    }
  };

  // Handling Password Input
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Form Validation
  const validateForm = () => {
    let newErrors = {};

    // Form Number Validation (Must be exactly 10 digits)
    if (formNumber.length !== 10) {
      newErrors.formNumber = "Form Number must be exactly 10 digits.";
    }

    // Password Validation (Strong password rules)
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 8 characters, include an uppercase, a lowercase, a number, and a special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handling Form Submission (Send POST request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:8080/api/ccat/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formNumber, password }),
      });

      const result = await response.json();

      if (result.message === "Not Found" || result.message === "Invalid Credentials" || result.message === "Already Admitted") {
        setServerMessage(result.message);
        setTimeout(() => setServerMessage(""), 3000); // Clear message after 3 seconds
        setFormNumber("");
        setPassword("");
      } else if (result.message === "Admission Successful" && result.data) {
        setFormNumber("");
        setPassword("");
        setErrors({});
        setAdmissionData(result.data);
      }
    } catch (error) {
      console.error("Error:", error);
      setServerMessage("Server Error. Please try again later.");
      setTimeout(() => setServerMessage(""), 3000);
    }
  };

  // Show CCATData page if admission data exists
  if (admissionData) {
    return <CCATData data={admissionData} />;
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
      }}
    >
      <div className="card p-4 shadow-lg rounded-4" style={{ width: "350px" }}>
        <h3 className="text-center fw-bold mb-4 text-primary">Admission Form</h3>
        
        {/* Show server message if exists */}
        {serverMessage && <div className="alert alert-danger text-center">{serverMessage}</div>}

        <form onSubmit={handleSubmit}>
          {/* Form Number Field */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Form Number</label>
            <input
              type="text"
              className={`form-control rounded-3 ${errors.formNumber ? "is-invalid" : ""}`}
              value={formNumber}
              onChange={handleFormNumberChange}
              placeholder="Enter 10-digit Form Number"
              required
            />
            {errors.formNumber && <div className="invalid-feedback">{errors.formNumber}</div>}
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className={`form-control rounded-3 ${errors.password ? "is-invalid" : ""}`}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter Password"
              required
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold rounded-3"
            style={{ transition: "0.3s" }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admission;
