'use client';

import React, { useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useWishlistStore } from '../../store/wishlistStore';

export default function WishlistButton({ productId }: { productId: number }) {
  const { items, isLoading, toggleItem, fetchItems } = useWishlistStore();
  
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const isWishlisted = items.includes(productId);

  return (
    <button
      onClick={() => toggleItem(productId)}
      className="absolute top-6 right-6 z-10 bg-white rounded-full p-2 shadow-md"
      disabled={isLoading}
    >
      {isLoading ? (
        <FaRegHeart className="text-gray-300 w-5 h-5 animate-pulse opacity-75" />
      ) : isWishlisted ? (
        <FaHeart className="text-red-500 w-5 h-5" />
      ) : (
        <FaRegHeart className="text-gray-500 w-5 h-5" />
      )}
    </button>
  );
}
