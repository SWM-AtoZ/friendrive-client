import style from './topnavi.module.css';
import { useNavigate } from 'react-router-dom';



const TopNavi = ({title}) => {
    const navigate = useNavigate();
    return(
        <div id='topNavi' className={style.topNavi}>
          <div onClick={() => navigate(-1,{state:{day:title}})} className={style.back}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 8 12" fill="none">
              <path d="M7.40991 10.5898L2.82991 5.99976L7.40991 1.40976L5.99991 -0.000244141L-8.7738e-05 5.99976L5.99991 11.9998L7.40991 10.5898Z" fill="black"/>
            </svg>
          </div>
          <div className={style.naviTitle}>{title}</div>
        </div>
    )
}

export default TopNavi;