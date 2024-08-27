/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes } from "react"
import { UseFormRegister } from "react-hook-form"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  nameQuantity?: string
  onValueInput: (value: number) => void
  onIncrease: (value: number) => void
  onDecrease: (value: number) => void
  register?: UseFormRegister<any>
  value: number
}

export default function QuantityController({
  nameQuantity,
  value,
  onValueInput,
  onIncrease,
  onDecrease,
  register,
  name,
  ...rest
}: Props) {
  // ở đây chúng ta thao tác cộng trừ nhân chia value rồi truyền vào props, bên kia nhận props truyền vào 1 hàm (set lại giá trị của nó) - component cha chứa state
  const handleChangeValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _value = Number(event.target.value)

    onValueInput && onValueInput(_value)
  }

  const increase = () => {
    const _value = Number(value) + 1

    onIncrease && onIncrease(_value)
  }

  const decrease = () => {
    let _value = Number(value) - 1

    if (_value < 0) {
      _value = 0
    }
    onDecrease && onDecrease(_value)
  }

  const registerResult = register && name ? { ...register(name) } : ""
  return (
    <div className="flex items-center justify-between">
      <span>{nameQuantity}</span>
      <div className="flex items-center gap-2">
        <button
          onClick={decrease}
          className="p-2 bg-[#0077b6] text-[#fff] rounded-md hover:opacity-90 duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </button>

        <input
          className="p-1 w-[40px] text-center bg-transparent"
          type="text"
          value={value}
          {...rest}
          {...registerResult}
          onChange={handleChangeValueInput}
        />

        <button
          onClick={increase}
          className="p-2 bg-[#0077b6] text-[#fff] rounded-md hover:opacity-90 duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
    </div>
  )
}
