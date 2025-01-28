import { formatCurrency } from '@/app/utils/formatters';
import Link from 'next/link';

const ComparisonTable = ({ vehicles }) => {
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

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white shadow-lg rounded-lg">
        <thead>
          <tr>
            <th className="p-3 border-b">Kenmerken</th>
            {vehicles.map((vehicle) => (
              <th key={vehicle.id} className="p-3 border-b">
                <Link href={`/products/${vehicle.id}`} className="text-bovag-red hover:underline">
                  {vehicle.make} {vehicle.model}
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {facets.map((facet) => (
            <tr key={facet.key} className="hover:bg-gray-50">
              <td className="p-3 border-b font-medium">{facet.label}</td>
              {vehicles.map((vehicle) => (
                <td key={`${vehicle.id}-${facet.key}`} className="p-3 border-b text-center">
                  {facet.format ? facet.format(vehicle[facet.key]) : vehicle[facet.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
