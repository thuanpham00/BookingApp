import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import Input from "src/components/Input"
import { countryCodePhone } from "src/constant/flightSearch"
import { CountryListCodeNumber, TravellerType } from "src/types/flight.type"
import InputSearchV2 from "../InputSearchV2"
import schema, { schemaType } from "src/utils/rules"
import { yupResolver } from "@hookform/resolvers/yup"
import Button from "src/components/Button"

interface Props {
  addOnTraveller?: TravellerType
}

export type TypeCodeNumber = "codeNumber"

type FormData = Pick<schemaType, "userName" | "lastName" | "codeNumber">

const schemaFormData = schema.pick(["userName", "lastName", "codeNumber"])

export default function FormProfile({ addOnTraveller }: Props) {
  const FetchDataCountryCodeNumber = () => Promise.resolve(countryCodePhone)
  const [codeNumberList, setCodeNumberList] = useState<CountryListCodeNumber>([])
  const [showListCountryCode, setShowListCountryCode] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // fetch danh sách number code
  useEffect(() => {
    FetchDataCountryCodeNumber().then((res) => {
      setCodeNumberList(res)
    })
  }, [])

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schemaFormData)
  })

  // quản lý form state
  const [codeNumber, setCodeNumber] = useState("")

  const filterCodeListNumber = useMemo(
    () =>
      codeNumberList.filter((item) => item.name.toLowerCase().includes(codeNumber.toLowerCase())),
    [codeNumber, codeNumberList]
  )

  const handleFocusAirportList = () => {
    setShowListCountryCode(true)
  }

  useEffect(() => {
    const clickOutHideListAirport = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        // nơi được click nằm ngoài vùng phần tử
        setShowListCountryCode(false)
      }
    }

    document.addEventListener("mousedown", clickOutHideListAirport)

    return () => document.removeEventListener("mousedown", clickOutHideListAirport)
  }, [])

  const handleChangeValue = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setCodeNumber(event.target.value)
  }, [])

  const handleItemClick = (inputName: TypeCodeNumber, value: string) => {
    setValue(inputName, value as string) // đảm bảo giá trị của input được quản lý bởi react-hook-form // // cập nhật giá trị của một trường dữ liệu
    setCodeNumber(value as string) // nếu dùng mỗi thằng này thì nó ko dc quản lý bởi useForm // luôn ""
    setShowListCountryCode(false)
  }

  const handleSubmitForm = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <form onSubmit={handleSubmitForm} className="w-[90%]">
      <span className="my-2 text-base block">Thông tin cá nhân</span>
      <div className="grid grid-cols-12 items-center gap-4 flex-wrap">
        <div className="col-span-4">
          <Input
            className="flex items-center"
            classNameInput="w-full py-3 px-2 outline-none bg-transparent border-gray-400 border font-normal focus:border-blueColor"
            type="text"
            autoComplete="off"
            placeholder="Tên & tên đệm"
            name="userName"
            register={register}
            messageError={errors.userName}
          />
        </div>
        <div className="col-span-4">
          <Input
            className="flex items-center"
            classNameInput="w-full py-3 px-2 outline-none bg-transparent border-gray-400 border font-normal focus:border-blueColor"
            type="text"
            autoComplete="off"
            placeholder="Họ"
            name="lastName"
            register={register}
          />
        </div>

        <div className="col-span-4">
          <div className="flex items-start">
            <div className="py-3 px-6 border border-gray-400 border-r-0 rounded-tl-sm rounded-bl-sm">
              <input type="checkbox" id="nam" hidden />
              <label htmlFor="nam">Nam</label>
            </div>
            <div className="py-3 px-6 border border-gray-400 rounded-tr-sm rounded-br-sm">
              <input type="checkbox" id="nu" hidden />
              <label htmlFor="nu">Nữ</label>
            </div>
          </div>
        </div>
      </div>
      <span className="my-2 text-base block">Thông tin liên hệ</span>
      <div className="grid grid-cols-12 items-center gap-4 flex-wrap">
        <div className="col-span-4">
          <InputSearchV2
            placeholder="Country code"
            classNameList="z-20 absolute top-10 left-0 h-[300px] bg-whiteColor overflow-y-auto overflow-x-hidden rounded-sm shadow-sm transition-all duration-1000 ease-linear"
            classNameBlock="flex items-center"
            classNameInput="w-full px-2 py-[10px] outline-none bg-transparent text-base flex-grow truncate border-gray-400 border font-normal focus:border-blueColor text-textColor"
            ref={inputRef}
            filterList={filterCodeListNumber}
            value={codeNumber}
            showList={showListCountryCode}
            handleItemClick={handleItemClick}
            inputName="codeNumber"
            handleChangeValue={handleChangeValue}
            handleFocus={handleFocusAirportList}
            register={register}
            name="codeNumber"
          />
        </div>
        <div className="col-span-4">
          <Input
            className="flex-1 flex items-center"
            classNameInput="w-full py-3 px-2 outline-none bg-transparent border-gray-400 border font-normal focus:border-blueColor"
            type="text"
            autoComplete="off"
            placeholder="Email (Optional)"
          />
        </div>
        <div className="col-span-4">
          <Input
            className="flex-1 flex items-center"
            classNameInput="w-full py-3 px-2 outline-none bg-transparent border-gray-400 border font-normal focus:border-blueColor"
            type="text"
            autoComplete="off"
            placeholder="Mobile (Optional)"
          />
        </div>
      </div>

      <div className="mt-4">
        <Button nameButton="Lưu thông tin" type="submit" />
      </div>
    </form>
  )
}
