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
        <div className="flex flex-nowrap justify-start flex-row max-[500px]:flex-col gap-[5px] min-[400px]:gap-[15px] min-[1100px]:gap-[30px]">
          <div className="max-[500px]:hidden">
            <PictureSlider
              onChange={(idx) => setPictureIdx(idx)}
              pictureUrls={productInfo.picture_urls}
              orientation="vertical"
            />
          </div>

          <img
            className="aspect-square object-cover rounded w-[300px] h-[300px] min-[500px]:w-[400px] min-[400px]:h-[400px] min-[1100px]:w-[640px] min-[1100px]:h-[640px]"
            src={imagesUrlPrefix + productInfo.picture_urls[pictureIdx]}
          />

          <div className="min-[500px]:hidden">
            <PictureSlider
              onChange={(idx) => setPictureIdx(idx)}
              pictureUrls={productInfo.picture_urls}
              orientation="horizontal"
            />
          </div>
        </div>
      </SectionInnerContainer>
    </SectionContainer>
  )
}
