import headerLogoImg from '@/assets/header_logo.png'
import catalogIconImg from '@/assets/catalog_icon.svg'
import searchIconImg from '@/assets/search_icon.svg'
import loginIconImg from '@/assets/login_icon.svg'
import cartIconImg from '@/assets/cart_icon.svg'
import menuIconImg from '@/assets/menu_icon.svg'
import crossIconImg from '@/assets/cross_icon.svg'
import dollyIconImg from '@/assets/dolly_icon.svg'
import walletIconImg from '@/assets/wallet_icon.svg'

import { CartItemDeleteButton } from '../ui/CartItemDeleteButton'
import { ModalOverlay } from '@/ui/ModalOverlay'
import { Modal } from '@/ui/Modal'
import {
  itemsCountPostfix,
  formatMoney,
  getGlobalData,
  searchProduct,
  disableDocumentScroll,
  enableDocumentScroll,
  cartSum,
} from '../utils'
import { useRef, useState } from 'react'
import { Button } from '@/ui/Button'
import { SearchAutocomplete } from '@/ui/SearchAutocomplete'
import { autocomplete as cityAutocomplete } from '@/api/city'
import { set as citySet } from '@/api/city'
import { autocomplete as productAutocomplete } from '@/api/product'
import { searchProductRedirectUrl, imagesUrlPrefix } from '@/config'
import { useFetch } from '@/hooks/useFetch'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { clearCart, delFromCart } from '../api/cart'
import { SectionContainer } from '../ui/SectionContainer'
import { SectionInnerContainer } from '../ui/SectionInnerContainer'
import { useCartStore } from '../stores/cartStore'
import { filterCartItemProperties } from '../utils'
import { useModalStore } from '../stores/modalStore'

import { ReactPortal } from '../ui/ReactPortal'

import { HeroSectionCategoriesPopover } from '../ui/HeroSectionCategoriesPopover'

function HeaderLogo() {
  return (
    <a href="/">
      <img
        className="w-[85px] h-[40px] header-4:w-[220px] header-4:h-[104px]"
        src={headerLogoImg}
        loading="lazy"
        alt="Шёлковый путь"
      />
    </a>
  )
}

function TopMenuItem({ item }) {
  return (
    <li>
      <a
        href={item.url}
        className="hover:text-silkway-orange transition-all duration-200 whitespace-nowrap"
      >
        {item.text}
      </a>
    </li>
  )
}

function MobileMenuList() {
  const { topMenuItems } = getGlobalData('headerData')

  return (
    <ul className="text-center text-xl leading-9 font-semibold">
      {topMenuItems.map((item) => (
        <TopMenuItem
          key={item.url}
          item={item}
        />
      ))}
    </ul>
  )
}

function TopMenu() {
  const { topMenuItems } = getGlobalData('headerData')

  return (
    <ul className="hidden header-4:flex gap-x-[30px] font-sans text-white text-sm items-start">
      {topMenuItems.map((item) => (
        <TopMenuItem
          key={item.url}
          item={item}
        />
      ))}
    </ul>
  )
}

function CatalogButtonContainer({ children, onClick }) {
  return (
    <a
      onClick={onClick}
      className="h-[36px] w-[190px] header-4:h-[48px] text-sm header-4:text-base font-medium hidden header-4:flex items-center gap-[6px] header-4:gap-[12px] p-[6px] header-4:p-[12px] text-silkway-dark-chocolate bg-silkway-dark-orange rounded shadow-inner shadow-white/45 border border-silkway-dark-orange hover:bg-silkway-orange hover:border-silkway-orange transition-all duration-200 whitespace-nowrap hover:cursor-pointer"
    >
      {children}
    </a>
  )
}

function CatalogButton() {
  const showModal = useModalStore((state) => state.showModal)
  const hideModal = useModalStore((state) => state.hideModal)
  const visibleModals = useModalStore((state) => state.visibleModals)

  const handleCatalogClick = () => {
    if (visibleModals.includes('categoriesPopover')) {
      hideModal('categoriesPopover')
    } else {
      showModal('categoriesPopover')
    }
  }

  return (
    <CatalogButtonContainer onClick={handleCatalogClick}>
      <img
        src={catalogIconImg}
        alt="Каталог товаров"
        className="block w-[21px] h-[21px]"
      />
      Каталог товаров
    </CatalogButtonContainer>
  )
}

