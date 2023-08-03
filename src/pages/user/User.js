
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const User = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['']);
    const [user, setUser] = useState();
    
   

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
},[])
    return (<div>
        <h1>유저페이지입니다.</h1>
        <button onClick={Logout}>로그아웃</button>
    </div>)
}

export default User;