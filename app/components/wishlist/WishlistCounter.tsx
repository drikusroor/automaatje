'use client';

import React, { useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import Link from 'next/link';
import { useWishlistStore } from '../../store/wishlistStore';

export default function WishlistCounter() {
  const { items, fetchItems } = useWishlistStore();
  
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <Link 
    href="/wishlist" 
    className="flex items-center gap-1 bg-white px-2 py-1 rounded-3xl font-bold border border-bovag-red"
    title={`Wenslijst (${items.length} voertuigen)`}
    >
      <FaHeart className=" text-bovag-red w-5 h-5" />
      <span className="font-bold">{items.length}</span>
    </Link>
  );
}
