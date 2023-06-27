import React from 'react';
import ProductCard from './ProductCard';
import Footer from '../footer/Footer';

const ProductListing = ({ products }) => {
  return (
    <div className="product-listing">
      <h2>Product Listing</h2>
      <div className="product-cards">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default ProductListing;