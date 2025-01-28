import { cookies } from 'next/headers';
import products from '../api/products/products.json';
import ComparisonTable from '@/app/components/wishlist/ComparisonTable';

export default async function WishlistPage() {
  const wishlistCookie = cookies().get('wishlist')?.value;
  const wishlistIds = wishlistCookie ? JSON.parse(wishlistCookie) : [];

  const wishlistItems = products.filter(product =>
    wishlistIds.includes(product.id)
  );

  return (
    <main className="pt-8 p-4 bg-brand-gray min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Mijn verlanglijst</h1>
        {wishlistItems.length === 0 ? (
          <p>Je hebt nog geen voertuigen op je verlanglijst.</p>
        ) : (
          <ComparisonTable vehicles={wishlistItems} />
        )}
      </div>
    </main>
  );
}
