import { TypeCityCodeList } from "src/types/hotel.type"
import CityCodeItem from "../CityCodeItem"
import { InputAirport } from "src/hooks/useFormHandler"

interface Props {
  listAirport: TypeCityCodeList
  inputName: InputAirport
  handleItemClick: (inputName: InputAirport, value: string) => void
}

let country: string | null = null
export default function CityCodeList({ inputName, listAirport, handleItemClick }: Props) {
  return listAirport.map((item) => {
    const row = []
    if (item.country !== country) {
      row.push(
        <div key={`country-${item.country}`} className="text-sm p-2 font-semibold">
          {item.country}
        </div>
      )
      country = item.country
    }
    row.push(
      <div key={`code-${item.code}`}>
        <CityCodeItem item={item} handleItemClick={handleItemClick} inputName={inputName} />
      </div>
    )
    return row
  })
}
