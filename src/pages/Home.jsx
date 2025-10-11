import React from "react";

export default function Home() {
  return (
    <div className="home-page">
      {/* Banner Section */}
      <section className="hero-banner">
        <div className="banner-overlay">
          <div className="banner-content">
            <h1>Welcome to Aureo Store</h1>
            <p>Your one-stop shop for essentials — from health to lifestyle.</p>
            <a href="/products" className="btn-banner">Shop Now</a>
          </div>
        </div>
      </section>

      {/* Example Product Section Placeholder */}
      <div className="container">
        <h2 className="text-center my-4">Featured Products</h2>
            
      </div>
    </div>
  );
}
