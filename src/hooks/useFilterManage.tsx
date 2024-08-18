import { useMemo } from "react"
import { ResponseFlightManage } from "src/types/flight.type"

export default function useFilterManage(data: ResponseFlightManage[], searchText: string) {
  const filterList = useMemo(
    () =>
      data &&
      data.filter(
        (item) =>
          item.data.flightOffers[0].itineraries[0].segments[0].departure.iataCode
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          item.data.flightOffers[0].itineraries[0].segments[
            item.data.flightOffers[0].itineraries[0].segments.length - 1
          ].arrival.iataCode
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          item.data.flightOffers[0].itineraries[0].segments[0].departure.at
            .toLowerCase()
            .includes(searchText.toLowerCase())
      ),
    [data, searchText]
  )
  return filterList
}
