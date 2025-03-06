import { itemsCountPostfix } from '../utils'
import { productsPostifixVariants } from '../config'
import { useProductsTotal } from '../hooks/products'
import { useProductsFiltersStore } from '../stores/productsFiltersStore'
import { Spinner } from '../ui/Spinner'

function ResultsInfoContainer({ children }) {
  return (
    <div className="border-b border-silkway-dark-milk font-sans text-sm text-silkway-dark-chocolate pb-[15px] mb-[15px] h-[36px] flex flex-nowrap justify-start items-center">
      {children}
    </div>
  )
}

export function ResultsInfo() {
  const filters = useProductsFiltersStore((state) => state.filters)
  const sectionId = useProductsFiltersStore((state) => state.sectionId)
  const q = useProductsFiltersStore((state) => state.q)

  console.log({ filters, sectionId, q })

  const { data, isLoading } = useProductsTotal(filters, sectionId, q)

  const resultsCount = data?.total || 0
  const postfix = itemsCountPostfix(resultsCount, productsPostifixVariants)

  return (
    <ResultsInfoContainer>
      {isLoading ? <Spinner /> : `${resultsCount} ${postfix}`}
    </ResultsInfoContainer>
  )
}
