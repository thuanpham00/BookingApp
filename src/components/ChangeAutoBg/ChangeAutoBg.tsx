import { useEffect, useState } from "react"

interface Props {
  listImg: string[]
  className: string
  indexEnd: number
}

export default function ChangeAutoBg({ listImg, className, indexEnd }: Props) {
  const [imgCurrent, setImgCurrent] = useState(listImg[0])
  const [index, setIndex] = useState(1)

  useEffect(() => {
    const img = setInterval(() => {
      if (index === listImg.length && imgCurrent === listImg[indexEnd]) {
        setImgCurrent(listImg[0])
        setIndex(1)
      } else {
        setImgCurrent(listImg[index])
        setIndex((prev) => prev + 1)
      }
    }, 4000)

    return () => clearInterval(img) // lưu ý
  }, [index, imgCurrent, listImg, indexEnd])

  return (
    <div
      className={className}
      style={{
        backgroundImage: `url(${imgCurrent})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}
    ></div>
  )
}
