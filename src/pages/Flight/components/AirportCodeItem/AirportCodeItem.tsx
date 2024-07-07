import { airportCodeItem } from "src/types/flight.type"
import iconFlight2 from "src/img/svg/flight-airplane-svgrepo-com.svg"
import { InputAirport } from "../../Flight"

interface Props {
  item: airportCodeItem
  inputName: InputAirport
  handleItemClick: (inputName: InputAirport, value: string) => void
}

export default function AirportCodeItem({ item, handleItemClick, inputName }: Props) {
  const handleChangeInput = () => {
    handleItemClick(inputName, `${item.country} - ${item.code}`)
  }

  return (
    <button
      onClick={handleChangeInput}
      className="w-full border-b border-b-gray-300 py-3 px-2 flex items-center justify-between gap-2 cursor-pointer bg-[#f2f2f2] hover:bg-gray-300 duration-200"
    >
      <div className="text-sm flex items-center gap-2">
        <img src={iconFlight2} alt="icon" className="h-4 w-4" />
        <span className="block truncate">{item.airport}</span>
        <span className="block text-blue-600 truncate">- {item.country}</span>
      </div>
      <span className="text-sm block w-[30px] text-left">{item.code}</span>
    </button>
  )
}
