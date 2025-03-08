import { useProductsFiltersStore } from '@/stores/productsFiltersStore'

import checkIcon from '@/assets/check_icon.svg'
import { useRef, useState } from 'react'
import { useProductsTotal } from '../hooks/products'

import { Button } from '@/ui/Button'
import { calcClickedY, calcElementX } from '../utils'

function TotalPill({ children, selfRef }) {
  return (
    <span
      ref={selfRef}
      className="font-sans text-xs text-silkway-dark-chocolate bg-silkway-dark-milk h-[20px] rounded-[10px] px-[8px] py-[2px]"
    >
      {children}
    </span>
  )
}

function CheckButtonAndTextContainer({ children, onClick }) {
  const selfRef = useRef(null)

  const setFloatY = useProductsFiltersStore((state) => state.setFloatY)

  const handleClick = () => {
    setFloatY(calcClickedY(selfRef))
    onClick()
  }

  return (
    <div
      ref={selfRef}
      onClick={handleClick}
      className="relative flex flex-nowrap items-center justify-start gap-[10px] cursor-pointer rounded font-sans text-sm text-silkway-dark-chocolate hover:text-silkway-orange transition-colors"
    >
      {children}
    </div>
  )
}

function CheckButtonContainer({ children }) {
  return (
    <div className="rounded border-2 p-[2px] border-silkway-orange h-[18px] w-[18px] flex flex-nowrap justify-center items-center">
      {children}
    </div>
  )
}

export function CheckButton({ text, filterCode, optionCode, total }) {
  const pillRef = useRef(null)

  const filters = useProductsFiltersStore((state) => state.filters)
  const setFilterOption = useProductsFiltersStore(
    (state) => state.setFilterOption
  )
  const setFloatX = useProductsFiltersStore((state) => state.setFloatX)

  const handleClick = () => {
    setFloatX(calcElementX(pillRef))
    setFilterOption(filterCode, optionCode, !filters[filterCode]?.[optionCode])
  }

  return (
    <CheckButtonAndTextContainer onClick={handleClick}>
      <CheckButtonContainer>
        {filters[filterCode]?.[optionCode] ? <img src={checkIcon} /> : null}
      </CheckButtonContainer>
      {text} <span ref={pillRef}></span>
      {total >= 0 && <TotalPill>{total}</TotalPill>}
    </CheckButtonAndTextContainer>
  )
}
