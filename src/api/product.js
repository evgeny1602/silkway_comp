import { searchProductUrl, bitrixIBlockID } from '../config'

export const autocomplete = async (query) => {
  if (!query) {
    return []
  }

  if (query.length < 3) {
    return []
  }

  const body = new FormData()
  body.append('iblock_id', bitrixIBlockID)
  body.append('action', 'search')
  body.append('q', query)
  body.append('page_size', 20)
  body.append('page_num', 1)

  const resp = await fetch(searchProductUrl, { method: 'POST', body })

  if (!resp.ok) {
    throw new Error(resp.statusText)
  }

  const json = await resp.json()

  return json.items
}
