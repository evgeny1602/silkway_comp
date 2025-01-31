import { searchProductUrl } from '../config'

export const autocomplete = async (query) => {
  if (!query) {
    return []
  }

  if (query.length < 3) {
    return []
  }

  const body = new FormData()
  body.append('SEARCH_QUERY', query)

  const resp = await fetch(searchProductUrl, { method: 'POST', body })
  if (!resp.ok) {
    throw new Error(resp.statusText)
  }

  const json = await resp.json()

  return json.items
}
