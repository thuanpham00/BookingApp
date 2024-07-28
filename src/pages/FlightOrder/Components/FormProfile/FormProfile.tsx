import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import Input from "src/components/Input"
import { countryCodePhone, listNationality } from "src/constant/flightSearch"
import { CountryListCodeNumber, TravellerType } from "src/types/flight.type"
import schema, { schemaType } from "src/utils/rules"
import { yupResolver } from "@hookform/resolvers/yup"
import Button from "src/components/Button"
import { getCodeNumber } from "src/utils/utils"
import { toast } from "react-toastify"
import InputSearchV3 from "../InputSearchV2/InputSearchV2"
import Nationality from "../Nationality"
import CodeNumberList from "../CodeNumberList"

interface Props {
  addOnTraveller: (newTravellers: TravellerType) => void
  index: number
}

export type TypeProfile = "codeNumber" | "national"

type FormData = Pick<
  schemaType,
  | "email"
  | "userName"
  | "lastName"
  | "gender"
  | "codeNumber"
  | "numberPhone"
  | "dayBirth"
  | "monthBirth"
  | "yearBirth"
  | "national"
>

const schemaFormData = schema.pick([
  "email",
  "userName",
  "lastName",
  "gender",
  "codeNumber",
  "numberPhone",
  "dayBirth",
  "monthBirth",
  "yearBirth",
  "national"
])
const FetchDataCountryCodeNumber = () => Promise.resolve(countryCodePhone)
const FetchDataListNational = () => Promise.resolve(listNationality)

