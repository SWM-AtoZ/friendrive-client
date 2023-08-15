import React, { useEffect,useState } from 'react';
import {useOutletContext, useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import style from './home.module.css';
import axios from 'axios';

//커리큘럼 프로그래스바, 서비스 피드백 페이지로 이동하는 기능 추가, UI 추가.
function Home() {
  
  const [cookies,setCookie,] = useCookies(['token']);
  var user='';

  const navigate = useNavigate();

  const expires = new Date();
  expires.setMonth(expires.getMonth+3);


  const params= new URL(window.location.href).searchParams;
  const code = params.get('code');
  const body = {
        code:code,
        domain:'https://friendrive.net'
      }

    // 로그인 후 토큰 셋팅
    const Login = async () =>{
      axios.post('https://41icjhls1i.execute-api.ap-northeast-2.amazonaws.com/dev/login/kakao', body)
      .then(function (response) {
        setCookie('token', response.data.jwt.accessToken, expires);
      })
      .catch(function (error) {
        alert('로그인에 실패하셨습니다.');
        console.log(error);
      }); 
    }
    
    // 공유하기 기능 안되는 환경에서 클립보드에 복사
    const handleCopyClipBoard = async (uri) => {
      try {
        await navigator.clipboard.writeText(uri);
        alert('클립보드에 선생님 페이지가 복사되었습니다. 선생님께 연수를 요청드려보세요!');
      } catch (e) {
        // alert('복사에 실패하였습니다');
        const element = document.createElement('textarea');
        element.value = uri;
        element.setAttribute('readonly', '');
        element.style.position = 'fixed';
        element.style.opacity = '0';
        document.body.appendChild(element);
        element.select();
        const copyValue = document.execCommand('copy');
        document.body.removeChild(element);
        alert(`클립보드에 선생님 페이지가 복사되었습니다. 선생님께 연수를 요청드려보세요!`);
        console.log(e);
      }
   };
   // 공유기능 되는 환경에서 공유기능 활성화
  const ShareTeacher = async () => {
    let teacherToken = ""
    await axios.get('https://41icjhls1i.execute-api.ap-northeast-2.amazonaws.com/dev/teacher/token',{
      headers:{
        Authorization: `Bearer ${cookies.token}`
      }
    })
    .then((response)=>{
      teacherToken = response.data.token;
    })
    .catch((response)=>{
      console.log(response);
    })

    const url = `https://friendrive.net/teacher?teachertoken=${teacherToken}`;

    if (navigator.share) {
        navigator.share({
            title: `${user}님의 운전연수 요청!`,
            text: `${user}님의 초보 탈출을 도와주세요!`,
            url: url,
        });
    }else{
       handleCopyClipBoard(url);
    }
  } 
  // 로그연 여부 확인 후 공유 또는 로그인 화면 이동.
  const isLogin = async() => {
    if(cookies.token){
   await axios.get("https://41icjhls1i.execute-api.ap-northeast-2.amazonaws.com/dev/user/info", {
          headers: {
              Authorization: `Bearer ${cookies.token}`
          }
      }).then(function (response) {
          user = response.data.nickName;
        })
        .catch(function (error) {
          console.log(error);
        });  

    await ShareTeacher();
    }
    else{
      alert('로그인이 필요힌 서비스입니다');
      navigate('/login')
    }
  }


  useEffect(()=>{
    if(code !== null){
      console.log(code);
         Login();
    }
  },[])

  
  return (
    <section id={style.home_section}>
      
     <div onClick={isLogin} className={style.request_button}>
      <div>{`요청\n하기`}</div>
     </div>
    </section>
  );
}

export default Home;

