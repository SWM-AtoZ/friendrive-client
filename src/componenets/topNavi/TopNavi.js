import style from './topnavi.module.css';
import { useNavigate } from 'react-router-dom';



const TopNavi = ({title}) => {
    const navigate = useNavigate();
    return(
        <div className={style.topNavi}>
          <div onClick={() => navigate(-1)} className={style.back}>
          <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24" fill="none">
            <path d="M15.41 16.59L10.83 12L15.41 7.41L14 6L7.99997 12L14 18L15.41 16.59Z" fill="white"/>
          </svg>
          </div>
          <div className={style.naviTitle}>{title}</div>
          <div className={style.blank}></div>
        </div>
    )
}

export default TopNavi;