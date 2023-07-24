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

import {Teacher, loader as loadData} from './pages/teacher/Teacher';
import './reset.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        index : true, 
        element: <Home />,
      },
      {
        path:'detail',
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
    loader: loadData,
    element: <Teacher />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <RouterProvider router={router} />
 
);

