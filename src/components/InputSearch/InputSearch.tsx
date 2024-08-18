/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { InputHTMLAttributes, forwardRef } from "react"
import { UseFormRegister } from "react-hook-form"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  iconChild?: React.ReactNode
  children?: React.ReactNode
  classNameList: string
  classNameBlock?: string
  classNameDesc?: string
  classNameInput?: string
  classNameError?: string
  classNameWrapper?: string
  value: string
  showList: boolean
  handleChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleFocus: () => void
  register?: UseFormRegister<any>
  name: string
  error?: string
  desc: string
}

// Có thể truyền nhiều hơn 1 children vào component
// chỗ này hay - nâng cao
// do sử dung ref truyền ref từ component cha xuống component con nên dùng forwardRef
const InputSearch = forwardRef<HTMLDivElement, InputProps>(function InputProps(
  {
    iconChild,
    children,
    classNameList,
    classNameError = "py-4 px-3 border-2 border-red-500 bg-red-100 rounded-md flex items-center",
    classNameBlock = "w-full py-4 px-3 border-2 border-gray-300 rounded-md flex items-center",
    classNameDesc = "pl-2 text-textColor",
    classNameInput = "px-2 outline-none bg-transparent md:text-xl lg:text-2xl font-semibold flex-grow",
    classNameWrapper = "col-span-4 md:col-span-2 relative",
    value,
    showList,
    handleChangeValue,
    handleFocus,
    register,
    name,
    error,
    desc,
    ...rest
  }: InputProps,
  ref
) {
  const registerResult = register && name ? { ...register(name) } : ""
  return (
    <div className={classNameWrapper}>
      <div className={error ? classNameError : classNameBlock}>
        {iconChild}
        <div className="w-full flex flex-col">
          <span className={classNameDesc}>{desc}</span>
          <div className="flex justify-between items-center">
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
                className="h-5 w-5 flex-shrink-0"
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
      </div>
      <div className={classNameList} ref={ref}>
        {showList && children}
      </div>
    </div>
  )
})

export default InputSearch
