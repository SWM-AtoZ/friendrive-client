import React,{useState,useRef, useEffect} from 'react';
import Loading from './pages/loading/Loading';
import { Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

// 컴포넌트 임포트
import Nav from './componenets/nav/Nav';

// css파일 임포트
import './App.css';

function App() {
    const[cookies,,] = useCookies([]);
    const [curriculum, setCurriculum] = useState();
    const [checked,setChecked] = useState();
    

    // API 받아오기.
    const getCurriculum = async() =>{
        await axios.get("https://41icjhls1i.execute-api.ap-northeast-2.amazonaws.com/dev/curriculum")
        .then(function (response) {
            setTimeout(()=>{setCurriculum(response.data)},600)
          })
          .catch(function (error) {
            console.log(error);
          });  
    }
    
    const getChecked = async() =>{
        await axios.get("https://41icjhls1i.execute-api.ap-northeast-2.amazonaws.com/dev/curriculum/checked",{
            headers:{
                Authorization: `Bearer ${cookies.token}`
            }
        })
        .then((response)=>{
           console.log(response)
            console.log('체크데이터를 불러왔습니다.');
            setChecked(response.data);
        })
        .catch((response)=>{
            console.log(response);
        })
    }


    
  	useEffect(() => {
      if(!curriculum){
        getCurriculum();
      }   
        if(cookies.token){
            getChecked();
        }
    }, []);

  
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
      {curriculum?<Outlet context={{curriculum, checked}}/>:<Loading/>}
    </section>
    <Nav/>
    </>

  );
}

export default App;
