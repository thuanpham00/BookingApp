import { FlightOfferParamsConfig, ResponseFlightSearch } from "src/types/flight.type"
import Http from "src/utils/http"

export const flightApi = {
  // tìm kiếm chuyến bay
  flightOffersSearch: (params: FlightOfferParamsConfig, signal?: AbortSignal) => {
    return Http.get<ResponseFlightSearch>("shopping/flight-offers", {
      params,
      signal
    })
  }
}
