import style from './detail.module.css';
import TopNavi from '../../componenets/topNavi/TopNavi';
import { Outlet, useLocation,useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

//slick-slider import
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

const Detail = ()=>{   
    //navigate로 props 전달받는 코드
    const [searchParams, setSearchParams] = useSearchParams();
    const [title, setTitle] = useState(searchParams.get("content")); // 클릭한 컨텐츠 이름 가져옴.
    const [contentHeight, setContentHeight] = useState();
    const navigate = useNavigate();

    // 라우팅 함수
    const goContents = () => {
        navigate(`/detail?content=${title}`,{replace:true})
    }

    const goFeedback = (e) => {
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
    
    useEffect(()=>{
        // const remainSpace = Math.round(document.getElementById('topNavi').getBoundingClientRect().height+document.getElementById('content_tab').getBoundingClientRect().height);
        const remainSpace = Math.round(document.getElementById('topNavi').getBoundingClientRect().height);
        const content_height = Math.round(document.getElementById('detail_section').getBoundingClientRect().height)-remainSpace-30;
        setContentHeight(content_height);
    },[])
   
    return(
    <section id='detail_section' className={style.detail_section}>
        <TopNavi title={title}/>
        <article className={style.contents_box}>
        {/* <div id='content_tab' className={style.contents_tab}>
            <button id='contents' onClick={goContents}>학습</button>
            <button id='feedback' onClick={goFeedback}>평가</button>
        </div> */}
        <Outlet context={[contentHeight]}/>
        </article>
        <div id='arrow' className={style.s1_arrow}>
            <div className={style.scroll_arrow}></div>
        </div>
    </section>)
}

export default Detail;