import {
  FlightCreateOrder,
  FlightOfferParamsConfig,
  FlightPricingParams,
  ResponseFlightList
} from "src/types/flight.type"
import { HttpV1, HttpV2 } from "src/utils/http"

export const flightApi = {
  // tìm kiếm chuyến bay
  flightOfferSearchGet: (params: FlightOfferParamsConfig, signal?: AbortSignal) => {
    return HttpV2.get<ResponseFlightList>("shopping/flight-offers", { params, signal })
  },

  // giá chi tiết của 1 chuyến bay
  flightOffersPrice: (body: FlightPricingParams) => {
    return HttpV1.post("shopping/flight-offers/pricing", body)
  },

  // đặt vé máy bay
  flightCreateOrder: (body: FlightCreateOrder) => {
    return HttpV1.post("booking/flight-orders", body)
  },

  // quản lý chuyến bay
  flightManagement: (id: string) => {
    return HttpV1.get(`booking/flight-orders/${id}`)
  },

  // quản lý chuyến bay
  flightDelete: (id: string) => {
    return HttpV1.delete(`booking/flight-orders/${id}`)
  }
}
