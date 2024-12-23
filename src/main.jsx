import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Home';
import AvailableFoods from './AvailableFoods';
const router = createBrowserRouter([
  {
    path: "/",
    element:<Home></Home>
  },
  {
    path: "/available-foods",
    element:<AvailableFoods></AvailableFoods>
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
