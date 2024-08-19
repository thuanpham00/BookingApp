export type HotelParamsConfig = {
  cityCode?: string //  Mã IATA của thành phố nơi bạn muốn tìm khách sạn.
  radius?: number // Bán kính tìm kiếm xung quanh
  radiusUnit?: number // Đơn vị đo của bán kính
  chainCodes?: string[] // Mã của chuỗi khách sạn mà bạn muốn tìm kiếm
  amenities?: string[] // Các tiện nghi mà khách sạn phải có, giúp lọc các khách sạn dựa trên các tiện ích như Wi-Fi miễn phí, bể bơi, phòng gym, v.v.
  ratings?: string[] //  Mức xếp hạng sao của khách sạn mà bạn muốn tìm kiếm
  hotelSource?: string // nguồn cung cấp thông tin khách sạn
}

export type TypeCityCodeItem = {
  code: string
  name: string
  country: string
}
export type TypeCityCodeList = TypeCityCodeItem[]

export type TypeHotelItemResponse = {
  chainCode: string // Mã chuỗi khách sạn (ví dụ: CI cho Comfort Hotel)
  iataCode: string // Mã sân bay hoặc thành phố liên quan (ví dụ: NGO cho Sân bay Quốc tế Chūbu Centrair)
  dupeId: number // Mã định danh nội bộ của khách sạn
  name: string // Tên khách sạn
  hotelId: string // Mã định danh của khách sạn trong hệ thống Amadeus
  // Tọa độ địa lý của khách sạn
  geoCode: {
    latitude: number // Vĩ độ của khách sạn
    longitude: number // Kinh độ của khách sạn
  }
  // Địa chỉ của khách sạn
  address: {
    // Mã quốc gia nơi khách sạn nằm (ví dụ: JP cho Nhật Bản)
    countryCode: string
  }
  // Khoảng cách từ vị trí tìm kiếm đến khách sạn
  distance: {
    // Giá trị khoảng cách
    value: number
    // Đơn vị đo khoảng cách (ví dụ: KM cho Kilomet)
    unit: string
  }
  // Thời điểm cập nhật thông tin gần nhất của khách sạn
  lastUpdate: string
}
export type TypeHotelListResponse = {
  // Mảng chứa thông tin chi tiết về các khách sạn
  data: TypeHotelItemResponse[]
  // Thông tin meta liên quan đến phản hồi
  meta: {
    // Số lượng khách sạn được trả về trong phản hồi
    count: number
    // Các liên kết để tham khảo hoặc tái truy vấn thông tin
    links: {
      // URL của API request hiện tại
      self: string
    }
  }
}