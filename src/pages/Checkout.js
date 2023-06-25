import React, { useState } from 'react';
import Footer from './Footer';

const Checkout = ({ cartItems, clearCart }) => {
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleShippingAddressChange = (e) => {
    setShippingAddress(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePlaceOrder = () => {
    // Logic for placing the order
    // Need to provide the shippingAddress, paymentMethod, and cartItems to process the order
    // Clear the cart after placing the order
    clearCart();
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <div className="shipping-address">
        <h3>Shipping Address</h3>
        <input
          type="text"
          placeholder="Enter your shipping address"
          value={shippingAddress}
          onChange={handleShippingAddressChange}
        />
      </div>
      <div className="payment-method">
        <h3>Payment Method</h3>
        <select value={paymentMethod} onChange={handlePaymentMethodChange}>
          <option value="">Select a payment method</option>
          <option value="credit-card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="cash-on-delivery">Cash on Delivery</option>
        </select>
      </div>
      <div className="order-summary">
        <h3>Order Summary</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <span>{item.title}</span>
              <span>${item.price}</span>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default Checkout;