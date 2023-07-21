import React,{useRef, useEffect} from 'react';
import { Outlet } from 'react-router-dom';

// 컴포넌트 임포트
import Nav from './componenets/nav/Nav';

// css파일 임포트
import './App.css';

function App() {
  return (
    <>
    <section className='section_container'>
      <Outlet/>
    </section>
    <Nav/>
    </>

  );
}

export default App;
