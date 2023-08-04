import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
//페이지 임포트
import App from './App';
import Home from './pages/home/Home';
import Detail from './pages/detail/Detail';
import Section from './pages/section/Section';
import Supplyment from './pages/supplyment/Supplyment';
import User from './pages/user/User';
import Login from './pages/login/Login';
import TeacherDetail from './pages/teacher/TeacherDetail';

//loader를 이용하여 컴포넌트가 렌더링 되기 전에 데이터를 처리할 수 있다.
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
        path:'section',
        element:<Section/>,
      },
      {
        path:'user',
        element:<User/>,
      },
      {
        path:'login',
        element:<Login/>,
      }
    ],
  },
  {
    path: "teacher",
    loader: loadData,
    element: <Teacher />,
  },
  {
    path:'teacherdetail',
    element:<TeacherDetail/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <RouterProvider router={router} />
  </CookiesProvider>
 
);

