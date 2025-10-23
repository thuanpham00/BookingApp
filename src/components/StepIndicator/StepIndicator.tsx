import React from "react"

interface StepItem {
  title: string
}

interface StepIndicatorProps {
  current: number
  items: StepItem[]
  size?: "small" | "default" | "large"
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ current = 0, items, size = "default" }) => {
  const sizeClasses =
    size === "small"
      ? "text-xs px-2 py-1"
      : size === "large"
        ? "text-lg px-5 py-3"
        : "text-sm px-3 py-2"

  return (
    <div className="flex items-center justify-between w-full">
      {items.map((item, index) => {
        const isActive = index === current
        const isCompleted = index < current

        return (
          <div
            key={index}
            className={`flex-1 flex flex-col items-center relative ${
              index !== items.length - 1 ? "mr-3" : ""
            }`}
          >
            {/* Dòng nối */}
            {index !== items.length - 1 && (
              <div
                className={`absolute top-1/2 right-[-50%] w-full h-[2px] transform -translate-y-1/2 ${
                  isCompleted ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            )}

            {/* Vòng tròn step */}
            <div
              className={`flex items-center justify-center rounded-full font-semibold border transition-all duration-300
                ${sizeClasses}
                ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                    : isCompleted
                      ? "bg-blue-100 text-blue-700 border-blue-400"
                      : "bg-gray-200 text-gray-600 border-gray-300"
                }`}
            >
              {index + 1}
            </div>

            {/* Tên step */}
            <span
              className={`mt-2 text-center ${
                isActive ? "text-blue-700 font-semibold" : "text-gray-600 font-medium"
              }`}
            >
              {item.title}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default StepIndicator
