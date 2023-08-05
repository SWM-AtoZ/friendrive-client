import style from'./commonlist.module.css';
import { useNavigate } from 'react-router-dom';
import temp from './subject_temp.png';
import pass from './pass.png';

const CommonList = ({content, subject, check, icon}) => {

    const navigate = useNavigate();
    //체크 되어있으면 연습필요로 체크
    
    return(
        <div onClick={()=>{window.location.href = `${content}`;}} className={style.section_list_item}>
                    <div className={style.subject_item_box}>
                    <div className={style.pass_box}>
                        {check?(<img className={style.pass_img} src={pass}/>):(<div></div>)}
                    </div>
                    <div className={style.subject_img_box}>
                        <img className={style.subject_img} src={icon}/>
                    </div>
                    <div className={style.subject_title}>{subject}</div>
                    </div>
                    <div className={style.go_detail}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24" fill="none">
                        <path d="M8.59003 7.41L13.17 12L8.59003 16.59L10 18L16 12L10 6L8.59003 7.41Z" fill="black"/>
                    </svg>
                    </div>
        </div>
    )
}

export default CommonList;