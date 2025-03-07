import { useProductsFiltersStore } from '@/stores/productsFiltersStore'
import { useProductsTotal } from '../hooks/products'
import { getFilterDescriptions, itemsCountPostfix } from '@/utils'
import { productsPostifixVariants } from '../config'

import {
  Accordion,
  AccordionItem,
  AccordionTitle,
  AccordionContent,
  AccordionTitleArrow,
  AccordionTitleText,
  AccordionArrowDown,
} from '@/ui/Accordion'
import { Button } from '@/ui/Button'
import { CheckButton } from '@/ui/CheckButton'
import { Spinner } from '../ui/Spinner'

function ProductsFilterContainer({ children }) {
  return <div className="flex flex-nowrap flex-col gap-[15px]">{children}</div>
}

function ProductsFilter({ options, filterCode }) {
  return (
    <ProductsFilterContainer>
      {options.map(({ code, text, total }) => (
        <CheckButton
          filterCode={filterCode}
          optionCode={code}
          key={code}
          text={text}
          total={total}
        />
      ))}
    </ProductsFilterContainer>
  )
}

function FilterButtonsContainer({ children }) {
  return (
    <div className="pt-[30px] gap-[15px] w-full flex flex-nowrap flex-col justify-center">
      {children}
    </div>
  )
}

function ShowFilterResultsButton({ onClick }) {
  const isFiltered = useProductsFiltersStore((state) => state.isFiltered)
  const filters = useProductsFiltersStore((state) => state.filters)
  const sectionId = useProductsFiltersStore((state) => state.sectionId)

  const { data, isLoading } = useProductsTotal(filters, sectionId)

  const totalPostfix = itemsCountPostfix(
    data?.total || 0,
    productsPostifixVariants
  )

  const buttonText = isFiltered()
    ? `Показать ${data?.total || 0} ${totalPostfix}`
    : 'Показать все товары'

  return (
    <Button
      onClick={onClick}
      className="w-full"
    >
      {isLoading ? <Spinner /> : buttonText}
    </Button>
  )
}

function ResetFitlerResultsButton() {
  const resetFilters = useProductsFiltersStore((state) => state.resetFilters)

  return (
    <button
      onClick={resetFilters}
      className="font-sans text-base underline text-silkway-gray hover:text-silkway-dark-chocolate transition-colors"
    >
      Сбросить все фильтры
    </button>
  )
}

export function AccordionFilters({ onShowResultsClick }) {
  const filterDescriptions = getFilterDescriptions()

  return (
    <div>
      <Accordion>
        {filterDescriptions.map(({ title, options, code }) => (
          <AccordionItem key={title}>
            <AccordionTitle className="p-[15px] border-b border-silkway-dark-milk">
              <AccordionTitleText className="font-sans text-xl font-bold text-silkway-dark-chocolate">
                {title}
              </AccordionTitleText>
              <AccordionTitleArrow>
                <AccordionArrowDown />
              </AccordionTitleArrow>
            </AccordionTitle>
            <AccordionContent className="p-[15px] font-sans text-sm text-silkway-dark-chocolate">
              <ProductsFilter
                filterCode={code}
                options={options}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <FilterButtonsContainer>
        <ShowFilterResultsButton onClick={onShowResultsClick} />
        <ResetFitlerResultsButton />
      </FilterButtonsContainer>
    </div>
  )
}
