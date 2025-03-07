import { useProductsTotal } from '../hooks/products'
import { useProductsFiltersStore } from '../stores/productsFiltersStore'
import { productsPostifixVariants } from '../config'
import { itemsCountPostfix } from '../utils'

import { Button } from '../ui/Button'

export function FloatFilterResults({ onClick }) {
  const floatY = useProductsFiltersStore((state) => state.floatY)
  const floatX = useProductsFiltersStore((state) => state.floatX)
  const sectionId = useProductsFiltersStore((state) => state.sectionId)
  const filters = useProductsFiltersStore((state) => state.filters)
  const isFiltered = useProductsFiltersStore((state) => state.isFiltered)
  const q = useProductsFiltersStore((state) => state.q)

  const { data, isLoading } = useProductsTotal(filters, sectionId, q)

  if (!isFiltered()) {
    return null
  }

  if (isLoading) {
    return null
  }

  if (!floatY) {
    return null
  }

  const resultsTotal = data?.total || 0
  const totalPostfix = itemsCountPostfix(resultsTotal, productsPostifixVariants)

  return (
    <div
      className="absolute -translate-y-[50%] ml-[20px] z-20 rounded bg-white border border-silkway-dark-milk p-[6px] shadow-md"
      style={{ top: `${floatY}px`, left: `${floatX}px` }}
    >
      <Button
        onClick={onClick}
        className="text-xs h-[36px]"
        height="small"
      >
        Показать {resultsTotal} {totalPostfix}
      </Button>
    </div>
  )
}
