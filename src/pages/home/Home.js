import React, { useEffect,useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import style from './home.module.css';
import community from './community.png';
import curriculumImg from './curriculum_btnimg.png';
import Loading from '../loading/Loading';
import axios from 'axios';

//커리큘럼 프로그래스바, 서비스 피드백 페이지로 이동하는 기능 추가, UI 추가.
function Home() {
  const total = 28; // 총 커리큘럼 갯수
  const [TotalCheckedNumb, setTotalCheckedNumb] = useState();
  const [color, setColor] = useState('');
  const [progress, setProgress] = useState(0);
  const [cookies,,] = useCookies(['token']);
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

    const getChecked = async() =>{
        await axios.get(`https://api.friendrive.net/curriculum/checked`,{
            headers:{
                Authorization: `Bearer ${cookies.token}`
            }
        })
        .then((response)=>{
          setTotalCheckedNumb(prev=>response.data.checkedItem.length);
          
        })
        .catch((response)=>{
            console.log(response);
        })
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

  const goToUser = () => {
    //유저페이지로 이동하는 함수.
    navigate('user');
  }

  const goToCurriculum = () => {
    navigate('curriculum');
  }

  const goToCommunity = () => {
    // navigate('community');
    alert('서비스 준비중입니다');
  }

  const goToEventPage = () => {
    navigate('serviceFeedback');
  }

  useEffect(()=>{
    //로그인이 되있는 경우 chekedItem 갯수를 불러와 진행율 계산
    if(cookies.token){
      getChecked();
    }
    setProgress(prev=>Math.floor((TotalCheckedNumb/total*100)));

          if(Math.floor((TotalCheckedNumb/total*100<=15))){
            setColor('#FF0000');
          }
          else if(Math.floor((TotalCheckedNumb/total*100<=15))<=75){
            setColor('#FFE300');
          }
          else{
            setColor('#389300');
          }
  },[TotalCheckedNumb])
 
  return (
    <section id={style.home_section}>
      <header className={style.home_header}>
        <div className={style.header_logo}>
        <div>프렌드라이브</div>
        </div>
        <div onClick={goToUser} className={style.header_userbtn}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 25 25" fill="none">
          <path d="M20.1431 21.0928C18.3933 18.7834 15.6208 17.2917 12.5 17.2917C9.37916 17.2917 6.60675 18.7834 4.85692 21.0928M20.1431 21.0928C22.5095 18.9864 24 15.9173 24 12.5C24 6.14873 18.8513 1 12.5 1C6.14873 1 1 6.14873 1 12.5C1 15.9173 2.49053 18.9864 4.85692 21.0928M20.1431 21.0928C18.1114 22.9013 15.434 24 12.5 24C9.56601 24 6.88865 22.9013 4.85692 21.0928M16.3333 9.625C16.3333 11.7421 14.6171 13.4583 12.5 13.4583C10.3829 13.4583 8.66667 11.7421 8.66667 9.625C8.66667 7.50791 10.3829 5.79167 12.5 5.79167C14.6171 5.79167 16.3333 7.50791 16.3333 9.625Z" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
      </header>
      <article className={style.home_article}>
      <div onClick={goToCurriculum} className={style.curriculum_btn}>
        
        <div className={style.login_activation}>
          <div className={style.login_textArea}>
            <div>
              <div>운전 가이드</div>
            </div>
            <div>
              <div>{cookies.token&&TotalCheckedNumb?`${TotalCheckedNumb} / 28 과목 (완주까지 ${progress}%)`:`0 / 28 과목`}</div>
            <div className={style.progress_bar}>
              <div style={{backgroundColor:`${color}`, width:`${progress?progress:0}%`}}></div>
            </div>
            <div>{cookies.token?'':'완주율 확인은 로그인이 필요해요!'}</div>
            </div>
          </div>
          <div className={style.login_pictogramArea}>
            <img src={curriculumImg}/>
          </div>
        </div>
      </div>
     <div onClick={isLogin} className={style.curriculum_request_btn}>
      <div>커리큘럼 같이하기</div>
      <div>공유 링크 보내고 지인에게 요청하기</div>
     </div>
     <div className={style.etc_box}>
      <div onClick={goToCommunity} className={style.community_btn}>
        <div>커뮤니티</div>
        <div>픽토그램</div>
      </div>
      <div onClick={goToEventPage} className={style.event_btn}>
        <div>이벤트</div>
        <div>서비스 피드백을 남겨주세요</div>
        <div>추첨을 통해 기프티콘을 드립니다.</div>
      </div>
     </div>
      </article>
    </section>
  );
}

export default Home;

