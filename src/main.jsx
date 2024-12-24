import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AvailableFoods from './AvailableFoods';
import FoodDatial from './FoodDatial';
import AddFood from './AddFood';
import AutProvider from './AutProvider';
import Register from './Register';
import Login from './Login';
import RequestFood from './RequestFood';
import ManageMyFoods from './ManageMyFoods';
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element:<Home></Home>
  },
  {
    path: "/available-foods",
    element:<AvailableFoods></AvailableFoods>,
    // loader:()=>fetch('http://localhost:3000/food')
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
  {
    path: "/Login",
    element:<Login></Login>
  },
  {
    path: "/register",
    element:<Register></Register>
  },
  {
    path: "/my-requests",
    element:<RequestFood></RequestFood>
  },
  {
    path: "/manage-foods",
    element:<ManageMyFoods></ManageMyFoods>
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
      <AutProvider routes={<RouterProvider router={router} />} />
    </QueryClientProvider>
  </StrictMode>,
)
