import style from "./teacherdaylist.module.css";
import { styled } from "styled-components";
import "../../global.css";
import TopNavi from "../../componenets/topNavi/TopNavi";
import { useSearchParams, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Loading from "../loading/Loading";

import TeacherFeedbackComponent from "../../componenets/teacher_components/teacherFeedbackComponent/TeacherFeedbckComponent";
import TeacherAddMemoComponent from "../../componenets/teacher_components/teacherAddMemo/TeacherAddMemoComponent";
import TeacherDayInfoComponent from "../../componenets/teacher_components/teacherDayInfo/TeacherDayInfoComponent";
import TeacherDaylistComponent from "../../componenets/teacher_components/teacherDayListComponent/TeacherDaylistComponent";

import Slider from "react-slick";
import "../../slick-carousel/slick/slick.css";
import "../../slick-carousel/slick/slick-theme.css";
import axios from "axios";

const TeacherDayList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [curriculum, setCurriculum] = useState();
  const [allItems, setAllItems] = useState();
  const [checkedItem, setCheckedItem] = useState();
  const [studentName, setStudentName] = useState();

  const [day1, setDay1] = useState(0);
  const [day2, setDay2] = useState(0);
  const [day3, setDay3] = useState(0);
  const [day4, setDay4] = useState(0);
  const [day5, setDay5] = useState(0);
  const setCheckedItemsNumb = [setDay1, setDay2, setDay3, setDay4, setDay5];
  const CheckedItemsNumb = [day1, day2, day3, day4, day5];

  const memoBoxRef = useRef();
  const [memoBoxWidth, setmemoBoxWidth] = useState(0);
  const [memoBoxHeight, setmemoBoxHeight] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);

  const day = Number(searchParams.get("day"));
  const teacherToken = searchParams.get("teacher");
  console.log(teacherToken);
  const location = useLocation();

  const getCurriculum = async () => {
    await axios
      .get("https://api.friendrive.net/curriculum")
      .then(function (response) {
        setCurriculum(
          ...response.data.curriculum.filter((item) => item.days == day)
        );
        setAllItems(response.data.items.filter((item) => item.day == day));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getChecked = async () => {
    await axios
      .get(`https://api.friendrive.net/teacher?teacherToken=${teacherToken}`)
      .then((response) => {
        console.log(response);
        var TempCheckedItem = response.data.checkedItem;
        setCheckedItem(response.data.checkedItem);
        setStudentName(response.data.name);
        //각 데이마다 몇개의 아이템이 체크되어있는지 확인.
        for (var i = 0; i < setCheckedItemsNumb.length; i++) {
          var day = i + 1;
          for (var j = 0; j < TempCheckedItem.length; j++) {
            if (TempCheckedItem[j].includes(`d${day}`)) {
              setCheckedItemsNumb[i]((prev) => prev + 1);
            }
          }
        }
      })
      .catch((response) => {
        console.log(response);
      });
  };
  const getFeedback = () => {
    axios
      .get(
        `https://api.friendrive.net/teacher/feedback/${day}?teacherToken=${teacherToken}`
      )
      .then((response) => {
        console.log(response);
        setFeedbacks(response.data);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  useEffect(() => {
    getCurriculum();
    getChecked();
    getFeedback();
    setmemoBoxWidth((prev) => memoBoxRef.current.offsetWidth);
    setmemoBoxHeight((prev) => memoBoxRef.current.offsetHeight);
  }, []);

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
          width: "100%",
          position: "absolute",
          bottom: "2%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
    dotsClass: "dots_custom",
  };
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
  return (
    <div className={style.Topbox}>
      <TopNavi title={`Day ${day}`} />
      <div className="common_list_container">
        <section className={style.day_list_section}>
          <div className={style.info_container}>
            <article className={style.day_info_box}>
              <div className={style.day_info}>
                <TeacherDayInfoComponent
                  day={day}
                  title={curriculum && curriculum.title}
                  dayprocess={CheckedItemsNumb[day - 1]}
                />
              </div>
              <div ref={memoBoxRef} className={style.day_memo}>
                <div className={style.memoBox_container}>
                  {feedbacks.length > 0 ? (
                    <StyledSlider {...Settings}>
                      {feedbacks.map((item) => (
                        <TeacherFeedbackComponent
                          key={item.id}
                          teacherName={item.name}
                          memo_article={item.feedbackAndMemo}
                          writing_time={item.createdAt}
                          width={memoBoxWidth}
                          height={memoBoxHeight}
                        />
                      ))}
                      <div>
                        <TeacherAddMemoComponent
                          width={memoBoxWidth}
                          height={memoBoxHeight}
                          day={day}
                          innertext={`피드백 추가하기`}
                          teacherToken={teacherToken}
                          studentName={studentName}
                        />
                      </div>
                    </StyledSlider>
                  ) : (
                    <TeacherAddMemoComponent
                      width={memoBoxWidth}
                      height={memoBoxHeight}
                      day={day}
                      innertext={"보낸 피드백이 없습니다."}
                      teacherToken={teacherToken}
                      studentName={studentName}
                    />
                  )}
                </div>
              </div>
            </article>
          </div>
          <article className={style.daylist_box}>
            {allItems && checkedItem ? (
              allItems.map((item) => {
                var check = false;
                if (checkedItem.includes(item.itemId)) {
                  check = true;
                }
                return (
                  <TeacherDaylistComponent
                    key={item.itemId}
                    subject={item.subject}
                    contents={item.content}
                    icon={item.iconLink}
                    check={check}
                  />
                );
              })
            ) : (
              <Loading />
            )}
          </article>
        </section>
      </div>
    </div>
  );
};

export default TeacherDayList;
