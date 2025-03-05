import { create } from 'zustand'

export const useProductsFilterStore = create((set) => ({
  filters: {},
  resetFilters: () =>
    set(() => ({
      filters: {},
    })),
  setFilterOption: (filterCode, optionCode, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [filterCode]: {
          ...state.filters[filterCode],
          [optionCode]: value,
        },
      },
    })),
}))
