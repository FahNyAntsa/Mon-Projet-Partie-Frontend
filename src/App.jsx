
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './css/App.css'
import "./css/index.css"
import Home from './components/Home/Home'
import Login from './components/Login'
import SignIn from './components/SignIn'
import Boutique from './components/Boutique/Boutique'
import Produit from './components/Produit'
import Panier from './components/Panier'
import { Toaster } from 'react-hot-toast'
import Dashboard from './components/Dashboard/Dashboard'
import DashProduit from './components/Dashboard/DashProduit'

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/Boutique",
    element: <Boutique />
  },
  {
    path: "/Login",
    element: <Login />
  },
  {
    path: "/SignIn",
    element: <SignIn />
  },
  {
    path: "/Produit/:id",
    element: <Produit />
  },
  {
    path: "/Panier",
    element: <Panier />
  },
  {
    path:"/Dashboard",
    element:<Dashboard/>
  },
  {
    path:"/DashProduit",
    element:<DashProduit/>
  }
])
function App() {
  return (
    <>
      <Toaster position="top-center"/>
      <RouterProvider router={Router}>
      </RouterProvider>
    </>
  )
}

export default App
