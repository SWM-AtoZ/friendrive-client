import style from './detail.module.css';
import TopNavi from '../../componenets/topNavi/TopNavi';
import { useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

//slick-slider import
import Slider from "react-slick";
import '../../slick-carousel/slick/slick.css';
import '../../slick-carousel/slick/slick-theme.css';
import { useEffect, useRef, useState } from 'react';
import { faLessThan } from '@fortawesome/free-solid-svg-icons';



const Detail = ()=>{
    //해당 컨텐츠 이름에 대응되는 컨텐츠 불러오는 함수.
    const callContents = () =>{}
    const [searchParams, setSearchParams] = useSearchParams();
    const contentName = searchParams.get("content");
    const contentRef = useRef([]);

    //navigate로 props 전달받는 코드
    const {state} = useLocation();
    const contents = state.contents; //array
    const subject = state.subject;  //string

    

    useEffect(()=>{
        //링크로 바로 들어온 경우에는 api로 커리큘럼 호출하여 컨텐트 보여주기.
        const remainSpace = Math.round(document.getElementById('topNavi').getBoundingClientRect().height+document.getElementById('content_tab').getBoundingClientRect().height);
        const content_height = Math.round(document.getElementById('detail_section').getBoundingClientRect().height)-remainSpace-30;
        for(var i=0; i<contentRef.current.length; i++){
            contentRef.current[i].style.height = `${content_height}px`;
        }
    },[])
    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
      };
    return(
    <section id='detail_section' className={style.detail_section}>
        <TopNavi title={contentName}/>
        <article className={style.contents_box}>
        <div id='content_tab' className={style.contents_tab}>
            <div>학습</div>
            <div>평가</div>
        </div>
        <StyledSlider {...settings}>
            {[1,2,3].map((item,index)=>(
                <div ref={(element) => {
                    contentRef.current[index] = element;
                  }} className={style.content}>
                    <div className={style.content_inner}></div>
                </div>
            ))}
        </StyledSlider>
        </article>
        <div className={style.s1_arrow}>
            <div className={style.scroll_arrow}></div>
        </div>
    </section>)
}
const StyledSlider = styled(Slider)`
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
`;
export default Detail;