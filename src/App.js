import React, { useEffect,useRef,useState } from 'react';
import {Outlet, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import style from './App.module.css';
import community from './community.png';
import curriculumImg from './curriculum_btnimg.png';
import { isMobile, isTablet, isIOS } from 'react-device-detect';
import axios from 'axios';

function App() {
  if(!navigator.onLine){
    alert('인터넷이 연결되어있지 않습니다.')
  }
  const Curriculum_btnRef = useRef();
  const RequestRef = useRef();
  const ComunnityRef = useRef();
  const EventRef = useRef();

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
        //데스크탑 환경에서 사용하는경우
        await navigator.clipboard.writeText(uri);
        if(!isMobile){
          alert('클립보드에 선생님 페이지가 복사되었습니다. 선생님께 연수를 요청드려보세요!');
        }
       
      } catch (e) {
        // 안드로이드 웹뷰 환경에서 사용하는경우
        const element = document.createElement('textarea');
        element.value = uri;
        element.setAttribute('readonly', '');
        element.style.position = 'fixed';
        element.style.opacity = '0';
        document.body.appendChild(element);
        element.select();
        const copyValue = document.execCommand('copy');
        document.body.removeChild(element);
        console.log(e);
        alert('실험 얼럿창');
      }
   };
  
  const ShareTeacher = async () => {
    let teacherToken = ""
    await axios.get('https://api.friendrive.net/teacher/token',{
      headers:{
        Authorization: `Bearer ${cookies.token}`
      }
    })
    .then((response)=>{
      teacherToken = response.data.token;
      console.log(teacherToken);
    })
    .catch((response)=>{
      console.log(response);
    })

    const url = `https://friendrive.net/teacherhome?teachertoken=${teacherToken}`;
    
    if(isMobile) {
      try{  //플러터 모바일 앱에서 공유하기 실행하는 경우
        if(isTablet&&isIOS){
          handleCopyClipBoard(url);
        }
        else{
          /* eslint-disable */
          shareText.postMessage(url);
        }
      }catch(e){
        //모바일 브라우저 또는 모바일 웹뷰에서 실행하는 경우
        if (navigator.share){
          navigator.share({
              title: `${user}님의 운전연수 요청!`,
              text: `${user}님의 초보 탈출을 도와주세요!`,
              url: url,
          })
          .then(response=>{
            console.log(response);
          })
          .catch(response=>{
            console.log(response)
          })
      }else{
         //안드로이드 웹뷰환경
         handleCopyClipBoard(url);
      }
      }
    }
    else if(!isMobile){
      //데스크탑 환경에서 실행하는 경우
      if (navigator.share) {
        navigator.share({
            title: `${user}님의 운전연수 요청!`,
            text: `${user}님의 초보 탈출을 도와주세요!`,
            url: url,
        })
        .then(response=>{
          console.log(response);
        })
        .catch(response=>{
          console.log(response)
        })
    }else{
       handleCopyClipBoard(url);
    }
    }

     
  } 
  // 로그연 여부 확인 후 공유 또는 로그인 화면 이동.
  const isLogin = async() => {
    if(cookies.token){
   await axios.get("https://api.friendrive.net/user/info", {
          headers: {
              Authorization: `Bearer ${cookies.token}`
          }
      }).then(function (response) {
          user = response.data.name;
        })
        .catch(function (error) {
          console.log(error);
        });  

      await ShareTeacher();
    }
    else{
      if(!isMobile){
        const loginConfirm = window.confirm('로그인이 필요한 서비스입니다. 로그인 하시겠습니까?')
        if(loginConfirm){
          navigate('/login')
        }
      }
      else{
        navigate('confirm',{
          state:{
            message_title:'로그인 필요 서비스입니다',
            message_description:'로그인 하시겠습니까?',
            Islogout : false
          }
        });
      }
    }
  }

  const goToUser = () => {
    //유저페이지로 이동하는 함수.
    navigate('user');
  }

  const goToCurriculum = (e) => {
    console.log(e);
    navigate('curriculum');
    //이벤트가 발생했을 때 임의의 css효과를 발동시키고싶다.
  }

  const goToCommunity = () => {
    if(!isMobile){
      alert('서비스 준비중입니다.');
      //추후 PC는 모달로 교체
    }
    else{
      navigate('alert',{
        state:{
          message_title:'서비스 준비중입니다.',
          message_description:'좋은 서비스로 찾아 뵙겠습니다'
        }
      });
    }
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
        <svg width="2rem" height="2rem" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M326.14 291.124L321.775 295.431C321.727 295.478 321.684 295.53 321.647 295.585L321.522 295.772C321.486 295.825 321.445 295.875 321.399 295.921L256.396 360.935C256.005 361.327 255.369 361.325 254.979 360.932L207.839 313.377C207.452 312.986 207.453 312.355 207.842 311.966L264.275 255.534C264.465 255.343 264.57 255.085 264.568 254.816L263.742 176.792C263.735 176.177 263.146 175.713 262.687 176.122C262.657 176.149 262.628 176.177 262.599 176.206L169.772 269.033C169.306 269.498 168.524 269.394 168.205 268.818C160.962 255.745 157 241.101 157 225.844C157 172.781 202.982 126 255.5 126C309.507 126 355 172.277 355 223.844C355 249.205 344.337 273.168 326.14 291.124ZM369.416 335.585C369.495 335.506 369.566 335.424 369.629 335.339C369.669 335.285 369.711 335.233 369.758 335.186C398.861 306.434 417 266.927 417 223.844C417 137.602 343.313 64 255.5 64C167.687 64 95 139.602 95 225.844C95 271.262 115.436 312.151 147.609 340.685L254.013 448.025C254.832 448.851 256.166 448.854 256.989 448.031L369.416 335.585Z" fill="#00A2E8"/>
        </svg>
        <div>프렌드라이브</div>
        </div>
        <div onClick={goToUser} className={style.header_userbtn}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1.7rem" height="1.7rem" viewBox="0 0 25 25" fill="none">
          <path d="M20.1431 21.0928C18.3933 18.7834 15.6208 17.2917 12.5 17.2917C9.37916 17.2917 6.60675 18.7834 4.85692 21.0928M20.1431 21.0928C22.5095 18.9864 24 15.9173 24 12.5C24 6.14873 18.8513 1 12.5 1C6.14873 1 1 6.14873 1 12.5C1 15.9173 2.49053 18.9864 4.85692 21.0928M20.1431 21.0928C18.1114 22.9013 15.434 24 12.5 24C9.56601 24 6.88865 22.9013 4.85692 21.0928M16.3333 9.625C16.3333 11.7421 14.6171 13.4583 12.5 13.4583C10.3829 13.4583 8.66667 11.7421 8.66667 9.625C8.66667 7.50791 10.3829 5.79167 12.5 5.79167C14.6171 5.79167 16.3333 7.50791 16.3333 9.625Z" stroke="rgba(0, 0, 0, 0.40)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
      </header>
      <article className={style.home_article}>
      <button ref={Curriculum_btnRef} onTouchStart={()=>{Curriculum_btnRef.current.style.backgroundColor='rgba(0, 0, 0, 0.05)';}} onTouchMove={()=>{Curriculum_btnRef.current.style.backgroundColor='#F8FBFC'; 
      }} onTouchEnd={()=>{Curriculum_btnRef.current.style.backgroundColor='#F8FBFC';}} onClick={()=>{goToCurriculum()}} className={style.curriculum_btn}>
        <div className={style.login_activation}>
          <div className={style.login_textArea}>
            <div>
              <div className={style.testArea_title}>운전 가이드</div>
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
      </button>
     <button  ref={RequestRef} onTouchStart={()=>{RequestRef.current.style.backgroundColor='rgba(0, 0, 0, 0.05)'}} onTouchMove={()=>{RequestRef.current.style.backgroundColor='#F8FBFC';}} onTouchEnd={()=>{RequestRef.current.style.backgroundColor='#F8FBFC';}} onClick={()=>{isLogin()}} className={style.curriculum_request_btn}>
      <div>운전 연수 요청하기</div>
      <div>공유 링크 보내고 지인에게 요청하기</div>
     </button>
     <div className={style.etc_box}>
      <button ref={ComunnityRef} onTouchStart={()=>{ComunnityRef.current.style.backgroundColor='rgba(0, 0, 0, 0.05)'}} onTouchMove={()=>{ComunnityRef.current.style.backgroundColor='#F8FBFC';}} onTouchEnd={()=>{ComunnityRef.current.style.backgroundColor='#F8FBFC';}} onClick={()=>{goToCommunity()}} className={style.community_btn}>
        <div>커뮤니티</div>
        <div>
          <img src={community}/>
        </div>
      </button>
      <button ref={EventRef} onTouchStart={()=>{EventRef.current.style.backgroundColor='rgba(0, 0, 0, 0.05)'}} onTouchMove={()=>{EventRef.current.style.backgroundColor='#F8FBFC';}} onTouchEnd={()=>{EventRef.current.style.backgroundColor='#F8FBFC';}} onClick={()=>{goToEventPage()}} className={style.event_btn}>
        <div>이벤트</div>
        <div>
        <div>서비스 피드백을 남겨주세요</div>
        <div>추첨을 통해 기프티콘을 드립니다.</div>
        </div>
      </button>
     </div>
      </article>
      {/* 알럿,컨펌창 예외처리를 위한 outletContext 공백처리 */}
      <Outlet context={{}}/>
    </section>
  );
}

export default App;
