import Image from 'next/image';
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
    <div className="bg-white border border-gray-200 p-4 rounded shadow-sm hover:shadow-md transition-shadow">
      <Image
        src={`/images/car-placeholder.jpg`}
        width={640}
        height={480}
        alt={product.make}
        className='rounded-md'
      />
      <h3 className="font-bold text-gray-900 mt-3">{product.make} {product.model}</h3>
      <p className="text-gray-600">{product.year} - {product.mileage} km</p>
      <p className="text-gray-900 font-semibold">€ {product.price}</p>
    </div>
  );
}