function SearchFormWrapper({ children, isVisibleOnMobile, variant }) {
  let classes =
    'has-[:focus]:bg-white/5 h-full max-h-[44px] items-center p-[2px] pr-[3px] header-4:p-[4px] gap-[5px] border rounded border-white/45 transition-all duration-200 w-full relative flex-nowrap'
  if (isVisibleOnMobile) {
    classes += ' flex'
  }
  if (!isVisibleOnMobile) {
    classes += ' hidden header-8:flex'
  }

  let wrapperClasses = 'rounded'
  if (variant == 'orange') {
    wrapperClasses += ' bg-silkway-orange'
  }
  if (variant == 'dark-orange') {
    wrapperClasses += ' bg-silkway-dark-orange'
  }

  return (
    <div className={wrapperClasses}>
      <div className={classes}>{children}</div>
    </div>
  )
}

function SearchFormIcon() {
  return (
    <img
      src={searchIconImg}
      className="hidden box-content header-5:block w-[22px] h-[22px] pl-[4px] pr-[4px] header-4:pl-[8px] header-4:pr-[6px]"
    />
  )
}

function SearchFormButton({ onClick, isBigButton = true }) {
  let classes =
    'bg-white/20 text-base text-white hover:bg-white/30 transiotion-all duration-200 rounded font-sans'
  if (isBigButton) {
    classes += ' header-5:px-[33px] px-[8px] h-full py-[6px]'
  }
  if (!isBigButton) {
    classes += ' pl-[1px] pr-[4px] h-[38px]'
  }

  return (
    <button
      onClick={onClick}
      className={classes}
    >
      <SearchFormIconRight isBigButton={isBigButton} />
      {isBigButton && <span className="hidden header-5:inline">Найти</span>}
    </button>
  )
}

function SearchFormIconRight({ isBigButton = true }) {
  let classes = 'box-content w-[22px] h-[22px]'
  if (isBigButton) {
    classes += ' block header-5:hidden px-[4px]'
  }
  if (!isBigButton) {
    classes += ' block px-[6px]'
  }

  return (
    <img
      src={searchIconImg}
      className={classes}
    />
  )
}

function SearchForm({
  isVisibleOnMobile = false,
  isLeftIconVisible = true,
  isBigSearchButton = true,
  variant = 'transparent',
}) {
  return (
    <SearchFormWrapper
      variant={variant}
      isVisibleOnMobile={isVisibleOnMobile}
    >
      {isLeftIconVisible && <SearchFormIcon />}
      <ProductSearchAutocomplete isBigSearchButton={isBigSearchButton} />
    </SearchFormWrapper>
  )
}

function CitySelectWrapper({ children }) {
  return <div className="h-[20px] flex flex-nowrap gap-[10px]">{children}</div>
}

function CitySelectCurrent({ city }) {
  return (
    <span className="font-sans text-sm font-semibold text-white">
      Мой город: {city}
    </span>
  )
}

function CitySelectButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="font-sans text-xs text-white w-[77px] h-[20px] rounded bg-white/20 hover:bg-white/30 transition-all duration-200"
    >
      Изменить
    </button>
  )
}

function CloseModalButton({ onClick }) {
  return (
    <div className="w-full flex flex-nowrap justify-end">
      <img
        onClick={onClick}
        src={crossIconImg}
        className="-mt-4 -mr-4 cursor-pointer hover:bg-silkway-milk p-2 rounded transition-colors duration-200"
      />
    </div>
  )
}

function ModalContainer({ children }) {
  return (
    <div className="p-6 bg-white rounded shadow-md h-[200px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60]">
      {children}
    </div>
  )
}

function ButtonsContainer({ children }) {
  return (
    <div className="flex flex-nowrap justify-center gap-[25px]">{children}</div>
  )
}

