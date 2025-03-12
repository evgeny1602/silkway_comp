import { useEffect, useRef, useState } from 'react'
import { imagesUrlPrefix } from '../config'

import arrowRightIcon from '../assets/arrow_right_icon.svg'
import { useSlider } from '../hooks/useSlider'

function ArrowUpIcon() {
  return (
    <img
      src={arrowRightIcon}
      className="-rotate-90 w-[35%] h-[35%]"
    />
  )
}

function ArrowDownIcon() {
  return (
    <img
      src={arrowRightIcon}
      className="rotate-90 w-[35%] h-[35%]"
    />
  )
}

function ArrowLeftIcon() {
  return (
    <img
      src={arrowRightIcon}
      className="-rotate-180 w-[35%] h-[35%]"
    />
  )
}

function ArrowRightIcon() {
  return (
    <img
      src={arrowRightIcon}
      className="w-[35%] h-[35%]"
    />
  )
}

function SliderButton({ children, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-silkway-dark-milk rounded-[50%] flex flex-nowrap justify-center items-center cursor-pointer opacity-90 hover:opacity-100 shadow-sm transition-all z-10 m-[10px] w-[20px] h-[20px] min-[400px]:w-[40px] min-[400px]:h-[40px] min-[1100px]:w-[60px] min-[1100px]:h-[60px]"
    >
      {children}
    </div>
  )
}

function SliderUpButton({ onClick }) {
  return (
    <div className="absolute top-0 left-[50%] -translate-x-[50%]">
      <SliderButton onClick={onClick}>
        <ArrowUpIcon />
      </SliderButton>
    </div>
  )
}

function SliderDownButton({ onClick }) {
  return (
    <div className="absolute bottom-0 left-[50%] -translate-x-[50%]">
      <SliderButton onClick={onClick}>
        <ArrowDownIcon />
      </SliderButton>
    </div>
  )
}

function SliderLeftButton({ onClick }) {
  return (
    <div className="absolute top-[50%] left-0 -translate-y-[50%]">
      <SliderButton onClick={onClick}>
        <ArrowLeftIcon />
      </SliderButton>
    </div>
  )
}

function SliderRightButton({ onClick }) {
  return (
    <div className="absolute top-[50%] right-0 -translate-y-[50%]">
      <SliderButton onClick={onClick}>
        <ArrowRightIcon />
      </SliderButton>
    </div>
  )
}

function ProductPictureSlide({ url, isActive = null, onClick }) {
  const outlined = isActive
    ? 'outline-[3px] outline outline-silkway-orange'
    : ''

  return (
    <div className="aspect-square h-[100px] w-[100px] max-[1100px]:h-[75px] max-[1100px]:w-[75px] max-[400px]:h-[50px] max-[400px]:w-[50px]">
      <img
        draggable={false}
        onClick={onClick}
        src={imagesUrlPrefix + url}
        className={`aspect-square object-cover rounded cursor-pointer ${outlined}`}
      />
    </div>
  )
}

function PictureSliderContainerOuter({
  children,
  selfRef,
  orientation = 'vertical',
}) {
  if (orientation == 'vertical') {
    return (
      <div
        style={{ scrollbarWidth: 'none' }}
        ref={selfRef}
        className="overflow-y-scroll w-[56px] h-[300px] min-[400px]:w-[81px] min-[1100px]:w-[106px] min-[500px]:h-[400px] min-[1100px]:h-[640px]"
      >
        {children}
      </div>
    )
  }

  if (orientation == 'horizontal') {
    return (
      <div
        style={{ scrollbarWidth: 'none' }}
        ref={selfRef}
        className="overflow-x-scroll h-[56px] w-[300px] min-[400px]:h-[81px] min-[1100px]:h-[106px] min-[500px]:w-[400px] min-[1100px]:w-[640px]"
      >
        {children}
      </div>
    )
  }
}

function PictureSliderContainerInner({
  children,
  selfRef,
  orientation = 'vertical',
}) {
  const flexDir = orientation == 'vertical' ? 'flex-col' : 'flex-row'

  return (
    <div
      ref={selfRef}
      className={`flex flex-nowrap p-[3px] justify-start transition-all items-center gap-[5px] min-[400px]:gap-[10px] min-[1100px]:gap-[15px] ${flexDir}`}
    >
      {children}
    </div>
  )
}

function PictureSliderAllContainer({ children, orientation = 'vertical' }) {
  if (orientation == 'vertical') {
    return (
      <div className="relative h-[300px] min-[400px]:h-[400px] min-[1100px]:h-[640px] w-[56px] min-[400px]:w-[81px] min-[1100px]:w-[106px]">
        {children}
      </div>
    )
  }

  if (orientation == 'horizontal') {
    return (
      <div className="relative w-[300px] min-[500px]:w-[400px] min-[1100px]:w-[640px] h-[56px] min-[400px]:h-[81px] min-[1100px]:h-[106px]">
        {children}
      </div>
    )
  }
}

export function PictureSlider({
  pictureUrls,
  orientation = 'vertical',
  onChange,
}) {
  const { innerRef, outerRef, activeIdx, setActiveIdx, prevSlide, nextSlide } =
    useSlider(pictureUrls.length, orientation, onChange)

  return (
    <PictureSliderAllContainer orientation={orientation}>
      {orientation == 'vertical' && activeIdx > 0 && (
        <SliderUpButton onClick={prevSlide} />
      )}

      {orientation == 'vertical' && activeIdx < pictureUrls.length - 1 && (
        <SliderDownButton onClick={nextSlide} />
      )}

      {orientation == 'horizontal' && activeIdx > 0 && (
        <SliderLeftButton onClick={prevSlide} />
      )}

      {orientation == 'horizontal' && activeIdx < pictureUrls.length - 1 && (
        <SliderRightButton onClick={nextSlide} />
      )}

      <PictureSliderContainerOuter
        selfRef={outerRef}
        orientation={orientation}
      >
        <PictureSliderContainerInner
          selfRef={innerRef}
          orientation={orientation}
        >
          {pictureUrls.map((url, idx) => (
            <ProductPictureSlide
              onClick={() => setActiveIdx(idx)}
              isActive={activeIdx == idx}
              key={url + idx}
              url={url}
            />
          ))}
        </PictureSliderContainerInner>
      </PictureSliderContainerOuter>
    </PictureSliderAllContainer>
  )
}
