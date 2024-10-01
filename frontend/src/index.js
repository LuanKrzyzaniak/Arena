import React from 'react';
import ReactDOM from 'react-dom/client';

//routes
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginPage from './pages/Login';
import NewLogin from './pages/NewLogin';
import ErrorPage from './pages/Error';
import Home from './pages/Home';
import RegisterPage from './pages/Register';

import "./index.css";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: '/login',
    element: <NewLogin />,
  },
  {
    path: '/register',
    element: <RegisterPage />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);