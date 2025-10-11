import React from "react";
import { useCart } from "../context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Cart() {
  const {
    cartItems,
    incrementQty,
    decrementQty,
    removeFromCart,
    resetCart,
    total,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="text-center my-5">
        <h2 className="fw-bold text-secondary">🛒 Your cart is empty</h2>
        <p className="text-muted">
          Go to <a href="/products">Products</a> to add items.
        </p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">🛍️ Your Cart</h2>
        <button className="btn btn-outline-danger btn-sm" onClick={resetCart}>
          <i className="bi bi-trash"></i> Reset Cart
        </button>
      </div>

      <div className="list-group mb-4 shadow-sm rounded">
        {cartItems.map((item) => (
          <div
            className="list-group-item d-flex align-items-center justify-content-between py-3"
            key={item.id}
          >
            <div className="d-flex align-items-center">
              <img
                src={item.image}
                alt={item.title}
                className="rounded me-3"
                style={{ width: "80px", height: "80px", objectFit: "contain" }}
              />
              <div>
                <h5 className="mb-1 fw-semibold">{item.title}</h5>
                <p className="text-muted mb-1">
                  Unit price: ${Number(item.price).toFixed(2)}
                </p>

                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => decrementQty(item.id)}
                  >
                    −
                  </button>
                  <span className="mx-3 fw-bold">{item.qty}</span>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => incrementQty(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="text-end">
              <p className="mb-1 fw-semibold">
                Subtotal: ${(Number(item.price) * item.qty).toFixed(2)}
              </p>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="card shadow-sm p-4 border-0 text-end">
        <h4 className="fw-bold mb-3">
          Grand Total:{" "}
          <span className="text-success">${total.toFixed(2)}</span>
        </h4>
        <button
          className="btn btn-success btn-lg px-4"
          onClick={() =>
            alert("Checkout clicked — implement real flow later 💳")
          }
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
