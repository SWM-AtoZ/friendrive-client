import style from './daylist.module.css';
import { styled } from 'styled-components';
import '../../global.css';
import TopNavi from '../../componenets/topNavi/TopNavi';
import {useSearchParams} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect, useRef, useState } from 'react';
import Loading from '../loading/Loading';
import DaylistComponent from '../../componenets/daylist_list/DaylistComponent';
import DayinfoTitle from '../../componenets/daylist_day_info/DayinfoTitle';
import MemoComponent from '../../componenets/memo_component/MemoComponent';
import AddMemoComponent from '../../componenets/memo_component/AddMemoComponent';

import Slider from 'react-slick';
import '../../slick-carousel/slick/slick.css';
import '../../slick-carousel/slick/slick-theme.css';
import axios from 'axios';

const DayList = () => {
  const [cookies,,] = useCookies(['token']);
  const [searchParams, setSearchParams] = useSearchParams();
  const [checkedItem, setChecked] = useState();
  const [curriculum, setCurriculum] = useState();
  const [allItems, setAllItems] = useState();
  const memoBoxRef = useRef();
  const [memoBoxWidth, setmemoBoxWidth] = useState(0);
  const [memoBoxHeight,setmemoBoxHeight] = useState(0);
  const [memos, setMemo] = useState([]);
  const day = Number(searchParams.get("day"));

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
const getChecked = async() =>{
  await axios.get(`https://api.friendrive.net/curriculum/checked/${day}`,{
      headers:{
          Authorization: `Bearer ${cookies.token}`
      }
  })
  .then((response)=>{
      setChecked(response.data.checkedItem);
  })
  .catch((response)=>{
      console.log(response);
  })
}
const getMemo = () =>{
    axios.get(`https://api.friendrive.net/record/${day}`,{
      headers : {
        Authorization: `Bearer ${cookies.token}`
      }
    })
    .then((response)=>{
      console.log(response)
      setMemo(response.data);
    })
    .catch((response)=>{
      console.log(response);
    })
  }

 useEffect(()=>{
  getCurriculum();
  setmemoBoxWidth(prev=>memoBoxRef.current.offsetWidth);
  setmemoBoxHeight(prev=>memoBoxRef.current.offsetHeight);
  if(cookies.token){
    getChecked();
    getMemo();
  }
 },[])
 
  const Settings = {
    infinite: true,
    speed: 500,
    slideToShow: 1,
    slideToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000,
    dots: true,
    appendDots: (dots) => (
      <div
        style={{
          width: '100%',
          position: 'absolute',
          bottom: '2%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
    dotsClass: 'dots_custom'
  }
  const StyledSlider = styled(Slider)`
  .slick-list{
    z-index : 1;
  }

  .slick-arrow{
    display:none;
  }
  .slick-prev,
  .slick-next{
    opacity: 0;
    display: none;
  }
  .dots_custom {
    display: inline-block;
    z-index : 0;
    vertical-align: middle;
    margin: auto 0;
    padding: 0;
  }
  
  .dots_custom li {
    list-style: none;
    cursor: pointer;
    display: inline-block;
    margin: 0 2px;
    padding: 0;
  }
  
  .dots_custom li button {
    border: none;
    background: #d1d1d1;
    color: transparent;
    cursor: pointer;
    display: block;
    height: 8px;
    width: 8px;
    border-radius: 100%;
    padding: 0;
  }
  
  .dots_custom li.slick-active button {
    background-color: #08c1ce;
  }
} 
`;
    return(
      <div className='common_list_container'>
          <TopNavi title={`Day ${day}`}/>
          <section className={style.day_list_section}>
            <div className={style.info_container}>
            <article className={style.day_info_box}>
            <div className={style.day_info}>
              {cookies.token?(//chekedItem을 넣어준다.
                <DayinfoTitle day={day} title={curriculum&&curriculum.title} dayprocess={checkedItem&&checkedItem.length}/>
              ):(<DayinfoTitle day={day} title={curriculum&&curriculum.title} dayprocess={0}/>)}
            </div>
            <div ref={memoBoxRef} className={style.day_memo}>
              {cookies.token?
                (
                <div className={style.memoBox_container}>
                    {memos.length>0?(
                    <StyledSlider {...Settings}>
                      {memos.map((item)=><MemoComponent key={item.id} setMemos={setMemo} memo_article={item.feedbackAndMemo} writing_time={item.createdAt}is_feedback={item.isFeedback}teacher_name={item.name} memo_id={item.id} width={memoBoxWidth} height={memoBoxHeight} />)}
                      <div>
                        <AddMemoComponent setMemos={setMemo} width={memoBoxWidth} height={memoBoxHeight} day={day} innertext={`메모 추가하기`}/>
                      </div>
                    </StyledSlider>
                    ):(<AddMemoComponent setMemos={setMemo} width={memoBoxWidth} height={memoBoxHeight} day={day} innertext={'메모 또는 피드백이 없습니다.'}/>)
                    }
                </div>
                ):
                (
                  <AddMemoComponent setMemos={setMemo} width={memoBoxWidth} height={memoBoxHeight} day={day} innertext={'메모, 피드백 보기는 로그인 이후 이용가능합니다.'}/>
                )}
            </div>
          </article>
            </div>
          <article className={style.daylist_box}>
            {cookies.token?
            (allItems&&checkedItem?allItems.map((item)=>{
              var check=false;
              if(checkedItem){
                if(cookies.token && checkedItem.includes(item.itemId)){
                  check = true;
                }
              }
              return (
              <DaylistComponent key={item.itemId} subject={item.subject} contents={item.content} icon={item.iconLink} check={check} itemId={item.itemId} checkedItem={checkedItem} setChecked={setChecked} day={day}/>
            )}):<Loading/>):
            (allItems?allItems.map((item)=>{
              var check=false;
              return (
              <DaylistComponent key={item.itemId} subject={item.subject} contents={item.content} icon={item.iconLink} check={check} itemId={item.itemId} checkedItem={checkedItem} setChecked={setChecked} day={day}/>
            )}):<Loading/>)}
          </article>
          </section>
        </div>
   )
}

export default DayList;