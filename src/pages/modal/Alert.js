import { useLocation, useNavigate } from "react-router-dom";
import style from "./alert.module.css";

const Alert = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const title = location.state.message_title;
  const description = location.state.message_description;
  const ClickOk = (e) => {
    e.stopPropagation();
    navigate(-1);
  };
  return (
    <section onClick={ClickOk} className={style.alert_container}>
      <div className={style.alert_innerbox}>
        <div>
          <div>{title}</div>
          <div>{description}</div>
        </div>
        <button onClick={ClickOk}>확인</button>
      </div>
    </section>
  );
};

export default Alert;
