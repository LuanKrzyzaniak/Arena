import React from 'react';
import ReactDOM from 'react-dom/client';

//routes
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from './pages/LoginPage/LoginPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Home from './pages/Home/Home';
import RegisterPage from './pages/RegisterPage/RegisterPage';

import "./index.css";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />
  },

  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path:'/register',
    element:<RegisterPage/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);