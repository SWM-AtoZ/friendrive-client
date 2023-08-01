import style from './detail.module.css';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import { useRef } from 'react';
import DetailList from '../../componenets/detailList/DetailList';
import TopNavi from '../../componenets/topNavi/TopNavi';
import '../home/slidecustom.css';

//slick-slider import
import Slider from "react-slick";
import '../../slick-carousel/slick/slick.css';
import '../../slick-carousel/slick/slick-theme.css';

const PrevBtn = (props) =>{
  
return(
    <div onClick={props.prev} className={style.prev_btn}>
        <div className={style.btn_text}>이전</div>
    </div>
)
}

const NextBtn = (props) =>{
    return(
        <div onClick={props.next} className={style.next_btn}>
            <div className={style.btn_text}>다음</div>
        </div>
    )
}


const Detail = ()=>{
    let sliderRef = useRef(null);

    const next = () => {
        sliderRef.slickNext();
      };
      const previous = () => {
        sliderRef.slickPrev();
      };

    const location = useLocation();
    const settings = {
        dots: true,
        arrow:false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: (dots) => (
          <div
            style={{
              width: '100%',
              position:'absolute',
              bottom:'-8%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ul> {dots} </ul>
          </div>
        ),
        dotsClass: 'dots_custom'
      };

    // location객체로부터 클릭한 아이템의 정보 추출
    const item = location.state;
    const title = item.title; // 디테일 페이지 제목
    const contents = item.content; //디테일 페이지 콘텐츠

    
    return(
    <div className={style.detail_section}>
      <TopNavi title={title}/>
      <div className={style.content_container}>
        <StyledSlider ref={slider => {
          sliderRef = slider;
        }}
        {...settings}>
            {contents.map((item)=>(
                <DetailList img={item[0]} description={item[1]}/>
            ))}
        </StyledSlider>
            <PrevBtn prev={previous}/>
            <NextBtn next={next} />
        </div>
    </div>)
}
const StyledSlider = styled(Slider)`
  position: relative;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
  .slick-slide div {
    //슬라이더  컨텐츠
    cursor: pointer;
  }
`;



export default Detail;