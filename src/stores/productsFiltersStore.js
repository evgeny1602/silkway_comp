import { create } from 'zustand'

const globalData = window.catalogItemsData
  ? window.catalogItemsData
  : window.categoryItemsData
    ? window.categoryItemsData
    : {
        page_size: 15,
        page_num: 1,
      }
const globalQ = window.searchResults?.q || false

export const useProductsFiltersStore = create((set, get) => ({
  sectionId: globalData.section_id || null,
  filters: {},
  pageSize: globalData.page_size,
  pageNum: globalData.page_num,
  q: globalQ,
  floatY: null,
  floatX: null,

  setFloatY: (y) => set((state) => ({ ...state, floatY: y })),

  setFloatX: (x) => set((state) => ({ ...state, floatX: x })),

  resetFloatY: () => set((state) => ({ ...state, floatY: null })),

  isFiltered: () => {
    const filters = get().filters
    for (const filterCode in filters) {
      for (const optionCode in filters[filterCode]) {
        if (filters[filterCode][optionCode]) {
          return true
        }
      }
    }
    return false
  },

  setSectionid: (id) => set((state) => ({ ...state, sectionId: id })),

  setPageNum: (n) => set((state) => ({ ...state, pageNum: n })),

  resetFilters: () => set((state) => ({ ...state, filters: {}, pageNum: 1 })),

  setFilterOption: (filterCode, optionCode, value) =>
    set((state) => ({
      ...state,
      pageNum: 1,
      filters: {
        ...state.filters,
        [filterCode]: {
          ...state.filters[filterCode],
          [optionCode]: value,
        },
      },
    })),
}))
