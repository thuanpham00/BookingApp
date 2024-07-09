import { useEffect, useMemo, useState } from "react"
import ProductItem from "../ProductItem"
import { ListHotelType } from "../../Home"

interface Props {
  productList: ListHotelType
  timeScroll: number
}

export default function SlideList({ productList, timeScroll }: Props) {
  const [scrollAuto, setScrollAuto] = useState<boolean>(true)
  const [currentImageIndex, setCurrentImageIndex] = useState([0, 4])
  const currentListProduct = useMemo(
    () => (productList ? productList.slice(...currentImageIndex) : []),
    [currentImageIndex, productList]
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let lastTimeClick: number = 0
  const handlePrevImg = () => {
    if (currentImageIndex[0] > 0) {
      setCurrentImageIndex((prev) => [prev[0] - 1, prev[1] - 1])
    }
    setScrollAuto(false)
    lastTimeClick = Date.now()
  }

  const handleNextImg = () => {
    if (currentImageIndex[1] < productList.length) {
      setCurrentImageIndex((prev) => [prev[0] + 1, prev[1] + 1])
    }
    setScrollAuto(false)
    lastTimeClick = Date.now()
  }

  useEffect(() => {
    if (scrollAuto) {
      const interval = setInterval(() => {
        if (currentImageIndex[1] < productList.length) {
          setCurrentImageIndex((prev) => [prev[0] + 1, prev[1] + 1])
        } else if (currentImageIndex[1] === productList.length) {
          setCurrentImageIndex([0, 4])
        }
      }, timeScroll)

      return () => clearInterval(interval) // giải phóng bộ nhớ khi không dùng
    }
    const time = Date.now()
    const timeScrollContinue = time - lastTimeClick
    if (timeScrollContinue > 3000) {
      setScrollAuto(true) // quá 3s ko click nữa nó tự động chạy
    }
  }, [timeScroll, currentImageIndex, productList, lastTimeClick, scrollAuto])

  return (
    <div className="flex relative">
      <button
        type="button"
        aria-label="prev" // cho trình duyệt đọc
        onClick={handlePrevImg}
        className="absolute top-1/2 -left-10 flex-shrink-0 flex items-center justify-center hover:bg-gray-300 duration-200 rounded-full w-10 h-10 hover:text-black/80"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      <div className="w-full flex items-center gap-4">
        {currentListProduct.map((item, index) => (
          <div className="w-[25%]" key={index}>
            <ProductItem item={item} />
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="next"
        onClick={handleNextImg}
        className="absolute top-1/2 -right-10 flex-shrink-0 flex items-center justify-center hover:bg-gray-300 duration-200 rounded-full w-10 h-10 hover:text-black/80"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  )
}

/**
 *  <div className={classNameSlideAuto}>
          <TransitionGroup component={null}>
            {currentSlideIndex.map((item) => (
              <CSSTransition key={item} timeout={500} classNames="slide">
                <div className="w-full h-[150px] md:h-full">
                  <img src={item} alt="Ảnh" className="w-full h-full object-cover" />
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
 */
