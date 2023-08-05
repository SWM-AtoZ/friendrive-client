import React, { useEffect,useRef,useState } from 'react';
import {useOutletContext, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import style from './home.module.css';
import './slidecustom.css';
import styled from "styled-components";
import axios from 'axios';
import day1 from './dayimg/day1.png';
import day2 from './dayimg/day2.png';
import day3 from './dayimg/day3.png';
import day4 from './dayimg/day4.png';
import day5 from './dayimg/day5.png';

//slick-slider import
import Slider from "react-slick";
import '../../slick-carousel/slick/slick.css';
import '../../slick-carousel/slick/slick-theme.css';

function Home() {
  const dayImg = [day1,day2,day3,day4,day5];
  const  curriculumData= useOutletContext().curriculum;
  const curriculum = curriculumData.curriculum;

  const [cookies,setCookie,] = useCookies(['token']);
  var user='';
  const navigate = useNavigate();

  const [nav1,setNav1] = useState(null)
  const [nav2,setNav2] = useState(null)

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
      })
      .catch(function (error) {
        alert('로그인에 실패하셨습니다.');
        console.log(error);
      }); 
    }
    
    const handleCopyClipBoard = async (uri) => {
      try {
        await navigator.clipboard.writeText(uri);
        alert('클립보드에 링크가 복사되었습니다.');
      } catch (e) {
        alert('복사에 실패하였습니다');
        console.log(e);
      }
   };

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

  const goToSection = (days) => {
    navigate(`/section`,{state:{section:days}})
  }

  useEffect(()=>{
    if(code !== null){
      console.log(code);
         Login();
    }
  },[])

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
          bottom:'-20%',
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
              <div className={style.days}>
                <div>{item.days}</div>
                </div>
               <div>{item.question}</div>
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
                    <div className={style.day_days}>Day {item.days}</div>
                    <div className={style.day_img}>
                      <img src={dayImg[idx]}/>
                    </div>
                    <div className={style.day_info}>
                      <div className={style.day_title}>{item.title}</div>
                      <button className={style.go_section}>GO</button>
                    </div>
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
    width:90px;
    height:90px;
  }
  .slick-dots li button {
    margin:0;
  }
`;