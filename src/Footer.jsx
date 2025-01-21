import footerLogoImg from './assets/logo.png'

export function FooterLogo({ storeName, storeDescription }) {

  return (
    <div
      className="flex flex-col justify-self-center footer-1:justify-self-auto gap-y-[20px] w-[236px] h-[272px] bg-silkway-green rounded-l-[4px] pt-[20px] pb-[30px] px-[10px] text-sm text-white text-right font-sans order-last footer-2:order-first"
    >
      <img src={footerLogoImg} loading="lazy" alt={storeName} />

      <p>
        {storeDescription}<br/>“{storeName}”
      </p>

      <p className="mt-auto">
        {new Date().getFullYear()}
      </p>
    </div>
  )
}

export function FooterMenuSection({ section }) {

  return (
    <div className="text-silkway-dark-chocolate font-sans">
      <h3 className="text-xl footer-1.7:text-2xl font-bold pb-3 text-center footer-1:text-left">
        {section.title}
      </h3>
      <ul>
        {section.items.map(item => 
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
        )}
      </ul>      
    </div>
  )
}

export function Contacts({ address, phone, email }) {

  return (
    <div className="text-silkway-dark-chocolate font-sans">
      <h3 className="text-xl footer-1.7:text-2xl font-bold pb-3 text-center footer-1:text-left">
        Контакты
      </h3>

      <p
        className="text-xs footer-1.7:text-sm leading-8 text-center footer-1:text-left"
      >
        {address[0]}<br />

        {address[1]}<br /><br />

        <a href={`mailto:${email}`}>{email}</a><br />

        <span className="text-xl footer-1.7:text-2xl">
          <a href={`tel:${phone}`}>{phone}</a>
        </span><br />

        Единый телефон поддержки клиентов
      </p>
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
    <div className="w-full bg-silkway-milk">          
      <div
        className="grid grid-cols-1 footer-1:grid-cols-2 footer-1.8:flex flex-wrap justify-between gap-[50px] p-[50px] px-[10px] footer-4:px-[20px] footer-3:px-[50px] max-w-[1670px] m-auto"
      >
        <FooterLogo storeName={storeName} storeDescription={storeDescription} />

        <FooterMenuSection section={menuSections[0]} />

        <FooterMenuSection section={menuSections[1]} />

        <FooterMenuSection section={menuSections[2]} />

        <Contacts address={address} phone={phone} email={email} />
      </div>  
    </div>
  )
}