export default function FormProfile({ addOnTraveller, index }: Props) {
  const [codeNumberList, setCodeNumberList] = useState<CountryListCodeNumber>([])
  const [nationalList, setNationalList] = useState<CountryListCodeNumber>([])

  const [showListCountryCode, setShowListCountryCode] = useState<boolean>(false)
  const [showListNationality, setShowListNationality] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputRef2 = useRef<HTMLInputElement>(null)

  // fetch danh sách number code
  useEffect(() => {
    FetchDataCountryCodeNumber().then((res) => {
      setCodeNumberList(res)
    })
  }, [])

  useEffect(() => {
    FetchDataListNational().then((res) => {
      setNationalList(res)
    })
  }, [])

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
    reset,
    watch // theo dõi giá trị của 1 trường input
  } = useForm<FormData>({
    resolver: yupResolver(schemaFormData),
    defaultValues: {
      gender: "MALE",
      dayBirth: 1 as number,
      monthBirth: 1 as number,
      yearBirth: "1990"
    }
  })

  // quản lý form state - nếu nhiều form thì đừng dùng chung state
  const [codeNumber, setCodeNumber] = useState("")
  const [nationalProfile, setNationalProfile] = useState("")

  const filterCodeListNumber = useMemo(
    () =>
      codeNumberList.filter((item) => item.name.toLowerCase().includes(codeNumber.toLowerCase())),
    [codeNumber, codeNumberList]
  )

  const filterNationality = useMemo(
    () =>
      nationalList.filter((item) =>
        item.name.toLowerCase().includes(nationalProfile.toLowerCase())
      ),
    [nationalList, nationalProfile]
  )

  const handleFocusAirportList = (type: TypeProfile) => () => {
    if (type === "codeNumber") {
      setShowListCountryCode(true)
    } else if (type === "national") {
      setShowListNationality(true)
    }
  }

  useEffect(() => {
    const clickOutHideListAirport = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        // nơi được click nằm ngoài vùng phần tử
        setShowListCountryCode(false)
      }
      if (inputRef2.current && !inputRef2.current.contains(event.target as Node)) {
        setShowListNationality(false)
      }
    }

    document.addEventListener("mousedown", clickOutHideListAirport)

    return () => document.removeEventListener("mousedown", clickOutHideListAirport)
  }, [])

  const handleChangeValue = useCallback(
    (type: TypeProfile) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (type === "codeNumber") {
        setCodeNumber(event.target.value)
      } else if (type === "national") {
        setNationalProfile(event.target.value)
      }
    },
    []
  )

  const handleItemClick = (inputName: TypeProfile, value: string) => {
    if (inputName === "codeNumber") {
      setValue(inputName, getCodeNumber(value as string) as string) // đảm bảo giá trị của input được quản lý bởi react-hook-form // // cập nhật giá trị của một trường dữ liệu
      setCodeNumber(value as string) // nếu dùng mỗi thằng này thì nó ko dc quản lý bởi useForm // luôn ""
      setShowListCountryCode(false)
    } else if (inputName === "national") {
      setValue(inputName, value as string) // đảm bảo giá trị của input được quản lý bởi react-hook-form // // cập nhật giá trị của một trường dữ liệu
      setNationalProfile(value as string) // nếu dùng mỗi thằng này thì nó ko dc quản lý bởi useForm // luôn ""
      setShowListNationality(false)
    }
  }

  const handleChangeChecked = (value: string) => {
    setValue("gender", value)
  }

  const handleSubmitForm = handleSubmit((data) => {
    console.log("data", data)
    const infoTraveller: TravellerType = {
      id: String(index),
      dateOfBirth: `${data.yearBirth}-${data.monthBirth}-${data.dayBirth}`,
      name: {
        firstName: data.userName, // Tên của hành khách.
        lastName: data.lastName // Họ của hành khách.
      },
      gender: data.gender, // Giới tính của hành khách.
      contact: {
        emailAddress: data.email, // Địa chỉ email của hành khách.
        phones: [
          {
            deviceType: "MOBILE", // Loại thiết bị của số điện thoại (di động hoặc cố định).
            countryCallingCode: data.codeNumber, // Mã quốc gia gọi quốc tế.
            number: data.numberPhone // Số điện thoại của hành khách.
          }
        ]
      },
      documents: [
        //  Danh sách các tài liệu của hành khách
        {
          documentType: "PASSPORT",
          birthPlace: "Vietnam",
          issuanceLocation: "Vietnam",
          issuanceDate: "2021-12-08",
          number: "00000001",
          expiryDate: "2029-12-08",
          issuanceCountry: "VN",
          validityCountry: "VN",
          nationality: "VN",
          holder: true
        }
      ]
    }
    if (addOnTraveller) {
      addOnTraveller(infoTraveller)
    }
    toast.success("Lưu thông tin hành khách thành công")
  })

  const handleRefreshForm = () => {
    reset()
    setCodeNumber("")
    setNationalProfile("")
  }

  const handleChangeValueForm =
    (nameInput: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const valueInput = event.target.value.toUpperCase()
      if (nameInput === "userName" || nameInput === "lastName") {
        setValue(nameInput, valueInput)
      } else if (
        nameInput === "numberPhone" ||
        nameInput === "dayBirth" ||
        nameInput === "monthBirth" ||
        nameInput === "yearBirth"
      ) {
        // Sử dụng regex để chỉ cho phép nhập số
        // thay thế các kí tự không phải kí tự số bằng ""
        const valueInput2 = valueInput.replace(/[^0-9]/g, "")
        setValue(nameInput, valueInput2)
      }
    }

  return (
    <form onSubmit={handleSubmitForm} className="w-full">
      <span className="my-2 text-lg font-medium text-center block">Thông tin hành khách:</span>
      <div className="grid grid-cols-6 items-center gap-x-8 flex-wrap">
        <div className="col-span-3">
          <span className="mb-[2px] text-sm block">Tên</span>
          <Input
            className="flex flex-col items-start"
            classNameInput="w-full p-2 outline-none bg-transparent border font-normal focus:border-blueColor bg-white rounded border border-gray-400"
            type="text"
            autoComplete="off"
            placeholder="Tên & tên đệm"
            name="userName"
            register={register}
            messageError={errors.userName?.message}
            onChange={handleChangeValueForm("userName")}
          />
        </div>
        <div className="col-span-3">
          <span className="mb-[2px] text-sm block">Họ</span>
          <Input
            className="flex flex-col items-start"
            classNameInput="w-full p-2 outline-none bg-transparent border font-normal focus:border-blueColor bg-white rounded border border-gray-400"
            type="text"
            autoComplete="on"
            placeholder="Họ"
            name="lastName"
            register={register}
            messageError={errors.lastName?.message}
            onChange={handleChangeValueForm("lastName")}
          />
        </div>
        <div className="col-span-3">
          <span className="mb-[2px] text-sm block">Ngày sinh</span>
          <div className="flex items-center gap-4">
            <Input
              className="flex flex-col items-start"
              classNameInput="rounded w-[100px] p-2 outline-none bg-white font-normal focus:border-blueColor border border-gray-400"
              type="text"
              autoComplete="off"
              placeholder="1990"
              name="yearBirth"
              messageError={errors.yearBirth?.message}
              register={register}
              onChange={handleChangeValueForm("yearBirth")}
            />
            <Input
              className="flex flex-col items-start"
              classNameInput="rounded w-[100px] p-2 outline-none bg-white font-normal focus:border-blueColor border border-gray-400"
              type="text"
              autoComplete="off"
              placeholder="01"
              name="monthBirth"
              messageError={errors.monthBirth?.message}
              register={register}
              onChange={handleChangeValueForm("monthBirth")}
            />
            <Input
              className="flex flex-col items-start"
              classNameInput="rounded w-[100px] p-2 outline-none bg-white font-normal focus:border-blueColor border border-gray-400"
              type="text"
              autoComplete="off"
              placeholder="01"
              name="dayBirth"
              messageError={errors.dayBirth?.message}
              register={register}
              onChange={handleChangeValueForm("dayBirth")}
            />
          </div>
        </div>
        <div className="mb-5 col-span-3">
          <span className="mb-[2px] text-sm block">Giới tính</span>
          <div className="flex items-start">
            <div
              className={`border border-gray-400 py-2 px-6 rounded-tl rounded-bl ${watch("gender") === "MALE" ? "bg-blue-100 text-blue-600" : "bg-white"}`}
            >
              <input type="checkbox" {...register("gender")} hidden value="MALE" />
              <button className="cursor-pointer" onClick={() => handleChangeChecked("MALE")}>
                Nam
              </button>
            </div>
            <div
              className={`border border-gray-400 py-2 px-6 rounded-tr rounded-br ${watch("gender") === "FEMALE" ? "bg-blue-100 text-blue-600" : "bg-white"}`}
            >
              <input type="checkbox" {...register("gender")} hidden value="FEMALE" />
              <button className="cursor-pointer" onClick={() => handleChangeChecked("FEMALE")}>
                Nữ
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <span className="mb-[2px] text-sm block">Mã quốc gia/vùng</span>
          <InputSearchV3
            placeholder="Country code"
            classNameList="z-20 absolute top-10 left-0 h-[200px] bg-whiteColor overflow-y-auto overflow-x-hidden rounded-sm shadow-sm transition-all duration-1000 ease-linear"
            classNameBlock="relative flex items-center"
            classNameInput="w-full px-2 py-[5px] outline-none bg-white text-base flex-grow truncate font-normal focus:border-blueColor text-textColor rounded border border-gray-400"
            ref={inputRef}
            value={codeNumber}
            showList={showListCountryCode}
            handleChangeValue={handleChangeValue("codeNumber")}
            handleFocus={handleFocusAirportList("codeNumber")}
            register={register}
            name="codeNumber"
            error={errors.codeNumber?.message}
          >
            <CodeNumberList
              listAirport={filterCodeListNumber}
              handleItemClick={handleItemClick}
              inputName="codeNumber"
            />
          </InputSearchV3>
        </div>
        <div className="col-span-3">
          <span className="mb-[2px] text-sm block">Số điện thoại</span>
          <Input
            className="flex flex-col items-start"
            classNameInput="w-full p-2 outline-none bg-white font-normal focus:border-blueColor rounded border border-gray-400"
            type="text"
            autoComplete="off"
            placeholder="Mobile (Optional)"
            name="numberPhone"
            messageError={errors.numberPhone?.message}
            register={register}
            onChange={handleChangeValueForm("numberPhone")}
          />
        </div>
        <div className="col-span-3">
          <span className="mb-[2px] text-sm block">Quốc tịch</span>
          <InputSearchV3
            placeholder="Quốc tịch"
            classNameList="z-20 absolute top-10 left-0 h-[200px] bg-whiteColor overflow-y-auto overflow-x-hidden rounded-sm shadow-sm transition-all duration-1000 ease-linear"
            classNameBlock="relative flex items-center"
            classNameInput="w-full px-2 py-[5px] outline-none bg-white text-base flex-grow truncate font-normal focus:border-blueColor text-textColor rounded border border-gray-400"
            ref={inputRef2}
            value={nationalProfile}
            showList={showListNationality}
            handleChangeValue={handleChangeValue("national")}
            handleFocus={handleFocusAirportList("national")}
            register={register}
            name="national"
            error={errors.national?.message}
          >
            <Nationality
              listAirport={filterNationality}
              handleItemClick={handleItemClick}
              inputName="national"
            />
          </InputSearchV3>
        </div>
        <div className="col-span-3">
          <span className="mb-[2px] text-sm block">Email</span>
          <Input
            className="flex flex-col items-start"
            classNameInput="w-full p-2 outline-none bg-white font-normal focus:border-blueColor rounded border border-gray-400"
            type="text"
            autoComplete="off"
            placeholder="Email (Optional)"
            register={register}
            name="email"
            messageError={errors.email?.message}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          className="text-sm text-gray-500 p-3 bg-transparent font-medium border border-gray-300 hover:underline rounded-sm hover:opacity-75"
          onClick={handleRefreshForm}
          type="button"
        >
          Xóa
        </button>
        <Button
          type="submit"
          nameButton="Lưu thông tin"
          className=" py-3 bg-blueColor w-[150px] text-whiteColor text-sm rounded-sm hover:bg-blueColor/80 duration-200"
        />
      </div>
    </form>
  )
}
