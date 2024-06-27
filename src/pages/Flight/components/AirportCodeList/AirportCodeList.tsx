import { airportCodeList } from "src/types/flight.type"
import AirportCodeItem from "../AirportCodeItem"

interface Props {
  listAirport: airportCodeList
  inputName: string
  handleItemClick: (inputName: string, value: string) => void
}

let country: string | null = null
export default function AirportCodeList({ listAirport, handleItemClick, inputName }: Props) {
  return listAirport.map((item) => {
    const row = []
    if (item.country !== country) {
      row.push(<div className="text-sm p-2 font-semibold">{item.country}</div>)
      country = item.country
    }
    row.push(
      <div key={item.code}>
        <AirportCodeItem item={item} handleItemClick={handleItemClick} inputName={inputName} />
      </div>
    )
    return row
  })
}
