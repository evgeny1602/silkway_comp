import { create } from 'zustand'

export const useModalStore = create((set, get) => ({
  visibleModals: [],

  showModal: (modalName) =>
    set((state) => ({ visibleModals: [...state.visibleModals, modalName] })),
  hideModal: (modalName) =>
    set((state) => ({
      visibleModals: state.visibleModals.filter((modal) => modal !== modalName),
    })),
}))
