// validate input phía frontEnd
import * as yup from "yup"

const schema = yup
  .object({
    userName: yup
      .string()
      .required("Tên bắt buộc")
      .min(6, "Độ dài từ 6-20 kí tự")
      .max(20, "Độ dài từ 6-20 kí tự"),
    email: yup
      .string()
      .email("Email không đúng định dạng")
      .required("Email bắt buộc")
      .min(6, "Độ dài 6-160 kí tự")
      .max(160, "Độ dài 6-160 kí tự"),
    password: yup
      .string()
      .required("Mật khẩu bắt buộc")
      .min(6, "Độ dài từ 6-20 kí tự")
      .max(20, "Độ dài từ 6-20 kí tự"),
    confirmPassword: yup
      .string()
      .required("Xác nhận mật khẩu bắt buộc")
      .min(6, "Độ dài từ 6-20 kí tự")
      .max(20, "Độ dài từ 6-20 kí tự")
      .oneOf([yup.ref("password")], "Password không khớp"),
    originLocationCode: yup.string().required(),
    destinationLocationCode: yup.string().required(),
    departureDate: yup
      .string()
      .required("Vui lòng chọn ngày khởi hành")
      .test({
        name: "Hãy chọn một ngày trong tương lai",
        message: "Hãy chọn một ngày trong tương lai",
        test: function (value) {
          const currentDate = new Date()
          const departureDate = new Date(value as string)
          if (departureDate < currentDate) {
            return this.createError({ message: "Hãy chọn một ngày trong tương lai" })
          }
          const returnDate = this.parent.returnDate ? new Date(this.parent.returnDate) : null
          if (returnDate && returnDate < departureDate) {
            return this.createError({ message: "Ngày trở về không được trước ngày khởi hành" })
          }
          return true
        }
      }),
    returnDate: yup.string().test({
      name: "Hãy chọn một ngày trong tương lai",
      message: "Hãy chọn một ngày trong tương lai",
      test: function (value) {
        const currentDate = new Date()
        const returnDate2 = new Date(value as string)
        if (returnDate2 < currentDate) {
          return this.createError({ message: "Hãy chọn một ngày trong tương lai" })
        }
        return true
      }
    }),
    travelClass: yup.string().required(),
    adults: yup.number().required().min(1, "Có ít nhất 1 vé người lớn"),
    children: yup.number(),
    infants: yup.number(),
    flightType: yup.string(),

    lastName: yup.string().required("Họ bắt buộc"),
    codeNumber: yup.string().required("Bắt buộc"),
    national: yup.string().required("Bắt buộc"),
    gender: yup.string().required(),
    numberPhone: yup
      .string()
      .required("Bắt buộc")
      .min(10, "Độ dài từ 10-11 kí tự")
      .max(11, "Độ dài từ 10-11 kí tự"),
    dayBirth: yup
      .string()
      .required("Bắt buộc")
      .min(2, "Ngày tối thiểu là 1")
      .max(2, "Ngày tối đa là 31"),
    monthBirth: yup
      .string()
      .required("Bắt buộc")
      .min(2, "Tháng tối thiểu là 1")
      .max(2, "Tháng tối đa là 12"),
    yearBirth: yup
      .string()
      .required("Bắt buộc")
      .min(4, "Năm tối thiểu là 4 kí tự")
      .max(4, "Năm tối đa là 4 kí tự"),

    userName2: yup.string().required("Tên bắt buộc"),
    lastName2: yup.string().required("Họ bắt buộc")
  })
  .required()

export default schema

export type schemaType = yup.InferType<typeof schema>

export const schemaHotel = yup.object({
  cityCode: yup.string().required(),
  radius: yup.string().required("Bắt buộc"),
  ratings: yup.string(),

  hotelIds: yup.string().required(),
  checkInDate: yup.string().required(),
  checkOutDate: yup.string().required(),
  adultsHotel: yup.number().required()
})

export type schemaTypeHotel = yup.InferType<typeof schemaHotel>
