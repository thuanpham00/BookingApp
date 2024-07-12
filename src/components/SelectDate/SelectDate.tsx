import { Popover, PopoverContent, PopoverTrigger } from "src/components/ui/popover"
import { Button as ButtonShadcn } from "src/components/ui/button"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Controller } from "react-hook-form"
import { Calendar } from "../ui/calendar"
import { format } from "date-fns"

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  setDate: (date: Date) => void
  date: Date | null | string
  convertToYYYYMMDD: (date: Date) => string
  errors: string
  name: string
  text: string
  className?: string
}

export default function SelectDate({
  control,
  setDate,
  date,
  convertToYYYYMMDD,
  errors,
  name,
  text,
  className = "py-[10px] px-2 border border-gray-400 rounded-md flex items-center"
}: Props) {
  return (
    <div className="relative">
      <span className="absolute -top-5 left-0 text-red-500 min-h-[1.25rem] block">{errors}</span>
      <div className={className}>
        <Popover>
          <PopoverTrigger asChild>
            <ButtonShadcn
              variant={"outline"}
              className="bg-transparent hover:bg-transparent text-left border-none shadow-none text-base flex gap-1"
            >
              <CalendarIcon className="h-4 w-4" />
              {date ? format(date, "yyyy-MM-dd") : <span>{text}</span>}
            </ButtonShadcn>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Controller
              control={control}
              name={name} // tên trường dữ liệu
              render={({ field }) => (
                <div ref={field.ref}>
                  <Calendar
                    mode="single"
                    selected={date as Date}
                    onSelect={(date) => {
                      setDate(date as Date)
                      field.onChange(convertToYYYYMMDD(date as Date)) // cập nhật trường dữ liệu
                    }}
                    initialFocus
                  />
                </div>
              )}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
