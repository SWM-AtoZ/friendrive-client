import style from'./commonlist.module.css';
import { useNavigate } from 'react-router-dom';

const CommonList = ({content, subject, check}) => {

    const navigate = useNavigate();

    return(
        <li onClick={()=>{navigate('/detail', {state:{content:content, title:subject}})}} className={style.section_list_item}>
                  <div>{subject}</div>
                  <div>{check?'체크됨':'체크안됨'}</div>
                </li>
    )
}

export default CommonList;