import { useForm } from "react-hook-form"
import Input from "src/components/Input"
import { yupResolver } from "@hookform/resolvers/yup"
import schema, { schemaType } from "src/utils/rules"
import { Link, useNavigate } from "react-router-dom"
import { path } from "src/constant/path"
import Button from "src/components/Button"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "src/firebase"
import { doc, setDoc } from "firebase/firestore"
import { toast } from "react-toastify"
import ChangeAutoBg from "src/components/ChangeAutoBg"
import { backgroundList } from "../Login/Login"
import { useTranslation } from "react-i18next"

const schemaForm = schema.pick(["userName", "email", "password", "confirmPassword"])

type FormData = Pick<schemaType, "userName" | "email" | "password" | "confirmPassword">

export default function Register() {
  const { t } = useTranslation("auth")

  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm<FormData>({ resolver: yupResolver(schemaForm) })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password) // gửi data email và data password lên firebase để lưu
      const user = auth.currentUser // lưu trữ thông tin người dùng hiện tại
      if (user) {
        await setDoc(doc(db, "UserList", user.uid), {
          userName: data.userName,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword
        })
        navigate(path.login)
        toast.success("Đăng ký thành công !!!")
        setLoading(false)
      }
    } catch (error) {
      toast.error("Lỗi xác thực/email đã được sử dụng")
      setLoading(false)
    }
  })

  return (
    <div className="">
      <Helmet>
        <title>{t("auth.register")}</title>
        <meta name="description" content={`${"auth.register"} - Amadeus Booking`} />
      </Helmet>

      <div className="w-full custom-calc-height-2 relative">
        <div className="container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center">
            <ChangeAutoBg
              className="shadow-lg hidden lg:block lg:w-[60%] custom-calc-height transition-all duration-1000 ease-linear"
              listImg={backgroundList}
              indexEnd={9}
            />
            <div className="shadow-lg mx-auto w-full md:w-[70%] lg:mx-0 lg:w-[40%] custom-calc-height bg-white relative">
              <div className="w-[80%] md:w-[70%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="text-textColor text-2xl font-semibold text-center">
                  {t("auth.register")}
                </div>

                <form onSubmit={onSubmit} className="mt-5" noValidate>
                  <Input
                    className="mt-2"
                    nameInput={t("auth.userName")}
                    type="text"
                    name="userName" // name phải khớp trong schema
                    autoComplete="on"
                    placeholder={t("auth.inputUsername")}
                    messageError={errors.userName?.message}
                    register={register}
                  />
                  <Input
                    className="mt-1"
                    nameInput="Email"
                    type="email"
                    name="email"
                    autoComplete="on"
                    placeholder={t("auth.inputEmail")}
                    messageError={errors.email?.message}
                    register={register}
                  />
                  <Input
                    className="mt-1 relative"
                    nameInput={t("auth.password")}
                    type="password"
                    name="password"
                    autoComplete="on"
                    placeholder={t("auth.inputPassword")}
                    messageError={errors.password?.message}
                    register={register}
                  />
                  <Input
                    className="mt-1 relative"
                    nameInput={t("auth.confirmPassword")}
                    type="password"
                    name="confirmPassword"
                    autoComplete="on"
                    placeholder={t("auth.inputPassword")}
                    messageError={errors.confirmPassword?.message}
                    register={register}
                  />
                  <Button
                    type="submit"
                    nameButton={t("auth.register")}
                    disable={loading}
                    loading={loading}
                  />
                </form>
                <div className="my-4 w-full h-[1px] bg-[#4e6c8d]/70"></div>

                <div className="flex justify-center items-center gap-1">
                  <span className="text-base">{t("auth.haveAccount")}</span>
                  <Link
                    to={path.login}
                    className=" text-textColor font-semibold text-base underline"
                  >
                    {t("auth.login")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
