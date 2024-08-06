import { InputAirport } from "src/hooks/useFormHandler"
import { CountryListCodeNumber } from "src/types/flight.type"

interface Props {
  listAirport: CountryListCodeNumber
  inputName: InputAirport
  handleItemClick: (inputName: InputAirport, value: string) => void
}

export default function Nationality({ inputName, listAirport, handleItemClick }: Props) {
  const handleChangeInput = (name: string) => {
    handleItemClick(inputName, `${name}`)
  }

  return listAirport.map((item) => {
    const row = []
    row.push(
      <div key={item.code}>
        <button
          onClick={() => handleChangeInput(item.code)}
          className="w-full border-b border-b-gray-300 py-3 px-2 flex items-center justify-between gap-2 cursor-pointer bg-whiteColor hover:bg-gray-300 duration-200"
        >
          <span className="block truncate text-xs">{item.name}</span>
          <span className="block truncate text-xs">{item.code}</span>
        </button>
      </div>
    )
    return row
  })
}
