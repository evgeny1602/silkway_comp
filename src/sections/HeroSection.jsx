import { SectionContainer } from '@/ui/SectionContainer'
import { getGlobalData, getSlugFromUrl } from '../utils'
import { BannerSlider } from '../ui/BannerSlider'
import showcaseIcon from '@/assets/showcase_icon.svg'
import vkIcon from '@/assets/vk_icon.svg'
import okIcon from '@/assets/ok_icon.svg'
import ytIcon from '@/assets/yt_icon.svg'
import tiktokIcon from '@/assets/tiktok_icon.svg'
import chevronDownIcon from '@/assets/chevron_down_icon.svg'
import { imagesUrlPrefix } from '@/config'

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

export function MoreCategoriesContainer() {
  return (
    <div className="w-full flex flex-nowrap justify-center items-start max-[1060px]:order-6">
      <button className="text-silkway-dark-chocolate font-sans text-base font-medium flex flex-nowrap gap-[10px] items-center bg-silkway-dark-milk rounded px-[45px] py-[15px] hover:bg-silkway-light-orange transition-colors h-[48px] max-[1200px]:h-[36px]">
        Еще категории <img src={chevronDownIcon} />
      </button>
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

export function HeroSection() {
  return (
    <SectionContainer className="py-[50px] max-[874px]:py-[20px]">
      <div className="grid grid-cols-[68fr,32fr] grid-rows-[auto,auto] gap-[30px] max-[874px]:gap-[15px] max-[1060px]:grid-cols-1 max-[1060px]:grid-rows-[auto,auto,auto,auto]">
        <BannerSliderContainer />

        <TopCategoriesContainer />

        <div className="flex flex-nowrap max-[1060px]:flex max-[750px]:flex-col max-[1060px]:flex-row max-[1600px]:flex-col max-[1600px]:items-center gap-[15px]">
          <BecomeSellerButton />
          <SocialButtonsContainer />
        </div>

        <MoreCategoriesContainer />
      </div>
    </SectionContainer>
  )
}
