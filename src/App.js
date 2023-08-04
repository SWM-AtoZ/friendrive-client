import React,{useState,useRef, useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

// 컴포넌트 임포트
import Nav from './componenets/nav/Nav';

// css파일 임포트
import './App.css';

function App() {
    const[cookies,,] = useCookies([]);
    const [data, setData] = useState([]);
    const [checkedItem, setchecked] = useState([]);


    // API 받아오기.
    const getCurriculum = async() =>{
        await axios.get("https://41icjhls1i.execute-api.ap-northeast-2.amazonaws.com/dev/curriculum")
        .then(function (response) {
            setData(response.data);
            console.log(response);
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
            setchecked(response.data);
           console.log(response)
            console.log('체크데이터를 불러왔습니다.');
        })
        .catch((response)=>{
            console.log(response);
        })
    }
    
  	useEffect(() => {
		getCurriculum();
        if(cookies.token){
            getChecked();
        }
    }, []);

    //추후 해당 더미데이터와 동명으로 API데이터로 교체 예정
    const curriculum = {
        "curriculum": [
            {
                "days": 1,
                "title": "기본 조작하기",
                "question": "오늘부터 운전을 시작해 볼까요?",
                "summary": "넓고 안전한 공간에서 기본 조작을 배우는 시간이에요",
                "explain": "도로에 나가기 전 여러 기능을 조작해 보고|차를 내게 맞도록 조정해야 해요!"
            },
            {
                "days": 2,
                "title": "핸들링 배우기",
                "question": "핸들링과 차선에 익숙해져 볼까요?",
                "summary": "넓고 안전한 도로에서 기본 주행을 배우는 시간이에요",
                "explain": "도로에서 차선을 맞추며 달리다가 신호와 표지판에 따라|좌/우회전, U턴을 해보아요!"
            },
            {
                "days": 3,
                "title": "차선변경 익히기",
                "question": "큰 도로에서 다른 차들과 어울려 볼까요?",
                "summary": "여러 차선이 있는 도로에서 차선 변경을 배우는 시간이에요",
                "explain": "아직 좁고 복잡한 도로는 어려울 수 있어요 안전거리를|유지하고 멀리 보며 운전해 보아요!"
            },
            {
                "days": 4,
                "title": "주행 정복하기",
                "question": "다 왔어요, 혼잡한 도로까지 정복해 볼까요?",
                "summary": "혼잡한 시내와 골목에서 주행을 배우는 시간이에요",
                "explain": "시내와 좁은 골목까지 익숙해진다면 이제 주행은|어렵지 않을 거예요!"
            },
            {
                "days": 5,
                "title": "주차 마스터하기",
                "question": "주차만 끝내면 베스트 드라이버!",
                "summary": "간격이 넓은 주차장에서 주차를 배우는 시간이에요",
                "explain": "괜찮아요, 주차는 모든 초보가 어려워해요|머릿속으로 그려가며 천천히 연습해 보아요!"
            }
        ],
    "items": [
        {
            "itemId": "d1i1",
            "day": 1,
            "subject": "운전자세",
            "content": [
                [
                    "https://paillo.tistory.com",
                    "문석이 블로그"
                ],
                [
                    "https://youtube.com",
                    "네이버"
                ]
            ]
        },
        {
            "itemId": "d1i2",
            "day": 1,
            "subject": "내부조작",
            "content": [
                [
                    "https://paillo.tistory.com",
                    "문석이 블로그"
                ],
                [
                    "https://youtube.com",
                    "네이버"
                ]
            ]
        },
        {
            "itemId": "d2i1",
            "day": 2,
            "subject": "좌회전",
            "content": [
                [
                    "https://paillo.tistory.com",
                    "문석이 블로그"
                ],
                [
                    "https://youtube.com",
                    "네이버"
                ]
            ]
        },
        {
            "itemId": "d2i2",
            "day": 2,
            "subject": "우회전",
            "content": [
                [
                    "https://paillo.tistory.com",
                    "문석이 블로그"
                ],
                [
                    "https://youtube.com",
                    "네이버"
                ]
            ]
        }, 
        {
            "itemId": "d3i1",
            "day": 3,
            "subject": "운전자세",
            "content": [
                [
                    "https://paillo.tistory.com",
                    "문석이 블로그"
                ],
                [
                    "https://youtube.com",
                    "네이버"
                ]
            ]
        },
        {
            "itemId": "d3i2",
            "day": 3,
            "subject": "운전자세",
            "content": [
                [
                    "https://paillo.tistory.com",
                    "문석이 블로그"
                ],
                [
                    "https://youtube.com",
                    "네이버"
                ]
            ]
        },
        {
            "itemId": "d4i1",
            "day": 4,
            "subject": "운전자세",
            "content": [
                [
                    "https://paillo.tistory.com",
                    "문석이 블로그"
                ],
                [
                    "https://youtube.com",
                    "네이버"
                ]
            ]
        },
        {
            "itemId": "d4i2",
            "day": 4,
            "subject": "운전자세",
            "content": [
                [
                    "https://paillo.tistory.com",
                    "문석이 블로그"
                ],
                [
                    "https://youtube.com",
                    "네이버"
                ]
            ]
        },
        {
            "itemId": "d5i1",
            "day": 5,
            "subject": "운전자세",
            "content": [
                [
                    "https://paillo.tistory.com",
                    "문석이 블로그"
                ],
                [
                    "https://youtube.com",
                    "네이버"
                ]
            ]
        },
        {
            "itemId": "d5i2",
            "day": 5,
            "subject": "운전자세",
            "content": [
                [
                    "https://paillo.tistory.com",
                    "문석이 블로그"
                ],
                [
                    "https://youtube.com",
                    "네이버"
                ]
            ]
        },
    ]
    }
    const checked = {
        "userId": 8,
        "checkedItem": [
             "d1i1",
            "d2i1",
            "d3i1",
            "d4i1",
            "d5i1"
    ]
    }

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
      <Outlet context={{curriculum, checked}}/>
    </section>
    <Nav/>
    </>

  );
}

export default App;
