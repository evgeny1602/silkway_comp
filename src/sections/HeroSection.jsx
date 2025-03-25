import { SectionContainer } from '../ui/SectionContainer'
import { SectionInnerContainer } from '../ui/SectionInnerContainer'
import { MoreButton } from '../ui/MoreButton'
import { ReactPortal } from '../ui/ReactPortal'

import { getGlobalData, getSlugFromUrl } from '@/utils'
import { BannerSlider } from '@/ui/BannerSlider'
import showcaseIcon from '@/assets/showcase_icon.svg'
import vkIcon from '@/assets/vk_icon.svg'
import okIcon from '@/assets/ok_icon.svg'
import ytIcon from '@/assets/yt_icon.svg'
import tiktokIcon from '@/assets/tiktok_icon.svg'
import bigCloseIcon from '@/assets/big_close_icon.svg'
import { imagesUrlPrefix } from '@/config'
import { useState } from 'react'
import { useModalStore } from '../stores/modalStore'

function WhiteOrangeDot({ onClick, isActive = false }) {
  let classes = 'min-w-[21px] min-h-[8px] rounded'
  if (isActive) {
    classes += ' bg-silkway-dark-orange'
  } else {
    classes +=
      ' bg-white/20 hover:bg-white/40 transition-colors duration-200 cursor-pointer'
  }

  return (
    <div
      onClick={onClick}
      className={classes}
    ></div>
  )
}

function BannerSliderContainer() {
  const { banners } = getGlobalData('heroSectionData')

  return (
    <div className="rounded overflow-hidden">
      <BannerSlider
        banners={banners}
        renderDot={WhiteOrangeDot}
      />
    </div>
  )
}

function SocialButton({ url, children, icon }) {
  return (
    <a
      className="font-sans text-base max-[1200px]:text-[12px] text-silkway-green bg-silkway-dark-milk hover:bg-silkway-light-orange transition-colors duration-200 rounded p-[15px] max-[1200px]:p-[7px] flex flex-nowrap gap-[10px] max-[1200px]:gap-[3px] items-center h-[48px] max-[1200px]:h-[26px]"
      href={url}
      target="_blank"
    >
      <img
        src={icon}
        className="w-[24px] h-[24px] max-[1200px]:w-[16px] max-[1200px]:h-[16px]"
      />
      {children}
    </a>
  )
}

function CategoryButton({ url, children }) {
  const slug = getSlugFromUrl(url)
  const imgDir = `${imagesUrlPrefix}category_images/`

  return (
    <a
      className="bg-white aspect-square min-w-[135px] min-h-[135px] max-w-[236px] max-h-[236px] rounded hover:scale-105 hover:shadow-md transition-all duration-1000 p-[20px] max-[370px]:p-[15px] max-[1060px]:p-[20px] max-[1200px]:p-[15px] font-sans text-xl max-[370px]:text-lg max-[1060px]:text-xl max-[1200px]:text-lg bg-right-bottom bg-cover w-full"
      style={{
        backgroundImage: `url(${imgDir}${slug}.png)`,
      }}
      href={url}
    >
      {children}
    </a>
  )
}

export function SocialButtonsContainer() {
  const { socials } = getGlobalData('heroSectionData')

  return (
    <div className="flex flex-nowrap gap-[15px] max-[760px]:gap-[10px] max-[750px]:flex-col max-[1060px]:flex-row max-[1600px]:flex-col max-[1600px]:items-center">
      <div className="flex flex-nowrap gap-[15px] max-[760px]:gap-[10px]">
        <SocialButton
          url={socials.vk}
          icon={vkIcon}
        >
          ВКонтакте
        </SocialButton>
        <SocialButton
          url={socials.ok}
          icon={okIcon}
        >
          Одноклассники
        </SocialButton>
      </div>
      <div className="flex flex-nowrap gap-[15px] max-[760px]:gap-[10px]">
        <SocialButton
          url={socials.yt}
          icon={ytIcon}
        >
          Youtube
        </SocialButton>
        <SocialButton
          url={socials.tiktok}
          icon={tiktokIcon}
        >
          TikTok
        </SocialButton>
      </div>
    </div>
  )
}

export function MoreCategoriesContainer({ onClick }) {
  return (
    <div className="w-full flex flex-nowrap justify-center items-start max-[1060px]:order-6">
      <MoreButton
        onClick={onClick}
        text="Еще категории"
      />
    </div>
  )
}

