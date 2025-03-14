import { clearCartUrl, delFromCartUrl, addToCartUrl } from '../config'

export const clearCart = async () => {
  const resp = await fetch(clearCartUrl)
  if (!resp.ok) {
    throw new Error(resp.statusText)
  }
  return true
}

export const delFromCart = async (cartItemId) => {
  const url = delFromCartUrl.replace('{{cart_item_id}}', cartItemId)
  const resp = await fetch(url)
  if (!resp.ok) {
    throw new Error(resp.statusText)
  }
  return true
}

export const addToCart = async (data) => {
  const body = new FormData()
  body.append('action', 'add_to_cart')
  for (const k in data) {
    body.append(k, data[k])
  }
  const resp = await fetch(addToCartUrl, { method: 'POST', body })
  if (!resp.ok) {
    throw new Error(resp.statusText)
  }
  return true
}
