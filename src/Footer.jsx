import footerLogoImg from './assets/logo.png'
import { getGlobalData } from './utils'

function FooterLogoWrapper({ children }) {
  return (
    <div className="flex flex-col justify-self-center footer-1:justify-self-auto gap-y-[20px] w-[236px] h-[272px] bg-silkway-green rounded-l-[4px] pt-[20px] pb-[30px] px-[10px] text-sm text-white text-right font-sans order-last footer-2:order-first">
      {children}
    </div>
  )
}

function FooterLogo() {
  const { storeName, storeDescription } = getGlobalData('footerData')

  return (
    <FooterLogoWrapper>
      <img
        src={footerLogoImg}
        loading="lazy"
        alt={storeName}
      />

      <p>
        {storeDescription}
        <br />“{storeName}”
      </p>

      <p className="mt-auto">{new Date().getFullYear()}</p>
    </FooterLogoWrapper>
  )
}

function FooterMenuSectionWrapper({ children }) {
  return <div className="text-silkway-dark-chocolate font-sans">{children}</div>
}

function FooterMenuSectionHeader({ children }) {
  return (
    <h3 className="text-xl footer-1.7:text-2xl font-bold pb-3 text-center footer-1:text-left">
      {children}
    </h3>
  )
}

function FooterMenuSectionItem({ item }) {
  return (
    <li className="mb-1 text-center footer-1:text-left">
      <a
        className="text-xs footer-1.7:text-sm hover:text-silkway-gray transition-all duration-200"
        href={item.url}
      >
        {item.text}
      </a>
    </li>
  )
}

function FooterMenuSection({ section }) {
  return (
    <FooterMenuSectionWrapper>
      <FooterMenuSectionHeader>{section.title}</FooterMenuSectionHeader>

      <ul>
        {section.items.map((item) => (
          <FooterMenuSectionItem
            key={item.url + item.text}
            item={item}
          />
        ))}
      </ul>
    </FooterMenuSectionWrapper>
  )
}

function ContactsWrapper({ children }) {
  return <div className="text-silkway-dark-chocolate font-sans">{children}</div>
}

function ContactsHeader({ children }) {
  return (
    <h3 className="text-xl footer-1.7:text-2xl font-bold pb-3 text-center footer-1:text-left">
      {children}
    </h3>
  )
}

function ContactTextWrapper({ children }) {
  return (
    <p className="text-xs footer-1.7:text-sm leading-8 text-center footer-1:text-left">
      {children}
    </p>
  )
}

function Contacts() {
  const { address, phone, email } = getGlobalData('footerData')

  return (
    <ContactsWrapper>
      <ContactsHeader>Контакты</ContactsHeader>

      <ContactTextWrapper>
        {address[0]}
        <br />
        {address[1]}
        <br />
        <br />
        <a href={`mailto:${email}`}>{email}</a>
        <br />
        <span className="text-xl footer-1.7:text-2xl">
          <a href={`tel:${phone}`}>{phone}</a>
        </span>
        <br />
        Единый телефон поддержки клиентов
      </ContactTextWrapper>
    </ContactsWrapper>
  )
}

function FooterWrapper({ children }) {
  return (
    <div className="grid grid-cols-1 footer-1:grid-cols-2 footer-1.8:flex flex-wrap justify-between gap-[50px] p-[50px] px-[10px] footer-4:px-[20px] footer-3:px-[50px] max-w-[1670px] m-auto">
      {children}
    </div>
  )
}

function FooterBackground({ children }) {
  return <div className="w-full bg-silkway-milk">{children}</div>
}

function FooterSections() {
  const { menuSections } = getGlobalData('footerData')

  return (
    <>
      {menuSections.map((s) => (
        <FooterMenuSection
          key={s.title}
          section={s}
        />
      ))}
    </>
  )
}

export function Footer() {
  return (
    <FooterBackground>
      <FooterWrapper>
        <FooterLogo />
        <FooterSections />
        <Contacts />
      </FooterWrapper>
    </FooterBackground>
  )
}
