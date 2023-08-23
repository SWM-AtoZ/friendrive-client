import style from './detail.module.css';
import TopNavi from '../../componenets/topNavi/TopNavi';
import { Outlet, useLocation,useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

//slick-slider import
import { useEffect, useState } from 'react';

const Detail = ()=>{   
    //navigate로 props 전달받는 코드
    const {state} = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [title, setTitle] = useState(searchParams.get("content"));
    const [contents, setContents] = useState(state.contents);
    const [subject, setSubject] = useState(state.subject);
    const [contentHeight, setContentHeight] = useState();
    const navigate = useNavigate();

    //해당 컨텐츠 이름에 대응되는 컨텐츠 불러오는 함수, 링크로 접속할 경우 대비
    const callContents = () =>{}

    // 라우팅 함수
    const goContents = () => {
        navigate(`/detail?content=${title}`,{
            replace:true,
            state:{contents:contents, subject:subject}})
    }

    const goFeedback = () => {
        // navigate(`feedback`, {
        //     replace:true,
        //     state:{contents:contents, subject:subject}})
        alert('서비스 준비중입니다.')
    }
    
    useEffect(()=>{
        //링크로 바로 들어온 경우에는 api로 커리큘럼 호출하여 컨텐트 보여주기.
        const remainSpace = Math.round(document.getElementById('topNavi').getBoundingClientRect().height+document.getElementById('content_tab').getBoundingClientRect().height);
        const content_height = Math.round(document.getElementById('detail_section').getBoundingClientRect().height)-remainSpace-30;
        setContentHeight(content_height);
    },[])
   
    return(
    <section id='detail_section' className={style.detail_section}>
        <TopNavi title={title}/>
        <article className={style.contents_box}>
        <div id='content_tab' className={style.contents_tab}>
            <button id='contents' onClick={goContents}>학습</button>
            <button id='feedback' onClick={goFeedback}>평가</button>
        </div>
        <Outlet context={[contentHeight]}/>
        </article>
        <div id='arrow' className={style.s1_arrow}>
            <div className={style.scroll_arrow}></div>
        </div>
    </section>)
}

export default Detail;