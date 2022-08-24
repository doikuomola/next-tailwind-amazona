import React from 'react';
import Link from 'next/link';

const ProductItem = ({ product, addToCartHandler }) => {
  return (
    <div className="card">
      <Link href={`product/${product.slug}`}>
        <a>
          <img
            src={product.image}
            alt={product.name}
            className="h-48 w-full object-cover align-middle rounded shadow"
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`product/${product.slug}`}>
          <a>
            <h2 className="text-lg">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>&#8358; {product.price}</p>
        <button
          className="primary-button"
          type="button"
          onClick={() => addToCartHandler(product)}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
