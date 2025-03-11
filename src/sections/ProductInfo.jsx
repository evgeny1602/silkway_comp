import { getGlobalData } from '../utils'

import { SectionContainer } from '../ui/SectionContainer'
import { SectionInnerContainer } from '../ui/SectionInnerContainer'
import { PictureSlider } from '../ui/PictureSlider'
import { useState } from 'react'
import { imagesUrlPrefix } from '../config'

export function ProductInfo() {
  const [pictureIdx, setPictureIdx] = useState(0)

  const productInfo = getGlobalData('productData')

  return (
    <SectionContainer variant="white">
      <SectionInnerContainer>
        <div className="flex flex-nowrap gap-[30px]">
          <PictureSlider
            onChange={(idx) => setPictureIdx(idx)}
            pictureUrls={productInfo.picture_urls}
            orientation="vertical"
          />

          <img
            className="h-[640px] w-[640px] aspect-square object-cover rounded"
            src={imagesUrlPrefix + productInfo.picture_urls[pictureIdx]}
          />
        </div>
      </SectionInnerContainer>
    </SectionContainer>
  )
}
