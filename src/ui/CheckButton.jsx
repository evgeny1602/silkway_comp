import { useProductsFilterStore } from '../stores/productsFilterStore'

import checkIcon from '../assets/check_icon.svg'

function CheckButtonAndTextContainer({ children, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-nowrap items-center justify-start gap-[10px] cursor-pointer rounded font-sans text-sm text-silkway-dark-chocolate hover:text-silkway-orange transition-colors"
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

export function CheckButton({ text, filterCode, optionCode }) {
  const filters = useProductsFilterStore((state) => state.filters)
  const setFilterOption = useProductsFilterStore(
    (state) => state.setFilterOption
  )

  return (
    <CheckButtonAndTextContainer
      onClick={() =>
        setFilterOption(
          filterCode,
          optionCode,
          !filters[filterCode]?.[optionCode]
        )
      }
    >
      <CheckButtonContainer>
        {filters[filterCode]?.[optionCode] ? <img src={checkIcon} /> : null}
      </CheckButtonContainer>

      {text}
    </CheckButtonAndTextContainer>
  )
}
