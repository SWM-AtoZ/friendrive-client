import React,{useState,useRef, useEffect} from 'react';
import Loading from './pages/loading/Loading';
import { Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Home from './pages/home/Home';

// css파일 임포트
import './App.css';

function App() {
    const[cookies,,] = useCookies([]);
    //const [curriculum, setCurriculum] = useState([]);
    const [checked,setChecked] = useState();
    console.log(checked);
    //curriculum 임시 더미데이터 
    const curriculum = {
      "curriculum": [
          {
              "days": 1,
              "title": "기본 조작하기",
              "question": "오늘부터 운전을 시작해 볼까요?",
              "summary": "넓고 안전한 공간에서 기본 조작을 배우는 시간이에요",
              "explain": "도로에 나가기 전 여러 기능을 조작해 보고 차를 내게 맞도록 조정해야 해요!",
              "imgLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Card/Day1.png"
          },
          {
              "days": 2,
              "title": "핸들링 배우기",
              "question": "핸들링과 차선에 익숙해져 볼까요?",
              "summary": "넓고 안전한 도로에서 기본 주행을 배우는 시간이에요",
              "explain": "도로에서 차선을 맞추며 달리다가 신호와 표지판에 따라 좌/우회전, U턴을 해보아요!",
              "imgLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Card/Day2.png"
          },
          {
              "days": 3,
              "title": "차선변경 익히기",
              "question": "큰 도로에서 다른 차들과 어울려 볼까요?",
              "summary": "여러 차선이 있는 도로에서 차선 변경을 배우는 시간이에요",
              "explain": "아직 좁고 복잡한 도로는 어려울 수 있어요 안전거리를 유지하고 멀리 보며 운전해 보아요!",
              "imgLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Card/Day3.png"
          },
          {
              "days": 4,
              "title": "주행 정복하기",
              "question": "다 왔어요, 혼잡한 도로까지 정복해 볼까요?",
              "summary": "혼잡한 시내와 골목에서 주행을 배우는 시간이에요",
              "explain": "시내와 좁은 골목까지 익숙해진다면 이제 주행은 어렵지 않을 거예요!",
              "imgLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Card/Day4.png"
          },
          {
              "days": 5,
              "title": "주차 마스터하기",
              "question": "주차만 끝내면 베스트 드라이버!",
              "summary": "간격이 넓은 주차장에서 주차를 배우는 시간이에요",
              "explain": "괜찮아요, 주차는 모든 초보가 어려워해요 머릿속으로 그려가며 천천히 연습해 보아요!",
              "imgLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Card/Day5.png"
          }
      ],
      "items": [
          {
              "itemId": "d1i1",
              "day": 1,
              "subject": "운전 자세",
              "content": "https://friendrive.oopy.io/89830ff1-1405-4900-ae56-fc2e61a82e96",
              "iconLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Day1/Item1.png"
          },
          {
              "itemId": "d1i2",
              "day": 1,
              "subject": "미러 조정",
              "content": "https://friendrive.oopy.io/5258db44-1e6b-4063-8497-33d614725662",
              "iconLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Day1/Item2.png"
          },
          {
              "itemId": "d1i3",
              "day": 1,
              "subject": "명칭과 기능",
              "content": "https://friendrive.oopy.io/3b72bb79-0e4f-40e8-a7d7-1a8e563f5cfd",
              "iconLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Day1/Item3.png"
          },
          {
              "itemId": "d1i4",
              "day": 1,
              "subject": "기어 변속",
              "content": "https://friendrive.oopy.io/ecc5293a-cddc-479e-a0e5-8e6413394977",
              "iconLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Day1/Item4.png"
          },
          {
              "itemId": "d1i5",
              "day": 1,
              "subject": "출발",
              "content": "https://friendrive.oopy.io/fe4ef40e-c892-4bbb-8e17-880a7c71c095",
              "iconLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Day1/Item5.png"
          },
          {
              "itemId": "d1i6",
              "day": 1,
              "subject": "제동",
              "content": "https://friendrive.oopy.io/ce6476b4-90f4-4ade-b479-8cad5fa2d905",
              "iconLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Day1/Item6.png"
          },
          {
              "itemId": "d1i7",
              "day": 1,
              "subject": "조향(운전대 조작)",
              "content": "https://friendrive.oopy.io/4300ab25-beba-493f-aca6-d02b996ffeff",
              "iconLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Day1/Item7.png"
          },
          {
              "itemId": "d2i1",
              "day": 2,
              "subject": "차선 맞추기",
              "content": "https://friendrive.oopy.io/2ac0088a-0f74-4286-8464-1d0a978ce20d",
              "iconLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Day2/Item1.png"
          },
          {
              "itemId": "d2i2",
              "day": 2,
              "subject": "거리감",
              "content": "https://friendrive.oopy.io/82deac5a-5f78-465d-ae52-eb6d9ce3df8e",
              "iconLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Day2/Item2.png"
          },
          {
              "itemId": "d2i3",
              "day": 2,
              "subject": "속도감",
              "content": "https://friendrive.oopy.io/6d3a70f3-9636-4afe-b0f5-f778cbd3b4ed",
              "iconLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Day2/Item3.png"
          },
          {
              "itemId": "d2i4",
              "day": 2,
              "subject": "신호등, 표지판 식별",
              "content": "https://friendrive.oopy.io/ee603cf9-5611-420e-8c06-6325afccb86c",
              "iconLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Day2/Item4.png"
          },
          {
              "itemId": "d2i5",
              "day": 2,
              "subject": "좌회전",
              "content": "https://friendrive.oopy.io/f508db00-9ed0-42ba-9fbf-69f7d036e7c7",
              "iconLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Day2/Item5.png"
          },
          {
              "itemId": "d2i6",
              "day": 2,
              "subject": "우회전",
              "content": "https://friendrive.oopy.io/973b891f-8dc2-4005-9585-6485d1dad624",
              "iconLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Day2/Item6.png"
          },
          {
              "itemId": "d2i7",
              "day": 2,
              "subject": "U턴",
              "content": "https://friendrive.oopy.io/8a8745fe-b326-40a4-a087-e2ce92feec03",
              "iconLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Day2/Item7.png"
          },
          {
              "itemId": "d2i8",
              "day": 2,
              "subject": "코너링",
              "content": "https://friendrive.oopy.io/83027694-28e9-4c77-bb68-7dd443f99dbc",
              "iconLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Day2/Item8.png"
          },
          {
              "itemId": "d3i1",
              "day": 3,
              "subject": "안전 거리",
              "content": "https://friendrive.oopy.io/80756fd2-a534-44d8-b210-e12310be5dd9",
              "iconLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Day3/Item1.png"
          },
          {
              "itemId": "d3i2",
              "day": 3,
              "subject": "간선도로 주행 (차선 변경)",
              "content": "https://friendrive.oopy.io/7dd28c32-a6f9-4c1a-b950-34781d66ec5b",
              "iconLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Day3/Item2.png"
          },
          {
              "itemId": "d3i3",
              "day": 3,
              "subject": "고속도로 주행 (차선 변경)",
              "content": "https://friendrive.oopy.io/e8c38d41-c4f0-497c-b1fd-8719f98b4cbd",
              "iconLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Day3/Item3.png"
          },
          {
              "itemId": "d3i4",
              "day": 3,
              "subject": "교차로",
              "content": "https://friendrive.oopy.io/2e4ab3ae-889a-4071-91b0-1f29b87fd05b",
              "iconLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Day3/Item4.png"
          },
          {
              "itemId": "d3i5",
              "day": 3,
              "subject": "엉키는 병목 구간",
              "content": "https://friendrive.oopy.io/741cacff-3758-4e99-b571-e79243aa01c9",
              "iconLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Day3/Item5.png"
          },
          {
              "itemId": "d3i6",
              "day": 3,
              "subject": "양보 운전",
              "content": "https://friendrive.oopy.io/dea2ece2-b434-45a8-b37c-7a69383fd0f4",
              "iconLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Day3/Item6.png"
          },
          {
              "itemId": "d4i1",
              "day": 4,
              "subject": "시내 주행",
              "content": "https://friendrive.oopy.io/fd3e1c62-3622-42d4-9d64-56027dc8b53d",
              "iconLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Day4/Item1.png"
          },
          {
              "itemId": "d4i2",
              "day": 4,
              "subject": "이면도로 주행",
              "content": "https://friendrive.oopy.io/62ec0fd8-2cdf-4a7e-9548-b92eb27484dc",
              "iconLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Day4/Item2.png"
          },
          {
              "itemId": "d4i3",
              "day": 4,
              "subject": "비보호 좌회전",
              "content": "https://friendrive.oopy.io/8e94243e-3cec-45af-baf2-56470069bcb4",
              "iconLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Day4/Item3.png"
          },
          {
              "itemId": "d4i4",
              "day": 4,
              "subject": "신호등 없는 교차로",
              "content": "https://friendrive.oopy.io/702b0c95-cd5c-4568-ba90-9618fce9e3ea",
              "iconLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Day4/Item4.png"
          },
          {
              "itemId": "d5i1",
              "day": 5,
              "subject": "후면 주차",
              "content": "https://friendrive.oopy.io/1d1af233-bacb-4e01-8aac-b30827f9bc80",
              "iconLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Day5/Item1.png"
          },
          {
              "itemId": "d5i2",
              "day": 5,
              "subject": "전면 주차",
              "content": "https://friendrive.oopy.io/48ce89b3-31a1-4d3c-9092-b1c54b930cd1",
              "iconLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Day5/Item2.png"
          },
          {
              "itemId": "d5i3",
              "day": 5,
              "subject": "평행 주차",
              "content": "https://friendrive.oopy.io/1cc5fbaa-50d3-40b9-8358-47d890e03ebb",
              "iconLink": "https://friendrive.s3.ap-northeast-2.amazonaws.com/Day5/Item3.png"
          }
      ]
  }

    // API 받아오기.
    const getCurriculum = async() =>{
        await axios.get("https://41icjhls1i.execute-api.ap-northeast-2.amazonaws.com/dev/curriculum")
        .then(function (response) {
            // setTimeout(()=>{setCurriculum(response.data)},600)
            console.log(response)
            //setCurriculum(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });  
    }
    
    const getChecked = async() =>{
        await axios.get("https://41icjhls1i.execute-api.ap-northeast-2.amazonaws.com/dev/curriculum/checked",{
            headers:{
                Authorization: `Bearer ${cookies.token}`
            }
        })
        .then((response)=>{
           console.log(response)
            console.log('체크데이터를 불러왔습니다.');
            setChecked(response.data);
        })
        .catch((response)=>{
            console.log(response);
        })
    }


    
  	useEffect(() => {
      console.log('안녕2')
      setChecked([]);
      console.log(checked);
      if(!curriculum){
        getCurriculum();
      }   
      if(cookies.token){
            getChecked();
      }
      //setChecked([0,1]);
    }, []);

  
    //모바일 화면에 맞게 화면 높이 조정
    function setScreenSize() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setScreenSize();
    window.addEventListener('resize', setScreenSize);

  return (
    <>
    <section className='section_container'>
      <Home/>
    </section>
    </>

  );
}

export default App;
