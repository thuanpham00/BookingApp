import { FlightOfferParamsConfig } from "src/types/flight.type"
import useQueryParam from "./useQueryParam"
import isUndefined from "lodash/isUndefined"
import omitBy from "lodash/omitBy"

export type QueryParamsConfig = {
  [keyof in keyof FlightOfferParamsConfig]: string // gán toàn bộ key của FlightOfferParamsConfig là string
}

export default function useQueryConfig() {
  const queryParam: QueryParamsConfig = useQueryParam()
  const queryConfig: QueryParamsConfig = omitBy(
    {
      originLocationCode: queryParam.originLocationCode, // sân bay tân sơn nhất // mã sân bay xuất phát
      destinationLocationCode: queryParam.destinationLocationCode, // mã sân bay Incheon, Hàn Quốc
      departureDate: queryParam.departureDate, // Ngày khởi hành mong muốn // ngày trong tương lai
      returnDate: queryParam.returnDate,
      adults: queryParam.adults || "0", // Số lượng người lớn
      children: queryParam.children || "0", // Số lượng trẻ em
      infants: queryParam.infants || "0", // Số lượng em bé
      travelClass: queryParam.travelClass, // Hạng ghế mong muốn
      nonStop: queryParam.nonStop || "false", // chuyến bay trực tiếp
      max: queryParam.max || "30",
      currencyCode: queryParam.currencyCode || "VND",

      maxPrice: queryParam.maxPrice,
      includedAirlineCodes: queryParam.includedAirlineCodes
    },
    isUndefined
  )
  return queryConfig
}

// flow của nó thế này
// khi TÌM KIẾM chuyến bay nó điều hướng tới (navigate) - thêm vào url và dùng useSearchParams() lấy các tham số truy vấn xuống -> cập nhật lại queryConfig -> fetch lại data (api)