function ProductSearchAutocomplete({
  isBigSearchButton = true,
  inputClassName = null,
}) {
  let inputClasses =
    'px-[4px] header-5:p-0 outline-none font-sans h-[30px] header-4:h-[38px] text-base transition-all duration-200 w-full'
  if (inputClassName) {
    inputClasses += ' ' + inputClassName
  }
  if (!inputClassName) {
    inputClasses += ' text-white bg-transparent'
  }

  const [query, setQuery] = useState('')

  const handleItemClick = (e) => {
    location.href = e.target.dataset.url
  }

  const handleEnter = () => {
    searchProduct(query, searchProductRedirectUrl)
  }

  return (
    <>
      <SearchAutocomplete
        fetcher={productAutocomplete}
        inputClassname={inputClasses}
        dropdownClassname="h-[200px] w-full left-0 top-[55px] bg-white overflow-y-auto rounded shadow-md p-2 z-10 absolute flex flex-col flex-nowrap justify-start"
        dropdownItemClassname="cursor-pointer px-2 py-1 w-full rounded hover:bg-silkway-orange hover:text-white"
        onItemClick={handleItemClick}
        onEnter={handleEnter}
        onChange={(e) => setQuery(e.target.value)}
      />

      <SearchFormButton
        onClick={handleEnter}
        isBigButton={isBigSearchButton}
      />
    </>
  )
}

function CitySearchAutocomplete({ onChange, onItemClick }) {
  return (
    <SearchAutocomplete
      fetcher={cityAutocomplete}
      inputClassname="border-silkway-light-gray border-[1px] rounded focus:outline-none px-2 py-1 w-full"
      dropdownClassname="w-full top-[100px] h-max-[150px] bg-white overflow-y-auto rounded shadow-md p-2 z-10 absolute flex flex-col flex-nowrap"
      dropdownItemClassname="cursor-pointer px-2 py-1 w-full rounded hover:bg-silkway-orange hover:text-white"
      onChange={onChange}
      onItemClick={onItemClick}
    />
  )
}

function CitySelectModalContent({ children }) {
  return (
    <div className="flex flex-col justify-between h-full -mt-5 relative">
      {children}
    </div>
  )
}

function CitySelectModalHeader({ children }) {
  return (
    <h3 className="font-sans font-semibold text-xl text-center">{children}</h3>
  )
}

function CitySelectModal({
  onCloseClick,
  onSubmit,
  isVisible,
  overlayZIndex = 70,
}) {
  const [cityId, setCityId] = useState(null)
  const [cityName, setCityName] = useState(null)

  const handleItemClick = (e) => {
    setCityId(e.target.dataset.cityId)
    setCityName(e.target.dataset.city)
  }

  return (
    <Modal
      overlayZIndex={overlayZIndex}
      isVisible={isVisible}
      onClose={onCloseClick}
    >
      <CitySelectModalContent>
        <CitySelectModalHeader>Ваш город</CitySelectModalHeader>

        <CitySearchAutocomplete onItemClick={handleItemClick} />

        <ButtonsContainer>
          <Button
            variant="ghost"
            onClick={onCloseClick}
          >
            Отменить
          </Button>
          <Button
            variant="primary"
            onClick={() => onSubmit(cityId, cityName)}
          >
            Сохранить
          </Button>
        </ButtonsContainer>
      </CitySelectModalContent>
    </Modal>
  )
}

function CitySelect({ modalZIndex = 70 }) {
  const { cityName: initCityName } = getGlobalData('headerData')

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [cityId, setCityId] = useState(null)
  const [cityName, setCityName] = useState(initCityName)

  const { results } = useFetch(citySet, cityId)

  const showModal = () => {
    setIsModalVisible(true)
    disableDocumentScroll()
  }

  const hideModal = () => {
    setIsModalVisible(false)
    enableDocumentScroll()
  }

  const handleCitySubmit = (submittedCityId, submittedCityName) => {
    setCityId(submittedCityId)
    setCityName(submittedCityName)
    hideModal()
  }

  return (
    <CitySelectWrapper>
      <CitySelectCurrent city={cityName} />

      <CitySelectButton onClick={showModal} />

      <CitySelectModal
        overlayZIndex={80}
        isVisible={isModalVisible}
        onCloseClick={hideModal}
        onSubmit={handleCitySubmit}
      />
    </CitySelectWrapper>
  )
}

