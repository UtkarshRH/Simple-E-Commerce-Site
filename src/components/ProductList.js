import React, { useState, useEffect } from "react";
import { fetchProducts } from "../api/fakeStoreApi";
import "./ProductList.css";

const ProductList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Declare cartItems
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, []);

  const totalPages = Math.ceil(products.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const visibleProducts = products.slice(startIndex, startIndex + pageSize);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1));
  };

  const addToCart = (product) => {
    //Here Use the cartItems declared at the beginning
    cartItems.push(product);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    alert("Product is added to your cart. Please check your cart!");
    window.location.reload();
  };

  // Loading Start
  if (loading) {
    return (
      <div className="loading-message">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>Error loading products. Please try again later.</p>
      </div>
    );
  }
  // Loading End

  return (
    <div>
      <div className="product-list">
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className={`product-item ${
              cartItems.find((item) => item.id === product.id)
                ? "added-to-cart"
                : ""
            }`}
          >
            <img
              src={product.image}
              alt={product.title}
              className={
                cartItems.find((item) => item.id === product.id)
                  ? "added-to-cart-image"
                  : ""
              }
            />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
