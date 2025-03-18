import {
  clearCart,
  delFromCart,
  delFromCartByOfferId,
  setCartItemQty,
} from '../api/cart'
import { cartSum, filterCartItemProperties, formatMoney } from '../utils'
import { imagesUrlPrefix } from '../config'
import { useCartStore } from '../stores/cartStore'

import { SectionContainer } from '../ui/SectionContainer'
import { SectionInnerContainer } from '../ui/SectionInnerContainer'
import { CartItemDeleteButton } from '../ui/CartItemDeleteButton'
import { Button } from '../ui/Button'
import { useState } from 'react'

function CartPageItemImg({ src, name, onClick, className }) {
  let classes =
    'cursor-pointer aspect-square object-cover rounded bg-silkway-orange/50'

  classes += className ? ` ${className}` : ''

  return (
    <img
      onClick={onClick}
      alt={name}
      className={classes}
      src={`${imagesUrlPrefix}${src}`}
    />
  )
}

function CartPageItemTitleContainer({ children, onClick, className }) {
  let classes =
    'flex flex-nowrap flex-row justify-start font-sans text-silkway-dark-chocolate cursor-pointer'

  classes += className ? ` ${className}` : ''

  return (
    <div
      className={classes}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

function CartPageItemContainer({ children, className }) {
  let classes =
    'w-full bg-white rounded p-[15px] flex flex-row flex-nowrap justify-between items-stretch gap-[15px]'

  classes += className ? ` ${className}` : ''

  return <div className={classes}>{children}</div>
}

function CartPageItemInfoContainer({ children }) {
  return (
    <div className="flex flex-col flex-nowrap justify-between max-[1400px]:justify-start items-start grow">
      {children}
    </div>
  )
}

function CartPageItemPropertiesContainer({ children }) {
  return (
    <div className="flex flex-col flex-nowrap grow max-[1300px]:grow-0 justify-end">
      {children}
    </div>
  )
}

function CartPageItemProp({ prop, className }) {
  let classes1 = 'font-sans font-light text-silkway-gray'
  let classes2 = 'font-sans text-silkway-green underline'

  classes1 += className ? ` ${className}` : ''
  classes2 += className ? ` ${className}` : ''

  return (
    <div>
      <span className={classes1}>{prop.name}</span>
      <span className={classes2}>{prop.value}</span>
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

function CartPageItemQty({ item, className }) {
  const setCartItems = useCartStore((state) => state.setItems)

  let classes = 'flex-row flex-nowrap items-center'

  classes += className ? ` ${className}` : ''

  const setNewQty = async (qty) => {
    if (item.quantity == qty) {
      return
    }
    let data
    if (qty > 0) {
      data = await setCartItemQty(item.user_id, item.offer_id, qty)
    }
    if (qty <= 0) {
      data = await delFromCartByOfferId(item.user_id, item.offer_id)
    }
    if (data.ok) {
      setCartItems(data.items)
    }
  }

  const handleMinusClick = async () => {
    await setNewQty(Math.max(0, item.quantity - 1))
  }

  const handlePlusClick = async () => {
    await setNewQty(item.quantity + 1)
  }

  return (
    <div className={classes}>
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

function CartPageItemPriceContainer({ children, className }) {
  let classes =
    'flex-col flex-nowrap justify-center items-center font-sans text-base text-silkway-dark-chocolate min-w-[100px]'

  classes += className ? ` ${className}` : ''

  return <span className={classes}>{children} ₽</span>
}

function CartPageItemTotalContainer({ children, className }) {
  let classes =
    'flex flex-col flex-nowrap justify-center font-sans text-base text-silkway-dark-chocolate min-w-[80px]'

  classes += className ? ` ${className}` : ''

  return <span className={classes}>{children} ₽</span>
}

function CartItemDeleteButtonContainer({ children, className }) {
  let classes = 'flex flex-col flex-nowrap justify-center w-full'

  classes += className ? ` ${className}` : ''

  return <div className={classes}>{children}</div>
}

function CartPageItemButtonsContainer({ children, className }) {
  let classes = 'flex flex-nowrap justify-between gap-[40px]'

  classes += className ? ` ${className}` : ''

  return <div className={classes}>{children}</div>
}

function CartPageItem({ item, onClick }) {
  // console.log(item)
  const cartItems = useCartStore((state) => state.items)
  const setCartItems = useCartStore((state) => state.setItems)

  const handleDeleteClick = async () => {
    const success = await delFromCart(item.cart_id)
    if (success) {
      setCartItems(
        cartItems.filter((cartItem) => cartItem.cart_id != item.cart_id)
      )
    }
  }

  return (
    <CartPageItemContainer className="@container/item">
      <CartPageItemImg
        src={item.picture}
        name={item.name}
        onClick={onClick}
        className="hidden @[350px]/item:block w-[60px] h-[60px] @[950px]/item:w-[100px] @[950px]/item:h-[100px]"
      />

      <CartPageItemInfoContainer>
        <CartPageItemImg
          src={item.picture}
          name={item.name}
          onClick={onClick}
          className="block @[350px]/item:hidden w-[60px] h-[60px] mb-[10px]"
        />

        <CartPageItemTitleContainer
          onClick={onClick}
          className="text-xs @[320px]/item:text-sm @[950px]/item:text-base"
        >
          {item.name}
        </CartPageItemTitleContainer>

        <CartPageItemPropertiesContainer>
          {filterCartItemProperties(item.properties).map((prop) => (
            <CartPageItemProp
              prop={prop}
              key={prop.code}
              className="text-xs @[950px]/item:text-sm"
            />
          ))}
        </CartPageItemPropertiesContainer>

        <CartPageItemQty
          item={item}
          className="mt-[15px] flex @[950px]/item:hidden"
        />
      </CartPageItemInfoContainer>

      <CartPageItemButtonsContainer className="items-center px-0 @[550px]/item:px-[20px] flex-col @[550px]/item:flex-row">
        <CartPageItemQty
          item={item}
          className="hidden @[950px]/item:flex"
        />

        <CartPageItemPriceContainer className="hidden @[950px]/item:flex">
          {formatMoney(item.price)}
        </CartPageItemPriceContainer>

        <CartPageItemTotalContainer className="items-end @[550px]/item:items-center">
          {formatMoney(item.quantity * item.price)}
        </CartPageItemTotalContainer>

        <CartItemDeleteButtonContainer className="items-end @[550px]/item:items-center order-first @[550px]/item:order-last">
          <CartItemDeleteButton onClick={handleDeleteClick} />
        </CartItemDeleteButtonContainer>
      </CartPageItemButtonsContainer>
    </CartPageItemContainer>
  )
}

function CartPageItemsContainer({ children, className }) {
  let classes =
    'flex flex-col flex-nowrap justify-start gap-[15px] grow w-full self-stretch max-w-[1200px] min-w-[300px]'

  classes += className ? ` ${className}` : ''

  return <div className={classes}>{children}</div>
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

function CartPageClearCartButtonContainer({ children, className }) {
  let classes = 'w-full flex flex-row flex-nowrap items-center'

  classes += className ? ` ${className}` : ''

  return <div className={classes}>{children}</div>
}

function CartPageTotalSum() {
  const cartItems = useCartStore((state) => state.items)

  return (
    <div className="flex flex-row flex-nowrap justify-between items-center font-sans text-base @[300px]/total:text-xl font-bold text-silkway-dark-chocolate">
      <span>Сумма заказа</span>
      <span>{formatMoney(cartSum(cartItems))} ₽</span>
    </div>
  )
}

function CartPageTotalDiscount() {
  let totalDiscount = 0

  return (
    <div className="flex flex-row flex-nowrap justify-between items-center font-sans @[300px]/total:text-sm text-xs text-silkway-dark-chocolate mb-[10px]">
      <span>Ваша скидка:</span>
      <span>{formatMoney(totalDiscount)} ₽</span>
    </div>
  )
}

function CartPageTotalContainer({ children }) {
  return (
    <div className="flex flex-col flex-nowrap justify-start gap-[5px] rounded bg-white w-full grow min-w-[300px] max-w-[370px] max-[1100px]:max-w-[100%] p-[30px] max-[600px]:p-[10px] @container/total">
      {children}
    </div>
  )
}

function CartPageTotalDeliveryInfo() {
  return (
    <div className="font-sans text-silkway-dark-chocolate text-left flex flex-col flex-nowrap justify-start items-start gap-[5px] mb-[10px]">
      <div className="@[300px]/total:text-base text-sm font-medium">
        Доставка
      </div>
      <div className="@[300px]/total:text-sm text-xs mb-[5px]">
        Стоимость доставки зависит от веса и габаритов отправления, а также от
        тарифов службы доставки. Точную стоимость доставки вам объявит менеджер
        после оформления заказа.
      </div>
    </div>
  )
}

function CartPageTotalCheckoutButton({ disabled = false }) {
  const text = 'Оформить заказ'

  const handleCheckoutClick = () => {
    console.log('Checkout click')
  }

  const opacityClass = disabled ? ' opacity-50 cursor-default' : ''

  return (
    <>
      <Button
        onClick={handleCheckoutClick}
        className={'text-xs @[300px]/total:hidden' + opacityClass}
        height="small"
        hoverState={disabled ? 'none' : 'standart'}
      >
        {text}
      </Button>
      <Button
        onClick={handleCheckoutClick}
        className={'text-base hidden @[300px]/total:flex' + opacityClass}
        hoverState={disabled ? 'none' : 'standart'}
      >
        {text}
      </Button>
    </>
  )
}

function CartPageTotalCheckoutInfo() {
  return (
    <div className="text-xs text-silkway-gray font-light text-center">
      Нажимая кнопку "Оформить заказ" вы также соглашаесесь с&nbsp;
      <button className="font-normal text-silkway-green hover:underline">
        Условиями конфиденциальности
      </button>
    </div>
  )
}

function CartPageTotal() {
  const cartItems = useCartStore((state) => state.items)

  return (
    <CartPageTotalContainer>
      <CartPageTotalSum />

      <CartPageTotalDiscount />

      <CartPageTotalDeliveryInfo />

      <CartPageTotalCheckoutButton disabled={cartItems.length == 0} />

      <CartPageTotalCheckoutInfo />
    </CartPageTotalContainer>
  )
}

function CartPageLayout({ children }) {
  return (
    <div className="flex flex-row max-[1100px]:flex-col flex-nowrap justify-between items-start gap-[30px] max-[1100px]:gap-[10px]">
      {children}
    </div>
  )
}

function CartPageEmpty() {
  return (
    <div className="w-full h-full flex flex-row flex-nowrap justify-center items-center text-silkway-gray text-base font-light">
      Вы пока ничего не добавили в свою корзину
    </div>
  )
}

export function CartItemsSection() {
  const cartItems = useCartStore((state) => state.items)
  const setCartItems = useCartStore((state) => state.setItems)

  const [isClearing, setIsClearing] = useState(false)

  const handleClearCartClick = async () => {
    if (isClearing) {
      return
    }
    setIsClearing(true)
    const success = await clearCart()
    if (success) {
      setCartItems([])
    }
    setIsClearing(false)
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

            {cartItems.length == 0 && <CartPageEmpty />}

            {cartItems.length > 0 && (
              <CartPageClearCartButtonContainer className="justify-end max-[1100px]:justify-center max-[1100px]:mb-[20px]">
                <CartPageClearCartButton onClick={handleClearCartClick} />
              </CartPageClearCartButtonContainer>
            )}
          </CartPageItemsContainer>

          <CartPageTotal />
        </CartPageLayout>
      </SectionInnerContainer>
    </SectionContainer>
  )
}