function HeaderPhone({ className = null }) {
  const { phone } = getGlobalData('headerData')

  let classes = 'font-sans text-2xl'
  if (className) {
    classes += ' ' + className
  }

  return (
    <a
      href={`tel:${phone}`}
      className={classes}
    >
      {phone}
    </a>
  )
}

function LoginAccountButton() {
  const { isLoggedIn, accountUrl, loginUrl, firstName } =
    getGlobalData('headerData')

  const url = isLoggedIn ? accountUrl : loginUrl
  const text = isLoggedIn ? firstName : 'Войти'

  return (
    <a
      href={url}
      className="w-[40px] header-4:w-[107px] h-[40px] header-4:h-[84px] font-sans text-base text-white hover:bg-white/10 transition-all duration-200 flex flex-col items-center justify-center rounded border border-white header-4:border-white/45"
    >
      <img
        src={loginIconImg}
        alt={text}
        className="box-content block h-[20px] w-[21px] header-4:h-[26px] header-4:w-[28px]"
      />
      <span className="hidden header-4:inline">{text}</span>
    </a>
  )
}

function CartButtonWrapper({ children, onClick, selfRef }) {
  return (
    <button
      ref={selfRef}
      onClick={onClick}
      className="bg-silkway-orange hover:bg-silkway-light-orange transition-all duration-200 text-silkway-dark-chocolate rounded px-[8px] header-4:px-[15px] py-[5px] header-4:py-[10px] items-center text-xs header-4:text-sm shadow-inner shadow-white/45 border border-silkway-dark-orange whitespace-nowrap flex flex-nowrap h-[40px] header-4:h-[84px] leading-[1.2]"
    >
      {children}
    </button>
  )
}

function CartIcon() {
  return (
    <div className="flex flex-col justify-center box-content h-full w-full mr-[10px] border-0 header-2:border-r-[1px] header-2:border-silkway-dark-orange header-2:pr-[12px]">
      <img
        src={cartIconImg}
        className="w-[20px] h-[25px] header-4:w-[27px] header-4:h-[34px] box-content block"
      />
    </div>
  )
}

function CartTitle() {
  return (
    <>
      <span className="hidden header-2:inline">Моя корзина</span>
      <span className="header-2:hidden inline">Корзина</span>
    </>
  )
}

function CartSum({ amount }) {
  return <span className="font-semibold">{formatMoney(amount)} ₽</span>
}

function ItemsCountLabel({ itemsCount, postfixVariants }) {
  const postfix = itemsCountPostfix(itemsCount, postfixVariants)

  return (
    <span className="hidden header-2:inline">
      {itemsCount} {postfix}
    </span>
  )
}

function CartButton({ onClick, cartItems, selfRef }) {
  const postfixVariants = ['товар', 'товара', 'товаров']

  return (
    <CartButtonWrapper
      onClick={onClick}
      selfRef={selfRef}
    >
      <CartIcon />
      <div className="text-left flex flex-col">
        <CartTitle />

        <CartSum amount={cartSum(cartItems)} />

        <ItemsCountLabel
          itemsCount={cartItems.length}
          postfixVariants={postfixVariants}
        />
      </div>
    </CartButtonWrapper>
  )
}

function MobileMenuButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-[40px] h-[40px] rounded border border-white flex header-4:hidden justify-center items-center hover:bg-white/10 transition-all duration-200"
    >
      <img src={menuIconImg} />
    </button>
  )
}

function DrawerContainer({ onClose, isVisible, children }) {
  let classes =
    'p-6 w-[300px] mx-[10px] my-[2vh] h-[96vh] bg-white backdrop-blur-md fixed z-[60] top-0 right-0 shadow-md rounded transition-all duration-300 flex flex-nowrap flex-col'

  classes += isVisible
    ? ' translate-x-0 opacity-100'
    : ' translate-x-[105%] opacity-0'

  return (
    <>
      <div className={classes}>
        <CloseModalButton onClick={onClose} />
        {children}
      </div>
    </>
  )
}

