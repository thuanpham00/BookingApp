import { flightSearchParams, ResponseFlightSearch } from "src/types/flight.type"
import Http from "src/utils/http"

export const flightApi = {
  // tìm kiếm chuyến bay
  flightOffersSearch: (body: flightSearchParams) => {
    return Http.post<ResponseFlightSearch>("shopping/flight-offers", body)
  }
}
