import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

//페이지 임포트
import App from './App';
import Home from './pages/home/Home';
import Detail from './pages/detail/Detail';
import Request from './pages/request/Request';
import Section from './pages/section/Section';
import Supplyment from './pages/supplyment/Supplyment';
import User from './pages/user/User';

import Teacher from './pages/teacher/Teacher';
import './reset.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path:'detail/:detailId',
        element:<Detail/>,
      },
      {
        path:'request',
        element:<Request/>,
      },
      {
        path:'section',
        element:<Section/>,
      },
      {
        path:'supplyment',
        element:<Supplyment/>,
      },
      {
        path:'user',
        element:<User/>,
      },
      
    ],
  },
  {
    path: "teacher",
    element: <Teacher />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

