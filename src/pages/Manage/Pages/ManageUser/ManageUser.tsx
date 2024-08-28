import { yupResolver } from "@hookform/resolvers/yup"
import { updatePassword, User } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import Button from "src/components/Button"
import Input from "src/components/Input"
import { auth, db } from "src/firebase"
import schema, { schemaType } from "src/utils/rules"

const schemaForm = schema.pick(["userName", "email", "password", "confirmPassword"])

type FormData = Pick<schemaType, "userName" | "email" | "password" | "confirmPassword">

export default function ManageUser() {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset
  } = useForm<FormData>({ resolver: yupResolver(schemaForm) })

  const fetchData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docSnap = await getDoc(doc(db, "UserList", (user as User).uid))
      if (docSnap.exists()) {
        const data = docSnap.data()
        reset({
          userName: data.userName,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword
        })
      }
    })
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [loading, setLoading] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    try {
      const user = auth.currentUser // lưu trữ thông tin người dùng hiện tại
      if (user) {
        await setDoc(
          doc(db, "UserList", user.uid),
          {
            userName: data.userName,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword
          },
          { merge: true }
        ) // Sử dụng { merge: true } để chỉ cập nhật các trường được cung cấp và không ghi đè toàn bộ tài liệu

        // Cập nhật mật khẩu trong Firebase Authentication
        if (data.password) {
          await updatePassword(user, data.password)
        }

        toast.success("Cập nhật thành công !!!")
        setLoading(false)
      }
    } catch (error) {
      toast.error("Lỗi xác thực/email đã được sử dụng")
      setLoading(false)
    }
  })

  return (
    <div>
      <Helmet>
        <title>Tài khoản của tôi</title>
        <meta name="description" content="Tài khoản của tôi - Booking." />
      </Helmet>

      <div>
        <h1 className="text-xl text-textColor font-medium">Tài khoản của tôi</h1>
        <h2 className="mt-4 text-lg text-textColor font-normal">Thông tin tài khoản</h2>

        <form onSubmit={onSubmit} className="mt-5" noValidate>
          <Input
            className="mt-2"
            classNameInput="mt-1 w-full py-3 px-2 outline-none bg-white font-medium focus:border-gray-600"
            nameInput="Tên đăng nhập"
            type="text"
            name="userName" // name phải khớp trong schema
            autoComplete="on"
            placeholder="Nhập tên"
            messageError={errors.userName?.message}
            register={register}
          />
          <Input
            className="mt-1"
            classNameInput="mt-1 w-full py-3 px-2 outline-none bg-white font-medium focus:border-gray-600 cursor-not-allowed"
            nameInput="Email"
            type="email"
            name="email"
            autoComplete="on"
            placeholder="Nhập email"
            messageError={errors.email?.message}
            register={register}
          />
          <Input
            className="mt-1 relative"
            classNameInput="mt-1 w-full py-3 px-2 outline-none bg-white font-medium focus:border-gray-600"
            nameInput="Mật khẩu"
            type="password"
            name="password"
            autoComplete="on"
            placeholder="Nhập mật khẩu"
            messageError={errors.password?.message}
            register={register}
          />
          <Input
            className="mt-1 relative"
            classNameInput="mt-1 w-full py-3 px-2 outline-none bg-white font-medium focus:border-gray-600"
            nameInput="Xác nhận mật khẩu"
            type="password"
            name="confirmPassword"
            autoComplete="on"
            placeholder="Nhập mật khẩu"
            messageError={errors.confirmPassword?.message}
            register={register}
          />
          <Button
            type="submit"
            nameButton="Cập nhật"
            disable={loading}
            loading={loading}
            className="mt-2 py-3 bg-blueColor w-[200px] block ml-auto text-whiteColor text-lg rounded-sm hover:bg-blueColor/80 duration-200"
            classNameLoading="absolute top-[12px] right-36"
          />
        </form>
      </div>
    </div>
  )
}
