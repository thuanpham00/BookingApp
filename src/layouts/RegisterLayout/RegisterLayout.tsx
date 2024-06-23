import { useEffect, useState } from "react"
import bg1 from "../../img/bgLogin/bg-1.jpg"
import bg2 from "../../img/bgLogin/bg-2.jpg"
import bg3 from "../../img/bgLogin/bg-3.jpg"
import bg4 from "../../img/bgLogin/bg-4.jpg"
import bg5 from "../../img/bgLogin/bg-5.jpg"
import bg6 from "../../img/bgLogin/bg-6.png"
import "react-slideshow-image/dist/styles.css"

interface Props {
  children: React.ReactNode
}

const backgroundList = [bg1, bg2, bg3, bg4, bg5, bg6]

export default function RegisterLayout({ children }: Props) {
  const [imgCurrent, setImgCurrent] = useState(backgroundList[0])
  const [index, setIndex] = useState(1)

  useEffect(() => {
    const img = setInterval(() => {
      if (index === backgroundList.length && imgCurrent === backgroundList[5]) {
        setImgCurrent(backgroundList[0])
        setIndex(1)
      } else {
        setImgCurrent(backgroundList[index])
        setIndex((prev) => prev + 1)
      }
    }, 3000)

    return () => clearInterval(img) // lưu ý
  }, [index, imgCurrent])

  return (
    <div
      className="w-screen h-screen transition-all duration-1000 ease-linear"
      style={{
        backgroundImage: `url(${imgCurrent})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}
    >
      {children}
    </div>
  )
}
