import { InfoPageContainer as Container } from '../ui/InfoPageContainer'

export function InfoPageContacts() {
  return (
    <Container>
      <div className="rounded bg-white font-sans text-silkway-dark-chocolate p-[30px] max-[600px]:p-[15px]">
        <h3 className="text-xl mb-[15px] font-bold">Как нас найти</h3>
        <div className="text-base flex flex-wrap flex-row justify-start gap-[30px] max-[600px]:gap-[15px] mb-[50px]">
          <div className="w-[300px]">
            <p>
              Адрес №1: Алтайский край, г.Рубцовск, ул.Сельмашская дом 2, этаж 3
            </p>

            <p>
              <br />
            </p>

            <p>Адрес №2: г. Новосибирск, ул.Фрунзе, дом 5, офис 536</p>
          </div>
          <div className="w-[300px]">
            <p>Телефон для связи: 8 (800) 777-75-31</p>
            <p>Email: dubaigold@inbox.ru</p>
          </div>
        </div>
        <div>
          <h3 className="text-xl mb-[15px] font-bold">Реквизиты</h3>
          <div className="flex flex-nowrap flex-col justify-start items-start gap-[10px]">
            <p>ИП Филиппов Антон Сергеевич</p>
            <p>ИНН: 220908409928</p>
            <p>ОГРНИП: 320222500056779</p>
            <p>Расчетный счет: 40802810602000031494</p>
            <p>Банк: АЛТАЙСКОЕ ОТДЕЛЕНИЕ N8644 ПАО СБЕРБАНК</p>
            <p>БИК: 040173604 Корр. счет: 30101810200000000604</p>
            <p>Свидетельство: 4202225003655786 от 15.09.2020</p>
          </div>
        </div>
      </div>
    </Container>
  )
}
