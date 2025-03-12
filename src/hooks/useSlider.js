import { useEffect, useRef, useState } from 'react'

const getElementSizeVisible = (elementRef, orientation = 'vertical') => {
  if (orientation == 'vertical') {
    return elementRef.current.getBoundingClientRect().height
  }
  if (orientation == 'horizontal') {
    return elementRef.current.getBoundingClientRect().width
  }
}

const getElementSizeinVisible = (elementRef, orientation = 'vertical') => {
  if (orientation == 'vertical') {
    return elementRef.current.scrollHeight
  }
  if (orientation == 'horizontal') {
    return elementRef.current.scrollWidth
  }
}

const getElementStart = (elementRef, orientation = 'vertical') => {
  if (orientation == 'vertical') {
    return elementRef.current.scrollTop
  }
  if (orientation == 'horizontal') {
    return elementRef.current.scrollLeft
  }
}

const getScrollTo = (value, orientation = 'vertical') => {
  if (orientation == 'vertical') {
    return {
      top: value,
      behavior: 'smooth',
    }
  }
  if (orientation == 'horizontal') {
    return {
      left: value,
      behavior: 'smooth',
    }
  }
}

export function useSlider(picturesTotal, activeIdx, orientation = 'vertical') {
  const outerRef = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    const scrollToActive = () => {
      const visibleSize = getElementSizeVisible(outerRef, orientation)
      const allSize = getElementSizeinVisible(innerRef, orientation)
      const visibleStart = getElementStart(outerRef, orientation)
      const elementSize = allSize / picturesTotal
      const activeOffset = activeIdx * elementSize
      const visibleEnd = visibleStart + visibleSize
      if (activeOffset < visibleStart + elementSize) {
        outerRef.current.scrollTo(
          getScrollTo(activeOffset - elementSize, orientation)
        )
      }
      if (activeOffset > visibleEnd - elementSize) {
        outerRef.current.scrollTo(
          getScrollTo(activeOffset - visibleSize + 2 * elementSize, orientation)
        )
      }
    }

    scrollToActive()
  }, [activeIdx])

  return { innerRef, outerRef }
}
