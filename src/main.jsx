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
import Error from './Error';
import PrivateRoute from './PrivateRoute';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Settings from './Settings';
import DonateNow from './DonateNow';
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element:<Home></Home>,
    errorElement:<Error></Error>
  },
  {
    path: "/available-foods",
    element:<AvailableFoods></AvailableFoods>,
    // loader:()=>fetch('https://meheraj.vercel.app/food')
  },
  {
    path: "/food/:id",
    element:<FoodDatial></FoodDatial>,
    loader:({params})=> fetch(`https://meheraj.vercel.app/food/${params.id}`)
  },
  {
    path: "/add-food",
    element:<PrivateRoute><AddFood></AddFood></PrivateRoute>
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
    path: "/dashboard",
    element:<Dashboard></Dashboard>
  },
  {
    path: "/profile",
    element:<Profile></Profile>
  },
  {
    path: "/donate-food",
    element:<DonateNow></DonateNow>
  },
  {
    path: "/settings",
    element:<Settings></Settings>
  },
  {
    path: "/my-requests",
    element:<PrivateRoute><RequestFood></RequestFood></PrivateRoute>
  },
  {
    path: "/manage-foods",
    element:<PrivateRoute><ManageMyFoods></ManageMyFoods></PrivateRoute>
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
      <AutProvider routes={<RouterProvider router={router} />} />
    </QueryClientProvider>
  </StrictMode>,
)
