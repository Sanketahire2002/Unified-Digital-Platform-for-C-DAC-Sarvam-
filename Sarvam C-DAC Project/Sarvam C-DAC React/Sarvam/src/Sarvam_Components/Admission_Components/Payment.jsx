import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, Alert, Card, Spinner } from "react-bootstrap";

const Payment = () => {
    const [formData, setFormData] = useState({
        email: "abc@gmail.com",
        cardHolderName: "",
        cardNumber: "",
        paymentToken: "",
        expiryMonth: "",
        expiryYear: "",
        currency: "INR",
        amount: "95000.00",
    });

    const [responseMessage, setResponseMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);



    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Dynamically set paymentToken based on card number
        const updatedFormData = { ...formData }; // Create a new object to modify
        if (updatedFormData.cardNumber === "4242424242424242") {
            updatedFormData.paymentToken = "pm_card_visa";
        } else {
            updatedFormData.paymentToken = "pm_card_chargeDeclined";
        }

        try {
            const response = await axios.post("http://localhost:8080/api/payments/create", updatedFormData);
            const successMessage = response.data.message || "Transaction completed";
            window.close();
            alert(successMessage);
            if (window.opener) {
                window.opener.postMessage({ status: "success", message: successMessage }, window.location.origin);
            }
            

        } catch (error) {
            const errorMsg = error.response?.data?.message || "Payment Failed";
            window.close();
            alert(errorMsg);
            if (window.opener) {
                window.opener.postMessage({ status: "error", message: errorMsg }, window.location.origin);
            }
        } finally {
            setTimeout(() => {
                window.close();
            }, 500);
        }
    };


    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Card className="p-4 glass-card" style={{ width: "420px", borderRadius: "15px" }}>
                <Card.Body>
                    <h3 className="text-center text-white fw-bold mb-4">💳 Secure Payment</h3>

                    {responseMessage && (
                        <Alert variant="success">
                            ✅ Payment Successful! <br />
                            <strong>Transaction ID:</strong> {responseMessage.transactionId}
                        </Alert>
                    )}
                    {errorMessage && (
                        <Alert variant="danger">
                            ❌ {errorMessage}
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        {/* Email */}
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="hidden"
                                name="email"
                                value={formData.email || "default@example.com"}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        {/* Cardholder Name */}
                        <Form.Group className="mb-3">
                            <Form.Label className="text-white">Cardholder Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="cardHolderName"
                                className="custom-input"
                                placeholder="Full Name"
                                value={formData.cardHolderName}
                                onChange={handleChange}
                                maxLength={50}  // Limit to 50 characters
                                required
                            />
                        </Form.Group>

                        {/* Card Number */}
                        <Form.Group className="mb-3">
                            <Form.Label className="text-white">Card Number</Form.Label>
                            <Form.Control
                                type="number"
                                name="cardNumber"
                                className="custom-input"
                                placeholder="1234 5678 9012 3456"
                                maxLength="16"
                                value={formData.cardNumber}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                                    if (value.length <= 16) {
                                        handleChange({ target: { name: "cardNumber", value } });
                                    }
                                }}
                                required
                            />
                        </Form.Group>

                        {/* Payment Type (For Testing) */}
                        <Form.Group className="mb-3" hidden>  {/* Hides the Payment Type field */}
                            <Form.Label className="text-white">Payment Type (For Testing)</Form.Label>
                            <Form.Select name="paymentToken" className="custom-input" value={formData.paymentToken} onChange={handleChange}>
                                <option value="pm_card_visa">Visa - Success</option>
                                <option value="pm_card_chargeDeclined">Charge Declined</option>
                            </Form.Select>
                        </Form.Group>

                        {/* Expiry Date */}
                        <Row>
                            <Col>
                                {/* Expiry Month */}
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-white">Expiry Month</Form.Label>
                                    <Form.Select
                                        name="expiryMonth"
                                        className="custom-input"
                                        value={formData.expiryMonth}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" style={{ color: "black" }}>Select Month</option>
                                        {Array.from({ length: 12 }, (_, i) => (
                                            <option style={{ color: "black" }} key={i + 1} value={String(i + 1).padStart(2, "0")}>
                                                {String(i + 1).padStart(2, "0")}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>


                            </Col>
                            <Col>
                                {/* Expiry Year */}
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-white">Expiry Year</Form.Label>
                                    <Form.Select
                                        name="expiryYear"
                                        className="custom-input"
                                        value={formData.expiryYear}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" style={{ color: "black" }}>Select Year</option>
                                        {Array.from({ length: 50 }, (_, i) => {
                                            const year = new Date().getFullYear() + i;
                                            return (
                                                <option key={year} value={year} style={{ color: "black" }}>
                                                    {year}
                                                </option>
                                            );
                                        })}
                                    </Form.Select>
                                </Form.Group>



                            </Col>
                        </Row>

                        {/* Currency & Amount */}
                        <Form.Group className="mb-3">
                            <Form.Label className="text-white">Currency</Form.Label>
                            <Form.Select
                                name="currency"
                                className="custom-input"
                                value="INR"
                                onChange={handleChange}
                                disabled // Makes the dropdown unchangeable
                                style={{ color: "black" }}
                            >
                                <option value="INR" style={{ color: "black" }}>INR</option>
                            </Form.Select>
                        </Form.Group>


                        {/* Amount */}
                        <Form.Group className="mb-3">
                            <Form.Label className="text-white">Amount</Form.Label>
                            <Form.Control
                                type="number"
                                name="amount"
                                className="custom-input"
                                value={95000.00} // Set the fixed amount
                                readOnly // Prevents editing
                                required
                                disabled // Prevents editing
                                style={{ color: "black", fontWeight: "bold" }}
                            />
                        </Form.Group>

                        {/* Submit Button */}
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={loading}
                            className="w-100 fw-bold custom-btn"
                        >
                            {loading ? <Spinner animation="border" size="sm" /> : "Make Payment"}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

            {/* Custom CSS Styles */}
            <style>
                {`
          body {
            background: linear-gradient(to right, #1d2671, #c33764);
          }
          .glass-card {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
          }
          .custom-input {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
          }
          .custom-input::placeholder {
            color: rgba(255, 255, 255, 0.7);
          }
          .custom-btn {
            background: linear-gradient(to right, #ff512f, #dd2476);
            border: none;
            font-size: 18px;
            transition: 0.3s;
          }
          .custom-btn:hover {
            background: linear-gradient(to right, #dd2476, #ff512f);
          }
        `}
            </style>
        </Container>
    );
};

export default Payment;
