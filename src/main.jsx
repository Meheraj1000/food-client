import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Home';
import AvailableFoods from './AvailableFoods';
import FoodDatial from './FoodDatial';
import AddFood from './AddFood';
const router = createBrowserRouter([
  {
    path: "/",
    element:<Home></Home>
  },
  {
    path: "/available-foods",
    element:<AvailableFoods></AvailableFoods>,
    loader:()=>fetch('http://localhost:3000/food')
  },
  {
    path: "/food/:id",
    element:<FoodDatial></FoodDatial>,
    loader:({params})=> fetch(`http://localhost:3000/food/${params.id}`)
  },
  {
    path: "/add-food",
    element:<AddFood></AddFood>
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
