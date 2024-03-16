import { useEffect } from "react";
import style from "./teacher_daylist.module.css";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const TeacherDaylistComponent = ({ subject, contents, icon, check }) => {
  const navigate = useNavigate();
  const passRef = useRef();
  const DayListComponentRef = useRef();

  const goToDetail = () => {
    navigate(`/detail?content=${subject}`, { state: { contents, subject } });
  };

  useEffect(() => {
    check
      ? passRef.current.style.setProperty("opacity", "1")
      : passRef.current.style.setProperty("opacity", "0");
  }, []);

  return (
    <button
      ref={DayListComponentRef}
      onClick={goToDetail}
      onTouchStart={() => {
        DayListComponentRef.current.style.backgroundColor =
          "rgba(0, 0, 0, 0.05)";
      }}
      onTouchMove={() => {
        DayListComponentRef.current.style.backgroundColor = "#F8FBFC";
      }}
      onTouchEnd={() => {
        DayListComponentRef.current.style.backgroundColor = "#F8FBFC";
      }}
      className={style.daylist}
    >
      <span ref={passRef} className={style.PASS}>
        PASS
      </span>
      <div className={style.title_box}>
        <div className={style.icon_box}>
          <img src={icon}></img>
        </div>
        <div>{subject}</div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.2rem"
        height="1.2rem"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M9.70498 6L8.29498 7.41L12.875 12L8.29498 16.59L9.70498 18L15.705 12L9.70498 6Z"
          fill="black"
          fill-opacity="0.6"
        />
      </svg>
    </button>
  );
};

export default TeacherDaylistComponent;
