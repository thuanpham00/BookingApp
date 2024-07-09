import { ItemHotelType } from "../../Home"

interface Props {
  item: ItemHotelType
}

export default function ProductItem({ item }: Props) {
  return (
    <div className="w-full bg-[#fff] rounded-md">
      <div className="w-full h-[200px] rounded-md">
        <img
          src={item.imageHotel}
          alt={item.nameHotel}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="p-4 rounded-br-md rounded-bl-md">
        <span className="block text-lg text-textColor font-semibold truncate">
          {item.nameHotel}
        </span>
        <span className="block text-base text-textColor font-normal">{item.addressHotel}</span>
        <div className="mt-4">
          <span className="bg-[#f9b851]/70 text-base p-1 rounded-md text-textColor">
            {item.rating}/5
          </span>
          <span className="ml-2 text-textColor text-base">{item.review} (nhận xét)</span>
        </div>
        <div className="mt-2 flex gap-1">
          <span className="text-lg text-textColor font-normal">Từ:</span>
          <span className="text-textColor font-medium text-lg">{item.fromPrice}</span>
        </div>
        <span className="text-base">{item.type}</span>
      </div>
    </div>
  )
}
