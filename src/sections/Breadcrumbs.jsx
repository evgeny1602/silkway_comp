import { getGlobalData } from '@/utils'
import homeIcon from '@/assets/home_icon.svg'
import arrowRightIcon from '@/assets/arrow_right_icon.svg'

import { SectionContainer } from '../ui/SectionContainer'
import { SectionInnerContainer } from '../ui/SectionInnerContainer'

function BreadcrumbsItem({ url, name }) {
  return (
    <>
      <li>
        {url == '' && (
          <span className="text-silkway-gray text-sm max-[600px]:text-[10px]">
            {name}
          </span>
        )}
        {url != '' && url != '/' && (
          <a
            className="font-sans text-sm max-[600px]:text-[10px] hover:text-silkway-orange transition-colors"
            href={url}
          >
            {name}
          </a>
        )}
        {url == '/' && (
          <a href={url}>
            <img
              src={homeIcon}
              className="h-[16px] max-[600px]:h-[10px] max-[600px]:mt-[4px]"
            />
          </a>
        )}
      </li>
      <li className="last:hidden">
        <img
          src={arrowRightIcon}
          className="h-[10px] px-[4px] pt-[2px] max-[600px]:h-[8px] max-[600px]:mt-[4px]"
        />
      </li>
    </>
  )
}

function BreadcrumbsContainer({ children, variant = 'milk' }) {
  return (
    <SectionContainer
      className="pb-[30px] max-[600px]:pb-[15px]"
      variant={variant}
    >
      <SectionInnerContainer>
        <ul className="pt-[20px] max-[600px]:pt-[10px] flex flex-nowrap max-[600px]:flex-wrap items-center justify-start gap-[10px] max-[600px]:gap-[5px] text-silkway-green">
          {children}
        </ul>
      </SectionInnerContainer>
    </SectionContainer>
  )
}

export function Breadcrumbs({ variant = 'milk' }) {
  const items = getGlobalData('breadcrumbsData')

  return (
    <BreadcrumbsContainer variant={variant}>
      {items.map(({ url, name }) => (
        <BreadcrumbsItem
          url={url}
          name={name}
          key={url + name}
        />
      ))}
    </BreadcrumbsContainer>
  )
}
