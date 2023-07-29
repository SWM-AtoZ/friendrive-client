import style from './user.module.css';
import KakaoLogin from '../../componenets/kakaoLogin/KakaoLogin';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const User = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [user, setUser] = useState();
    
    const params= new URL(window.location.href).searchParams;
    const code = params.get('code');
    const body = {
        code:code,
        domain:'https://friendrive.net/user'
    }

    //쿠키의 유효기간 한달로 지정
    const expires = new Date();
    expires.setMonth(expires.getMonth+1);

    const Login = async () =>{
      axios.post('https://41icjhls1i.execute-api.ap-northeast-2.amazonaws.com/dev/login/kakao', body)
      .then(function (response) {
        console.log(body)
        setCookie('token', response.data.jwt.accessToken, expires);
        window.location.href = 'http://localhost:3000';
        alert('로그인이 되었습니다.');
      })
      .catch(function (error) {
        alert('로그인에 실패하셨습니다.');
        console.log(error);
      }); 
    }

    const getUserData = async () =>{ //유저 데이터 얻는 함수.
        axios.get("https://41icjhls1i.execute-api.ap-northeast-2.amazonaws.com/dev/user/info", {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        }).then(function (response) {
            console.log(response);
            setUser(response);
          })
          .catch(function (error) {
            console.log(error);
          });  
    }

    const Logout = () => { //로그아웃 이벤트 함수
        removeCookie('token'); 
        removeCookie('teacherToken');
        //홈페이지로 이동하여 페이지를 새로고침해준다.
        alert('로그아웃 되었습니다.');
        window.location.href = 'https://friendrive.net';
    }

  useEffect(()=>{
    if(cookies.token){
      getUserData();
    }     
    
    if(code !== null){
      console.log(code);
         Login();
    }
},[])
    return (<div>
        <h1>유저페이지입니다.</h1>
        <button onClick={Logout}>로그아웃</button>
    </div>)
}

export default User;