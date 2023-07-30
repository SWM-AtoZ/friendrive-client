import React, { useEffect,useRef,useState } from 'react';
import { Link, useOutletContext, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import style from './home.module.css';
import axios from 'axios';

//slick-slider import
import Slider from "react-slick";
import '../../slick-carousel/slick/slick.css';
import '../../slick-carousel/slick/slick-theme.css';

function Home() {
  const {curriculum} = useOutletContext().curriculum;
  const {data, checkedItem} = useOutletContext();
  const [cookies,setCookie,] = useCookies(['token']);
  const navigate = useNavigate();
  const expires = new Date();
  expires.setMonth(expires.getMonth+1);

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

  const isLogin = () => {
    navigate('/request')
    // if(cookies.token){
    //   navigate('/request')
    // }
    // else{
    //   alert('로그인이 필요힌 서비스입니다');
    //   navigate('/login')
    // }
  }

  const ShareTeacher = () => {
    if (navigator.share) {
        navigator.share({
            title: '기록하며 성장하기',
            text: 'Hello World',
            url: 'https://naver.com',
        });
    }else{
        alert("공유하기가 지원되지 않는 환경 입니다.")
    }
  }
  const goToSection = (days) => {
    navigate(`/section`,{state:{section:days}})
  }
  useEffect(()=>{
    if(cookies.token){
      getTeacherToken();
    }
  },[])

  const settings = {
    dots:true,
    centerMode: true,
    infinite: false,
    centerPadding: "50px",
    adaptiveHeight: true,
    slidesToShow: 1,
    speed: 500
  };
  
  return (
    <section id={style.home_section}>
      {/* 현재 카드섹션 설명칸 */}
      <div className={style.section_explain}>
        <Slider 
        asNavFor={nav2} 
        ref={(slider1) => setNav1(slider1)}
        fade={true}>
        {curriculum.map((item)=>(
          <div className={style.explain_container}>
            <div className={style.section_explain_number}>{item.days} 운전, 그게 뭔데?</div>
            <div className={style.section_explain_title}><h1>{item.summary}</h1></div>
            <div className={style.section_explain_discription}>{item.explain}</div>
          </div>
        ))}
        </Slider>
      </div>
      {/* 카드섹션 슬라이드 */}
      <div className={style.section_card_container}>
        <div>
          <Slider 
          {...settings} 
          asNavFor={nav1}
          ref={(slider2) => setNav2(slider2)}>
              {curriculum.map((item,idx)=>(
                <div onClick={()=>{goToSection(item.days)}} className={style.section_card_item}>
                  <div className={style.setction_innerbox}>
                    <div>{item.title}</div>
                  </div>
                </div> ))}
          </Slider>
        </div>           
      </div>
     <button onClick={isLogin} className={style.request_button}>요청하기</button>
     <button className={style.share_button} onClick={ShareTeacher}>공유하기</button>
    </section>
  );
}

export default Home;

