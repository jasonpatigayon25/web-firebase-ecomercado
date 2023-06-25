import React from 'react';

const ProductDetail = ({ product }) => {
  return (
    <div className="product-detail">
      <h2>{product.title}</h2>
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;