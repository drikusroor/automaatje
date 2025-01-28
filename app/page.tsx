'use client';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/products?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-brand-gray p-4">
      <h1 className="text-5xl font-bold mb-8 text-center">Vind je maatje</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Zoek je auto..."
            className="flex-1 px-4 py-3 rounded-lg text-lg border"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700"
          >
            Zoeken
          </button>
        </div>
      </form>
    </main>
  );
}