function GreenContainer({ children, className }) {
  let classes = 'bg-silkway-green relative mb-5 p-3 rounded h-[70px]'
  if (className) {
    classes += ' ' + className
  }

  return <div className={classes}>{children}</div>
}

function OrangeContainer({ children, className }) {
  let classes =
    'bg-silkway-dark-orange relative mb-5 p-3 rounded mt-auto h-[70px]'
  if (className) {
    classes += ' ' + className
  }

  return <div className={classes}>{children}</div>
}

function MobileMenuDrawer({ onClose, isVisible }) {
  return (
    <>
      {isVisible && <ModalOverlay zIndex={60} />}
      <DrawerContainer
        onClose={onClose}
        isVisible={isVisible}
      >
        <MobileMenuList />

        <div className="font-sans text-silkway-dark-chocolate text-sm mt-14">
          Поиск
        </div>
        <SearchForm
          isVisibleOnMobile={true}
          isLeftIconVisible={false}
          isBigSearchButton={false}
          variant="dark-orange"
        />
        <div className="mb-auto"></div>

        <GreenContainer>
          <CitySelect modalZIndex={80} />
        </GreenContainer>

        <HeaderPhone className="text-silkway-green text-center justify-center flex flex-nowrap " />
      </DrawerContainer>
    </>
  )
}

function MobileMenu() {
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const showDrawer = () => {
    setIsMenuVisible(true)
    disableDocumentScroll()
  }

  const hideDrawer = () => {
    setIsMenuVisible(false)
    enableDocumentScroll()
  }

  return (
    <>
      <MobileMenuButton onClick={showDrawer} />
      <MobileMenuDrawer
        onClose={hideDrawer}
        isVisible={isMenuVisible}
      />
    </>
  )
}

function HeaderCenterSection({ children }) {
  return (
    <div className="flex flex-nowrap flex-col justify-center header-4:justify-between gap-[14px] h-full header-4:h-[82px] ml-auto header-4:ml-0">
      {children}
    </div>
  )
}

function HeaderCenterSubSection({ children }) {
  return (
    <div className="flex flex-nowrap gap-[14px] ml-auto header-4:ml-0">
      {children}
    </div>
  )
}

function HeaderRightSection({ children }) {
  return (
    <div className="flex-col h-[80px] justify-between ml-auto hidden header-1:flex">
      {children}
    </div>
  )
}

function HeaderRightButtonsSection({ children }) {
  return (
    <div className="flex flex-nowrap gap-[10px] ml-auto header-1:ml-0">
      {children}
    </div>
  )
}

function ToCartButton() {
  const { cartUrl } = getGlobalData('headerData')

  const handleClick = () => {
    location.href = cartUrl
  }

  return (
    <Button
      onClick={handleClick}
      variant="primary"
      paddingX={`px-[15px]`}
      className={`ml-auto mr-[15px]`}
    >
      <img src={dollyIconImg} />
      <span className="max-[540px]:hidden inline ml-[8px]">В КОРЗИНУ</span>
    </Button>
  )
}

function CheckoutButton() {
  const { checkoutUrl } = getGlobalData('headerData')

  const handleClick = () => {
    location.href = checkoutUrl
  }

  return (
    <Button
      variant="primary-dark"
      onClick={handleClick}
    >
      <img src={walletIconImg} />
      <span className="max-[540px]:hidden inline ml-[8px]">ОФОРМИТЬ</span>
    </Button>
  )
}

function CartDropdownTotal() {
  const cartItems = useCartStore((state) => state.items)

  return (
    <div className="font-sans text-silkway-dark-chocolate">
      <div className="text-sm">Итого:</div>
      <div className="text-xl font-semibold">
        {formatMoney(cartSum(cartItems))} ₽
      </div>
    </div>
  )
}

function CartDropdownFooterContainer({ children }) {
  return (
    <div className="p-[15px] border-t h-[78px] flex flex-nowrap">
      {children}
    </div>
  )
}

