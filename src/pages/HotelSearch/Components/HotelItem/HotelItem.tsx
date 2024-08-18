import { imageHotelList } from "src/constant/hotelSearch"
import { TypeHotelItemResponse } from "src/types/hotel.type"

interface Props {
  item: TypeHotelItemResponse
}

export default function HotelItem({ item }: Props) {
  console.log("render")
  const imageHotel = imageHotelList[Math.floor(Math.random() * 10)]
  return (
    <div className="flex items-center mb-4 h-[200px]">
      <div className="w-[30%] h-full">
        <img src={imageHotel} alt="ảnh" className="w-full h-full object-cover" />
      </div>
      <div className="w-[70%] p-4 h-full bg-white">
        <h2 className="text-base text-textColor font-semibold">{item.name}</h2>
      </div>
    </div>
  )
}
