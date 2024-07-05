interface Props {
  name: string
  name2: string
}

export default function Breadcrumb({ name, name2 }: Props) {
  return (
    <div className="w-[300px] flex gap-1 items-center px-1 py-4 border-b border-b-[#bbb]">
      <span className="text-base text-textColor font-semibold">{name} </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="#0077b6"
        className="h-3 w-3"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
      <span className="text-base text-[#0077b6] font-semibold cursor-pointer">{name2}</span>
      <div className="ml-[2px] mt-[2px] triangle"></div>
    </div>
  )
}
