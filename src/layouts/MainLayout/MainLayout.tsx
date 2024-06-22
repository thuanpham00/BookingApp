import SideNavMenu from "src/components/SideNavMenu"

interface Props {
  children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="w-full grid grid-cols-12 gap-4 bg-[#f2f2f2]">
      <div className="col-span-2">
        <SideNavMenu />
      </div>
      <div className="col-span-10">{children}</div>
    </div>
  )
}
