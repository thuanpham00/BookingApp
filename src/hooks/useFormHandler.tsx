/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react"
import { UseFormSetValue } from "react-hook-form"
import { getCodeAirport } from "src/utils/utils"

export type InputAirport =
  | "originLocationCode"
  | "destinationLocationCode"
  | "codeNumber"
  | "national"

export default function useFormHandler(
  list: any,
  inputSearch: string,
  setValue?: UseFormSetValue<any>,
  setInputSearch?: (value: React.SetStateAction<string>) => void,
  setShowList?: (value: React.SetStateAction<boolean>) => void
) {
  const handleItemClick = (inputName: InputAirport, value: string) => {
    if (setValue) {
      setValue(inputName, getCodeAirport(value) as string) // đảm bảo giá trị của input được quản lý bởi react-hook-form // // cập nhật giá trị của một trường dữ liệu
    }
    if (
      inputName === "originLocationCode" ||
      inputName === "destinationLocationCode" ||
      inputName === "codeNumber" ||
      inputName === "national"
    ) {
      if (setInputSearch && setShowList) {
        setInputSearch(value) // nếu dùng mỗi thằng này thì nó ko dc quản lý bởi useForm // luôn ""
        setShowList(false)
      }
    }
  }

  const handleItemClickV2 = (inputName: InputAirport, value: string) => {
    if (setValue) {
      setValue(inputName, getCodeAirport(value) as string) // đảm bảo giá trị của input được quản lý bởi react-hook-form // // cập nhật giá trị của một trường dữ liệu
    }
    if (inputName === "originLocationCode" || inputName === "destinationLocationCode") {
      if (setInputSearch && setShowList) {
        setInputSearch(getCodeAirport(value) as string) // nếu dùng mỗi thằng này thì nó ko dc quản lý bởi useForm // luôn ""
        setShowList(false)
      }
    }
  }

  const filterList = useMemo(
    () =>
      list.filter(
        (item: any) =>
          item.name?.toLowerCase().includes(inputSearch.toLowerCase()) ||
          item.country?.toLowerCase().includes(inputSearch.toLowerCase())
      ),
    [list, inputSearch]
  )

  const handleChangeValueForm =
    (nameInput: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const valueInput = event.target.value.toUpperCase()
      if (
        nameInput === "userName2" ||
        nameInput === "lastName2" ||
        nameInput === "userName" ||
        nameInput === "lastName"
      ) {
        // chỉ nhập kí tự chữ
        // thay thế các kí tự không phải kí tự chữ bằng ""
        const valueInput2 = valueInput.replace(/[^a-zA-Z\s]/g, "")
        setValue && setValue(nameInput, valueInput2)
      } else if (
        nameInput === "numberPhone" ||
        nameInput === "monthBirth" ||
        nameInput === "yearBirth" ||
        nameInput === "monthBirth"
      ) {
        // Sử dụng regex để chỉ cho phép nhập số
        // thay thế các kí tự không phải kí tự số bằng ""
        const valueInput2 = valueInput.replace(/[^0-9]/g, "")
        setValue && setValue(nameInput, valueInput2)
      }
    }
  return { filterList, handleItemClick, handleItemClickV2, handleChangeValueForm }
}

/**
 * Component nhận vào props (handleItemClick) và nó nhận vào 2 tham số
 * 1 tham số (inputName) - props truyền vào - để phân biệt trường dữ liệu setValue
 * 1 tham số (value) - giá trị nhận
 *
 * --
 * Ở component truyền 1 hàm `handleItemClick` vào làm giá trị của props (handleItemClick)
 * hàm `handleItemClick` nhận vào 2 tham số inputName, value (lấy từ props) -> xử lý
 */

// inputName và value lấy từ props truyền vào
