export const fetchItems = async (
  filters = null,
  pageSize,
  pageNum,
  sectionId = null,
  q = null
) => {
  const body = new FormData()
  body.append('action', 'filter_items')
  body.append('page_size', pageSize)
  body.append('page_num', pageNum)
  if (sectionId) {
    body.append('section_id', sectionId)
  }
  if (filters) {
    body.append('filters', JSON.stringify(filters))
  }
  if (q) {
    body.append('q', q)
  }
  const resp = await fetch('/ajax2.php', { method: 'POST', body })
  return await resp.json()
}

export const fetchItemsTotal = async (
  filters = null,
  sectionId = null,
  q = null
) => {
  const body = new FormData()
  body.append('action', 'filter_items_total')
  if (sectionId) {
    body.append('section_id', sectionId)
  }
  if (filters) {
    body.append('filters', JSON.stringify(filters))
  }
  if (q) {
    body.append('q', q)
  }
  const resp = await fetch('/ajax2.php', { method: 'POST', body })
  return await resp.json()
}
