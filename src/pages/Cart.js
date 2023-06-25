import React from 'react';

const Cart = () => {
  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <div className="cart-item">
        <img src="product1.jpg" alt="Product 1" />
        <div className="item-details">
          <h3>Product 1</h3>
          <p>Price: $19.99</p>
          <p>Quantity: 1</p>
          <button className="remove-button">Remove</button>
        </div>
      </div>
      <div className="cart-item">
        <img src="product2.jpg" alt="Product 2" />
        <div className="item-details">
          <h3>Product 2</h3>
          <p>Price: $29.99</p>
          <p>Quantity: 2</p>
          <button className="remove-button">Remove</button>
        </div>
      </div>
      <div className="empty-cart">
        <p>Your cart is empty.</p>
      </div>
    </div>
  );
};

export default Cart;