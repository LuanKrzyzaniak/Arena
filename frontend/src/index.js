import React from 'react';
import ReactDOM from 'react-dom/client';

//routes
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from './pages/LoginPage/LoginPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Home from './pages/Home/Home';



const router = createBrowserRouter([
  {path:'/',
    element:<Home />,
    errorElement: <ErrorPage/>
  },

  {
    path:'/login',
    element: <LoginPage/>,
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);