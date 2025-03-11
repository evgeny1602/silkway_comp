import { imagesUrlPrefix } from '../config'

import { getGlobalData } from '../utils'

import arrowRightIcon from '../assets/arrow_right_icon.svg'
import { useRef, useState } from 'react'

function ArrowLeftIcon() {
  return (
    <img
      src={arrowRightIcon}
      className="-rotate-180"
    />
  )
}

function ArrowRightIcon() {
  return <img src={arrowRightIcon} />
}

function ArrowDownIcon() {
  return (
    <img
      src={arrowRightIcon}
      className="rotate-90"
    />
  )
}

function ArrowUpIcon() {
  return (
    <img
      src={arrowRightIcon}
      className="-rotate-90"
    />
  )
}

function SliderButton({ children, onClick }) {
  return (
    <div
      onClick={onClick}
      className="h-[60px] w-[60px] bg-silkway-dark-milk rounded-[50%] flex flex-nowrap justify-center items-center cursor-pointer opacity-90 hover:opacity-100 shadow-sm transition-all"
    >
      {children}
    </div>
  )
}

function ProductPictureSliderUpButton({ onClick }) {
  return (
    <div className="absolute top-0 left-0 translate-x-[40%] z-10 mt-[10px]">
      <SliderButton onClick={onClick}>
        <ArrowUpIcon />
      </SliderButton>
    </div>
  )
}

function ProductPictureSliderDownButton({ onClick }) {
  return (
    <div className="absolute bottom-0 left-0 translate-x-[40%] z-10 mb-[10px]">
      <SliderButton onClick={onClick}>
        <ArrowDownIcon />
      </SliderButton>
    </div>
  )
}

function ProductPictureSliderLeftButton({ onClick }) {
  return (
    <div className="absolute left-0 top-0 z-10 ml-[10px] translate-y-[40%]">
      <SliderButton onClick={onClick}>
        <ArrowLeftIcon />
      </SliderButton>
    </div>
  )
}

function ProductPictureSliderRightButton({ onClick }) {
  return (
    <div className="absolute right-0 top-0 z-10 mr-[10px] translate-y-[40%]">
      <SliderButton onClick={onClick}>
        <ArrowRightIcon />
      </SliderButton>
    </div>
  )
}

function ProductPictureSlide({ url, isActive = null, onClick }) {
  let classes =
    'h-[100px] w-[100px] aspect-square object-cover rounded cursor-pointer hover:opacity-100'
  classes += isActive ? ' outline-[3px] outline outline-silkway-orange' : ''

  return (
    <img
      draggable={false}
      onClick={onClick}
      src={imagesUrlPrefix + url}
      className={classes}
    />
  )
}

export function ProductPicturesSlider({
  visibleItems = 5,
  orientation = 'vertical',
}) {
  const [touchPosition, setTouchPosition] = useState(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const parentRef = useRef(null)
  const innerRef = useRef(null)

  const { picture_urls: pictureUrls } = getGlobalData('productData')

  const calcActiveSlideCenter = (idx) => {
    const innerSize =
      orientation == 'vertical'
        ? innerRef.current.scrollHeight
        : innerRef.current.scrollWidth
    const elSize = innerSize / pictureUrls.length
    return (idx + 0.5) * elSize
  }

  const calcVisibleCoords = () => {
    const parentSizeVisible =
      orientation == 'vertical'
        ? parentRef.current.getBoundingClientRect().height
        : parentRef.current.getBoundingClientRect().width
    const start =
      orientation == 'vertical'
        ? parentRef.current.scrollTop
        : parentRef.current.scrollLeft
    return {
      start,
      end: start + parentSizeVisible,
    }
  }

  const scrollToActive = (idx) => {
    const { start, end } = calcVisibleCoords()
    const activeCenter = calcActiveSlideCenter(idx)
    console.log({ start, end, activeCenter })
    const k = orientation == 'vertical' ? 'scrollTop' : 'scrollLeft'
    if (activeCenter < start) {
      parentRef.current[k] -= 3 * (start - activeCenter)
    }
    if (activeCenter > end) {
      parentRef.current[k] += 3 * (activeCenter - end)
    }
  }

  const prevSlide = () => {
    let newActiveIdx = Math.max(0, activeIdx - 1)
    setActiveIdx(newActiveIdx)
    scrollToActive(newActiveIdx)
  }

  const nextSlide = () => {
    let newActiveIdx = Math.min(activeIdx + 1, pictureUrls.length - 1)
    setActiveIdx(newActiveIdx)
    scrollToActive(newActiveIdx)
  }

  const currentSlide = (idx) => {
    setActiveIdx(idx)
    scrollToActive(idx)
  }

  const handleMouseMove = (e) => {
    if (touchPosition !== null) {
      parentRef.current.scrollLeft +=
        (touchPosition - (orientation == 'vertical' ? e.clientY : e.clientX)) /
        30
    }
  }

  const parentClasses =
    'parent-ref relative overflow-hidden' +
    (orientation == 'vertical'
      ? ' w-[106px] h-[640px] my-[15px]'
      : ' w-[640px] h-[106px] mx-[15px]')

  let innerClasses =
    'inner-ref flex flex-nowrap items-center gap-[15px] p-[3px] overflow-auto transition-all'
  innerClasses += orientation == 'vertical' ? ' flex-col' : ''

  return (
    <div
      className={parentClasses}
      ref={parentRef}
    >
      {orientation == 'vertical' && activeIdx > 0 && (
        <ProductPictureSliderUpButton onClick={prevSlide} />
      )}

      {orientation == 'horizontal' && activeIdx > 0 && (
        <ProductPictureSliderLeftButton onClick={prevSlide} />
      )}

      <div
        ref={innerRef}
        onMouseDown={(e) =>
          setTouchPosition(orientation == 'vertical' ? e.clientY : e.clientX)
        }
        onMouseMove={handleMouseMove}
        onMouseUp={() => setTouchPosition(null)}
        className={innerClasses}
      >
        {pictureUrls.map((url, idx) => (
          <ProductPictureSlide
            onClick={() => currentSlide(idx)}
            isActive={activeIdx == idx}
            key={url + idx}
            url={url}
          />
        ))}
      </div>

      {orientation == 'vertical' && activeIdx < pictureUrls.length - 1 && (
        <ProductPictureSliderDownButton onClick={nextSlide} />
      )}

      {orientation == 'horizontal' && activeIdx < pictureUrls.length - 1 && (
        <ProductPictureSliderRightButton onClick={nextSlide} />
      )}
    </div>
  )
}
