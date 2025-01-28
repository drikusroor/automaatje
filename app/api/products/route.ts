import { NextRequest, NextResponse } from 'next/server';
import products from './products.json';

// Helper function to simulate Elasticsearch-like free text search
function searchProducts(query: string, items: any[]) {
  if (!query) return items;

  const lowerCaseQuery = query.toLowerCase();
  return items.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(lowerCaseQuery)
    )
  );
}

function filterProducts(items: any[], filters: { facet: string; operator: string; value: any }[]) {
  return items.filter((item) =>
    filters.every((filter) => {
      const itemValue = item[filter.facet];
      switch (filter.operator) {
        case 'equals':
          return itemValue === filter.value;
        case 'lte':
          return itemValue <= filter.value;
        case 'gte':
          return itemValue >= filter.value;
        case 'not':
          return itemValue !== filter.value;
        default:
          return true;
      }
    })
  );
}

function sortProducts(items: any[], sortRules: { facet: string; asc: boolean }[]) {
  return items.sort((a, b) => {
    for (const rule of sortRules) {
      const aValue = a[rule.facet];
      const bValue = b[rule.facet];
      if (aValue < bValue) return rule.asc ? -1 : 1;
      if (aValue > bValue) return rule.asc ? 1 : -1;
    }
    return 0;
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = parseInt(searchParams.get('page') || '1');
  const amountPerPage = parseInt(searchParams.get('amountPerPage') || '10');
  const searchQuery = searchParams.get('q') || '';

  // Apply search first
  let filteredProducts = searchProducts(searchQuery, [...products]);
  
  // Number range filters
  const numberFilters = ['year', 'price', 'mileage'];
  numberFilters.forEach(filter => {
    const fromValue = searchParams.get(`${filter}From`);
    const toValue = searchParams.get(`${filter}To`);
    
    if (fromValue) {
      filteredProducts = filteredProducts.filter(p => p[filter] >= parseInt(fromValue));
    }
    if (toValue) {
      filteredProducts = filteredProducts.filter(p => p[filter] <= parseInt(toValue));
    }
  });

  // Exact match filters
  const exactFilters = ['make', 'model', 'color', 'type', 'fuel', 'transmission', 'condition', 'location'];
  exactFilters.forEach(filter => {
    const value = searchParams.get(filter);
    if (value) {
      filteredProducts = filteredProducts.filter(p => p[filter] === value);
    }
  });

  const start = (page - 1) * amountPerPage;
  const end = start + amountPerPage;
  const paginatedProducts = filteredProducts.slice(start, end);

  return NextResponse.json({
    items: paginatedProducts,
    page,
    amountPerPage,
    totalResults: filteredProducts.length,
    pages: Math.ceil(filteredProducts.length / amountPerPage)
  });
}