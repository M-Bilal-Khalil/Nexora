import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import { useCart } from "../context/CartContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const url = import.meta.env.VITE_API_URL || "https://hplussport.com/api/products";
    fetch(url)
      .then(res => res.json())
      .then(data => setProducts(Array.isArray(data) ? data : data.products ?? []))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center mt-5">Loading products...</div>;
  if (error) return <div className="text-center text-danger mt-5">Error: {error}</div>;

  return (
    <div className="container">
      <h2 className="mb-4 fw-semibold">Products</h2>
      <div className="row">
        {products.map(p => (
          <ProductCard key={p.id ?? p._id ?? p.title} product={p} onAdd={addToCart} />
        ))}
      </div>
    </div>
  );
}
