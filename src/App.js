import React,{useState,useRef, useEffect} from 'react';
import Loading from './pages/loading/Loading';
import { Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Home from './pages/home/Home';

// css파일 임포트
import './App.css';

function App() {
  
  return (
    <>
      <section className='section_container'>
      <Home/>
    </section>
    </>

    
  );
}

export default App;
