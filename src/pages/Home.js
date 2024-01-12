import React from "react";
import ProductList from "../components/ProductList";
import "./Home.css";

const Home = () => {
  return (
    <div className="center-products">
      <h1 className="product-list-title">Product Listing</h1>
      <ProductList />
    </div>
  );
};

export default Home;
