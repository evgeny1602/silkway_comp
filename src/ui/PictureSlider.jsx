import { useEffect, useRef, useState } from 'react'
import { imagesUrlPrefix } from '../config'

import arrowRightIcon from '../assets/arrow_right_icon.svg'
import { useSlider } from '../hooks/useSlider'

function ArrowUpIcon() {
  return (
    <img
      src={arrowRightIcon}
      className="-rotate-90"
    />
  )
}

function ArrowDownIcon() {
  return (
    <img
      src={arrowRightIcon}
      className="rotate-90"
    />
  )
}

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

function SliderUpButton({ onClick }) {
  return (
    <div className="absolute top-0 left-0 translate-x-[40%] z-10 mt-[10px]">
      <SliderButton onClick={onClick}>
        <ArrowUpIcon />
      </SliderButton>
    </div>
  )
}

function SliderDownButton({ onClick }) {
  return (
    <div className="absolute bottom-0 left-0 translate-x-[40%] z-10 mb-[10px]">
      <SliderButton onClick={onClick}>
        <ArrowDownIcon />
      </SliderButton>
    </div>
  )
}

function SliderLeftButton({ onClick }) {
  return (
    <div className="absolute top-0 left-0 translate-y-[40%] z-10 ml-[10px]">
      <SliderButton onClick={onClick}>
        <ArrowLeftIcon />
      </SliderButton>
    </div>
  )
}

function SliderRightButton({ onClick }) {
  return (
    <div className="absolute top-0 right-0 translate-y-[40%] z-10 mr-[10px]">
      <SliderButton onClick={onClick}>
        <ArrowRightIcon />
      </SliderButton>
    </div>
  )
}

function ProductPictureSlide({ url, isActive = null, onClick }) {
  return (
    <img
      draggable={false}
      onClick={onClick}
      src={imagesUrlPrefix + url}
      className={
        'h-[100px] w-[100px] aspect-square object-cover rounded cursor-pointer hover:opacity-100' +
        (isActive ? ' outline-[3px] outline outline-silkway-orange' : '')
      }
    />
  )
}

function PictureSliderContainerOuter({
  children,
  selfRef,
  orientation = 'vertical',
}) {
  return (
    <div
      ref={selfRef}
      className={
        orientation == 'vertical'
          ? 'overflow-y-scroll w-[106px] h-[640px]'
          : 'overflow-x-scroll h-[106px] w-[640px]'
      }
      style={{ scrollbarWidth: 'none' }}
    >
      {children}
    </div>
  )
}

function PictureSliderContainerInner({
  children,
  selfRef,
  orientation = 'vertical',
}) {
  return (
    <div
      ref={selfRef}
      className={
        'flex flex-nowrap gap-[15px] p-[3px] transition-all items-center ' +
        (orientation == 'vertical' ? 'flex-col' : 'flex-row')
      }
    >
      {children}
    </div>
  )
}

function PictureSliderAllContainer({ children, orientation = 'vertical' }) {
  return (
    <div
      className={
        'relative ' +
        (orientation == 'vertical'
          ? 'w-[106px] h-[640px]'
          : 'w-[640px] h-[106px]')
      }
    >
      {children}
    </div>
  )
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

      {orientation == 'horizontal' && activeIdx > 0 && (
        <SliderLeftButton onClick={prevSlide} />
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

      {orientation == 'vertical' && activeIdx < pictureUrls.length - 1 && (
        <SliderDownButton onClick={nextSlide} />
      )}

      {orientation == 'horizontal' && activeIdx < pictureUrls.length - 1 && (
        <SliderRightButton onClick={nextSlide} />
      )}
    </PictureSliderAllContainer>
  )
}
