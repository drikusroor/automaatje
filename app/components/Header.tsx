'use client';
import Link from "next/link";
import WishlistCounter from "./wishlist/WishlistCounter";
import { usePathname, useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/products?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <header className="bg-bovag-yellow text-bovag-red p-4 shadow-md">
      <nav className="flex justify-between items-center">
        <Link href="/" className="bg-white px-2 py-1 rounded-3xl font-bold text-xl border-2 border-bovag-red font-heading">
          Automaatje 
          <span className="drop-shadow">🫰</span>
        </Link>
        
        {pathname !== '/' && (
          <form onSubmit={handleSubmit} className="flex-1 max-w-2xl mx-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Zoek je auto..."
                className="flex-1 px-4 py-2 rounded-lg text-base border text-black"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-base hover:bg-blue-700"
              >
                Zoeken
              </button>
            </div>
          </form>
        )}

        <Link href="/wishlist">
          <WishlistCounter />
        </Link>
      </nav>
    </header>
  );
}