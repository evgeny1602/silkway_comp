import bigCloseIcon from '@/assets/big_close_icon.svg'
import { imagesUrlPrefix } from '@/config'

import { getSlugFromUrl } from '@/utils'

function HeroSectionCategoriesPopoverContainer({ children }) {
  return (
    <div className="w-full max-w-[1600px] h-auto absolute top-[210px] max-[1187px]:top-[80px] left-[50%] -translate-x-[50%] p-[15px]">
      <div className="gap-[35px] flex flex-nowrap flex-col bg-silkway-green/90 rounded shadow-md w-full h-full p-[30px] max-[1200px]:p-[20px] max-[650px]:p-[10px]">
        {children}
      </div>
    </div>
  )
}

function PopoverTopSectionContainer({ children }) {
  return <div className="flex flex-nowrap items-center">{children}</div>
}

function PopoverContentContainer({ children }) {
  return (
    <div className="gap-[30px] grid grid-cols-4 grid-rows-2 max-[1000px]:grid-cols-3 max-[1000px]:grid-rows-3 max-[750px]:grid-cols-2 max-[750px]:grid-rows-4 w-full h-full">
      {children}
    </div>
  )
}

function PopoverCloseButton({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-silkway-green ml-auto cursor-pointer rounded transition-colors hover:bg-silkway-light-green"
    >
      <img
        src={bigCloseIcon}
        className="w-[70px] h-[70px] max-[1200px]:h-[50px] max-[1200px]:w-[50px] max-[650px]:w-[40px] max-[650px]:h-[40px]"
      />
    </div>
  )
}

function PopoverCategoryTile({ item }) {
  const { url, name, child_categories } = item
  const slug = getSlugFromUrl(url)
  const imgDir = `${imagesUrlPrefix}category_images/`

  return (
    <div
      className="font-sans p-[20px] max-[1200px]:p-[10px] max-[500px]:p-[5px] rounded bg-white w-full h-full w-min-[210px] h-min-[135px] w-max-[360px] h-max-[240px] hover:shadow-md hover:scale-105 transition-all duration-1000 bg-right-bottom bg-cover"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.2)), url(${imgDir}${slug}.png)`,
      }}
    >
      <a
        href={url}
        className="hover:underline font-bold text-xl max-[800px]:text-lg max-[380px]:text-base leading-5"
      >
        {name}
      </a>
      <div className="max-[760px]:hidden mt-2 max-[1200px]:mt-1 flex flex-nowrap flex-col text-base max-[1300px]:text-sm max-[1200px]:text-xs leading-6">
        {child_categories.map(({ name, url }) => (
          <a
            className="hover:underline"
            key={url}
            href={url}
          >
            {name}
          </a>
        ))}
      </div>
    </div>
  )
}

export function HeroSectionCategoriesPopover({ onClose }) {
  const { categories } = window.headerData

  return (
    <HeroSectionCategoriesPopoverContainer>
      <PopoverTopSectionContainer>
        <div className="font-sans text-5xl max-[1200px]:text-4xl max-[470px]:text-2xl text-white">
          КАТАЛОГ ТОВАРОВ
        </div>

        <PopoverCloseButton onClick={onClose} />
      </PopoverTopSectionContainer>

      <PopoverContentContainer>
        {categories.map((item) => (
          <PopoverCategoryTile
            item={item}
            key={item.url}
          />
        ))}
      </PopoverContentContainer>
    </HeroSectionCategoriesPopoverContainer>
  )
}
