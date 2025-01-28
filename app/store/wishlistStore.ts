import { create } from 'zustand';

interface WishlistStore {
  items: number[];
  isLoading: boolean;
  fetchItems: () => Promise<void>;
  toggleItem: (productId: number) => Promise<void>;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],
  isLoading: true,
  fetchItems: async () => {
    const response = await fetch('/api/wishlist');
    const data = await response.json();
    set({ items: data.items, isLoading: false });
  },
  toggleItem: async (productId: number) => {
    const response = await fetch('/api/wishlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId }),
    });
    const data = await response.json();
    set({ items: data.items });
  }
}));
