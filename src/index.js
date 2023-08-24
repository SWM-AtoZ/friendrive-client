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
  },
  {
    path : 'curriculum',
    element: <Curriculum/>,
  },
  {
    path:'daylist',
    element:<DayList/>, 
  },
  {
    path:'writing',
    element:<Writing/>,
  },
  {
    path:'detail',
    element:<Detail/>,
    children:[
      {
        index:true,
        element:<Contents/>
      },
      {
        path:'feedback',
        element:<FeedBack/>
      }
    ]
  },
  {
    path:'serviceFeedback',
    element:<ServiceFeedback/>,
  },
  {
    path:'customerpage',
    element:<CustomerPage/>
  },
  {
    path:'user',
    element:<User/>,
  },
  {
    path:'login',
    element:<Login/>,
  },
  {
    path:"teacherhome",
    element: <TeacherHome/>,
  },
  {
    path: "teacherDayList",
    element : <TeacherDayList/>,
  },
  {
    path: "feedbackWriting",
    element:<FeedbackWriting/>
  },
  {
    path : "teacherDetail",
    element : <TeacherDetail/>,
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

