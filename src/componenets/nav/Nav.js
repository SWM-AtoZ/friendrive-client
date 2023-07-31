import style from "./nav.module.css"
import { Link,useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import check from './check-list.png';
import home from './home.png';
import user from './user.png';

const Nav = () => { 
    const [cookies,setCookie,removeCookie] = useCookies(['token']);
    const navigate = useNavigate();
   
    const goToSupplyment = () => {
        if(cookies.token){
                navigate('/supplyment');
        }
        else{
            alert('로그인이 필요한 서비스입니다.');
            navigate('/login');
        }
    }
    const goToUser = () => {
        if(cookies.token){
            navigate('./user');
        }
        else{
            alert('로그인이 필요한 서비스입니다.');
            navigate('/login');
        }
    }
    const goHome=()=>{
        navigate('/');
    }
    return (
    <div className={style.nav}>
        <div onClick={goHome} className={style.link} >
        <img src={home} className={style.img}/>
        <div className={style.img_description}>홈</div>
        </div>
        
        <div className={style.link} onClick={goToSupplyment}>
        <img src={check} className={style.img}/>
        <div className={style.img_description}>보충 과목</div>
        </div>

        <div className={style.link} onClick={goToUser}>
        <img src={user} className={style.img}/>
        <div className={style.img_description}>내 정보</div>
        </div>
    </div>
    )
};

export default Nav;