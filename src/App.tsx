import { HelmetProvider } from "react-helmet-async"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import useRouterElement from "./routes/useRouterElement"
import FlightProvider from "./context/useContextFlight"
import "antd/dist/reset.css"

function App() {
  const routerElement = useRouterElement()

  return (
    <HelmetProvider>
      <FlightProvider>
        {routerElement}
        <ToastContainer />
      </FlightProvider>
    </HelmetProvider>
  )
}

export default App
