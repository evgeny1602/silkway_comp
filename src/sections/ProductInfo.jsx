import { useProductInfoStore } from '../stores/productInfoStore'

import { SectionContainer } from '../ui/SectionContainer'
import { SectionInnerContainer } from '../ui/SectionInnerContainer'
import { PictureSlider } from '../ui/PictureSlider'
import { imagesUrlPrefix } from '../config'
import { getGlobalData } from '../utils'
import { addToCart } from '../api/cart'

import { Button } from '../ui/Button'
import { useEffect, useState } from 'react'
import { useCartStore } from '../stores/cartStore'

import { ToastContainer, toast } from 'react-toastify'

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
  let classes = 'rounded font-sans text-sm px-[8px] py-[4px] min-w-[50px]'

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

  if (optionCodes.length == 0) {
    return null
  }

  if (optionCodes.length == 1 && optionCodes[0] == '') {
    return null
  }

  return (
    <div className="flex flex-col flex-wrap justify-start gap-[30px] mb-[30px]">
      {optionCodes.map((optionCode) => (
        <OptionValues
          code={optionCode}
          key={optionCode}
        />
      ))}
    </div>
  )
}

function AddToCartCountButton({ children, onClick, hoverState = 'standart' }) {
  let classes =
    'h-full transition-colors w-[48px] max-[400px]:w-[36px] flex flex-nowrap flex-row justify-center items-center text-2xl text-silkway-light-chocolate'

  classes += {
    standart: ' hover:bg-silkway-light-orange',
    none: ' cursor-default',
  }[hoverState]

  return (
    <div
      onClick={onClick}
      className={classes}
    >
      {children}
    </div>
  )
}

function AddToCartMainButton({ text, onClick, hoverState = 'standart' }) {
  let classes =
    'px-[10px] border-l border-r border-silkway-dark-orange h-full grow flex flex-nowrap flex-col justify-center items-center font-sans font-light text-sm max-[400px]:text-xs'

  classes += {
    standart: ' hover:bg-silkway-light-orange transition-colors',
    none: ' cursor-default',
  }[hoverState]

  return (
    <div
      onClick={onClick}
      className={classes}
    >
      {text}
    </div>
  )
}

function AddToCartButton({ onMinusClick, onPlusClick, onMainClick, count }) {
  const { price } = getGlobalData('productData')

  let text = 'Добавить в корзину'
  if (count > 0) {
    text += ` ${count} шт. на ${count * price} ₽`
  }

  return (
    <Button
      hoverState="none"
      paddingX="px-0"
      paddingY="py-0"
      className={count > 0 ? null : 'opacity-50'}
    >
      <div className="flex flex-nowrap flex-row justify-between items-center w-full h-full">
        <AddToCartCountButton
          onClick={count > 0 ? onMinusClick : null}
          hoverState={count > 0 ? 'standart' : 'none'}
        >
          -
        </AddToCartCountButton>

        <AddToCartMainButton
          onClick={count > 0 ? onMainClick : null}
          text={text}
          hoverState={count > 0 ? 'standart' : 'none'}
        />

        <AddToCartCountButton
          onClick={count > 0 ? onPlusClick : null}
          hoverState={count > 0 ? 'standart' : 'none'}
        >
          +
        </AddToCartCountButton>
      </div>
    </Button>
  )
}

function AddToCartButtonSmart() {
  const getOptionsCount = useProductInfoStore((state) => state.getOptionsCount)
  const selectedOptions = useProductInfoStore((state) => state.selectedOptions)
  const areAllOptionsSelected = useProductInfoStore(
    (state) => state.areAllOptionsSelected
  )
  const getSelectedVariantQty = useProductInfoStore(
    (state) => state.getSelectedVariantQty
  )

  const resetSelectedOptions = useProductInfoStore(
    (state) => state.resetSelectedOptions
  )

  const setItems = useCartStore((state) => state.setItems)

  const [count, setCount] = useState(getOptionsCount() == 0 ? 1 : 0)
  const [maxCount, setMaxCount] = useState(1)

  useEffect(() => {
    let maxVariantQty = getSelectedVariantQty()
    if (maxVariantQty < 0) {
      maxVariantQty = getGlobalData('productData').quantity
    }
    setMaxCount(maxVariantQty)
    setCount(areAllOptionsSelected() ? 1 : 0)
  }, [selectedOptions])

  const handleAddToCart = async () => {
    const data = await addToCart({
      productId: getGlobalData('productData').id,
      qty: count,
      options: JSON.stringify(selectedOptions),
    })

    resetSelectedOptions()

    setCount(0)

    setItems(data.items)

    if (data.ok) {
      toast.success('Товар добавлен в корзину')
    } else {
      toast.error('Товар в корзину не добавлен. Недостаточно товара на складе.')
    }
  }

  return (
    <>
      <AddToCartButton
        count={count}
        onMinusClick={() => setCount((old) => Math.max(1, old - 1))}
        onPlusClick={() => setCount((old) => Math.min(maxCount, old + 1))}
        onMainClick={handleAddToCart}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
      />
    </>
  )
}

function ProductDetails() {
  return (
    <div className="flex flex-nowrap flex-col max-w-[400px] justify-start">
      <ProductTitle />
      <ProductQty />
      <ProductPrice />
      <ProductVariants />
      <AddToCartButtonSmart />
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
