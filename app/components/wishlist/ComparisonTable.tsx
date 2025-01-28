'use client';

import { formatCurrency } from '@/app/utils/formatters';
import Image from 'next/image';
import Link from 'next/link';
import RemoveFromWishlist from './RemoveFromWishlist';
import { useState } from 'react';

const ComparisonTable = ({ vehicles: initialVehicles }) => {
  const [vehicles, setVehicles] = useState(initialVehicles);
  
  // TODO: Fetch vehicle facets from the API
  const facets = [
    { key: 'make', label: 'Merk' },
    { key: 'model', label: 'Model' },
    { key: 'year', label: 'Bouwjaar' },
    { key: 'price', label: 'Prijs', format: (value) => formatCurrency(value) },
    { key: 'mileage', label: 'Kilometerstand', format: (value) => `${value.toLocaleString()} km` },
    { key: 'color', label: 'Kleur' },
    { key: 'type', label: 'Type' },
    { key: 'fuel', label: 'Brandstof' },
    { key: 'transmission', label: 'Transmissie' },
    { key: 'condition', label: 'Conditie' },
    { key: 'location', label: 'Locatie' },
  ];

  const handleRemove = (removedId: number) => {
    setVehicles(vehicles.filter(v => v.id !== removedId));
  };

  return (
    <div className="overflow-x-auto">
      {vehicles.length === 0 ? (
        <p className="text-center py-8 text-gray-500">Geen voertuigen in de vergelijking</p>
      ) : (
        <table className="table-auto w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr>
              <th className="text-left p-3 border-b w-32">Kenmerken</th>
              {vehicles.map((vehicle) => (
                <th key={vehicle.id} className="text-right p-3 border-b min-w-40">
                  <div className="flex justify-end items-center gap-2">
                    <Link href={`/products/${vehicle.id}`} className="text-bovag-red hover:underline">
                      {vehicle.make} {vehicle.model}
                    </Link>
                    <RemoveFromWishlist 
                      productId={vehicle.id} 
                      onRemove={() => handleRemove(vehicle.id)}
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              {vehicles.map((vehicle) => (
                <td key={vehicle.id} className="text-right p-3 border-b">
                  <Image
                    src={`/images/car-placeholder.jpg`}
                    width={120}
                    height={120}
                    alt={vehicle.make}
                    className='rounded-md ml-auto'
                  />
                </td>
              ))}
            </tr>
            {facets.map((facet) => (
              <tr key={facet.key} className="hover:bg-gray-50">
                <td className="p-3 border-b font-medium">{facet.label}</td>
                {vehicles.map((vehicle) => (
                  <td key={`${vehicle.id}-${facet.key}`} className="text-right p-3 border-b">
                    {facet.format ? facet.format(vehicle[facet.key]) : vehicle[facet.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ComparisonTable;
