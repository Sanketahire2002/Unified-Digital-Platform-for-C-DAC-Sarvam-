import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [error, setError] = useState('');
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Reset error state
    // Simple validation check for card inputs
    if (!cardNumber || !expiryDate || !cvv || !cardholderName || !billingAddress) {
      setError('Please fill in all fields');
      return;
    }

    // Simulate a successful payment submission
    setIsPaymentSuccessful(true);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: 'linear-gradient(to bottom, #f8d7da, #e7f3fe)',
        minHeight: '100vh',
      }}
    >
      <div
        className="container p-5 shadow-lg rounded bg-white"
        style={{ maxWidth: '600px', marginTop: '50px', marginBottom: '50px' }}
      >
        <h1 className="text-center mb-4 text-primary" style={{ fontWeight: 'bold' }}>
          Payment Information
        </h1>

        {isPaymentSuccessful ? (
          <div className="alert alert-success text-center" role="alert">
            Payment successful! Thank you for your payment.
            <Link to="/login" className="btn btn-primary mt-3 ms-5">Go to Login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="cardholderName" className="form-label">Cardholder Name</label>
              <input
                type="text"
                id="cardholderName"
                className="form-control"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cardNumber" className="form-label">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                className="form-control"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Enter your card number"
                maxLength="16"
              />
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                <input
                  type="month"
                  id="expiryDate"
                  className="form-control"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="cvv" className="form-label">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  className="form-control"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="CVV"
                  maxLength="3"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="billingAddress" className="form-label">Billing Address</label>
              <input
                type="text"
                id="billingAddress"
                className="form-control"
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
                placeholder="Enter your billing address"
              />
            </div>
            {error && <div className="text-danger mb-3">{error}</div>}
            <button
              type="submit"
              className="btn btn-success w-100 py-2 rounded-pill shadow-lg"
              style={{ fontWeight: 'bold' }}
            >
              Proceed to Pay
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
