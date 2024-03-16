import style from "./teacherhome.module.css";
import TeacherCurriculumList from "../../componenets/teacher_components/teacherCurriculumList/TeacherCurriculumList";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const TeacherHome = () => {
  const curriculum = [
    "넓은 공간에서 기본 조작 배우기",
    "넓은 도로에서 기본 주행 배우기",
    "주차 마스터하기",
    "큰 도로에서 차선 변경 익히기",
    "주행 정복하기",
  ];
  const [studentName, setStudentName] = useState();
  const [day1, setDay1] = useState(0);
  const [day2, setDay2] = useState(0);
  const [day3, setDay3] = useState(0);
  const [day4, setDay4] = useState(0);
  const [day5, setDay5] = useState(0);
  const setCheckedItemsNumb = [setDay1, setDay2, setDay3, setDay4, setDay5];
  const CheckedItemsNumb = [day1, day2, day3, day4, day5];
  const [searchParams, setSearchParams] = useSearchParams();
  const teacherToken = searchParams.get("teachertoken");

  useEffect(() => {
    axios
      .get(`https://api.friendrive.net/teacher?teacherToken=${teacherToken}`)
      .then((response) => {
        const TempCheckedItem = response.data.checkedItem;
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
        console.log("useEffect실행.");
      })
      .catch((response) => {
        console.log(response);
      });
    return () => {
      //언마운트는 업데이트 전에 실행된다.
      for (var i = 0; i < setCheckedItemsNumb.length; i++) {
        setCheckedItemsNumb[i](0);
      }
    };
  }, []);

  return (
    <section className={style.curruculumSection}>
      <div className={style.teacherHomeTitle}>
        <span>{studentName}</span>님과 함께하는 운전연수!
      </div>
      <div className={style.curriculum_list_container}>
        <div className={style.curriculum_list}>
          {curriculum.map((item, idx) => (
            <TeacherCurriculumList
              day={idx + 1}
              title={item}
              progress={CheckedItemsNumb[idx]}
              teacherToken={teacherToken}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeacherHome;
