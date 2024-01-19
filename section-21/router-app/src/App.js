import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from './pages/Home'
import ContactUs from './pages/ContactUs'
import RootLayout from "./pages/Root";
import Error from "./pages/Error";
import AddressDetails from "./pages/AddressDetails";

const router = createBrowserRouter([
  {
    path: '/', 
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      // default children to display, this is an alternative to path: '' or '/'
      {index: true, element: <Home />},
      // {path: '/', element: <Home />},
      // absolute path, if the parent path is "/root", this path will fail unless it's "contact-us" instead of "/contact-us"
      {path: '/contact-us', element: <ContactUs />},
      // relative path
      {path: 'contact-us/:addressId', element: <AddressDetails />},
    ]
  },

])


export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}




