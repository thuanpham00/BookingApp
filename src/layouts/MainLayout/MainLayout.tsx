import Footer from "src/components/Footer"
import Header from "src/components/Header"

interface Props {
  children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="w-full bg-[#f2f2f2]">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
