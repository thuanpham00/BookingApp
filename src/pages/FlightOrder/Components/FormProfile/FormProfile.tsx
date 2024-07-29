import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import Input from "src/components/Input"
import { listNationality } from "src/constant/flightSearch"
import { CountryListCodeNumber, TravellerType } from "src/types/flight.type"
import schema, { schemaType } from "src/utils/rules"
import { yupResolver } from "@hookform/resolvers/yup"
import Button from "src/components/Button"
import { toast } from "react-toastify"
import Nationality from "../Nationality"

import InputSearchV2 from "../InputSearchV2/InputSearchV2"

interface Props {
  addOnTraveller: (newTravellers: TravellerType) => void
}

export type TypeProfile = "codeNumber" | "national"

type FormData = Pick<
  schemaType,
  "userName" | "lastName" | "gender" | "dayBirth" | "monthBirth" | "yearBirth" | "national"
>

const schemaFormData = schema.pick([
  "userName",
  "lastName",
  "gender",
  "dayBirth",
  "monthBirth",
  "yearBirth",
  "national"
])

const FetchDataListNational = () => Promise.resolve(listNationality)

export default function FormProfile({ addOnTraveller }: Props) {
  const [nationalList, setNationalList] = useState<CountryListCodeNumber>([])

  const [showListNationality, setShowListNationality] = useState<boolean>(false)

  const inputRef2 = useRef<HTMLInputElement>(null)

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
      dayBirth: "01",
      monthBirth: "01",
      yearBirth: "1990"
    }
  })

  // quản lý form state - nếu nhiều form thì đừng dùng chung state

  const [nationalProfile, setNationalProfile] = useState("")

  const filterNationality = useMemo(
    () =>
      nationalList.filter((item) =>
        item.name.toLowerCase().includes(nationalProfile.toLowerCase())
      ),
    [nationalList, nationalProfile]
  )

  const handleFocusAirportList = (type: TypeProfile) => () => {
    if (type === "national") {
      setShowListNationality(true)
    }
  }

  useEffect(() => {
    const clickOutHideListAirport = (event: MouseEvent) => {
      if (inputRef2.current && !inputRef2.current.contains(event.target as Node)) {
        setShowListNationality(false)
      }
    }

    document.addEventListener("mousedown", clickOutHideListAirport)

    return () => document.removeEventListener("mousedown", clickOutHideListAirport)
  }, [])

  const handleChangeValue = useCallback(
    (type: TypeProfile) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (type === "national") {
        setNationalProfile(event.target.value)
      }
    },
    []
  )

  const handleItemClick = (inputName: string, value: string) => {
    if (inputName === "national") {
      setValue(inputName, value as string) // đảm bảo giá trị của input được quản lý bởi react-hook-form // // cập nhật giá trị của một trường dữ liệu
      setNationalProfile(value as string) // nếu dùng mỗi thằng này thì nó ko dc quản lý bởi useForm // luôn ""
      setShowListNationality(false)
    }
  }

  const handleChangeChecked = (value: string) => {
    setValue("gender", value)
  }

  const handleSubmitForm = handleSubmit((data) => {
    const infoTraveller: TravellerType = {
      dateOfBirth: `${data.yearBirth}-${data.monthBirth}-${data.dayBirth}`,
      name: {
        firstName: data.userName, // Tên của hành khách.
        lastName: data.lastName // Họ của hành khách.
      },
      gender: data.gender, // Giới tính của hành khách.
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
          nationality: data.national,
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
    setNationalProfile("")
  }

  const handleChangeValueForm =
    (nameInput: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const valueInput = event.target.value.toUpperCase()
      if (nameInput === "userName" || nameInput === "lastName") {
        setValue(nameInput, valueInput)
      } else if (
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
      <span className="text-lg font-medium text-center block">Thông tin hành khách:</span>
      <div className="grid grid-cols-6 items-center gap-x-8 gap-y-4 flex-wrap">
        <div className="mb-2 col-span-6">
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
          <span className="mb-[2px] text-sm block">Tên đệm và Tên (vd: MINH THUẬN)</span>
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
          <span className="mb-[2px] text-sm block">Họ (vd: PHẠM)</span>
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
          <span className="mb-[2px] text-sm block">Ngày sinh (ví dụ 2004/12/09)</span>
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
        <div className="col-span-3">
          <span className="mb-[2px] text-sm block">Quốc tịch</span>
          <InputSearchV2
            autoComplete="off"
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
          </InputSearchV2>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          className="text-sm text-gray-500 py-2 px-3 bg-transparent font-medium border border-gray-300 hover:underline rounded-sm hover:opacity-75"
          onClick={handleRefreshForm}
          type="button"
        >
          Xóa
        </button>
        <Button
          nameButton="Lưu"
          className=" py-2 px-4 bg-blueColor  text-whiteColor text-sm rounded-sm hover:bg-blueColor/80 duration-200"
        />
      </div>
    </form>
  )
}
