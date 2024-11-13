import React from 'react';
import ReactDOM from 'react-dom/client';

//routes
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import NewLogin from './pages/NewLogin';
import NewLoginPC from './pages/NewLogin/indexPC';

import ErrorPage from './pages/Error';

import Home from './pages/Home';
import HomePC from './pages/Home/indexPC';

import RegisterPage from './pages/Register';
import RegisterPagePC from './pages/Register/indexPC';


import TournamentRegister from './pages/TournamentRegister';
import TournamentRegisterPC from './pages/TournamentRegister/indexPC';

import "./index.css";
import Login from './pages/Login/Login';
import Tournament from './Tournament/Tournament';


const router = createBrowserRouter([
  {
    path: '/',
    // element: <Home />,
    element: <HomePC />,
    errorElement: <ErrorPage />
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    // element: <RegisterPage />,
    element: <RegisterPagePC />
  },
  {
    path: '/tournament/register',
    // element: <TournamentRegister />,
    element: <TournamentRegisterPC />,
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