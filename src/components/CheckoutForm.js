import React, { useState } from "react";
import "./CheckoutForm.css";

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    paymentDetails: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div className={`checkout-container ${submitted ? "submitted" : ""}`}>
      <form onSubmit={handleSubmit} className="checkout-form">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="address">Address:</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <label htmlFor="paymentDetails">Payment Details:</label>
        <input
          type="text"
          id="paymentDetails"
          name="paymentDetails"
          value={formData.paymentDetails}
          onChange={handleChange}
          required
        />

        <button type="submit">Checkout</button>
      </form>

      {submitted && (
        <div className="confirmation-message">
          <h2>Order Confirme</h2>
          <p>Thank you for your order, {formData.name}!</p>
          <p>Your items will be shipped to:</p>
          <p>{formData.address}</p>
          <p>Payment details: {formData.paymentDetails}</p>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
