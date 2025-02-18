import arrowRightIcon from '../assets/arrow_right_icon.svg'

export function ShowMoreWithCountButton({ total, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-silkway-dark-milk h-[44px] max-[550px]:h-[30px] rounded-[22px] flex flex-nowrap gap-[15px] px-[20px] py-[15px] max-[550px]:px-[10px] max-[550px]:py-[5px] max-[550px]:gap-[7px] text-silkway-dark-chocolate text-sm items-center transition-colors hover:bg-silkway-milk cursor-pointer"
    >
      <span className="max-[550px]:hidden">Показать все</span>
      <span className="text-xs px-[8px] py-[2px] flex flex-nowrap items-center text-white bg-silkway-green h-[18px] rounded-[9px]">
        {total}
      </span>
      <img
        src={arrowRightIcon}
        className="h-[21px] max-[550px]:h-[16px]"
      />
    </button>
  )
}
