import { NextResponse } from 'next/server';
import products from './products.json'; // Import the dataset

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

// Helper function to apply filters
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

// Helper function to sort products
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Parse query parameters
  const query = searchParams.get('query') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const amountPerPage = parseInt(searchParams.get('amountPerPage') || '10', 10);
  const orderBy = JSON.parse(searchParams.get('orderBy') || '[]');
  const filterBy = JSON.parse(searchParams.get('filterBy') || '[]');

  // Step 1: Apply free text search
  let filteredProducts = searchProducts(query, products);

  // Step 2: Apply filters
  filteredProducts = filterProducts(filteredProducts, filterBy);

  // Step 3: Sort products
  const sortedProducts = sortProducts(filteredProducts, orderBy);

  // Step 4: Paginate results
  const startIndex = (page - 1) * amountPerPage;
  const endIndex = startIndex + amountPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  // Prepare response
  const response = {
    query,
    page,
    amountPerPage,
    orderBy,
    filterBy,
    totalResults: filteredProducts.length,
    totalAmountProducts: products.length,
    items: paginatedProducts,
  };

  return NextResponse.json(response);
}