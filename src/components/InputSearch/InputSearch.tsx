/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { InputHTMLAttributes, forwardRef } from "react"
import { UseFormRegister } from "react-hook-form"
import { InputAirport } from "src/pages/Flight/Flight"
import AirportCodeList from "src/pages/Flight/components/AirportCodeList"
import { airportCodeItem } from "src/types/flight.type"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode
  classNameList: string
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
}

// chỗ này hay - nâng cao
// do sử dung ref truyền ref từ component cha xuống component con nên dùng forwardRef
const InputSearch = forwardRef<HTMLDivElement, InputProps>(function InputProps(
  {
    children,
    classNameList,
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
    ...rest
  }: InputProps,
  ref
) {
  const registerResult = register && name ? { ...register(name) } : ""
  return (
    <div className="relative">
      <span className="absolute -top-5 left-0 text-red-500 min-h-[1.25rem] block">{error}</span>
      <div className="p-4 border border-textColor rounded-md flex items-center">
        {children}
        <input
          type="text"
          className="w-[150px] px-2 outline-none bg-transparent text-base flex-grow"
          onClick={handleFocus}
          {...rest}
          {...registerResult}
          value={value}
          onChange={handleChangeValue}
        />
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
