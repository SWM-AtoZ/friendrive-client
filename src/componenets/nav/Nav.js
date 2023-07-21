import style from "./nav.module.css"
import { Link } from "react-router-dom";
const Nav = () => {
    
    return (<ul className={style.nav}>
        <li className={style.link}>
        <Link to={'/supplyment'}>보충과목페이지로</Link>
        </li>
        <li className={style.link}>
        <Link to={'/'}>홈페이지로</Link>
        </li>
        <li className={style.link}>
        <Link to={'/user'}>유저페이지로</Link>
        </li>
    </ul>
    )
};

export default Nav;