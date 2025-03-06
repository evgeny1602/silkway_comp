import { fetchItems, fetchItemsTotal } from '@/api/products'

import useSWR from 'swr'

export const useProducts = (filters, pageSize, pageNum, sectionId, q) => {
  const { data, error, isLoading } = useSWR(
    `${JSON.stringify(filters)}-${pageSize}-${pageNum}-${sectionId}-${q}`,
    () => fetchItems(filters, pageSize, pageNum, sectionId, q)
  )
  return {
    data,
    isLoading,
    isError: error,
  }
}

export const useProductsTotal = (filters, sectionId, q) => {
  const { data, error, isLoading } = useSWR(
    `${JSON.stringify(filters)}-${sectionId}-${q}`,
    () => fetchItemsTotal(filters, sectionId, q)
  )
  return {
    data,
    isLoading,
    isError: error,
  }
}
