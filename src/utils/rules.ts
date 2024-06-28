// validate input phía frontEnd
import * as yup from "yup"

const schema = yup
  .object({
    userName: yup
      .string()
      .required("UserName bắt buộc")
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
      .required("Password bắt buộc")
      .min(6, "Độ dài từ 6-20 kí tự")
      .max(20, "Độ dài từ 6-20 kí tự"),
    confirmPassword: yup
      .string()
      .required("ConfirmPassword bắt buộc")
      .min(6, "Độ dài từ 6-20 kí tự")
      .max(20, "Độ dài từ 6-20 kí tự")
      .oneOf([yup.ref("password")], "Password không khớp"),
    originLocationCode: yup.string().required("Bắt buộc"),
    destinationLocationCode: yup.string().required("Bắt buộc"),
    departureDate: yup.string().required("Bắt buộc"),
    returnDate: yup.string().required("Bắt buộc"),
    travelClass: yup.string().required("Bắt buộc"),
    adults: yup.number(),
    children: yup.number(),
    infants: yup.number()
  })
  .required()

export default schema

export type schemaType = yup.InferType<typeof schema>
