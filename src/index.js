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
import Section from './pages/section/Section';
import Loading from './pages/loading/Loading';
import User from './pages/user/User';
import Login from './pages/login/Login';
import TeacherDetail from './pages/teacher/TeacherDetail';

//loader를 이용하여 컴포넌트가 렌더링 되기 전에 데이터를 처리할 수 있다.
import Teacher from './pages/teacher/Teacher';
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
        path:'day',
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
    element: <Teacher />,
  },
  {
    path:'teacherdetail',
    element:<TeacherDetail/>
  },
  {
    path:'loading',
    element:<Loading/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <RouterProvider router={router} />
  </CookiesProvider>
 
);

