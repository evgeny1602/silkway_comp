import { create } from 'zustand'

export const useCartStore = create((set, get) => ({
  items: window.headerData ? headerData.cartItems : [],

  setItems: (newItems) => set((state) => ({ ...state, items: newItems })),
}))
