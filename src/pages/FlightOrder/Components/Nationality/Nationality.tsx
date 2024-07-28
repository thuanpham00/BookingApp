import { CountryListCodeNumber } from "src/types/flight.type"
import { TypeProfile } from "../FormProfile/FormProfile"

interface Props {
  listAirport: CountryListCodeNumber
  inputName: TypeProfile
  handleItemClick: (inputName: TypeProfile, value: string) => void
}

export default function Nationality({ listAirport, handleItemClick, inputName }: Props) {
  const handleChangeInput = (name: string) => {
    handleItemClick(inputName, `${name}`)
  }

  return listAirport.map((item) => {
    const row = []
    row.push(
      <div key={item.code}>
        <button
          onClick={() => handleChangeInput(item.name)}
          className="w-full border-b border-b-gray-300 py-3 px-2 flex items-center justify-between gap-2 cursor-pointer bg-whiteColor hover:bg-gray-300 duration-200"
        >
          <span className="block truncate text-xs">{item.name}</span>
        </button>
      </div>
    )
    return row
  })
}
