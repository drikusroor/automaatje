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

interface SpecificationRowProps {
  label: string;
  value: string | number;
}

const SpecificationRow = ({ label, value }: SpecificationRowProps) => (
  <div className="flex py-3 border-b border-gray-100 last:border-0">
    <span className="w-1/3 text-gray-600">{label}</span>
    <span className="w-2/3 font-medium">{value}</span>
  </div>
);

export default function ProductSpecifications({ product }: { product: Product }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Specificaties</h2>
      <div className="space-y-1">
        <SpecificationRow label="Merk" value={product.make} />
        <SpecificationRow label="Model" value={product.model} />
        <SpecificationRow label="Bouwjaar" value={product.year} />
        <SpecificationRow label="Kilometerstand" value={`${product.mileage.toLocaleString()} km`} />
        <SpecificationRow label="Kleur" value={product.color} />
        <SpecificationRow label="Type" value={product.type} />
        <SpecificationRow label="Brandstof" value={product.fuel} />
        <SpecificationRow label="Transmissie" value={product.transmission} />
        <SpecificationRow label="Staat" value={product.condition} />
        <SpecificationRow label="Locatie" value={product.location} />
      </div>
    </div>
  );
}
