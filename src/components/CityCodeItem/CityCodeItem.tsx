import { InputAirport } from "src/hooks/useFormHandler"
import { TypeCityCodeItem } from "src/types/hotel.type"

interface Props {
  item: TypeCityCodeItem
  inputName: InputAirport
  handleItemClick: (inputName: InputAirport, value: string) => void
}

export default function CityCodeItem({ item, handleItemClick, inputName }: Props) {
  const handleChangeInput = () => {
    handleItemClick(inputName, `${item.country} - ${item.code}`)
  }

  return (
    <button
      onClick={handleChangeInput}
      className="w-full border-b border-b-gray-300 py-3 px-2 flex items-center justify-between gap-2 cursor-pointer bg-whiteColor hover:bg-gray-300 duration-200"
    >
      <div className="text-xs lg:text-sm flex items-center gap-2">
        {/* <img src={iconFlight2} alt="icon" className="hidden lg:block h-4 w-4" /> */}
        <span className="block truncate">{item.name}</span>
        <span className="block text-blue-600 truncate max-w-[200px]">- {item.country}</span>
      </div>
      <span className="text-sm block w-[30px] text-left">{item.code}</span>
    </button>
  )
}
