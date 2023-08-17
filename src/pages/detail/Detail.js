import style from './detail.module.css';
import TopNavi from '../../componenets/topNavi/TopNavi';
import { useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

//slick-slider import
import Slider from "react-slick";
import '../../slick-carousel/slick/slick.css';
import '../../slick-carousel/slick/slick-theme.css';
import { useEffect } from 'react';



const Detail = ()=>{
    //해당 컨텐츠 이름에 대응되는 컨텐츠 불러오는 함수.
    const callContents = () =>{}
    const [searchParams, setSearchParams] = useSearchParams();
    const content = searchParams.get("content");

    //navigate로 props 전달받는 코드
    const {state} = useLocation();
    const contents = state.contents; //array
    const subject = state.subject;  //string

    useEffect(()=>{
        //링크로 바로 들어온 경우에는 api로 커리큘럼 호출하여 컨텐트 보여주기.
    },[])
    
    return(
    <section className={style.detail_section}>
        <TopNavi title={content}/>
        <article className={style.contents_box}>

        </article>
    </section>)
}
export default Detail;