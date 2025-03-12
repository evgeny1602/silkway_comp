import { useProductInfoStore } from '../stores/productInfoStore'
import { useSlider } from '../hooks/useSlider'
import { imagesUrlPrefix } from '../config'

import arrowRightIcon from '../assets/arrow_right_icon.svg'

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
      className="bg-silkway-dark-milk rounded-[50%] flex flex-nowrap justify-center items-center cursor-pointer opacity-90 hover:opacity-100 shadow-sm transition-all z-10 m-[10px] w-[20px] h-[20px] min-[400px]:w-[40px] min-[400px]:h-[40px] min-[1350px]:w-[60px] min-[1350px]:h-[60px]"
    >
      {children}
    </div>
  )
}

function SliderUpButton() {
  const prevSlide = useProductInfoStore((state) => state.prevSlide)
  const activeIdx = useProductInfoStore((state) => state.activeIdx)

  if (activeIdx == 0) {
    return null
  }

  return (
    <div className="absolute top-0 left-[50%] -translate-x-[50%]">
      <SliderButton onClick={prevSlide}>
        <ArrowUpIcon />
      </SliderButton>
    </div>
  )
}

function SliderDownButton() {
  const nextSlide = useProductInfoStore((state) => state.nextSlide)
  const activeIdx = useProductInfoStore((state) => state.activeIdx)
  const pictureUrls = useProductInfoStore((state) => state.pictureUrls)

  if (activeIdx == pictureUrls.length - 1) {
    return null
  }

  return (
    <div className="absolute bottom-0 left-[50%] -translate-x-[50%]">
      <SliderButton onClick={nextSlide}>
        <ArrowDownIcon />
      </SliderButton>
    </div>
  )
}

function SliderLeftButton() {
  const prevSlide = useProductInfoStore((state) => state.prevSlide)
  const activeIdx = useProductInfoStore((state) => state.activeIdx)

  if (activeIdx == 0) {
    return null
  }

  return (
    <div className="absolute top-[50%] left-0 -translate-y-[50%]">
      <SliderButton onClick={prevSlide}>
        <ArrowLeftIcon />
      </SliderButton>
    </div>
  )
}

function SliderRightButton() {
  const nextSlide = useProductInfoStore((state) => state.nextSlide)
  const activeIdx = useProductInfoStore((state) => state.activeIdx)
  const pictureUrls = useProductInfoStore((state) => state.pictureUrls)

  if (activeIdx == pictureUrls.length - 1) {
    return null
  }

  return (
    <div className="absolute top-[50%] right-0 -translate-y-[50%]">
      <SliderButton onClick={nextSlide}>
        <ArrowRightIcon />
      </SliderButton>
    </div>
  )
}

function ProductPictureSlide({ idx }) {
  const activeIdx = useProductInfoStore((state) => state.activeIdx)
  const setActiveIdx = useProductInfoStore((state) => state.setActiveIdx)
  const pictureUrls = useProductInfoStore((state) => state.pictureUrls)

  const outlined =
    idx == activeIdx ? 'outline-[3px] outline outline-silkway-orange' : ''

  return (
    <div className="aspect-square h-[100px] w-[100px] max-[1350px]:h-[75px] max-[1350px]:w-[75px] max-[400px]:h-[50px] max-[400px]:w-[50px]">
      <img
        draggable={false}
        onClick={() => setActiveIdx(idx)}
        src={imagesUrlPrefix + pictureUrls[idx]}
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
        className="overflow-y-scroll w-[56px] h-[300px] min-[400px]:w-[81px] min-[1350px]:w-[106px] min-[500px]:h-[400px] min-[1350px]:h-[640px]"
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
        className="overflow-x-scroll h-[56px] w-[300px] min-[400px]:h-[81px] min-[1350px]:h-[106px] min-[500px]:w-[400px] min-[1350px]:w-[640px]"
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
      className={`flex flex-nowrap p-[3px] justify-start transition-all items-center gap-[5px] min-[400px]:gap-[10px] min-[1350px]:gap-[15px] ${flexDir}`}
    >
      {children}
    </div>
  )
}

function PictureSliderAllContainer({ children, orientation = 'vertical' }) {
  if (orientation == 'vertical') {
    return (
      <div className="relative h-[300px] min-[400px]:h-[400px] min-[1350px]:h-[640px] w-[56px] min-[400px]:w-[81px] min-[1350px]:w-[106px]">
        {children}
      </div>
    )
  }

  if (orientation == 'horizontal') {
    return (
      <div className="relative w-[300px] min-[500px]:w-[400px] min-[1350px]:w-[640px] h-[56px] min-[400px]:h-[81px] min-[1350px]:h-[106px]">
        {children}
      </div>
    )
  }
}

function SliderButtons({ orientation = 'vertical' }) {
  return (
    <>
      {orientation == 'vertical' && <SliderUpButton />}
      {orientation == 'vertical' && <SliderDownButton />}
      {orientation == 'horizontal' && <SliderLeftButton />}
      {orientation == 'horizontal' && <SliderRightButton />}
    </>
  )
}

export function PictureSlider({ orientation = 'vertical' }) {
  const pictureUrls = useProductInfoStore((state) => state.pictureUrls)
  const activeIdx = useProductInfoStore((state) => state.activeIdx)

  const { innerRef, outerRef } = useSlider(
    pictureUrls.length,
    activeIdx,
    orientation
  )

  return (
    <PictureSliderAllContainer orientation={orientation}>
      <SliderButtons orientation={orientation} />

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
              idx={idx}
              key={url + idx}
            />
          ))}
        </PictureSliderContainerInner>
      </PictureSliderContainerOuter>
    </PictureSliderAllContainer>
  )
}
