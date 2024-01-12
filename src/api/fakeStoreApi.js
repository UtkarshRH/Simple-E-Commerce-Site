import axios from "axios";

const fakeStoreApi = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export const fetchProducts = async () => {
  try {
    const response = await fakeStoreApi.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
