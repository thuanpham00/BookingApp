import { useForm } from "react-hook-form"
import Input from "src/components/Input"
import { Link, useNavigate } from "react-router-dom"
import { path } from "src/constant/path"
import schema, { schemaType } from "src/utils/rules"
import { yupResolver } from "@hookform/resolvers/yup"
import Button from "src/components/Button"
import { Helmet } from "react-helmet-async"
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth } from "src/firebase"
import { useContext, useState } from "react"
import { setAccessTokenToLS, setProfileToLS } from "src/utils/auth"
import { toast } from "react-toastify"
import { AppContext } from "src/context/useContext"
import ChangeAutoBg from "src/components/ChangeAutoBg"
import bg1 from "../../img/bgLogin/bg-1.webp"
import bg2 from "../../img/bgLogin/bg-2.webp"
import bg3 from "../../img/bgLogin/bg-3.webp"
import bg4 from "../../img/bgLogin/bg-4.webp"
import bg5 from "../../img/bgLogin/bg-5.webp"
import bg6 from "../../img/bgLogin/bg-6.webp"
import bg7 from "../../img/Hotel/imgHotelRandom/hotel6.webp"
import bg8 from "../../img/Hotel/imgHotelRandom/hotel4.webp"
import bg9 from "../../img/Flight/thumb-website-Vi-VNPAY-1280x720.webp"
import bg10 from "../../img/Flight/delay-chuyen-bay.jpg"

export const backgroundList = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10]

const schemaForm = schema.pick(["email", "password"])

type FormData = Pick<schemaType, "email" | "password">

export default function Login() {
  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm<FormData>({ resolver: yupResolver(schemaForm) })

  const [loading, setLoading] = useState(false)
  const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    try {
      const res = await signInWithEmailAndPassword(auth, data.email, data.password)
      if (res) {
        console.log(res)
        await res.user.getIdTokenResult().then((response) => {
          const token = response.token
          setAccessTokenToLS(`Bearer ${token}`)
        })
        setIsAuthenticated(true)
        window.location.reload()
        setProfileToLS(res.user.email as string)
        toast.success("Đăng nhập thành công !!!")
        setLoading(false)
      }
    } catch (error) {
      toast.error("Lỗi xác thực/thông tin không hợp lệ")
      setLoading(false)
    }
  })

  const loginGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider() // khởi tạo login google
      const res = await signInWithPopup(auth, provider)
      if (res) {
        await res.user.getIdTokenResult().then((response) => {
          const token = response.token
          setAccessTokenToLS(`Bearer ${token}`)
        })
      }
      setIsAuthenticated(true)
      setProfileToLS(res.user.displayName as string)
      window.location.reload()
      navigate(path.home)
      toast.success("Đăng nhập thành công !!!")
    } catch (error) {
      console.log(error)
    }
  }
  //
  return (
    <div>
      <Helmet>
        <title>Đăng nhập</title>
        <meta name="description" content="Đăng nhập - Amadeus Booking" />
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
                <div className="text-textColor text-2xl font-semibold text-center">Đăng nhập</div>
                <button
                  onClick={loginGoogle}
                  className="mt-4 w-[90%] mx-auto flex items-center justify-center gap-2 rounded-full border border-[#4e6c8d] py-2"
                >
                  <div
                    className="w-5 h-5"
                    style={{
                      backgroundImage: `url(https://accounts.scdn.co/sso/images/new-google-icon.72fd940a229bc94cf9484a3320b3dccb.svg)`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat"
                    }}
                  ></div>
                  <span className="text-base text-textColor font-medium">Đăng nhập với Google</span>
                </button>

                <form onSubmit={onSubmit} className="mt-5" noValidate>
                  <Input
                    className="mt-1"
                    nameInput="Email"
                    type="email"
                    name="email"
                    autoComplete="on"
                    placeholder="Nhập email"
                    messageError={errors.email?.message}
                    register={register} // các thẻ input cần được đăng ký với 'register' để theo dõi dữ liệu và submit form đi // {...register("nameInput")}
                  />
                  <Input
                    className="mt-1 relative"
                    nameInput="Mật khẩu"
                    type="password"
                    name="password"
                    autoComplete="on"
                    placeholder="Nhập mật khẩu"
                    messageError={errors.password?.message}
                    register={register} // các thẻ input cần được đăng ký với 'register' để theo dõi dữ liệu và submit form đi // {...register("nameInput")}
                  />
                  <Button
                    type="submit"
                    nameButton="Đăng nhập"
                    disable={loading}
                    loading={loading}
                  />
                </form>
                <div className="my-4 w-full h-[1px] bg-[#4e6c8d]/70"></div>

                <div className="flex justify-center items-center gap-1">
                  <span className="text-base">Bạn chưa có tài khoản?</span>
                  <Link
                    to={path.register}
                    className=" text-textColor font-semibold text-base underline"
                  >
                    Đăng ký
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
