import {
  clearCartUrl,
  delFromCartUrl,
  addToCartUrl,
  setCartItemQtyUrl,
  delFromCartByOfferIdUrl,
} from '../config'

export const delFromCartByOfferId = async (userId = null, offerId) => {
  const body = new FormData()
  body.append('action', 'del_from_cart_by_offer_id')
  if (userId) {
    body.append('user_id', userId)
  }
  body.append('offer_id', offerId)
  const resp = await fetch(delFromCartByOfferIdUrl, { method: 'POST', body })
  if (!resp.ok) {
    throw new Error(resp.statusText)
  }
  const resultData = await resp.json()
  return resultData
}

export const setCartItemQty = async (userId = null, offerId, newQty) => {
  const body = new FormData()
  body.append('action', 'cart_item_qty')
  if (userId) {
    body.append('user_id', userId)
  }
  body.append('offer_id', offerId)
  body.append('new_qty', parseInt(newQty))
  const resp = await fetch(setCartItemQtyUrl, { method: 'POST', body })
  if (!resp.ok) {
    throw new Error(resp.statusText)
  }
  const resultData = await resp.json()
  return resultData
}

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
