import { clearCartUrl, delFromCartUrl, addToCartUrl } from '../config'

export const clearCart = async (userId = null) => {
  const body = new FormData()
  body.append('action', 'clear_cart')
  if (userId) {
    body.append('user_id', userId)
  }
  const resp = await fetch(clearCartUrl, { method: 'POST', body })
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
  const resultData = await resp.json()
  return resultData
}
