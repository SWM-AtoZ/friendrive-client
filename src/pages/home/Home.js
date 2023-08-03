import React, { useEffect,useRef,useState } from 'react';
import {useOutletContext, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import style from './home.module.css';
import './slidecustom.css';
import styled from "styled-components";
import axios from 'axios';

//slick-slider import
import Slider from "react-slick";
import '../../slick-carousel/slick/slick.css';
import '../../slick-carousel/slick/slick-theme.css';

function Home() {
  const {curriculum} = useOutletContext().curriculum;
  const [cookies,setCookie,] = useCookies(['token']);
  const navigate = useNavigate();

  const expires = new Date();
  expires.setMonth(expires.getMonth+1);

  const params= new URL(window.location.href).searchParams;
    const code = params.get('code');
    const body = {
        code:code,
        domain:'https://friendrive.net'
    }

    const Login = async () =>{
      axios.post('https://41icjhls1i.execute-api.ap-northeast-2.amazonaws.com/dev/login/kakao', body)
      .then(function (response) {
        setCookie('token', response.data.jwt.accessToken, expires);
        // window.location.href = 'http://localhost:3000/';
        alert('로그인이 되었습니다.');
      })
      .catch(function (error) {
        alert('로그인에 실패하셨습니다.');
        console.log(error);
      }); 
    }

  const [nav1,setNav1] = useState(null)
  const [nav2,setNav2] = useState(null)

  const getTeacherToken = async() => {
    axios.get('https://41icjhls1i.execute-api.ap-northeast-2.amazonaws.com/dev/teacher/token',{
      headers:{
        Authorization: `Bearer ${cookies.token}`
      }
    })
    .then((response)=>{
      console.log(response);
      setCookie('teacherToken', response.data.token, expires);
    })
    .catch((response)=>{
      console.log(response);
    })
  }

  const ShareTeacher = () => {
    const url = `https://friendrive.net/teacher?teachertoken=${cookies.teacherToken}`;
    console.log(url)
    const handleCopyClipBoard = async (uri) => {
        try {
          await navigator.clipboard.writeText(uri);
          alert('클립보드에 링크가 복사되었습니다.');
        } catch (e) {
          alert('복사에 실패하였습니다');
          console.log(e);
        }
    };

    if (navigator.share) {
        navigator.share({
            title: '운전연수 요청',
            text: '운전연수 요청을 받아주세요!',
            url: url,
        });
    }else{
       handleCopyClipBoard(url);
    }
  }

  const isLogin = () => {
    
    if(cookies.token){
     ShareTeacher();
    }
    else{
      alert('로그인이 필요힌 서비스입니다');
      navigate('/login')
    }
  }

  const goToSection = (days) => {
    navigate(`/section`,{state:{section:days}})
  }

  useEffect(()=>{
    if(cookies.token){
      getTeacherToken();
    }
    if(code !== null){
      console.log(code);
         Login();
    }
  },[cookies])

  const settings = {
    dots:true,
    centerMode: true,
    infinite: false,
    adaptiveHeight: true,
    slidesToShow: 1,
    speed: 500,
    appendDots: (dots) => (
      <div
        style={{
          width: '100%',
          position:'absolute',
          bottom:'-8%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
    dotsClass: 'dots_custom'
  };
  
  return (
    <section id={style.home_section}>
      {/* 현재 카드섹션 설명칸 */}
      <div className={style.section_explain}>
        <div>
        <ExplainSlider 
        asNavFor={nav2} 
        ref={(slider1) => setNav1(slider1)}
        fade={true}
        infinite={false}>
        {curriculum.map((item)=>(
          <div className={style.explain_container}>
            <div className={style.section_explain_number}>
              <div className={style.days}>{item.days}</div>
               <div>운전, 그게 뭔데?</div>
            </div>
            <div className={style.section_explain_title}><h1>{item.summary}</h1></div>
            <div className={style.section_explain_discription}>{item.explain}</div>
          </div>
        ))}
        </ExplainSlider>
        </div>
      </div>
      {/* 카드섹션 슬라이드 */}
      <div className={style.section_card_container}>
        <div>
          <CardSlider 
          {...settings} 
          asNavFor={nav1}
          ref={(slider2) => setNav2(slider2)}>
              {curriculum.map((item,idx)=>(
                <div onClick={()=>{goToSection(item.days)}} className={style.section_card_item}>
                  <div className={style.setction_innerbox}>
                    <div></div>
                  </div>
                </div> ))}
          </CardSlider>
        </div>           
      </div>
     <button onClick={isLogin} className={style.request_button}>요청하기</button>
    </section>
  );
}

export default Home;

const ExplainSlider = styled(Slider)`
  position: relative;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
  .slick-slide div {
    cursor: pointer;
  }
`;
const CardSlider = styled(Slider)`
  position: relative;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
  .slick-slide div {
    cursor: pointer;
  }
  .slick-dots li {
    margin:0;

    width:2rem;
    height:2rem;
  }
  .slick-dots li button {
    margin:0;
  }
`;