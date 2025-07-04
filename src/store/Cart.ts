import axios from "axios";
import { create } from "zustand";
import { devtools } from 'zustand/middleware'
import { immer } from "zustand/middleware/immer";

interface CartItem {
  id: string;
  quantity: number;
}

interface ICartStore {
  hydrated: boolean;
  items: CartItem[];
  
  setItems: (items: CartItem[]) => void;
  updateItems: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number; 
  getTotalQuantity: () => number;
  setHydrated(): void;
}

export const useCartStore = create<ICartStore>()(
  devtools(
    immer((set, get) => ({
      hydrated: false,
      items: [],
  
  
      setItems: (items: CartItem[]) => {
        set({ items });
      },
  
      updateItems: (item: CartItem) => {
        const { items } = get();
        const existingItem = items.find(i => i.id === item.id);
        if (existingItem) {
          set({
            items: items.map(i =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            )
          });
        } else {
          set({ items: [...items, item] });
        }
      },
  
      removeItem: (id: string) => { 
        const { items } = get();
        set({
          items: items.filter(i => i.id !== id)
        });
      },
  
      clearCart: () => { 
        set({ items: [] });
      },
  
      getTotalPrice: () => { 
        const { items } = get();
        return items ? items.reduce((sum, i) => sum + (i.quantity), 0) : 0;
      },
  
      getTotalQuantity: () => {
        const { items } = get();
        return items ? items.reduce((sum, i) => sum + i.quantity, 0) : 0;
      },
  
      setHydrated() {
        set({ hydrated: true });
      }
    }))
  )
)