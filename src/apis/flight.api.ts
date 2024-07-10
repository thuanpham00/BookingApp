import {
  FlightPricingParams,
  FlightSearchParams,
  ResponseFlightSearch
} from "src/types/flight.type"
import { HttpV1, HttpV2 } from "src/utils/http"

export const flightApi = {
  // tìm kiếm chuyến bay
  flightOffersSearch: (body: FlightSearchParams) => {
    return HttpV2.post<ResponseFlightSearch>("shopping/flight-offers", body)
  },
  flightOffersPrice: (body: FlightPricingParams) => {
    return HttpV1.post("shopping/flight-offers/pricing", body)
  }
}