export function BecomeSellerButton() {
  const { becomeSellerUrl } = getGlobalData('heroSectionData')

  return (
    <a
      href={becomeSellerUrl}
      className="flex flex-nowrap whitespace-nowrap text-base max-[1200px]:text-xs font-sans items-center gap-[10px] p-[15px] max-[1200px]:p-[10px] bg-silkway-green rounded text-white cursor-pointer hover:bg-silkway-light-green transition-colors h-[48px] max-[1200px]:h-[36px] min-w-[370px] max-[750px]:mr-0 max-[1200px]:min-w-[280px] mr-auto max-[1060px]:mr-auto max-[1600px]:mr-0"
    >
      <img
        src={showcaseIcon}
        className="w-[18px] h-[18px] max-[1200px]:w-[16px] max-[1200px]:h-[16px]"
      />
      Как стать продавцом в нашем магазине?
    </a>
  )
}

export function TopCategoriesContainer() {
  const { topCategories } = getGlobalData('heroSectionData')

  return (
    <div className="flex flex-nowrap max-[680px]:flex-col max-[1060px]:flex-row flex-col justify-center gap-[30px] max-[875px]:gap-[15px] h-full w-full max-[1060px]:order-5 max-[875px]:pt-[10px]">
      <div className="flex flex-nowrap gap-[30px] max-[875px]:gap-[15px] w-full justify-center">
        {topCategories.slice(0, 2).map(({ url, title }) => (
          <CategoryButton
            key={url}
            url={url}
          >
            {title}
          </CategoryButton>
        ))}
      </div>
      <div className="flex flex-nowrap gap-[30px] max-[875px]:gap-[15px] w-full justify-center">
        {topCategories.slice(2, 4).map(({ url, title }) => (
          <CategoryButton
            key={url}
            url={url}
          >
            {title}
          </CategoryButton>
        ))}
      </div>
    </div>
  )
}

function HeroSectionButtonsContainer({ children }) {
  return (
    <div className="flex flex-nowrap max-[1060px]:flex max-[750px]:flex-col max-[1060px]:flex-row max-[1600px]:flex-col max-[1600px]:items-center gap-[15px]">
      {children}
    </div>
  )
}

function HeroSectionGridContainer({ children }) {
  return (
    <div className="grid grid-cols-[68fr,32fr] grid-rows-[auto,auto] gap-[30px] max-[1200px]:gap-[15px] max-[1060px]:grid-cols-1 max-[1060px]:grid-rows-[auto,auto,auto,auto]">
      {children}
    </div>
  )
}

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

function PopoverContentContainer({ children }) {
  return (
    <div className="gap-[30px] grid grid-cols-4 grid-rows-2 max-[1000px]:grid-cols-3 max-[1000px]:grid-rows-3 max-[750px]:grid-cols-2 max-[750px]:grid-rows-4 w-full h-full">
      {children}
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

function HeroSectionCategoriesPopover({ onClose }) {
  const { categories } = getGlobalData('heroSectionData')

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

export function HeroSection() {
  const showModal = useModalStore((state) => state.showModal)
  const hideModal = useModalStore((state) => state.hideModal)
  const visibleModals = useModalStore((state) => state.visibleModals)

  const handleMoreCategoriesClick = () => {
    if (visibleModals.includes('categoriesPopover')) {
      hideModal('categoriesPopover')
    } else {
      showModal('categoriesPopover')
    }
  }

  return (
    <SectionContainer className="pt-[50px] pb-[70px] max-[874px]:pt-[20px] max-[874px]:pb-[50px]">
      <SectionInnerContainer className="relative">
        <HeroSectionGridContainer>
          <BannerSliderContainer />

          <TopCategoriesContainer />

          <HeroSectionButtonsContainer>
            <BecomeSellerButton />
            <SocialButtonsContainer />
          </HeroSectionButtonsContainer>

          <MoreCategoriesContainer onClick={handleMoreCategoriesClick} />
        </HeroSectionGridContainer>

        {visibleModals.includes('categoriesPopover') && (
          <ReactPortal>
            <HeroSectionCategoriesPopover
              onClose={() => hideModal('categoriesPopover')}
            />
          </ReactPortal>
        )}
      </SectionInnerContainer>
    </SectionContainer>
  )
}
