import footerLogoImg from './assets/logo.png'

export function FooterLogoWrapper({ children }) {

  return (
    <div
      className="flex flex-col justify-self-center footer-1:justify-self-auto gap-y-[20px] w-[236px] h-[272px] bg-silkway-green rounded-l-[4px] pt-[20px] pb-[30px] px-[10px] text-sm text-white text-right font-sans order-last footer-2:order-first"
    >
      {children}
    </div>
  )
}

export function FooterLogo({ storeName, storeDescription }) {

  return (
    <FooterLogoWrapper>
      <img src={footerLogoImg} loading="lazy" alt={storeName} />
      <p>{storeDescription}<br/>“{storeName}”</p>
      <p className="mt-auto">{new Date().getFullYear()}</p>
    </FooterLogoWrapper>
  )
}

export function FooterMenuSectionWrapper({ children }) {

  return (
    <div className="text-silkway-dark-chocolate font-sans">
      {children}
    </div>
  )
}

export function FooterMenuSectionHeader({ children }) {

  return (
    <h3 className="text-xl footer-1.7:text-2xl font-bold pb-3 text-center footer-1:text-left">
      {children}
    </h3>
  )
}

export function FooterMenuSectionItem({ item }) {

  return (
    <li
      key={item.url + item.text}
      className="mb-1 text-center footer-1:text-left"
    >
      <a
        className="text-xs footer-1.7:text-sm hover:text-silkway-gray transition-all duration-200"            
        href={item.url}
      >
        {item.text}
      </a>
    </li>
  )
}

export function FooterMenuSection({ section }) {

  return (
    <FooterMenuSectionWrapper>
      <FooterMenuSectionHeader>
        {section.title}
      </FooterMenuSectionHeader>
      <ul>
        {section.items.map(
          item => <FooterMenuSectionItem item={item} />
        )}
      </ul>      
    </FooterMenuSectionWrapper>
  )
}

export function ContactsWrapper({ children }) {

  return (
    <div className="text-silkway-dark-chocolate font-sans">
      {children}
    </div>
  )
}

export function ContactsHeader({ children }) {

  return (
    <h3 className="text-xl footer-1.7:text-2xl font-bold pb-3 text-center footer-1:text-left">
      {children}
    </h3>
  )
}

export function ContactTextWrapper({ children }) {

  return (
    <p
        className="text-xs footer-1.7:text-sm leading-8 text-center footer-1:text-left"
    >
      {children}
    </p>
  )
}

export function Contacts({ address, phone, email }) {

  return (
    <ContactsWrapper>
      <ContactsHeader>Контакты</ContactsHeader>

      <ContactTextWrapper>
        {address[0]}<br />

        {address[1]}<br /><br />

        <a href={`mailto:${email}`}>{email}</a><br />

        <span className="text-xl footer-1.7:text-2xl">
          <a href={`tel:${phone}`}>{phone}</a>
        </span><br />

        Единый телефон поддержки клиентов
      </ContactTextWrapper>
    </ContactsWrapper>
  )
}

export function FooterWrapper({ children }) {

  return (
    <div
      className="grid grid-cols-1 footer-1:grid-cols-2 footer-1.8:flex flex-wrap justify-between gap-[50px] p-[50px] px-[10px] footer-4:px-[20px] footer-3:px-[50px] max-w-[1670px] m-auto"
    >
      {children}
    </div>
  )
}

export function FooterBackground({ children }) {

  return (
    <div className="w-full bg-silkway-milk">
      {children}
    </div>
  )
}

export function Footer() {
  const {
    menuSections,
    storeName,
    storeDescription,
    address,
    phone,
    email
  } = window.footerData

  return (
    <FooterBackground>          
      <FooterWrapper>
        <FooterLogo storeName={storeName} storeDescription={storeDescription} />
        {menuSections.map(s => <FooterMenuSection section={s} />)}
        <Contacts address={address} phone={phone} email={email} />
      </FooterWrapper>  
    </FooterBackground>
  )
}
