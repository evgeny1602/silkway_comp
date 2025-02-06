import { useRef, useState } from 'react'
import { useOutsideClick } from '../hooks/useOutsideClick'
import { useFetch } from '../hooks/useFetch'
import { useDebounce } from '../hooks/useDebounce'
import { debounceDelayMs } from '../config'

export function SearchAutocomplete({
  fetcher,
  inputClassname,
  dropdownClassname,
  dropdownItemClassname,
  onChange = null,
  onItemClick = null,
  onEnter = null,
}) {
  const [query, setQuery] = useState('')
  const [areResultsVisible, setAreResultsVisible] = useState(true)

  const debouncedQuery = useDebounce(query, debounceDelayMs)

  const resultsRef = useRef(null)

  const { results } = useFetch(fetcher, debouncedQuery)

  useOutsideClick([resultsRef], () => setAreResultsVisible(false))

  const handleItemClick = (e) => {
    setQuery(e.target.dataset.title)
    setAreResultsVisible(false)
    if (onItemClick) {
      onItemClick(e)
    }
  }

  const handleChange = (e) => {
    setQuery(e.target.value)
    setAreResultsVisible(true)
    if (onChange) onChange(e)
  }

  const handleKeyDown = (e) => {
    if (e.key == 'Enter') {
      onEnter(e)
    }
  }

  return (
    <>
      <input
        className={inputClassname}
        value={query}
        onChange={handleChange}
        onClick={() => setAreResultsVisible(true)}
        onKeyDown={handleKeyDown}
      />

      {areResultsVisible && results.length > 0 && (
        <div
          className={dropdownClassname}
          ref={resultsRef}
        >
          {results.map((item) => (
            <div
              data-city={item.city || null}
              data-city-id={item.cityId || null}
              data-url={item.url || null}
              data-title={item.title}
              key={item.title}
              onClick={handleItemClick}
              className={dropdownItemClassname}
            >
              {item.title}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
