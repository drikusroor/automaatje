import React from 'react';
import ProductList from '../components/ProductList';
import Link from 'next/link';
import FilterSidebar from '../components/FilterSidebar';

export default async function Page({ searchParams }) {
  const { page: pageParam, q, ...filterParams } = await searchParams;
  const page = parseInt(pageParam) || 1;
  
  const queryParams = new URLSearchParams();
  queryParams.set('page', page.toString());
  queryParams.set('amountPerPage', '10');
  
  // Add search query if present
  if (q) {
    queryParams.set('q', q);
  }
  
  // Safely add filter params
  Object.entries(filterParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.set(key, value.toString());
    }
  });

  const res = await fetch(`http://localhost:3000/api/products?${queryParams}`, {
    cache: 'no-store',
  });
  const data = await res.json();

  const facetsRes = await fetch('http://localhost:3000/api/facets', { cache: 'no-store' });
  const facets = await facetsRes.json();

  const { items, page: currentPage, totalResults, amountPerPage, pages } = data;
  const totalPages = Math.ceil(totalResults / amountPerPage);

  function getPageNumbers(current: number, total: number) {
    const range: (number | '...')[] = [];
    let lastNumber: number | '...';
    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - 2 && i <= current + 2)) {
        range.push(i);
        lastNumber = i;
      } else if (lastNumber !== '...') {
        range.push('...');
        lastNumber = '...';
      }
    }
    return range;
  }

  const pageNumbers = getPageNumbers(currentPage, pages);

  return (
    <div className="bg-brand-gray">
      <div className="max-w-7xl min-h-screen md:flex">
      <FilterSidebar facets={facets} />
      <main className="p-4 flex-1">
        <ProductList products={items} />
        <div className="mt-4 flex gap-2 items-center justify-center">
          {pageNumbers.map((p, idx) =>
            p === '...' ? (
              <span key={idx}>...</span>
            ) : (
              <Link
                key={idx}
                href={`/products?page=${p}`}
                className={`px-3 py-1 border-2 rounded ${p === currentPage ? 'bg-bovag-red text-white border-black' : 'bg-bovag-yellow border-black'}`}
              >
                {p}
              </Link>
            )
          )}
        </div>
      </main>
      </div>
    </div>
  );
}