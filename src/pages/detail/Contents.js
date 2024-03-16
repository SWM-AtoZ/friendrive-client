import style from "./contents.module.css";
import styled from "styled-components";
import axios from "axios";
import {
  useLocation,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";

//slick-slider import
import Slider from "react-slick";
import "../../slick-carousel/slick/slick.css";
import "../../slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";

const Contents = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const title = searchParams.get("content");
  const [contentHeight] = useOutletContext();
  const [contents, setContents] = useState();

  const callContents = () => {
    //api 호출 후 아이템중 컨텐트title과 일치하는 것만 빼움
    axios
      .get("https://api.friendrive.net/curriculum")
      .then(function (response) {
        const [itemInfo] = response.data.items.filter(
          (item) => item.subject === title
        );
        setContents(itemInfo.content);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    callContents();
    const arrow = document.getElementById("arrow");
    // const content = document.getElementById('contents');
    // const feedback = document.getElementById('feedback');

    arrow.style.display = "block";
    // content.style.backgroundColor = 'rgba(0, 0, 0, 0.07)';
    // feedback.style.backgroundColor = 'white';
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
  };
  return (
    <StyledSlider {...settings}>
      {contents &&
        contents.map((item) => (
          <div>
            <div
              style={{ height: `${contentHeight}px` }}
              className={style.content}
            >
              {contents[0] !== "" ? (
                <div className={style.content_inner}>
                  <img src={item} />
                </div>
              ) : (
                <div>컨텐츠 준비중입니다.</div>
              )}
            </div>
          </div>
        ))}
    </StyledSlider>
  );
};
const StyledSlider = styled(Slider)`
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
`;

export default Contents;
