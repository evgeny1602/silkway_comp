import { fetchItems, fetchItemsTotal } from '@/api/products'

import useSWR from 'swr'

export const useProducts = (filters, pageSize, pageNum, sectionId) => {
  const { data, error, isLoading } = useSWR(
    `${JSON.stringify(filters)}-${pageSize}-${pageNum}-${sectionId}`,
    () => fetchItems(filters, pageSize, pageNum, sectionId)
  )
  return {
    data,
    isLoading,
    isError: error,
  }
}

export const useProductsTotal = (filters, sectionId) => {
  const { data, error, isLoading } = useSWR(
    `${JSON.stringify(filters)}-${sectionId}`,
    () => fetchItemsTotal(filters, sectionId)
  )
  return {
    data,
    isLoading,
    isError: error,
  }
}