function CartDropdownHeaderContainer({ children }) {
  return (
    <div className="border-b border-silkway-light-gray pb-[15px] h-[50px] px-[15px]">
      {children}
    </div>
  )
}

function CartDropdownTopContainer({ children }) {
  return <div className="pt-[15px]">{children}</div>
}

function CartDropdownClearCartButton({ onClick, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="font-sans font-medium text-sm text-silkway-gray underline cursor-pointer hover:text-silkway-light-chocolate"
    >
      Очистить всю корзину
    </button>
  )
}

function CartDropdownContainer({ children, dropdownRef }) {
  return (
    <div
      ref={dropdownRef}
      className="max-[650px]:fixed max-[650px]:top-0 max-[650px]:mt-[65px] mx-auto max-[650px]:translate-y-0 max-[650px]:left-0 max-h-[400px] right-0 bottom-0 -mb-1 translate-y-[100%] max-w-[500px] w-[90vw] min-h-[200px] absolute bg-white rounded shadow-md flex flex-nowrap flex-col justify-between z-50"
    >
      {children}
    </div>
  )
}

function CartItemContainer({ children, onClick }) {
  return (
    <div
      onClick={onClick}
      className="justify-start border-b border-silkway-light-gray/30 px-[15px] py-[10px] flex flex-wrap gap-[10px] text-silkway-dark-chocolate hover:bg-silkway-dark-milk"
    >
      {children}
    </div>
  )
}

function CartItemImg({ src, name, onClick }) {
  return (
    <img
      onClick={onClick}
      alt={name}
      className="cursor-pointer w-[80px] h-[80px] aspect-auto object-cover rounded bg-silkway-orange/50"
      src={`${imagesUrlPrefix}${src}`}
    />
  )
}

function CartItemHeaderContainer({ children, onClick }) {
  return (
    <div
      onClick={onClick}
      className="text-sm font-normal cursor-pointer"
    >
      {children}
    </div>
  )
}

function CartItemInfoContainer({ children }) {
  return <div className="flex flex-nowrap flex-col">{children}</div>
}

