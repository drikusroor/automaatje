
import React from 'react';
import ProductListTile from './ProductListTile';

interface Product {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  color: string;
  mileage: number;
  type: string;
  fuel: string;
  transmission: string;
  condition: string;
  location: string;
}

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductListTile key={product.id} product={product} />
      ))}
    </div>
  );
}