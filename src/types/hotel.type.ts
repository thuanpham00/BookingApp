export type HotelParamsConfig = {
  cityCode?: string //  Mã IATA của thành phố nơi bạn muốn tìm khách sạn.
  radius?: number // Bán kính tìm kiếm xung quanh
  radiusUnit?: number // Đơn vị đo của bán kính
  chainCodes?: string[] // Mã của chuỗi khách sạn mà bạn muốn tìm kiếm
  amenities?: string[] // Các tiện nghi mà khách sạn phải có, giúp lọc các khách sạn dựa trên các tiện ích như Wi-Fi miễn phí, bể bơi, phòng gym, v.v.
  ratings?: string[] //  Mức xếp hạng sao của khách sạn mà bạn muốn tìm kiếm
  hotelSource?: string // nguồn cung cấp thông tin khách sạn
}
