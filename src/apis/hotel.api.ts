import { HotelParamsConfig, HotelSearchParamsConfig } from "src/types/hotel.type"
import { HttpV1, HttpV3 } from "src/utils/http"

export const hotelApi = {
  getHotelList: (params: HotelParamsConfig, signal?: AbortSignal) => {
    return HttpV1.get("reference-data/locations/hotels/by-city", { params, signal }) // truyền tham số truy vấn query "?"
  },

  getHotelSearch: (params: HotelSearchParamsConfig, signal?: AbortSignal) => {
    return HttpV3.get("shopping/hotel-offers", { params, signal })
  }
}
