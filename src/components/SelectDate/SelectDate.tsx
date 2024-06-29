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
  date: Date | null
  convertToYYYYMMDD: (date: Date) => string
  errors: string
  name: string
}

export default function SelectDate({
  control,
  setDate,
  date,
  convertToYYYYMMDD,
  errors,
  name
}: Props) {
  return (
    <div className="relative">
      <span className="absolute -top-5 left-0 text-red-500 min-h-[1.25rem] block">{errors}</span>
      <div className="py-[10px] px-6 border border-textColor rounded-md flex items-center">
        <Popover>
          <PopoverTrigger asChild>
            <ButtonShadcn
              variant={"outline"}
              className="bg-transparent text-left shadow-none border-none"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "yyyy-MM-dd") : <span>Chọn ngày về</span>}
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
