import React from 'react';
import ReactDOM from 'react-dom/client';

//routes
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import NewLogin from './pages/NewLogin';
import ErrorPage from './pages/Error';
import Home from './pages/Home';
import RegisterPage from './pages/Register';
import TournamentRegister from './pages/TournamentRegister';

import "./index.css";
import Login from './pages/Login/Login';
import Tournament from './Tournament/Tournament';


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
  },
  {
    path: '/tournament/register',
    element: <TournamentRegister />,
  },
  {
    path: '/tournament/:id',
    element:<Tournament/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);