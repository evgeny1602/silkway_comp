import { create } from 'zustand'

export const useProductInfoStore = create((set, get) => ({
  activeIdx: 0,
  pictureUrls: window.productData ? window.productData.picture_urls : [],

  setActiveIdx: (idx) => set((state) => ({ ...state, activeIdx: idx })),
  nextSlide: () =>
    set((state) => ({
      ...state,
      activeIdx: Math.min(state.activeIdx + 1, state.pictureUrls.length - 1),
    })),
  prevSlide: () =>
    set((state) => ({ ...state, activeIdx: Math.max(state.activeIdx - 1, 0) })),
}))
