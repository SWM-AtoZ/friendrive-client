import style from './topnavi.module.css';
import { useNavigate } from 'react-router-dom';



const TopNavi = ({title}) => {
    const navigate = useNavigate();
    return(
        <div className={style.topNavi}>
          <div onClick={() => navigate(-1)} className={style.back}>{'<'}</div>
          <div className={style.naviTitle}>{title}</div>
          <div className={style.blank}></div>
        </div>
    )
}

export default TopNavi;