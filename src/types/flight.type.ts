export type FlightOfferParamsConfig = {
  originLocationCode?: string // mã sân bay xuất phát
  destinationLocationCode?: string // mã sân bay đích
  departureDate?: string // ngày khởi hành mong muốn
  returnDate?: string // ngày trở về
  adults?: number // người lớn // 12 tuổi trở lên
  children?: number // trẻ em // 2 - 12 tuổi
  infants?: number // em bé // dưới 2 tuổi
  currencyCode?: string // mã tiền tệ
  nonStop?: boolean // chuyến bay trực tiếp
  travelClass?: "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST" // hạng ghế
  max?: number // số lượng chuyến bay cần lấy
  maxPrice?: number // Giới hạn giá tối đa cho các kết quả chuyến bay.
  includedAirlineCodes?: string // các mã hãng hàng không mà bạn muốn bao gồm trong kết quả tìm kiếm chuyến bay.
  excludedAirlineCodes?: string // các mã hãng hàng không mà bạn muốn loại trừ khỏi kết quả tìm kiếm chuyến bay.
}

export type airportCodeItem = {
  code: string
  airport: string
  country: string
}

export type airportCodeList = airportCodeItem[]
