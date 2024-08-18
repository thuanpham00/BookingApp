import { HotelParamsConfig } from "src/types/hotel.type"
import { HttpV1 } from "src/utils/http"

export const hotelApi = {
  getHotelList: (params: HotelParamsConfig, signal?: AbortSignal) => {
    return HttpV1.get("reference-data/locations/hotels/by-city", { params, signal }) // truyền tham số truyền vấn query "?"
  }
}
