import { cartSum, filterCartItemProperties, formatMoney } from '../utils'

import { imagesUrlPrefix } from '../config'

import { useCartStore } from '../stores/cartStore'

import { SectionContainer } from '../ui/SectionContainer'
import { SectionInnerContainer } from '../ui/SectionInnerContainer'
import { CartItemDeleteButton } from '../ui/CartItemDeleteButton'
import { Button } from '../ui/Button'

function CartPageItemImg({ src, name, onClick }) {
  return (
    <img
      onClick={onClick}
      alt={name}
      className="cursor-pointer w-[100px] aspect-square object-cover rounded bg-silkway-orange/50"
      src={`${imagesUrlPrefix}${src}`}
    />
  )
}

function CartPageItemTitleContainer({ children, onClick }) {
  return (
    <div
      className="flex flex-nowrap flex-row justify-start font-sans text-base text-silkway-dark-chocolate cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  )
}

function CartPageItemContainer({ children }) {
  return (
    <div className="w-full bg-white rounded p-[15px] flex flex-row flex-nowrap justify-between items-stretch gap-[15px]">
      {children}
    </div>
  )
}

function CartPageItemInfoContainer({ children }) {
  return (
    <div className="flex flex-col flex-nowrap justify-between items-start grow">
      {children}
    </div>
  )
}

function CartPageItemPropertiesContainer({ children }) {
  return (
    <div className="flex flex-col flex-nowrap grow justify-end">{children}</div>
  )
}

function CartPageItemProp({ prop }) {
  return (
    <div>
      <span className="font-sans font-light text-silkway-gray text-sm">
        {prop.name}:{' '}
      </span>
      <span className="font-sans text-silkway-green text-sm underline">
        {prop.value}
      </span>
    </div>
  )
}

function CartPageItemQtyButton({ children, className, onClick }) {
  let classes =
    'h-[36px] flex flex-row flex-nowrap justify-center items-center border border-silkway-dark-milk text-silkway-dark-chocolate'

  classes += className ? ` ${className}` : ''

  return (
    <span
      className={classes}
      onClick={onClick}
    >
      {children}
    </span>
  )
}

function CartPageItemChangeQtyButton({ children, className, onClick }) {
  let classes =
    'w-[32px] text-xl cursor-pointer hover:bg-silkway-dark-milk transition-colors'
  classes += className ? ` ${className}` : ''

  return (
    <CartPageItemQtyButton
      className={classes}
      onClick={onClick}
    >
      {children}
    </CartPageItemQtyButton>
  )
}

function CartPageItemQty({ item }) {
  console.log({ item })

  const handleMinusClick = () => {
    console.log('Minus')
  }

  const handlePlusClick = () => {
    console.log('Plus')
  }

  return (
    <div className="flex flex-row flex-nowrap items-center">
      <CartPageItemChangeQtyButton
        className="rounded-tl rounded-bl"
        onClick={handleMinusClick}
      >
        -
      </CartPageItemChangeQtyButton>

      <CartPageItemQtyButton className="w-[42px] text-sm">
        {parseInt(item.quantity)}
      </CartPageItemQtyButton>

      <CartPageItemChangeQtyButton
        className="rounded-tr rounded-br"
        onClick={handlePlusClick}
      >
        +
      </CartPageItemChangeQtyButton>
    </div>
  )
}

function CartPageItemPriceContainer({ children }) {
  return (
    <span className="flex flex-col flex-nowrap justify-center items-center font-sans text-base text-silkway-dark-chocolate">
      {children} ₽
    </span>
  )
}

function CartPageItemTotalContainer({ children }) {
  return (
    <span className="flex flex-col flex-nowrap justify-center items-center font-sans text-base text-silkway-dark-chocolate">
      {children} ₽
    </span>
  )
}

function CartItemDeleteButtonContainer({ children }) {
  return (
    <div className="flex flex-col flex-nowrap justify-center items-center">
      {children}
    </div>
  )
}

function CartPageItemButtonsContainer({ children }) {
  return (
    <div className="flex flex-row flex-nowrap items-center justify-between gap-[40px] px-[20px]">
      {children}
    </div>
  )
}

function CartPageItem({ item, onClick }) {
  //   console.log(item)

  return (
    <CartPageItemContainer>
      <CartPageItemImg
        src={item.picture}
        name={item.name}
        onClick={onClick}
      />

      <CartPageItemInfoContainer>
        <CartPageItemTitleContainer onClick={onClick}>
          {item.name}
        </CartPageItemTitleContainer>

        <CartPageItemPropertiesContainer>
          {filterCartItemProperties(item.properties).map((prop) => (
            <CartPageItemProp
              prop={prop}
              key={prop.code}
            />
          ))}
        </CartPageItemPropertiesContainer>
      </CartPageItemInfoContainer>

      <CartPageItemButtonsContainer>
        <CartPageItemQty item={item} />

        <CartPageItemPriceContainer>
          {formatMoney(item.price)}
        </CartPageItemPriceContainer>

        <CartPageItemTotalContainer>
          {formatMoney(item.quantity * item.price)}
        </CartPageItemTotalContainer>

        <CartItemDeleteButtonContainer>
          <CartItemDeleteButton />
        </CartItemDeleteButtonContainer>
      </CartPageItemButtonsContainer>
    </CartPageItemContainer>
  )
}

function CartPageItemsContainer({ children }) {
  return (
    <div className="flex flex-col flex-nowrap justify-start gap-[15px] grow">
      {children}
    </div>
  )
}

function CartPageClearCartButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="font-sans text-silkway-red underline font-medium text-base hover:no-underline"
    >
      Очистить корзину
    </button>
  )
}

