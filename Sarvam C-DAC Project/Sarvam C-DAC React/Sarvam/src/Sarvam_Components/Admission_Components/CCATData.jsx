import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CCATData = ({ data }) => {
    
    const navigate = useNavigate();

    if (!data) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <h3 className="text-danger">No Admission Data Available</h3>
            </div>
        );
    }

    const handleCancel = () => {
        const confirmCancel = window.confirm("Are you sure you want to cancel and go back to the login page?");
        if (confirmCancel) {
            navigate("/"); // Redirect to login page
        }
    };

    const handlePayFee = () => {
        document.body.style.pointerEvents = "none"; // Disable interactions
        document.body.style.opacity = "0.1"; // Create blur effect
        const paymentPage = window.open(
            "/pay-fees", // URL of the payment page
            "_blank", // Open in a new window
            "width=800,height=600,left=200,top=100" // Removed 'noopener,noreferrer'
        );
        if (paymentPage) {
            paymentPage.onload = () => {
                paymentPage.postMessage(data, "*"); // Send data to payment page
            };

            // Listen for messages from the payment window
            const receiveMessage = async (event) => {
                if (event.origin !== window.location.origin) return; // Security check

                const { status, message } = event.data;
                if (status === "success") {
                    alert(`Payment Successful: ${message}`);
                    //console.log("Payment Successful and data is ", data);
                    try {
                        const response = await fetch("http://localhost:8080/api/users/register", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                firstName: data.firstName,
                                lastName: data.lastName,
                                email: data.email
                            }),
                        });
                        if (response.ok) {
                            const updateResponse = await fetch(`http://localhost:8080/api/ccat/update-status/${data.formNumber}`, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                }
                            });
                            const contentType = response.headers.get("content-type");
                            if (contentType && contentType.includes("application/json")) {
                                // If response is JSON
                                const result = await response.json();
                                alert(result.message || "User registered successfully!");
                            } else {
                                // If response is plain text
                                const textResult = await response.text();
                                alert(textResult); // Show plain text response in alert
                            }
                            window.location.reload();

                        } else {
                            alert("Registration failed!");

                        }
                    } catch (error) {
                        console.error("Error while registering user:", error);
                        alert("Error while registering user.");
                        window.location.reload();

                    }
                } else if (status === "error") {
                    alert(`Payment Failed: ${message}`);
                    window.location.reload();


                }
                window.removeEventListener("message", receiveMessage);
            };
            window.addEventListener("message", receiveMessage);

        }
    };



    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
        >
            <div className="card p-4 shadow-lg rounded-4" style={{ width: "500px" }}>
                <h3 className="text-center fw-bold mb-4 text-primary">
                    🎓 Admission Details
                </h3>

                <div className="list-group">

                    <div className="list-group-item d-flex justify-content-between">
                        <strong>📄 Form Number:</strong> <span>{data.formNumber}</span>
                    </div>
                    <div className="list-group-item d-flex justify-content-between">
                        <strong>👤 Name:</strong>{" "}
                        <span>{data.firstName + " " + data.lastName}</span>
                    </div>
                    <div className="list-group-item d-flex justify-content-between">
                        <strong>🎂 Date of Birth:</strong> <span>{data.dob}</span>
                    </div>
                    <div className="list-group-item d-flex justify-content-between">
                        <strong>⚧️ Gender:</strong> <span>{data.gender}</span>
                    </div>
                    <div className="list-group-item d-flex justify-content-between">
                        <strong>🌍 Nationality:</strong> <span>{data.nationality}</span>
                    </div>
                    <div className="list-group-item d-flex justify-content-between">
                        <strong>🆔 Aadhar Card:</strong> <span>{data.aadharCard}</span>
                    </div>
                    <div className="list-group-item d-flex justify-content-between">
                        <strong>🏆 CCAT Rank:</strong> <span>{data.ccatRank}</span>
                    </div>
                    <div className="list-group-item d-flex justify-content-between">
                        <strong>📞 Mobile:</strong> <span>{data.mobileNumber}</span>
                    </div>
                    <div className="list-group-item d-flex justify-content-between">
                        <strong>📧 Email:</strong> <span>{data.email}</span>
                    </div>
                    <div className="list-group-item d-flex justify-content-between">
                        <strong>📜 Status:</strong>{" "}
                        <span
                            className={`badge ${data.status === "Active" ? "bg-success" : "bg-primary"
                                }`}
                        >
                            Not Admitted
                        </span>
                    </div>
                    <div className="text-center mt-4 p-3 bg-light rounded">
                        <h5 className="fw-bold text-success">💰 Total Fee:</h5>
                        <h2 className="fw-bold text-primary">₹80,000</h2>
                        <span className="badge bg-warning text-dark">Inclusive of all charges</span>
                    </div>


                </div>

                {/* Buttons */}
                <div className="mt-4">
                    <button className="btn btn-danger me-3" onClick={handleCancel}>
                        ❌ Cancel
                    </button>
                    <button className="btn btn-success" onClick={handlePayFee}>
                        💳 Pay Fee
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CCATData;
