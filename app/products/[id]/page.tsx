import React from 'react';
import Image from 'next/image';
import WishlistButton from '@/app/components/wishlist/WishlistButton';
import ProductSpecifications from '@/app/components/ProductSpecifications';
import products from '../../api/products/products.json';
import { notFound } from 'next/navigation';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === parseInt(params.id));
  
  if (!product) {
    notFound();
  }

  return (
    <main className="p-4 bg-brand-gray min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left column - Image */}
            <div className="relative">
              <Image
                src="/images/car-placeholder.jpg"
                width={800}
                height={600}
                alt={`${product.make} ${product.model}`}
                className="rounded-lg"
              />
            </div>

            {/* Right column - Details */}
            <div className='relative'>
              <h1 className="text-3xl font-bold font-heading mb-2">
                {product.make} {product.model} 
                <WishlistButton productId={product.id} className='ml-2' />
              </h1>
              <p className="text-2xl font-semibold text-gray-900 mb-4">
                € {product.price.toLocaleString()}
              </p>
              <ProductSpecifications product={product} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
