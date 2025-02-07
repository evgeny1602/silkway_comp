import { useState } from 'react'
import { useEffect } from 'react'

function BannerItem({ title, url, img, offset }) {
  return (
    <a
      href={url}
      className="min-w-[100%] h-auto overflow-hidden object-cover block transition-transform duration-700 box-border"
      style={{ transform: `translateX(${-offset * 100}%)` }}
    >
      <img
        className="h-full object-cover"
        src={img}
        alt={title}
      />
    </a>
  )
}

export function BannerSlider({ banners, delayMs = 5000, renderDot }) {
  const Dot = renderDot
  const [activeIndex, setActiveIndex] = useState(0)
  const [slideDone, setSlideDone] = useState(true)
  const [timerID, setTimerID] = useState(null)
  const [touchPosition, setTouchPosition] = useState(null)

  const slideNext = (fromTouch = false) => {
    setActiveIndex((prevIdx) => {
      let newIdx = prevIdx + 1
      if (newIdx > banners.length - 1) {
        if (fromTouch) {
          newIdx = banners.length - 1
        } else {
          newIdx = 0
        }
      }
      return newIdx
    })
  }

  const slidePrev = (fromTouch = false) => {
    setActiveIndex((prevIdx) => {
      let newIdx = prevIdx - 1
      if (newIdx < 0) {
        if (fromTouch) {
          newIdx = 0
        } else {
          newIdx = banners.length - 1
        }
      }
      return newIdx
    })
  }

  const AutoPlayStop = () => {
    if (timerID > 0) {
      clearTimeout(timerID)
      setSlideDone(false)
    }
  }

  const AutoPlayStart = () => {
    if (!slideDone) {
      setSlideDone(true)
    }
  }

  const handleTouchMove = (e) => {
    if (touchPosition === null) {
      return
    }

    const direction = touchPosition - e.touches[0].clientX

    if (direction > 10) {
      slideNext(true)
    }

    if (direction < -10) {
      slidePrev(true)
    }

    setTouchPosition(null)
  }

  useEffect(() => {
    if (!slideDone) {
      return
    }

    setSlideDone(false)

    setTimerID(
      setTimeout(() => {
        slideNext()
        setSlideDone(true)
      }, delayMs)
    )
  }, [slideDone])

  return (
    <div
      className="relative w-full p-0 flex overflow-hidden flex-nowrap justify-start"
      onMouseEnter={AutoPlayStop}
      onMouseLeave={AutoPlayStart}
      onTouchStart={(e) => setTouchPosition(e.touches[0].clientX)}
      onTouchMove={handleTouchMove}
    >
      {banners.map(({ name, url, img }) => (
        <BannerItem
          key={url + name}
          title={name}
          url={url}
          img={img}
          offset={activeIndex}
        />
      ))}

      <div className="h-[8px] w-full absolute justify-center flex flex-nowrap gap-[15px] bottom-[15px]">
        {banners.map(({ name, url, img }, idx) => (
          <Dot
            key={url + name}
            isActive={idx == activeIndex}
            onClick={() => {
              setActiveIndex(idx)
            }}
          />
        ))}
      </div>
    </div>
  )
}
