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
    <div className="mt-[30px] mb-[50px]">
      <div className="font-sans text-silkway-gray text-sm">Ваша цена:</div>
      <div className="font-sans text-silkway-dark-chocolate text-3xl">
        {price} ₽
      </div>
    </div>
  )
}

function ProductQty() {
  const selectedOptions = useProductInfoStore((state) => state.selectedOptions)
  const getSelectedVariantQty = useProductInfoStore(
    (state) => state.getSelectedVariantQty
  )

  const { quantity } = getGlobalData('productData')
  let variantQty = getSelectedVariantQty()
  if (variantQty < 0) {
    variantQty = quantity
  }

  return (
    <div className="font-sans text-silkway-gray text-sm">
      В наличии: {variantQty} шт.
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

function OptionValueButton({ children, onClick, variant = 'enabled' }) {
  let classes = 'rounded font-sans text-sm px-[8px] py-[4px]'

  if (variant == 'enabled') {
    classes +=
      ' outline outline-1 text-silkway-dark-chocolate outline-silkway-dark-chocolate'
    // classes += ' hover:bg-silkway-dark-chocolate hover:text-silkway-orange transition-colors'
    classes += ' hover:outline-2'
  }

  if (variant == 'disabled') {
    classes +=
      ' outline outline-1 text-silkway-light-gray outline-silkway-light-gray'
    classes += ' hover:cursor-default'
  }

  if (variant == 'selected') {
    classes += ' outline outline-2 text-silkway-orange outline-silkway-orange'
    classes += ' hover:cursor-default'
  }

  return (
    <button
      onClick={variant == 'enabled' ? onClick : null}
      className={classes}
    >
      {children}
    </button>
  )
}

function OptionValueCheckbox({ code, value }) {
  const selectedOptions = useProductInfoStore((state) => state.selectedOptions)
  const selectOption = useProductInfoStore((state) => state.selectOption)
  const isOptionValueEnabled = useProductInfoStore(
    (state) => state.isOptionValueEnabled
  )
  const isOptionValueSelected = useProductInfoStore(
    (state) => state.isOptionValueSelected
  )

  let isSelected = isOptionValueSelected(code, value)
  let isEnabled = isOptionValueEnabled(code, value)

  if (!isEnabled) {
    isSelected = false
  }

  return (
    <OptionValueButton
      onClick={() => selectOption(code, value)}
      variant={isEnabled ? (isSelected ? 'selected' : 'enabled') : 'disabled'}
    >
      {value}
    </OptionValueButton>
  )
}

function OptionValues({ code }) {
  const productOptions = useProductInfoStore((state) => state.productOptions)
  const name = productOptions[code].name
  const values = productOptions[code].values

  return (
    <div className="flex flex-col flex-nowrap justify-start gap-[10px]">
      <div className="font-sans font-bold text-base text-silkway-dark-chocolate">
        {name}:
      </div>
      <div className="flex flex-row flex-nowrap justify-start gap-[10px]">
        {values.map((value) => (
          <OptionValueCheckbox
            code={code}
            value={value}
            key={code + value}
          />
        ))}
      </div>
    </div>
  )
}

function ProductVariants() {
  const productOptions = useProductInfoStore((state) => state.productOptions)
  const optionCodes = Object.keys(productOptions)

  if (empty(optionCodes)) {
    return null
  }

  if (optionCodes.length == 1 && optionCodes[0] == '') {
    return null
  }

  return (
    <div className="flex flex-col flex-wrap justify-start gap-[30px]">
      {optionCodes.map((optionCode) => (
        <OptionValues
          code={optionCode}
          key={optionCode}
        />
      ))}
    </div>
  )
}

function ProductDetails() {
  return (
    <div className="flex flex-nowrap flex-col max-w-[400px] justify-start">
      <ProductTitle />
      <ProductQty />
      <ProductPrice />
      <ProductVariants />
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
