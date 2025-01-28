'use client';

import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { useWishlistStore } from '../../store/wishlistStore';

export default function RemoveFromWishlist({ productId, onRemove }: { productId: number, onRemove?: () => void }) {
  const { isLoading, toggleItem } = useWishlistStore();

  const handleRemove = async () => {
    await toggleItem(productId);
    onRemove?.();
  };

  return (
    <button
      onClick={handleRemove}
      className="rounded-full p-2 group border-2 hover:border-red-700 border-solid transition-colors border-transparent"
      disabled={isLoading}
      title="Verwijder van verlanglijst"
    >
      <FaTrash className={`w-4 h-4 transition-colors ${isLoading ? 'text-gray-300 animate-pulse' : 'text-red-500'} group-hover:text-red-700`} />
    </button>
  );
}
