import React from "react";

export default function ProductCard({ product, onAdd }) {
  const title = product.title ?? product.name;
  const price = Number(product.price ?? 0);
  const img = product.image ?? product.thumbnail ?? "";

  return (
    <div className="col-md-4 col-lg-3 mb-4">
      <div className="card h-100 text-center">
        <img src={img} className="card-img-top" alt={title} />
        <div className="card-body d-flex flex-column">
          <h6 className="card-title mb-2">{title}</h6>
          <p className="text-muted mb-3">${price.toFixed(2)}</p>
          <button className="btn btn-add mt-auto" onClick={() => onAdd(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