function CartItemProperties({ properties }) {
  return (
    <div className="mt-auto">
      {properties.map((item) => (
        <div
          className="text-xs"
          key={item.code}
        >
          <span className="font-light">{item.name}: </span>
          <span className="font-normal underline decoration-1 decoration-silkway-dark-chocolate/50">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  )
}

function CartItemRightContainer({ children }) {
  return (
    <div className="max-[540px]:justify-end max-[540px]:w-[150px] max-[540px]:pr-0 ml-auto flex flex-nowrap justify-between gap-[25px] items-center pr-2">
      {children}
    </div>
  )
}

function CartItem({ item, onDeleteClick }) {
  const handleClick = (e) => {
    location.href = item.url
  }

  return (
    <CartItemContainer>
      <CartItemImg
        onClick={handleClick}
        src={item.picture}
        name={item.name}
      />

      <CartItemInfoContainer>
        <CartItemHeaderContainer onClick={handleClick}>
          {item.name}
        </CartItemHeaderContainer>
        <CartItemProperties
          properties={filterCartItemProperties(item.properties)}
        />
        <div className="text-base max-[540px]:text-xs font-normal text-silkway-orange">
          <span className="hidden max-[540px]:inline">
            Количество: {item.quantity}
          </span>
        </div>
      </CartItemInfoContainer>

      <CartItemRightContainer>
        <div className="text-base max-[540px]:text-sm font-normal text-silkway-orange">
          <span className="inline max-[540px]:hidden">x{item.quantity}</span>
        </div>

        <div className="ml-0 max-[540px]:ml-auto text-base font-normal text-silkway-dark-chocolate">
          {formatMoney(item.price * item.quantity)} ₽
        </div>

        <CartItemDeleteButton onClick={onDeleteClick} />
      </CartItemRightContainer>
    </CartItemContainer>
  )
}

function CartDropdownItemsContainer({ onDeleteClick }) {
  const cartItems = useCartStore((state) => state.items)

  return (
    <div className="pt-[8px] h-[250px] overflow-y-auto">
      {cartItems.map((item) => (
        <CartItem
          onDeleteClick={() => onDeleteClick(item.cart_id)}
          key={item.id}
          item={item}
        />
      ))}
    </div>
  )
}

function CartItemsDropdown({
  triggerRef,
  onClear,
  onDelete,
  isClearing,
  onOutsideClick,
}) {
  const dropdownRef = useRef(null)

  useOutsideClick([dropdownRef, triggerRef], onOutsideClick)

  return (
    <CartDropdownContainer dropdownRef={dropdownRef}>
      <CartDropdownTopContainer>
        <CartDropdownHeaderContainer>
          <CartDropdownClearCartButton
            onClick={onClear}
            disabled={isClearing}
          />
        </CartDropdownHeaderContainer>

        <CartDropdownItemsContainer onDeleteClick={onDelete} />
      </CartDropdownTopContainer>

      <CartDropdownFooterContainer>
        <CartDropdownTotal />

        <ToCartButton />

        <CheckoutButton />
      </CartDropdownFooterContainer>
    </CartDropdownContainer>
  )
}

function CartWithDropdown() {
  const cartItems = useCartStore((state) => state.items)
  const setCartItems = useCartStore((state) => state.setItems)

  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const [isClearing, setIsClearing] = useState(false)

  const cartButtonRef = useRef(null)

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

  const handleDelete = async (cartItemId) => {
    const success = await delFromCart(cartItemId)
    if (success) {
      const newCartItems = cartItems.filter(
        (item) => item.cart_id != cartItemId
      )
      setCartItems(newCartItems)
    }
  }

  return (
    <div className="relative order-first header-4:order-2">
      <CartButton
        selfRef={cartButtonRef}
        cartItems={cartItems}
        onClick={() => setIsDropdownVisible((prev) => !prev)}
      />

      {isDropdownVisible && (
        <CartItemsDropdown
          triggerRef={cartButtonRef}
          isClearing={isClearing}
          onOutsideClick={() => setIsDropdownVisible(false)}
          onDelete={handleDelete}
          onClear={handleClearCartClick}
        />
      )}
    </div>
  )
}

function HeaderContainer({ children }) {
  return (
    <div className="h-[80px] header-4:h-[206px] flex flex-nowrap items-center justify-start gap-[5px] header-9:gap-[30px]">
      {children}
    </div>
  )
}

function SearchFormContainer({ children }) {
  return (
    <div className="h-[36px] header-4:h-[48px] w-[480px] max-[700px]:hidden max-[770px]:w-[300px] max-[1295px]:w-[360px]">
      {children}
    </div>
  )
}

export function Header() {
  const showModal = useModalStore((state) => state.showModal)
  const hideModal = useModalStore((state) => state.hideModal)
  const visibleModals = useModalStore((state) => state.visibleModals)

  const handleMoreCategoriesClick = () => {
    if (visibleModals.includes('categoriesPopover')) {
      hideModal('categoriesPopover')
    } else {
      showModal('categoriesPopover')
    }
  }

  return (
    <SectionContainer variant="green">
      <SectionInnerContainer>
        <HeaderContainer>
          <HeaderLogo />

          <HeaderCenterSection>
            <TopMenu />

            <HeaderCenterSubSection>
              <CatalogButton />

              <SearchFormContainer>
                <SearchForm />
              </SearchFormContainer>
            </HeaderCenterSubSection>
          </HeaderCenterSection>

          <HeaderRightSection>
            <CitySelect />

            <HeaderPhone className="text-white" />
          </HeaderRightSection>

          <HeaderRightButtonsSection>
            <LoginAccountButton />

            <CartWithDropdown />

            <MobileMenu />
          </HeaderRightButtonsSection>
        </HeaderContainer>

        {visibleModals.includes('categoriesPopover') && (
          <ReactPortal>
            <HeroSectionCategoriesPopover
              onClose={() => hideModal('categoriesPopover')}
            />
          </ReactPortal>
        )}
      </SectionInnerContainer>
    </SectionContainer>
  )
}
