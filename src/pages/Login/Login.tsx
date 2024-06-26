import { useForm } from "react-hook-form"
import logo from "../../img/favicon/FaviconFlight.png"
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
        await res.user.getIdTokenResult().then((response) => {
          const token = response.token
          setAccessTokenToLS(`Bearer ${token}`)
        })
        setIsAuthenticated(true)
        setProfileToLS(res.user.email as string)
        location.reload()

        navigate(path.home)
        toast.success("Login successfully !!!")
        setLoading(false)
      }
    } catch (error) {
      toast.error("Error (auth/invalid-credential)")
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
      location.reload()

      navigate(path.home)
      toast.success("Login successfully !!!")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-w-[350px] md:min-w-[450px] p-6 md:p-8 bg-[#f2f2f2] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl rounded-md">
      <Helmet>
        <title>Đăng nhập</title>
        <meta name="description" content="Đăng nhập - Amadeus Booking" />
      </Helmet>

      <Link to={path.home} className="flex items-center justify-center cursor-pointer">
        <div className="w-14 h-14">
          <img src={logo} alt="Logo" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-2xl text-textColor font-semibold text-center">Amadeus Booking</h1>
      </Link>

      <div className="text-textColor text-3xl font-semibold text-center">Đăng nhập</div>

      <button
        onClick={loginGoogle}
        className="mt-4 flex items-center justify-center gap-2 w-full rounded-full border border-[#4e6c8d] py-2"
      >
        <div
          className="w-5 h-5"
          style={{
            backgroundImage: `url(https://accounts.scdn.co/sso/images/new-google-icon.72fd940a229bc94cf9484a3320b3dccb.svg)`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        ></div>
        <span className="text-lg text-textColor font-medium">Login with Google</span>
      </button>

      <div className="my-4 w-full h-[1px] bg-[#4e6c8d]/70"></div>

      <form onSubmit={onSubmit} className="mt-5" noValidate>
        <Input
          className="mt-1"
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
          nameInput="Password"
          type="password"
          name="password"
          autoComplete="on"
          placeholder="Nhập password"
          messageError={errors.password?.message}
          register={register}
        />
        <Button nameButton="Đăng nhập" disable={loading} loading={loading} />
      </form>
      <div className="my-4 w-full h-[1px] bg-[#4e6c8d]/70"></div>

      <div className="flex justify-center items-center gap-1">
        <span className="text-base">Bạn chưa có tài khoản?</span>
        <Link to={path.register} className=" text-textColor font-semibold text-base underline">
          Đăng ký
        </Link>
      </div>
    </div>
  )
}
