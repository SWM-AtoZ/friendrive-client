import style from'./commonlist.module.css';
import { useNavigate } from 'react-router-dom';
import sad from './sad.png';
import smile from './smile.png';

const CommonList = ({content, subject, check}) => {

    const navigate = useNavigate();

    
    return(
        <li onClick={()=>{navigate('/detail', {state:{content:content, title:subject}})}} className={style.section_list_item}>
                  <div>{subject}</div>
                  <div className={style.icon_box}>
                    <img className={style.img} src={check?sad:smile}/>
                    <div className={style.img_description}>{check?'연습필요':'잘했어요'}</div>
                </div>
        </li>
    )
}

export default CommonList;