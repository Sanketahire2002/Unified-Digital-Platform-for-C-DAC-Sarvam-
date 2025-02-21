import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap for styling
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LoginPage = () => {
  const [formData, setFormData] = useState({
    formNumber: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  // Apply blur effect to background when confirmation popup is shown
  React.useEffect(() => {
    document.body.style.overflow = showConfirmation ? "hidden" : "auto"; // Prevent scrolling when popup is shown
  }, [showConfirmation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "formNumber" && /^[0-9]*$/.test(value) && value.length <= 10) {
      setFormData({ ...formData, [name]: value });
    } else if (name !== "formNumber") {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUserData(null);

    try {
      const response = await axios.post("http://localhost:5000/api/Auth/login", formData);

      if (response.data === "Already Active") {
        setMessage("Already Active");
      } else {
        setUserData(response.data);
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data);
      } else {
        setMessage("Something went wrong!");
      }
    }
  };

  const handlePayFee = () => {
    setShowConfirmation(true);
  };

  const confirmPayment = async () => {
    setShowConfirmation(false);
    try {
      const response = await axios.post("http://localhost:5000/api/UserCredentials", {
        formNumber: userData.formNumber,
        email: userData.email,
      });
      alert("Thank you! Payment successful! Please check your email for the PRN Number and Password.");
      navigate("/login"); // Redirect to login page after successful payment
    } catch (error) {
      setMessage("Payment failed. Please try again.");
    }
  };

  const cancelPayment = () => {
    setShowConfirmation(false);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: 'linear-gradient(to bottom, #a1c4fd, #c2e9fb)', // Heaven-like gradient
        minHeight: '100vh',
      }}
    >
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        {/* Render Login Form only when userData is null */}
        {!userData && (
          <div className="col-md-4 col-sm-6 col-12 mt-5 p-4 shadow-sm rounded" style={{ backgroundColor: "#f0f8ff" }}>
            <h1 className="text-center text-info mb-4">Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-dark">Form Number:</label>
                <input
                  type="text"
                  name="formNumber"
                  value={formData.formNumber}
                  onChange={handleChange}
                  className="form-control shadow-sm"
                  required
                  style={{ borderColor: "#2ecc71" }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-dark">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control shadow-sm"
                  required
                  style={{ borderColor: "#2ecc71" }}
                />
              </div>
              <button type="submit" className="btn btn-success w-100 py-2 mt-2 shadow">
                Login
              </button>
            </form>

            {message && <p className="text-danger mt-3">{message}</p>}
          </div>
        )}

        {/* User Details (Displayed Below the Login Form) */}
        {userData && (
          <div className="container mt-4"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)', // semi-transparent white
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // subtle shadow
              borderRadius: '10px', // rounded corners
              marginLeft: '20px', // left margin of 20px
              padding: '20px', // padding of 20px
            }}
          >
            <h2 className="text-center text-success">User Details</h2>
            <div className="row">
              {/* Left Section */}
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Name:</label>
                  <input type="text" value={userData.name} className="form-control" disabled />
                </div>
                <div className="mb-3">
                  <label className="form-label">DOB:</label>
                  <input type="text" value={userData.dob} className="form-control" disabled />
                </div>
                <div className="mb-3">
                  <label className="form-label">Gender:</label>
                  <input type="text" value={userData.gender} className="form-control" disabled />
                </div>
                <div className="mb-3">
                  <label className="form-label">Nationality:</label>
                  <input type="text" value={userData.nationality} className="form-control" disabled />
                </div>
                <div className="mb-3">
                  <label className="form-label">Aadhar Card:</label>
                  <input type="text" value={userData.aadharCard} className="form-control" disabled />
                </div>
              </div>

              {/* Right Section */}
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">CCAT Rank:</label>
                  <input type="text" value={userData.ccatRank} className="form-control" disabled />
                </div>
                <div className="mb-3">
                  <label className="form-label">Mobile Number:</label>
                  <input type="text" value={userData.mobileNumber} className="form-control" disabled />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email:</label>
                  <input type="text" value={userData.email} className="form-control" disabled />
                </div>
                <div className="mb-3">
                  <label className="form-label">Status:</label>
                  <input type="text" value={userData.status} className="form-control" disabled />
                </div>
                <div className="mb-3">
                  <label className="form-label">Amount:</label>
                  <div
                    className="form-control"
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      padding: "10px",
                      backgroundColor: "#f8f9fa", // Same as input background
                      border: "1px solid #ced4da", // Same as input border
                      borderRadius: "0.375rem" // Rounded corners
                    }}
                  >
                    90,000 Rs.
                  </div>
                </div>
              </div>
              {/* Pay Fee and Cancel Buttons */}
              <div className="d-flex justify-content-center align-items-center mt-3">
                <button onClick={handlePayFee} className="btn btn-warning w-48 py-2 mx-2 shadow">
                  Pay Fee
                </button>
                <button onClick={() => window.location.reload()} className="btn btn-danger w-48 py-2 mx-2 shadow">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Background Blur Effect */}
        {showConfirmation && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1040,
              filter: "blur(5px)",
            }}
          ></div>
        )}

        {/* Confirmation Popup (Displayed Separately with Enhanced Design) */}
        {showConfirmation && (
          <div className="confirmation-popup d-flex justify-content-center align-items-center" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1050 }}>
            <div className="p-4 shadow rounded" style={{ backgroundColor: "#fff", maxWidth: "400px", width: "100%", opacity: 1, transform: "scale(1)", transition: "transform 0.3s ease-in-out" }}>
              <div className="text-center mb-3">
                <h4 className="text-danger">Are you sure you want to pay the fee?</h4>
                <p>Please confirm your payment action.</p>
              </div>
              <div className="d-flex justify-content-between">
                <button onClick={confirmPayment} className="btn btn-success">Yes, Confirm</button>
                <button onClick={cancelPayment} className="btn btn-danger">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
