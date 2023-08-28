import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import TopNavi from '../../componenets/topNavi/TopNavi';
import style from './user.module.css';
import axios from 'axios';
import banner from './banner.png';

const User = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['']);
    const [user, setUser] = useState();
    const [IsLogin, setISLogin] = useState(false);
    const navigate = useNavigate();
  
    const getUserData = async () =>{ //유저 데이터 얻는 함수.
        axios.get("https://api.friendrive.net/user/info", {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        }).then(function (response) {
            console.log(response);
            setUser(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });  
    }

    const Logout = () => { //로그아웃 이벤트 함수
        const LogoutConfirm = window.confirm('로그아웃 하시겠습니까?');
        if(LogoutConfirm){
          removeCookie('token'); 
          removeCookie('teacherToken');
          setISLogin(false);
          alert('로그아웃 되었습니다.');
        }
    }
    const SignUp = () =>{
      navigate('/Login');
    }

    const clickServiceInfo = () =>{
      alert('서비스 준비중입니다.')
    }

    const goToServiceFeedback = () =>{
      navigate('/customerpage');
    }

  useEffect(()=>{
    if(cookies.token){
      getUserData();
      setISLogin(true);
    }     
},[])
    return (
    <div className={style.user}>
    <TopNavi title={'내정보'}/>
    <div className={style.user_section}>
      <div className={style.profile}>
      <svg xmlns="http://www.w3.org/2000/svg" width="3.5rem" height="3.5rem" viewBox="0 0 20 20" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.4354 16.8471C18.3221 15.0691 19.5 12.5471 19.5 9.75C19.5 4.36522 15.1348 0 9.75 0C4.36522 0 0 4.36522 0 9.75C0 12.5471 1.17785 15.0691 3.06463 16.8471C4.81012 18.4919 7.16234 19.5 9.75 19.5C12.3377 19.5 14.6899 18.4919 16.4354 16.8471ZM3.89512 15.5623C5.26961 13.8478 7.38161 12.75 9.75 12.75C12.1184 12.75 14.2304 13.8478 15.6049 15.5623C14.1103 17.0678 12.039 18 9.75 18C7.461 18 5.38973 17.0678 3.89512 15.5623ZM13.5 6.75C13.5 8.82107 11.8211 10.5 9.75 10.5C7.67893 10.5 6 8.82107 6 6.75C6 4.67893 7.67893 3 9.75 3C11.8211 3 13.5 4.67893 13.5 6.75Z" fill="rgba(0, 0, 0, 0.2)"/>
      </svg>
      {IsLogin&&user?(<div className={style.profile_info_box}>
          <div className={style.profile_name}>{user.name}</div>
        </div>
        ):(<div className={style.profile_info_box}>
          <div className={style.profile_name}></div>
        </div>)}
        {IsLogin?(<button className={style.profile_logout} onClick={Logout}>로그아웃</button>):
        (<button className={style.profile_logout} onClick={SignUp}>로그인</button>)}        
      </div>
      <div className={style.banner}>
        <img className={style.banner_img} src={banner} />
      </div>
      <div className={style.blank}></div>
      <div className={style.service_info}>
        <div onClick={goToServiceFeedback} className={style.service_info_item}>
          <div>고객센터</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M8.59003 7.41L13.17 12L8.59003 16.59L10 18L16 12L10 6L8.59003 7.41Z" fill="rgba(0, 0, 0, 0.1)"/>
          </svg>
        </div>
        <div onClick={clickServiceInfo} className={style.service_info_item}>
          <div>프렌드라이브 이용약관</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M8.59003 7.41L13.17 12L8.59003 16.59L10 18L16 12L10 6L8.59003 7.41Z" fill="rgba(0, 0, 0, 0.1)"/>
          </svg>
        </div>
        <div className={style.service_info_item}>
        <div>버전 정보</div>
        <div style={{color:'rgba(0,0,0,0.3)', paddingRight:'4%', fontSize:'0.9rem'}}>v2.0</div>
        </div>
      </div>
  </div>
  </div>)
}

export default User;