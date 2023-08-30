import { useLocation, useNavigate } from 'react-router-dom';
import style from './confirm.module.css';

const Confirm = () =>{
const navigate = useNavigate();
const location = useLocation();
const title = location.state.message_title;
const description = location.state.message_description;
const ClickOk = () =>{
        navigate('/login',{
            replace:true
        });
}
const ClicikCancle = () =>{
    navigate(-1);
}
    return(
        <section className={style.alert_container}>
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
    )
}

export default Confirm;