import { itemsCountPostfix } from '../utils'

export function ResultsInfo({ resultsCount, isLoading }) {
  const postfix = itemsCountPostfix(resultsCount, [
    'результат',
    'результата',
    'результатов',
  ])

  return (
    <div className="border-b border-silkway-dark-milk font-sans text-sm text-silkway-dark-chocolate pb-[15px] mb-[15px]">
      {isLoading ? 'Загрузка...' : `${resultsCount} ${postfix}`}
    </div>
  )
}
