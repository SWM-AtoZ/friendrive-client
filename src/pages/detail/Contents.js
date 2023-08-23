import style from './contents.module.css';
import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';

//slick-slider import
import Slider from "react-slick";
import '../../slick-carousel/slick/slick.css';
import '../../slick-carousel/slick/slick-theme.css';
import { useEffect} from 'react';

const Contents = () => {
    const [contentHeight] = useOutletContext();
    
    useEffect(()=>{
        const arrow = document.getElementById('arrow');
        const content = document.getElementById('contents');
        const feedback = document.getElementById('feedback');

        arrow.style.display = 'block';
        content.style.backgroundColor = 'rgba(0, 0, 0, 0.07)';
        feedback.style.backgroundColor = 'white';
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
        <StyledSlider {...settings}>
            {[1,2].map(item=>(
            <div>
                <div style={{height:`${contentHeight}px`}} className={style.content}>
                   <div className={style.content_inner}>컨텐츠 준비중입니다.</div>
                </div>
            </div>))}
        </StyledSlider>
    )
}
const StyledSlider = styled(Slider)`
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
`;

export default Contents;