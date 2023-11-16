import style from "./curriculum.module.css";
import TopNavi from "../../componenets/topNavi/TopNavi";
import CurriculumList from "../../componenets/curriculumList/CurriculumList";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const Curriculum = () => {
  const curriculum = [
    "넓은 공간에서 기본 조작 배우기",
    "넓은 도로에서 기본 주행 배우기",
    "주차 마스터하기",
    "큰 도로에서 차선 변경 익히기",
    "주행 정복하기",
  ];
  const [day1, setDay1] = useState(0);
  const [day2, setDay2] = useState(0);
  const [day3, setDay3] = useState(0);
  const [day4, setDay4] = useState(0);
  const [day5, setDay5] = useState(0);
  const setCheckedItemsNumb = [setDay1, setDay2, setDay3, setDay4, setDay5];
  const CheckedItemsNumb = [day1, day2, day3, day4, day5];
  const [cookies, ,] = useCookies(["token"]);
  const test = new Array(5).fill(0);

  useEffect(() => {
    if (cookies.token) {
      axios
        .get("https://api.friendrive.net/curriculum/checked", {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((response) => {
          var TempCheckedItem = response.data.checkedItem;
          console.log(TempCheckedItem);
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
    }

    return () => {
      //언마운트는 업데이트 전에 실행된다.
      for (var i = 0; i < setCheckedItemsNumb.length; i++) {
        setCheckedItemsNumb[i](0);
      }
    };
  }, []);

  return (
    <section className={style.curruculumSection}>
      <TopNavi title={"커리큘럼"} />
      {/* 데이 리스트마다 프로그레스 바 추가., 각 curriculumList 클릭하면 해당 Daylist로 이동. */}
      <div className={style.curriculum_list_container}>
        <div className={style.curriculum_list}>
          {curriculum.map((item, idx) => (
            <CurriculumList
              day={idx + 1}
              title={item}
              progress={CheckedItemsNumb[idx]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Curriculum;
