import { HelmetProvider } from "react-helmet-async"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import useRouterElement from "./routes/useRouterElement"

function App() {
  const routerElement = useRouterElement()
  return (
    <HelmetProvider>
      {routerElement}
      <ToastContainer />
    </HelmetProvider>
  )
}

export default App
