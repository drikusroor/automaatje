
import React from 'react';

interface Product {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  color: string;
  type: string;
  fuel: string;
  transmission: string;
  condition: string;
  location: string;
}

export default function ProductListTile({ product }: { product: Product }) {
  return (
    <div className="border border-gray-300 p-2 rounded shadow-sm">
      <h3 className="font-bold">{product.make} {product.model}</h3>
      <p>{product.year} - {product.mileage} km</p>
      <p className="text-red-500 font-semibold">€ {product.price}</p>
    </div>
  );
}