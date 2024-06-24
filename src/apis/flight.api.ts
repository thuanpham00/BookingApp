import { FlightOfferParamsConfig } from "src/types/flight.type"
import Http from "src/utils/http"

export const flightApi = {
  // tìm kiếm chuyến bay
  flightOffersSearch: (params: FlightOfferParamsConfig) => {
    return Http.get("shopping/flight-offers", {
      params
    })
  }
}
