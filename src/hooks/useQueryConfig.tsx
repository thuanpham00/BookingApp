import { FlightOfferParamsConfig } from "src/types/flight.type"
import useQueryParam from "./useQueryParam"
import { isUndefined, omitBy } from "lodash"

export type QueryParamConfig = {
  [key in keyof FlightOfferParamsConfig]: string
}

export default function useQueryConfig() {
  const queryParam: QueryParamConfig = useQueryParam()
  const queryConfig: QueryParamConfig = omitBy(
    {
      originLocationCode: queryParam.originLocationCode || "SGN", // sân bay tân sơn nhất // mã sân bay xuất phát
      destinationLocationCode: queryParam.destinationLocationCode || "ICN", // mã sân bay Incheon, Hàn Quốc
      departureDate: queryParam.departureDate || "2023-07-01", // Ngày khởi hành mong muốn // ngày trong tương lai
      returnDate: queryParam.returnDate,
      adults: queryParam.adults || "2", // Số lượng người lớn
      children: queryParam.children, // Số lượng trẻ em
      infants: queryParam.adults, // Số lượng em bé // Ngày trở về mong muốn
      currencyCode: queryParam.currencyCode, // Mã tiền tệ
      nonStop: queryParam.nonStop, // Chỉ muốn chuyến bay trực tiếp
      travelClass: queryParam.travelClass, // Hạng ghế mong muốn
      max: queryParam.max || "1", // Số lượng kết quả chuyến bay cần lấy
      maxPrice: queryParam.maxPrice, // Giới hạn giá tối đa cho các kết quả chuyến bay
      includedAirlineCodes: queryParam.includedAirlineCodes, // Các mã hãng hàng không muốn bao gồm (Vietnam Airlines, Korean Air)
      excludedAirlineCodes: queryParam.excludedAirlineCodes // Các mã hãng hàng không muốn loại trừ (Cathay Pacific)
    },
    isUndefined
  )
  return queryConfig
}

// flow của nó thế này
// khi TÌM KIẾM chuyến bay nó điều hướng tới (navigate) - thêm vào url và dùng useSearchParam() lấy các tham số truy vấn xuống -> cập nhật lại queryConfig -> fetch lại data (api)
