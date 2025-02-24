import { getGlobalData } from '@/utils'
import homeIcon from '@/assets/home_icon.svg'
import arrowRightIcon from '@/assets/arrow_right_icon.svg'

function BreadcrumbsItem({ url, name }) {
  return (
    <>
      <li>
        {url == '' && <span className="text-silkway-gray text-sm">{name}</span>}
        {url != '' && url != '/' && (
          <a
            className="font-sans text-sm hover:text-silkway-orange transition-colors"
            href={url}
          >
            {name}
          </a>
        )}
        {url == '/' && (
          <a href={url}>
            <img src={homeIcon} />
          </a>
        )}
      </li>
      <li className="last:hidden">
        <img
          src={arrowRightIcon}
          className="h-[10px] px-[4px] pt-[2px]"
        />
      </li>
    </>
  )
}

export function Breadcrumbs() {
  const items = getGlobalData('breadcrumbsData')

  return (
    <ul className="py-[10px] flex flex-nowrap items-center justify-start gap-[10px] text-silkway-green">
      {items.map(({ url, name }) => (
        <BreadcrumbsItem
          url={url}
          name={name}
          key={url + name}
        />
      ))}
    </ul>
  )
}
