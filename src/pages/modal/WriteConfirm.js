import { useLocation, useNavigate } from "react-router-dom";
import style from "./confirm.module.css";
import axios from "axios";

const WriteConfirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const title = location.state.message_title;
  const description = location.state.message_description;
  const teacherToken = location.state.teacherToken;
  const feedbackText = location.state.feedbackText;
  const day = location.state.day;
  const teacherName = location.state.teacherName;

  const ClickOk = (e) => {
    e.stopPropagation();
    //서버로 선생님 이름과 피드백내용 전송
    axios
      .post("https://api.friendrive.net/record/feedback", {
        teacherToken: `${teacherToken}`,
        feedback: `${feedbackText}`,
        day: `${day}`,
        name: `${teacherName}`,
      })
      .then((response) => {
        console.log(response);
        navigate(-2);
      })
      .catch((response) => {
        console.log(response);
      });
  };
  const ClicikCancle = (e) => {
    e.stopPropagation();
    navigate(-1);
  };
  return (
    <section onClick={ClicikCancle} className={style.alert_container}>
      <div className={style.alert_innerbox}>
        <div>
          <div>{title}</div>
          <div>{description}</div>
        </div>
        <div className={style.btn_box}>
          <button onClick={ClickOk}>예</button>
          <button onClick={ClicikCancle}>아니오</button>
        </div>
      </div>
    </section>
  );
};

export default WriteConfirm;
