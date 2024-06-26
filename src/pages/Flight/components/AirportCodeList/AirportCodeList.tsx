import { airportCodeList } from "src/types/flight.type"
import AirportCodeItem from "../AirportCodeItem"

interface Props {
  setSearchText: React.Dispatch<React.SetStateAction<string>>
  listAirport: airportCodeList
}

let country: string | null = null
export default function AirportCodeList({ setSearchText, listAirport }: Props) {
  return listAirport.map((item) => {
    const row = []
    if (item.country !== country) {
      row.push(<div className="text-sm p-2 font-semibold">{item.country}</div>)
      country = item.country
    }
    row.push(
      <div key={item.code}>
        <AirportCodeItem item={item} setSearchText={setSearchText} />
      </div>
    )
    return row
  })
}
