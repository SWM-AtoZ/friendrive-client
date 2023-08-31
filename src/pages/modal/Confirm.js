import { useLocation, useNavigate } from 'react-router-dom';
import style from './confirm.module.css';
import { useCookies } from 'react-cookie';
import { useOutletContext } from 'react-router-dom';

const Confirm = () =>{
const navigate = useNavigate();
const location = useLocation();
const title = location.state.message_title;
const description = location.state.message_description;
const Islogout = location.state.Islogout;

const [cookies, setCookie, removeCookie] = useCookies(['']);
const {setISLogin} = useOutletContext();
const ClickOk = (e) =>{
        e.stopPropagation();
        if(!Islogout){
            navigate('/login',{
                replace:true
            });
        }
        else{
          removeCookie('token'); 
          removeCookie('teacherToken');
          setISLogin(false);
          navigate(-1);
        }
}
const ClicikCancle = (e) =>{
    e.stopPropagation();
    navigate(-1);
}
    return(
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
    )
}

export default Confirm;