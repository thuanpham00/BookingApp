/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { InputHTMLAttributes, forwardRef } from "react"
import { UseFormRegister } from "react-hook-form"
import { CountryItemCodeNumber } from "src/types/flight.type"
import CodeNumberList from "../CodeNumberList"
import { TypeCodeNumber } from "../FormProfile/FormProfile"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameList: string
  classNameBlock?: string
  classNameInput?: string
  classNameError?: string
  filterList: CountryItemCodeNumber[]
  value: string
  showList: boolean
  handleItemClick: (inputName: TypeCodeNumber, value: string) => void
  handleChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleFocus: () => void
  register?: UseFormRegister<any>
  name: string
  inputName: TypeCodeNumber
  error?: string
}

// chỗ này hay - nâng cao
// do sử dung ref truyền ref từ component cha xuống component con nên dùng forwardRef
const InputSearchV2 = forwardRef<HTMLDivElement, InputProps>(function InputProps(
  {
    classNameList,
    classNameError = "py-4 px-3 border-2 border-red-500 bg-red-100 rounded-md flex items-center",
    classNameBlock = "w-full py-4 px-3 border-2 border-gray-300 rounded-md flex items-center",
    classNameInput = "px-2 outline-none bg-transparent md:text-xl lg:text-xl font-semibold flex-grow",
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
      <div className={error ? classNameError : classNameBlock}>
        <div className="w-full flex flex-col">
          <input
            type="text"
            className={classNameInput}
            onClick={handleFocus}
            {...rest}
            {...registerResult}
            value={value}
            onChange={handleChangeValue}
          />
          {error && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="red"
              className="h-6 w-6 flex-shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
          )}
        </div>
      </div>
      <div className={classNameList} ref={ref}>
        {showList && (
          <CodeNumberList
            listAirport={filterList}
            handleItemClick={handleItemClick}
            inputName={inputName}
          />
        )}
      </div>
    </div>
  )
})

export default InputSearchV2
