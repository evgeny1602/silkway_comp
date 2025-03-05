import { useProductsFilterStore } from '../stores/productsFilterStore'

import {
  Accordion,
  AccordionItem,
  AccordionTitle,
  AccordionContent,
  AccordionTitleArrow,
  AccordionTitleText,
} from '@/ui/Accordion'
import { Button } from '../ui/Button'
import { CheckButton } from '../ui/CheckButton'

import accordionIcon from '../assets/accordion_icon.svg'

// import { useState } from 'react'

import { getGlobalData, buildPriceFilter } from '../utils'

function ArrowDown() {
  return (
    <div className="h-full flex flex-nowrap items-center justify-center">
      <img
        src={accordionIcon}
        className="rotate-180"
      />
    </div>
  )
}

function AccordionFilters({ filters }) {
  const resetFilters = useProductsFilterStore((state) => state.resetFilters)

  const handleShowResults = () => {
    console.log('show results')
  }

  const handleResetFilters = () => {
    resetFilters()
    console.log('reset filters')
  }

  let resultsTotal = 0

  return (
    <div>
      <Accordion>
        {filters.map(({ title, options, code }) => (
          <AccordionItem key={title}>
            <AccordionTitle className="p-[15px] border-b border-silkway-dark-milk">
              <AccordionTitleText className="font-sans text-xl font-bold text-silkway-dark-chocolate">
                {title}
              </AccordionTitleText>
              <AccordionTitleArrow>
                <ArrowDown />
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
        <ShowFilterResultsButton
          resultsTotal={resultsTotal}
          onClick={handleShowResults}
        />

        <ResetFitlerResultsButton onClick={handleResetFilters} />
      </FilterButtonsContainer>
    </div>
  )
}

function FilterButtonsContainer({ children }) {
  return (
    <div className="pt-[30px] gap-[15px] w-full flex flex-nowrap flex-col justify-center">
      {children}
    </div>
  )
}

function ShowFilterResultsButton({ resultsTotal, onClick }) {
  return (
    <Button
      onClick={onClick}
      className="w-full"
    >
      Показать {resultsTotal} отзывов
    </Button>
  )
}

function ResetFitlerResultsButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="font-sans text-base underline text-silkway-gray hover:text-silkway-dark-chocolate transition-colors"
    >
      Сбросить все фильтры
    </button>
  )
}

function SidebarContainer({ children }) {
  return <div className="w-[370px] bg-white rounded p-[15px]">{children}</div>
}

function ProductsFilter({ options, filterCode }) {
  return (
    <div className="flex flex-nowrap flex-col gap-[15px]">
      {options.map(({ code, text }) => (
        <CheckButton
          filterCode={filterCode}
          optionCode={code}
          key={code}
          text={text}
        />
      ))}
    </div>
  )
}

export function Sidebar() {
  const { price_intervals } = getGlobalData('sidebarData')

  const filters = [buildPriceFilter(price_intervals)]

  return (
    <SidebarContainer>
      <AccordionFilters filters={filters} />
    </SidebarContainer>
  )
}
