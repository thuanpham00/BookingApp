import { TypeFlightManageResponse, TypeFlightPriceResponse } from "src/types/flight.type"

export const setAccessTokenToLS = (accessToken: string) => {
  return localStorage.setItem("accessToken", accessToken)
}

export const getAccessTokenToLS = () => {
  return localStorage.getItem("accessToken") || ""
}

export const setProfileToLS = (profile: string) => {
  return localStorage.setItem("profile", profile)
}

export const getProfileToLS = () => {
  return localStorage.getItem("profile") || ""
}

export const clearLS = () => {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("profile")
}

// list cart
export const setCartToLS = (cartItem: TypeFlightPriceResponse[]) => {
  return localStorage.setItem("listCart", JSON.stringify(cartItem))
}

export const getCartToLS = () => {
  const res = localStorage.getItem("listCart") as string
  return res ? JSON.parse(res) : []
}

// list purchased
export const setPurchaseListToLS = (cartItem: TypeFlightManageResponse[]) => {
  return localStorage.setItem("listPurchased", JSON.stringify(cartItem))
}

export const getPurchaseListToLS = () => {
  const res = localStorage.getItem("listPurchased") as string
  return res ? JSON.parse(res) : []
}

// list cancelled
export const setCancelListToLS = (cartItem: TypeFlightManageResponse[]) => {
  return localStorage.setItem("listCancel", JSON.stringify(cartItem))
}

export const getCancelListToLS = () => {
  const res = localStorage.getItem("listCancel") as string
  return res ? JSON.parse(res) : []
}
