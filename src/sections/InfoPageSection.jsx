import { SectionContainer } from '../ui/SectionContainer'
import { SectionInnerContainer } from '../ui/SectionInnerContainer'
import { useEffect, useRef } from 'react'

export function InfoPageSection() {
  const textRef = useRef(null)

  useEffect(() => {
    textRef.current.innerHTML = window.infoPageData?.html || ''
  }, [])

  return (
    <SectionContainer className="mb-[30px]">
      <SectionInnerContainer>
        <div
          className="text-silkway-dark-chocolate text-sm"
          ref={textRef}
        ></div>
      </SectionInnerContainer>
    </SectionContainer>
  )
}
