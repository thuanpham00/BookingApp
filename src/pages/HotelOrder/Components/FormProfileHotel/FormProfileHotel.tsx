import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import Button from "src/components/Button"
import Input from "src/components/Input"
import useFormHandler from "src/hooks/useFormHandler"
import CodeNumberList from "src/pages/FlightOrder/Components/CodeNumberList"
import InputSearchV2 from "src/pages/FlightOrder/Components/InputSearchV2"
import { FetchDataListNational } from "src/pages/FlightOrder/FlightOrder"
import { TypeCountryListCodeNumber } from "src/types/flight.type"
import { TypeTravelerHotel } from "src/types/hotel.type"
import schema, { schemaType } from "src/utils/rules"

interface Props {
  addOnTraveller: (newTravellers: TypeTravelerHotel) => void
  typeTraveler: string
  index: number
}

export type FormData = Pick<
  schemaType,
  "codeNumber" | "numberPhone" | "email" | "userName2" | "lastName2" | "gender"
>

const schemaFormData = schema.pick([
  "codeNumber",
  "numberPhone",
  "email",
  "userName2",
  "lastName2",
  "gender"
])

export default function FormProfileHotel({ addOnTraveller, typeTraveler, index }: Props) {
  // form phức tạp thì dùng useForm kết hợp useFormContext - tách nhỏ ra rồi 1 thằng component cha (useForm) quản lý truyền xuống
  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
    reset,
    watch // theo dõi giá trị của 1 trường input
  } = useForm<FormData>({
    resolver: yupResolver(schemaFormData),
    defaultValues: { gender: "MR" }
  })

  const inputRef = useRef<HTMLInputElement>(null)
  const [codeNumberList, setCodeNumberList] = useState<TypeCountryListCodeNumber>([])
  const [codeNumber, setCodeNumber] = useState("")
  const [showListCodeNumber, setShowListCodeNumber] = useState<boolean>(false)

  useEffect(() => {
    FetchDataListNational().then((res) => {
      setCodeNumberList(res)
    })
  }, [])
  // quản lý form state - nếu nhiều form thì đừng dùng chung state

  const { filterList, handleItemClick, handleChangeValueForm } = useFormHandler(
    codeNumberList,
    codeNumber,
    setValue,
    setCodeNumber,
    setShowListCodeNumber
  )

  const handleSubmitForm = handleSubmit((data) => {
    const infoTraveller: TypeTravelerHotel = {
      title: data.gender,
      firstName: data.userName2,
      lastName: data.lastName2,
      phone: data.numberPhone,
      email: data.email
    }
    addOnTraveller && addOnTraveller(infoTraveller)
    toast.success("Lưu thông tin khách thành công")
  })

  const handleResetForm = () => {
    reset()
  }

  return (
    <form onSubmit={handleSubmitForm} className="w-full">
      <div className="flex items-center justify-between">
        <div className="text-base text-textColor font-medium">
          Khách {index + 1}: {typeTraveler}
        </div>
        <div className="flex items-center justify-end gap-2">
          <button
            className="text-sm text-gray-500 py-2 px-3 bg-transparent font-medium hover:underline rounded-sm hover:opacity-75"
            onClick={handleResetForm}
            type="button"
          >
            Xóa
          </button>
          <Button
            nameButton="Lưu"
            className=" py-2 px-4 bg-blueColor  text-whiteColor text-sm rounded-sm hover:bg-blueColor/80 duration-200"
          />
        </div>
      </div>
      <div className="grid grid-cols-6 items-center gap-2 flex-wrap pb-0">
        <div className="col-span-6 md:col-span-6">
          <span className="mb-[2px] text-sm block">Giới tính</span>
          <div className="flex items-start">
            <div
              className={`border border-gray-400 py-2 px-6 rounded-tl rounded-bl ${watch("gender") === "MR" ? "bg-blue-100 text-blue-600" : "bg-white"}`}
            >
              <input type="checkbox" {...register("gender")} hidden value="MR" />
              <button className="cursor-pointer" onClick={() => setValue("gender", "MR")}>
                Nam
              </button>
            </div>
            <div
              className={`border border-gray-400 py-2 px-6 rounded-tr rounded-br ${watch("gender") === "MS" ? "bg-blue-100 text-blue-600" : "bg-white"}`}
            >
              <input type="checkbox" {...register("gender")} hidden value="MS" />
              <button className="cursor-pointer" onClick={() => setValue("gender", "MS")}>
                Nữ
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-3">
          <span className="mb-[2px] text-sm block">
            Tên Đệm & Tên (vd: Minh Thuan) <span className="text-red-500">*</span>
          </span>
          <Input
            className="flex flex-col items-start"
            classNameInput="w-full p-2 outline-none bg-transparent border font-normal focus:border-blueColor bg-white rounded border border-gray-400 text-base"
            type="text"
            autoComplete="on"
            placeholder="Tên"
            name="userName2"
            register={register}
            messageError={errors.userName2?.message}
            onChange={handleChangeValueForm("userName2")}
          />
        </div>
        <div className="col-span-6 md:col-span-3">
          <span className="mb-[2px] text-sm block">
            Họ (vd: Pham) <span className="text-red-500">*</span>
          </span>
          <Input
            className="flex flex-col items-start"
            classNameInput="w-full p-2 outline-none bg-transparent border font-normal focus:border-blueColor bg-white rounded border border-gray-400 text-base"
            type="text"
            autoComplete="on"
            placeholder="Họ"
            name="lastName2"
            register={register}
            messageError={errors.lastName2?.message}
            onChange={handleChangeValueForm("lastName2")}
          />
        </div>
        <div className="col-span-6 md:col-span-3 flex">
          <div className="w-[40%]">
            <span className="mb-[2px] text-sm block">Mã quốc gia</span>
            <InputSearchV2
              autoComplete="on"
              placeholder="+84"
              classNameList="z-20 absolute top-10 left-0 h-[200px] bg-whiteColor overflow-y-auto overflow-x-hidden rounded-sm shadow-sm transition-all duration-1000 ease-linear"
              classNameBlock="relative flex items-center"
              classNameInput="w-full p-2 outline-none bg-white text-base flex-grow truncate font-normal focus:border-blueColor text-textColor rounded-tl rounded-bl border border-gray-400"
              ref={inputRef}
              value={codeNumber}
              showList={showListCodeNumber}
              handleChangeValue={(event) => setCodeNumber(event.target.value)}
              handleFocus={() => setShowListCodeNumber(true)}
              register={register}
              name="codeNumber"
              error={errors.codeNumber?.message}
            >
              <CodeNumberList
                listAirport={filterList}
                handleItemClick={handleItemClick}
                inputName="codeNumber"
              />
            </InputSearchV2>
          </div>
          <div className="w-[60%]">
            <span className="mb-[2px] text-sm block">Số điện thoại</span>
            <Input
              className="flex flex-col items-start"
              classNameInput="w-full p-2 outline-none bg-transparent border font-normal focus:border-blueColor bg-white rounded-tr rounded-br border text-base border-gray-400"
              type="text"
              autoComplete="on"
              placeholder="Số điện thoại"
              name="numberPhone"
              register={register}
              messageError={errors.numberPhone?.message}
              onChange={handleChangeValueForm("numberPhone")}
            />
          </div>
        </div>
        <div className="col-span-6 md:col-span-3">
          <span className="mb-[2px] text-sm block">Email</span>
          <Input
            className="flex flex-col items-start"
            classNameInput="w-full p-2 outline-none bg-transparent border font-normal focus:border-blueColor bg-white rounded border border-gray-400 text-base"
            type="text"
            autoComplete="on"
            placeholder="Email"
            name="email"
            register={register}
            messageError={errors.email?.message}
          />
        </div>
      </div>
    </form>
  )
}
