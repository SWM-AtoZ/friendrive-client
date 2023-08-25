import React,{useState,useRef, useEffect} from 'react';
import Loading from './pages/loading/Loading';
import { Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Home from './pages/home/Home';

// css파일 임포트
import './App.css';

function App() {
  
    //모바일 화면에 맞게 화면 높이 조정
    function setScreenSize() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setScreenSize();
    window.addEventListener('resize', setScreenSize);

  return (
    <>
    <section className='section_container'>
      <Home/>
    </section>
    </>
    
  );
}

export default App;
