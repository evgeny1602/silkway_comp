import { clearCartUrl, delFromCartUrl } from '../config'

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
