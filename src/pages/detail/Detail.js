import style from './detail.module.css';
import TopNavi from '../../componenets/topNavi/TopNavi';
import { Outlet, useLocation,useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

//slick-slider import
import { useEffect, useState } from 'react';

const Detail = ()=>{   
    //navigate로 props 전달받는 코드
    const [searchParams, setSearchParams] = useSearchParams();
    const [title, setTitle] = useState(searchParams.get("content")); // 클릭한 컨텐츠 이름 가져옴.
    const [contents, setContents] = useState();
    const [contentHeight, setContentHeight] = useState();
    const navigate = useNavigate();

    //해당 컨텐츠 이름에 대응되는 컨텐츠 불러오는 함수, 링크로 접속할 경우 대비
    const callContents = () =>{
        //api 호출 후 아이템중 컨텐트title과 일치하는 것만 빼움
        axios.get("https://api.friendrive.net/curriculum")
        .then(function (response) {
        setContents(response.data.items.filter((item)=>item.subject===title));
      })
      .catch(function (error) {
        console.log(error);
      });  
    }

    // 라우팅 함수
    const goContents = () => {
        navigate(`/detail?content=${title}`,{
            replace:true,
            state:{contents:contents}})
    }

    const goFeedback = () => {
        // navigate(`feedback`, {
        //     replace:true,
        //     state:{contents:contents, subject:subject}})
        alert('서비스 준비중입니다.')
    }
    
    useEffect(()=>{
        //링크로 바로 들어온 경우에는 api로 커리큘럼 호출하여 컨텐트 보여주기.
        callContents();
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