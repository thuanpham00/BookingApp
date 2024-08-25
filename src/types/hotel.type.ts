export type HotelParamsConfig = {
  cityCode?: string //  Mã IATA của thành phố nơi bạn muốn tìm khách sạn.
  radius?: number // Bán kính tìm kiếm xung quanh
  radiusUnit?: number // Đơn vị đo của bán kính
  chainCodes?: string[] // Mã của chuỗi khách sạn mà bạn muốn tìm kiếm
  amenities?: string[] // Các tiện nghi mà khách sạn phải có, giúp lọc các khách sạn dựa trên các tiện ích như Wi-Fi miễn phí, bể bơi, phòng gym, v.v.
  ratings?: string[] //  Mức xếp hạng sao của khách sạn mà bạn muốn tìm kiếm
  hotelSource?: string // nguồn cung cấp thông tin khách sạn
}

export type HotelSearchParamsConfig = {
  hotelIds?: string[] // mã code đã tìm được trước đó trong list
  adults?: number // số lượng khách
  checkInDate?: string // ngày nhận phòng
  checkOutDate?: string // ngày trả phòng
  roomQuantity?: number // số lượng phòng yêu cầu
  priceRange?: string // Khoảng giá mà bạn muốn giới hạn kết quả tìm kiếm, được định dạng dưới dạng chuỗi
  currency?: string // tiền tệ
  paymentPolicy?: string // điều kiện thanh toán
  boardType?: string // Loại dịch vụ ăn uống bạn muốn tìm kiếm.
  includeClosed?: boolean // Nếu đặt là true, kết quả tìm kiếm sẽ bao gồm cả các khách sạn hiện đang đóng cửa.
  bestRateOnly?: boolean // Nếu đặt là true, kết quả tìm kiếm chỉ hiển thị các phòng có giá tốt nhất.
  countryOfResidence?: string // Mã quốc gia của nơi cư trú của khách, theo chuẩn ISO 3166-1 alpha-2 (ví dụ: US cho Hoa Kỳ). Thông tin này có thể ảnh hưởng đến giá cả hoặc các điều kiện khác.
  lang?: string // ngon ngu
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
