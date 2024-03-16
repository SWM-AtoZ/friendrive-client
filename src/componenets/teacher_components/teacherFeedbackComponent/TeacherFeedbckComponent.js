import style from "./teacher_feedback_component.module.css";
import teacher from "./teacher.png";
import axios from "axios";
const TeacherFeedbackComponent = ({
  teacherName,
  memo_article,
  writing_time,
  width,
  height,
}) => {
  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className={style.memoBox}
    >
      <div className={style.memoBox_top}>
        <div className={style.memo_iconBox}>
          <div
            className={style.memo_icon}
            style={{
              backgroundImage: `url(${teacher})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></div>
          <div>{teacherName}</div>
        </div>
        <div className={style.writing_time}>{writing_time.substr(0, 10)}</div>
      </div>
      <div className={style.memo_area}>{memo_article}</div>
    </div>
  );
};

export default TeacherFeedbackComponent;
