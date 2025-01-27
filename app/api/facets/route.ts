import { NextResponse } from 'next/server';
import products from '../products/products.json';

// Helper to get unique sorted values for a given key in the dataset
function getUniqueValues(items: any[], key: string) {
  return Array.from(new Set(items.map((item) => item[key]))).sort((a, b) => {
    // Sort numerically if they’re numbers, otherwise alphabetically
    if (typeof a === 'number' && typeof b === 'number') return a - b;
    return ('' + a).localeCompare('' + b);
  });
}

export async function GET() {
  const years = getUniqueValues(products, 'year');
  const makes = getUniqueValues(products, 'make');
  const colors = getUniqueValues(products, 'color');
  const models = getUniqueValues(products, 'model');
  const types = getUniqueValues(products, 'type');
  const fuels = getUniqueValues(products, 'fuel');
  const transmissions = getUniqueValues(products, 'transmission');
  const conditions = getUniqueValues(products, 'condition');
  const locations = getUniqueValues(products, 'location');
  const prices = getUniqueValues(products, 'price');
  const mileages = getUniqueValues(products, 'mileage');

  const facets = [
    {
      key: 'yearFrom',
      display: 'Jaar (vanaf)',
      default: years[0] ?? null,
      type: 'number',
      options: years,
    },
    {
      key: 'yearTo',
      display: 'Jaar (tot)',
      default: years[years.length - 1] ?? null,
      type: 'number',
      options: years,
    },
    {
      key: 'make',
      display: 'Merk',
      default: null,
      type: 'string',
      options: makes,
    },
    {
      key: 'model',
      display: 'Model',
      default: null,
      type: 'string',
      options: models,
    },
    {
      key: 'color',
      display: 'Kleur',
      default: null,
      type: 'string',
      options: colors,
    },
    {
      key: 'priceFrom',
      display: 'Prijs (vanaf)',
      default: Math.min(...prices),
      type: 'number',
      options: prices,
    },
    {
      key: 'priceTo',
      display: 'Prijs (tot)',
      default: Math.max(...prices),
      type: 'number',
      options: prices,
    },
    {
      key: 'mileageFrom',
      display: 'Kilometerstand (vanaf)',
      default: Math.min(...mileages),
      type: 'number',
      options: mileages,
    },
    {
      key: 'mileageTo',
      display: 'Kilometerstand (tot)',
      default: Math.max(...mileages),
      type: 'number',
      options: mileages,
    },
    {
      key: 'type',
      display: 'Type',
      default: null,
      type: 'string',
      options: types,
    },
    {
      key: 'fuel',
      display: 'Brandstof',
      default: null,
      type: 'string',
      options: fuels,
    },
    {
      key: 'transmission',
      display: 'Transmissie',
      default: null,
      type: 'string',
      options: transmissions,
    },
    {
      key: 'condition',
      display: 'Conditie',
      default: null,
      type: 'string',
      options: conditions,
    },
    {
      key: 'location',
      display: 'Locatie',
      default: null,
      type: 'string',
      options: locations,
    },
  ];

  return NextResponse.json(facets);
}
