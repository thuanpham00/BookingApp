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

export type flightSearchParams = {
  originDestinations: {
    id: string
    originLocationCode: string
    destinationLocationCode: string
    departureDateTimeRange: {
      date: string
    }
  }[]

  travelers: [
    {
      id: string
      travelerType: string
      count: number
    },
    {
      id: string
      travelerType: string
      count: number
    },
    {
      id: string
      travelerType: string
      count: number
    }
  ]
  sources: string[]
  searchCriteria: {
    maxFlightOffers: number
    flightFilters: {
      cabinRestrictions: [
        {
          cabin: string
          originDestinationIds: string[]
        }
      ]
      carrierRestrictions: {
        excludedCarrierCodes: string[]
      }
    }
  }
  currencyCode: string
}

export type airportCodeItem = {
  code: string
  airport: string
  country: string
}

export type airportCodeList = airportCodeItem[]

// Định nghĩa kiểu dữ liệu cho phản hồi của API Flight Offer Search
export type ResponseFlightSearch = {
  // Metadata của phản hồi
  meta: {
    // Tổng số kết quả trả về
    count: number
    // Các liên kết liên quan
    links: {
      self: string // URL của request
    }
  }

  // Dữ liệu chính của các chuyến bay
  data: [
    {
      // Thông tin chung về chuyến bay
      type: string // Loại đối tượng (e.g., "flight-offer")
      id: string // ID duy nhất của chuyến bay
      source: string // Nguồn của dữ liệu
      instantTicketingRequired: boolean // Có yêu cầu phát hành vé ngay lập tức không
      nonHomogeneous: boolean // Có không đồng nhất không (e.g., nhiều hạng ghế)
      oneWay: boolean // Là chuyến bay một chiều không
      lastTicketingDate: string // Ngày cuối cùng có thể đặt vé
      numberOfBookableSeats: number // Số lượng chỗ ngồi có thể đặt

      // Thông tin chi tiết về hành trình
      // 1 chuyến bay sẽ có nhiều hành trình, quá cảnh
      itineraries: [
        {
          duration: string // Tổng thời gian của hành trình
          segments: [
            {
              departure: {
                iataCode: string // Mã IATA của sân bay khởi hành
                terminal: string // Nhà ga khởi hành
                at: string // Thời gian khởi hành
              }
              arrival: {
                iataCode: string // Mã IATA của sân bay đến
                terminal: string // Nhà ga đến
                at: string // Thời gian đến
              }
              carrierCode: string // Mã hãng hàng không
              number: string // Số hiệu chuyến bay
              aircraft: {
                code: string // Mã máy bay
              }
              operating: {
                carrierCode: string // Mã hãng hàng không vận hành
              }
              duration: string // Thời gian bay của đoạn này
              id: string // ID của đoạn bay
              numberOfStops: number // Số lần dừng
              blacklistedInEU: boolean // Có bị cấm bay trong EU không
            }
          ]
        }
      ]

      // Thông tin giá cả của chuyến bay
      price: {
        currency: string // Loại tiền tệ
        total: string // Tổng giá
        base: string // Giá cơ bản
        fees: {
          amount: string // Số tiền của phí
          type: string // Loại phí
        }[]
        grandTotal: string // Tổng giá bao gồm tất cả các phí
      }

      // Tùy chọn giá vé
      pricingOptions: {
        fareType: string[] // Loại giá vé (e.g., "PUBLISHED")
        includedCheckedBagsOnly: boolean // Chỉ bao gồm hành lý ký gửi
      }

      // Mã hãng hàng không xác nhận vé
      validatingAirlineCodes: string[]

      // Giá vé cho từng hành khách
      travelerPricings: [
        {
          travelerId: string // ID của hành khách
          fareOption: string // Tùy chọn giá vé
          travelerType: string // Loại hành khách (e.g., "ADULT")
          price: {
            currency: string // Loại tiền tệ
            total: string // Tổng giá
            base: string // Giá cơ bản
          }
          fareDetailsBySegment: [
            {
              segmentId: string // ID của đoạn bay
              cabin: string // Hạng ghế (e.g., "ECONOMY")
              fareBasis: string // Cơ sở giá vé
              class: string // Lớp (e.g., "E")
              includedCheckedBags: {
                weight: number // Trọng lượng hành lý ký gửi
                weightUnit: string // Đơn vị trọng lượng (e.g., "KG")
              }
            }
          ]
        }
      ]
    }
  ]

  // Từ điển chứa thông tin bổ sung
  dictionaries: {
    locations: {
      [code: string]: {
        cityCode: string // Mã thành phố
        countryCode: string // Mã quốc gia
      }
    }
    aircraft: {
      [code: string]: string // Loại máy bay
    }
    currencies: {
      [code: string]: string // Loại tiền tệ
    }
    carriers: {
      [code: string]: string // Hãng hàng không
    }
  }
}
