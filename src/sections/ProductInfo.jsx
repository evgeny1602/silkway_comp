import { useProductInfoStore } from '../stores/productInfoStore'

import { SectionContainer } from '../ui/SectionContainer'
import { SectionInnerContainer } from '../ui/SectionInnerContainer'
import { PictureSlider } from '../ui/PictureSlider'
import { imagesUrlPrefix } from '../config'
import { getGlobalData } from '../utils'

function MainPicture() {
  const pictureUrls = useProductInfoStore((state) => state.pictureUrls)
  const activeIdx = useProductInfoStore((state) => state.activeIdx)

  return (
    <img
      className="aspect-square object-cover rounded w-[300px] h-[300px] min-[500px]:w-[400px] min-[500px]:h-[400px] min-[1350px]:w-[640px] min-[1350px]:h-[640px]"
      src={imagesUrlPrefix + pictureUrls[activeIdx]}
    />
  )
}

function VerticalSliderContainer({ children }) {
  return <div className="max-[550px]:hidden">{children}</div>
}

function HorizontalSliderContainer({ children }) {
  return <div className="min-[550px]:hidden">{children}</div>
}

function SliderMainPicContainer({ children }) {
  return (
    <div className="flex flex-nowrap justify-start flex-row max-[550px]:flex-col max-[500px]:flex-col gap-[5px] min-[400px]:gap-[15px] min-[1100px]:gap-[30px]">
      {children}
    </div>
  )
}

function ProductPrice() {
  const { price } = getGlobalData('productData')

  return (
    <div className="mt-[30px]">
      <div className="font-sans text-silkway-gray text-sm">Ваша цена:</div>
      <div className="font-sans text-silkway-dark-chocolate text-3xl">
        {price} ₽
      </div>
    </div>
  )
}

function ProductQty() {
  const { quantity } = getGlobalData('productData')

  return (
    <div className="font-sans text-silkway-gray text-sm">
      В наличии: {quantity} шт.
    </div>
  )
}

function ProductTitle() {
  const productInfo = getGlobalData('productData')

  return (
    <div className="font-sans text-silkway-dark-chocolate text-3xl mb-[15px]">
      {productInfo.name}
    </div>
  )
}

function ProductDescription() {
  const { description } = getGlobalData('productData')

  if (!description) {
    return null
  }

  return (
    <div className="font-sans text-silkway-dark-chocolate mt-[30px] border-t border-silkway-dark-milk">
      <div className="font-bold text-xl my-[15px]">Описание</div>
      <div className="text-sm">{description}</div>
    </div>
  )
}

function ProductChar({ name, value }) {
  return (
    <div>
      {name}: {value}
    </div>
  )
}

function ProductCharacteristics() {
  const { characteristics } = getGlobalData('productData')

  return (
    <div className="font-sans text-silkway-dark-chocolate mt-[30px] border-t border-silkway-dark-milk">
      <div className="font-bold text-xl my-[15px]">Характеристики</div>
      <div className="text-sm">
        {characteristics.map(({ name, value }) => (
          <ProductChar
            key={name}
            name={name}
            value={value}
          />
        ))}
      </div>
    </div>
  )
}

function ProductDetails() {
  return (
    <div className="flex flex-nowrap flex-col max-w-[400px] justify-start">
      <ProductTitle />
      <ProductQty />
      <ProductPrice />
      <ProductDescription />
      <ProductCharacteristics />
    </div>
  )
}

function ProductInfoContainer({ children }) {
  return (
    <div className="pb-[60px] flex flex-wrap flex-row justify-start gap-[30px]">
      {children}
    </div>
  )
}

export function ProductInfo() {
  return (
    <SectionContainer variant="white">
      <SectionInnerContainer>
        <ProductInfoContainer>
          <SliderMainPicContainer>
            <VerticalSliderContainer>
              <PictureSlider orientation="vertical" />
            </VerticalSliderContainer>

            <MainPicture />

            <HorizontalSliderContainer>
              <PictureSlider orientation="horizontal" />
            </HorizontalSliderContainer>
          </SliderMainPicContainer>

          <ProductDetails />
        </ProductInfoContainer>
      </SectionInnerContainer>
    </SectionContainer>
  )
}
