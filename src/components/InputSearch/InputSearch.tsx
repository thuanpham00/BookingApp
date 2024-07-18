/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { InputHTMLAttributes, forwardRef } from "react"
import { UseFormRegister } from "react-hook-form"
import { InputAirport } from "src/pages/Flight/Flight"
import AirportCodeList from "src/pages/FlightSearch/components/AirportCodeList"

import { airportCodeItem } from "src/types/flight.type"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode
  classNameList: string
  classNameBlock?: string
  classNameDesc?: string
  classNameInput?: string
  filterList: airportCodeItem[]
  value: string
  showList: boolean
  handleItemClick: (inputName: InputAirport, value: string) => void
  handleChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleFocus: () => void
  register?: UseFormRegister<any>
  name: string
  inputName: InputAirport
  error?: string
  desc: string
}

// chỗ này hay - nâng cao
// do sử dung ref truyền ref từ component cha xuống component con nên dùng forwardRef
const InputSearch = forwardRef<HTMLDivElement, InputProps>(function InputProps(
  {
    children,
    classNameList,
    classNameBlock = "py-4 px-3 border-2 border-gray-300 rounded-md flex items-center",
    classNameDesc = "pl-2 text-textColor",
    classNameInput = "px-2 outline-none bg-transparent md:text-xl lg:text-2xl flex-grow font-semibold",
    filterList,
    value,
    showList,
    handleItemClick,
    handleChangeValue,
    handleFocus,
    register,
    inputName,
    name,
    error,
    desc,
    ...rest
  }: InputProps,
  ref
) {
  const registerResult = register && name ? { ...register(name) } : ""
  return (
    <div className="w-[50%] relative">
      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-red-500 font-medium min-h-[1.25rem] block">
        {error}
      </span>
      <div className={classNameBlock}>
        {children}
        <div className="flex flex-col">
          <span className={classNameDesc}>{desc}</span>
          <input
            type="text"
            className={classNameInput}
            onClick={handleFocus}
            {...rest}
            {...registerResult}
            value={value}
            onChange={handleChangeValue}
          />
        </div>
      </div>
      <div className={classNameList} ref={ref}>
        {showList && (
          <AirportCodeList
            listAirport={filterList}
            handleItemClick={handleItemClick}
            inputName={inputName}
          />
        )}
      </div>
    </div>
  )
})

export default InputSearch
