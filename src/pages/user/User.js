import style from './user.module.css';
import KakaoLogin from '../../componenets/kakaoLogin/KakaoLogin';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const User = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [user, setUser] = useState();

    //쿠키의 유효기간 한달로 지정
    const expires = new Date();
    expires.setMonth(expires.getMonth+1);

    const getUserData = async () =>{ //유저 데이터 얻는 함수.
        axios.get("http://ec2-54-180-132-230.ap-northeast-2.compute.amazonaws.com/user/info", {
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
        //홈페이지로 이동하여 페이지를 새로고침해준다.
        alert('로그아웃 되었습니다.');
        window.location.href = 'http://localhost:3000';
    }

  useEffect(()=>{
    const params= new URL(window.location.href).searchParams;
    const code = params.get('code');
    const body = {
        code:code,
        domain:'http://localhost:3000/user'
    }
    if(cookies.token){
        getUserData();
    }

    if(code !== null){
      axios.post('http://ec2-54-180-132-230.ap-northeast-2.compute.amazonaws.com/login/kakao', body)
      .then(function (response) {
        setCookie('token', response.data.jwt.accessToken, expires);
        alert('로그인이 되었습니다.');
        console.log(response);
        window.location.href = 'http://localhost:3000';
      })
      .catch(function (error) {
        alert('로그인에 실패하셨습니다.');
        console.log(error);
      });  
    }
    
},[])
    return (<div>
        <h1>유저페이지입니다.</h1>
        <button onClick={Logout}>로그아웃</button>
    </div>)
}

export default User;