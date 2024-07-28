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
    departureDate: yup.string().required(),
    returnDate: yup.string(),
    travelClass: yup.string().required(),
    adults: yup.number().required(),
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
    dateBirth: yup.string(),
    dayBirth: yup
      .number()
      .required("Bắt buộc")
      .min(1, "Ngày tối thiểu là 1")
      .max(31, "Ngày tối đa là 31"),
    monthBirth: yup
      .number()
      .required("Bắt buộc")
      .min(1, "Tháng tối thiểu là 1")
      .max(12, "Tháng tối đa là 12"),
    yearBirth: yup
      .string()
      .required("Bắt buộc")
      .min(4, "Năm tối thiểu là 4 kí tự")
      .max(4, "Năm tối đa là 4 kí tự")
  })
  .required()

export default schema

export type schemaType = yup.InferType<typeof schema>
