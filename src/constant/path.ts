export const path = {
  home: "/",
  login: "/login",
  register: "/register",

  flight: "/flight",
  flightSearch: "/flight/search",
  flightOrder: "/flight/order",
  flightPayment: "/flight/payment",

  ManageTicket: "/manage/success",
  CancelTicket: "/manage/cancel",
  ManageUser: "/manage/user",

  billPayment: "/bill",

  hotel: "/hotel",
  hotelSearch: "/hotel/search",
  hotelDetail: "/hotel/:hotelId",
  hotelOrder: "/hotel/order",
  hotelPayment: "/hotel/payment",
  cart: "/cart",
  notFound: "/*"
} as const
