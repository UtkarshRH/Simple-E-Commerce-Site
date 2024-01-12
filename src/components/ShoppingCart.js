import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ShoppingCart.css";

const ShoppingCart = ({ showEmptyMessage }) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <p>{item.title}</p>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      {cartItems.length > 0 ? (
        <div>
          <p>Total Bill: ${calculateTotal()}</p>
          <Link to="/checkout">Proceed to Checkout</Link>
        </div>
      ) : showEmptyMessage ? (
        <p>Your cart is empty</p>
      ) : null}
    </div>
  );
};

export default ShoppingCart;
