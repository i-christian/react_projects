import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom"
import Home from './pages/Home'
import Register from "./pages/Register"
import Login from "./pages/Login"
import Single from "./pages/Single"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/login",
    element: <Login/>
  },
])


const App = () => {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
