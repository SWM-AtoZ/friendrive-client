import style from "./nav.module.css"
import { Link,useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const Nav = () => { 
    const [cookies,setCookie,removeCookie] = useCookies(['token']);

    const navigate = useNavigate();
    const isLogin = (e) => {
        const value = e.target.value;
        if(cookies.token){
            if(value==='supplyment'){
                navigate('/supplyment');
            }
            else if(value === 'user'){
                navigate('./user');
            }
        }
        else{
            alert('로그인이 필요한 서비스입니다.');
            navigate('/login');
        }
    }
    return (<ul className={style.nav}>
        <li className={style.link}>
        <button value='supplyment' onClick={isLogin}>보충과목 페이지로</button>
        </li>
        <li className={style.link}>
        <Link to={'/'}>홈페이지로</Link>
        </li>
        <li className={style.link}>
        <button value='user' onClick={isLogin}>유저페이지로</button>
        </li>
    </ul>
    )
};

export default Nav;