/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { InputHTMLAttributes, forwardRef } from "react"
import { UseFormRegister } from "react-hook-form"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameList: string
  classNameBlock?: string
  classNameInput?: string
  value: string
  showList: boolean
  handleChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleFocus: () => void
  register?: UseFormRegister<any>
  name: string
  error?: string
  children: React.ReactNode
}

// chỗ này hay - nâng cao
// do sử dung ref truyền ref từ component cha xuống component con nên dùng forwardRef
const InputSearchV2 = forwardRef<HTMLDivElement, InputProps>(function InputProps(
  {
    classNameList,
    classNameBlock = "w-full py-4 px-3 border-2 border-gray-300 rounded-md flex items-center",
    classNameInput = "px-2 outline-none bg-transparent md:text-xl lg:text-xl font-semibold flex-grow",
    value,
    showList,
    handleChangeValue,
    handleFocus,
    register,
    name,
    error,
    children,
    ...rest
  }: InputProps,
  ref
) {
  const registerResult = register && name ? { ...register(name) } : ""
  return (
    <div className={classNameBlock}>
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
        <div className="min-h-[1.25rem] text-red-500 text-xs">{error}</div>
      </div>
      <div className={classNameList} ref={ref}>
        {showList && children}
      </div>
    </div>
  )
})

export default InputSearchV2
