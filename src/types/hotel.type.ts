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

export type TypeHotelSearchResponse = {
  data: {
    type: string // Loại đối tượng, ví dụ: "hotel-offers".
    hotel: {
      type: string // Loại đối tượng khách sạn, luôn là "hotel".
      hotelId: string // Mã định danh duy nhất của khách sạn.
      chainCode: string // Mã chuỗi khách sạn (nếu có).
      dupeId: string // Mã định danh khác của khách sạn, dùng cho các mục đích so sánh.
      name: string // Tên của khách sạn.
      cityCode: string // Mã thành phố nơi khách sạn tọa lạc.
      latitude: number // Vĩ độ địa lý của khách sạn.
      longitude: number // Kinh độ địa lý của khách sạn.
    }
    available: boolean // Xác định liệu có phòng trống tại khách sạn hay không.
    offers: {
      id: string // Mã định danh của offer.
      checkInDate: string // Ngày khách nhận phòng.
      checkOutDate: string // Ngày khách trả phòng.
      rateCode: string // Mã rate áp dụng cho phòng.
      commission: {
        percentage: string // Phần trăm hoa hồng được áp dụng cho offer.
      }
      room: {
        type: string // Mã loại phòng.
        typeEstimated: {
          category: string // Hạng phòng (ví dụ: "SUPERIOR_ROOM").
          beds: number // Số lượng giường trong phòng.
          bedType: string // Loại giường (ví dụ: "KING").
        }
        description: {
          text: string // Mô tả về phòng.
          lang: string // Ngôn ngữ của mô tả phòng.
        }
      }
      guests: {
        adults: number // Số lượng khách người lớn cho offer này.
      }
      price: {
        currency: string // Loại tiền tệ của giá phòng.
        base: string // Giá cơ bản của phòng.
        total: string // Tổng giá phòng bao gồm tất cả các khoản phí.
        variations: {
          average: {
            base: string // Giá trung bình cho toàn bộ kỳ nghỉ.
          }
          changes: {
            startDate: string // Ngày bắt đầu của thay đổi giá.
            endDate: string // Ngày kết thúc của thay đổi giá.
            base: string // Giá cơ bản trong khoảng thời gian này.
          }[]
        }
      }
      policies: {
        cancellations: {
          description: {
            text: string // Mô tả về chính sách hủy phòng.
          }
          type: string // Loại hủy phòng (ví dụ: "FULL_STAY").
        }[]
        prepay: {
          deadline: string // Hạn chót để trả trước cho phòng.
        }
        paymentType: string // Loại thanh toán (ví dụ: "prepay").
      }
      self: string // Đường dẫn URL để lấy chi tiết về offer này.
    }[]
    self: string // Đường dẫn URL để lấy chi tiết về hotel-offers này.
  }[]
}

export type TypeTravelerHotel = {
  title: string
  firstName: string
  lastName: string
  phone: string
  email: string
}

export type TypeHotelCreateOrder = {
  data: {
    type: string
    guests: TypeTravelerHotel[]
    travelAgent: {
      contact: {
        email: string
      }
    }
    roomAssociations: [
      {
        guestReferences: [
          {
            guestReference: string
          }
        ]
        hotelOfferId: string
      }
    ]
    payment: {
      method: string
      paymentCard: {
        paymentCardInfo: {
          vendorCode: string
          cardNumber: string
          expiryDate: string
          holderName: string
        }
      }
    }
  }
}

export type TypeHotelOrderResponse = {
  data: {
    type: string // "hotel-order"
    id: string
    hotelBookings: {
      type: string // "hotel-booking"
      id: string
      bookingStatus: string // "CONFIRMED"
      hotelProviderInformation: {
        hotelProviderCode: string
        confirmationNumber: string
      }[]
      roomAssociations: {
        hotelOfferId: string
        guestReferences: {
          guestReference: string
        }[]
      }[]
      hotelOffer: {
        id: string
        type: string // "hotel-offer"
        category: string // "TYPE_CONDITIONAL"
        checkInDate: string
        checkOutDate: string
        guests: {
          adults: number
        }
        policies: {
          cancellations: {
            amount: string
            deadline: string
          }[]
          paymentType: string // "GUARANTEE"
        }
        price: {
          base: string
          currency: string
          sellingTotal: string
          taxes: {
            amount: string
            code: string // "VALUE_ADDED_TAX"
            currency: string
            included: boolean
            pricingFrequency: string // "PER_STAY"
            pricingMode: string // "PER_PRODUCT"
          }[]
          total: string
          variations: {
            changes: {
              endDate: string
              startDate: string
              base: string
              currency: string
            }[]
          }
        }
        rateCode: string
        room: {
          description: {
            lang: string
            text: string
          }
          type: string
        }
        roomQuantity: number
      }
      hotel: {
        hotelId: string
        chainCode: string
        name: string
        self: string
      }
      payment: {
        method: string // "CREDIT_CARD"
        paymentCard: {
          paymentCardInfo: {
            vendorCode: string
            cardNumber: string
            expiryDate: string
            holderName: string
          }
        }
      }
      travelAgentId: string
    }[]
    guests: {
      tid: number
      id: number
      title: string
      firstName: string
      lastName: string
      phone: string
      email: string
    }[]
    associatedRecords: {
      reference: string
      originSystemCode: string
    }[]
    self: string
  }
}
