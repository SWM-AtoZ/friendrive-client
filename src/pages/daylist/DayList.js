import style from './daylist.module.css';
import '../../global.css';
import TopNavi from '../../componenets/topNavi/TopNavi';
import {useSearchParams,useNavigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import Loading from '../loading/Loading';
import DaylistComponent from '../../componenets/daylist_list/DaylistComponent';
import axios from 'axios';

const DayList = () => {
  const [cookies,,] = useCookies(['token']);
  const [searchParams, setSearchParams] = useSearchParams();
  const [curriculum, setCurriculum] = useState();
  const [allItems, setAllItems] = useState();
  const day = Number(searchParams.get("day"));
  const navigate = useNavigate();

  const getCurriculum = async() =>{
    await axios.get("https://api.friendrive.net/curriculum")
    .then(function (response) {
        setCurriculum(...response.data.curriculum.filter(item => item.days==day));
        setAllItems(response.data.items.filter((item)=>item.day==day));
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });  
}

  //쿠키의 정보를 이용해 로그인 유무를 확인하고 확인 여부에 따라 UI를 다르게 보여준다. 
  //로그인이 되어있다면 checked와 memo,feedback, curriculum을 api로 요청하여 가져와 UI상에 표기해준다.

  //추가버튼 누르면 모달창 띄워주는 이벤트함수
  const addMemo = () =>{}

  //추가 메모를 입력하고 완료를 누르면 서버로 메모내용을 보내고 카드를 최신화 해주는 함수.
  const sendMemo = () =>{}

  //삭제버튼 누르면 카드에서 메모/피드백 삭제하는 함수
  const removeInfo = () =>{}

  //pass 버튼 체크/해지시 진행률 반영하는 함수.
  const changeProgress = () =>{}

 useEffect(()=>{
  getCurriculum();
 },[])
 
  // outlet context의 전역 객체의 items에서 id에 대응하는 항목만 추출

  // 체크된 아이템을 outletContext에서 추출한다.
  
    return(
      <div className='common_list_container'>
          <TopNavi title={`Day ${day}`}/>
          <section className={style.day_list_section}>
          <article className={style.day_info_box}>
            <div className={style.day_info}>
              {curriculum&&curriculum.title}
            </div>
            <div className={style.day_memo}>

            </div>
          </article>
          <article className={style.daylist_box}>
            {allItems?allItems.map((item)=>(
              <DaylistComponent key={item.itenId} subject={item.subject} contents={item.content} icon={item.iconLink}/>
            )):<Loading/>}
          </article>
          </section>
        </div>
   )
}

export default DayList;