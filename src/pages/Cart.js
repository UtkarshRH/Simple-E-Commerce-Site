import React from "react";
import ShoppingCart from "../components/ShoppingCart";

const Cart = () => {
  return (
    <div>
      <h1>Shopping Cart</h1>
      <ShoppingCart showEmptyMessage={true} />
    </div>
  );
};

export default Cart;