function CartPageClearCartButtonContainer({ children }) {
  return (
    <div className="w-full flex flex-row flex-nowrap items-center justify-end">
      {children}
    </div>
  )
}

function CartPageTotalSum() {
  const cartItems = useCartStore((state) => state.items)

  return (
    <div className="flex flex-row flex-nowrap justify-between items-center font-sans text-xl font-bold text-silkway-dark-chocolate">
      <span>Сумма заказа</span>
      <span>{formatMoney(cartSum(cartItems))} ₽</span>
    </div>
  )
}

function CartPageTotalDiscount() {
  let totalDiscount = 0

  return (
    <div className="flex flex-row flex-nowrap justify-between items-center font-sans text-sm text-silkway-dark-chocolate mb-[5px]">
      <span>Ваша скидка:</span>
      <span>{formatMoney(totalDiscount)} ₽</span>
    </div>
  )
}

function CartPageTotalContainer({ children }) {
  return (
    <div className="flex flex-col flex-nowrap justify-start gap-[5px] rounded bg-white w-[370px] max-[600px]:w-[320px] p-[30px] max-[600px]:p-[10px]">
      {children}
    </div>
  )
}

function CartPageTotalDeliveryInfo() {
  return (
    <div className="font-sans text-silkway-dark-chocolate text-left flex flex-col flex-nowrap justify-start items-start gap-[5px]">
      <div className="text-base max-[600px]:text-sm font-medium">Доставка</div>
      <div className="text-sm max-[600px]:text-xs mb-[5px]">
        Стоимость доставки зависит от веса и габаритов отправления, а также от
        тарифов службы доставки. Точную стоимость доставки вам объявит менеджер
        после оформления заказа.
      </div>
    </div>
  )
}

function CartPageTotalCheckoutButton() {
  const handleCheckoutClick = () => {
    console.log('Checkout click')
  }

  return (
    <Button
      onClick={handleCheckoutClick}
      className="max-[600px]:h-[36px] text-base max-[600px]:text-xs"
    >
      Оформить заказ
    </Button>
  )
}

function CartPageTotalCheckoutInfo() {
  return (
    <div className="text-xs text-silkway-gray font-light">
      Нажимая кнопку “Оформить заказ” вы также соглашаесесь с&nbsp;
      <button className="font-normal text-silkway-green hover:underline">
        Условиями конфиденциальности
      </button>
    </div>
  )
}

function CartPageTotal() {
  return (
    <CartPageTotalContainer>
      <CartPageTotalSum />

      <CartPageTotalDiscount />

      <CartPageTotalDeliveryInfo />

      <CartPageTotalCheckoutButton />

      <CartPageTotalCheckoutInfo />
    </CartPageTotalContainer>
  )
}

function CartPageLayout({ children }) {
  return (
    <div className="flex flex-row flex-nowrap justify-between items-start gap-[30px] max-[600px]:gap-[10px]">
      {children}
    </div>
  )
}

export function CartItemsSection() {
  const cartItems = useCartStore((state) => state.items)

  const handleClearCartClick = () => {
    console.log('Clear cart')
  }

  return (
    <SectionContainer>
      <SectionInnerContainer>
        <CartPageLayout>
          <CartPageItemsContainer>
            {cartItems.map((cartItem) => (
              <CartPageItem
                item={cartItem}
                key={cartItem.cart_id}
              />
            ))}

            <CartPageClearCartButtonContainer>
              <CartPageClearCartButton onClick={handleClearCartClick} />
            </CartPageClearCartButtonContainer>
          </CartPageItemsContainer>

          <CartPageTotal />
        </CartPageLayout>
      </SectionInnerContainer>
    </SectionContainer>
  )
}
