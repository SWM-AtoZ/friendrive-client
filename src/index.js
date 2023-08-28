import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
//페이지 임포트
import App from './App';
import ErrorPage from './pages/error/ErrorPage';
import Curriculum from './pages/curriculum/Curriculum';
import DayList from './pages/daylist/DayList';
import Detail from './pages/detail/Detail';
import ServiceFeedback from './pages/servicefeedback/ServiceFeedback';
import Loading from './pages/loading/Loading';
import User from './pages/user/User';
import Login from './pages/login/Login';
import Writing from './pages/writing/Wiriting';
import Contents from './pages/detail/Contents';
import FeedBack from './pages/detail/FeedBack';
import CustomerPage from './pages/user/CustomerPage';

//loader를 이용하여 컴포넌트가 렌더링 되기 전에 데이터를 처리할 수 있다.
import TeacherHome from './pages/teacher/TeacherHome';
import TeacherDetail from './pages/teacher/TeacherDeatil';
import TeacherDayList from './pages/teacher/TeacherDayList'
import FeedbackWriting from './pages/teacher/FeedbackWriting';
import './reset.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement:<ErrorPage/>
  },
  {
    path : 'curriculum',
    element: <Curriculum/>,
    errorElement:<ErrorPage/>
  },
  {
    path:'daylist',
    element:<DayList/>,
    errorElement:<ErrorPage/> 
  },
  {
    path:'writing',
    element:<Writing/>,
    errorElement:<ErrorPage/>
  },
  {
    path:'detail',
    element:<Detail/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        index:true,
        element:<Contents/>,
        errorElement:<ErrorPage/>
      },
      {
        path:'feedback',
        element:<FeedBack/>,
        errorElement:<ErrorPage/>
      }
    ]
  },
  {
    path:'serviceFeedback',
    element:<ServiceFeedback/>,
    errorElement:<ErrorPage/>
  },
  {
    path:'customerpage',
    element:<CustomerPage/>,
    errorElement:<ErrorPage/>
  },
  {
    path:'user',
    element:<User/>,
    errorElement:<ErrorPage/>
  },
  {
    path:'login',
    element:<Login/>,
    errorElement:<ErrorPage/>
  },
  {
    path:"teacherhome",
    element: <TeacherHome/>,
    errorElement:<ErrorPage/>
  },
  {
    path: "teacherDayList",
    element : <TeacherDayList/>,
    errorElement:<ErrorPage/>
  },
  {
    path: "feedbackWriting",
    element:<FeedbackWriting/>,
    errorElement:<ErrorPage/>
  },
  {
    path : "teacherDetail",
    element : <TeacherDetail/>,
    errorElement:<ErrorPage/>
  },
  {
    path:'loading',
    element:<Loading/>,
    errorElement:<ErrorPage/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

//모바일 화면에 맞게 크기 리사이징
function setScreenSize() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setScreenSize();
window.addEventListener('resize', setScreenSize);

root.render(
  <CookiesProvider>
    <RouterProvider router={router} />
  </CookiesProvider>
 
);

