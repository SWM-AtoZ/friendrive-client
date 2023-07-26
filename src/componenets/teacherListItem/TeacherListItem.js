import style from './teacherListItem.module.css';
import { Link } from 'react-router-dom';

const TeacherListItem = ({subject, content, checked}) =>{
    const chagestate = () =>{
        //  체크 할 때마다 서버에 전송.
    }
    return(
    <div className={style.list_container}>
        <div>{subject}</div>
        <div onClick={chagestate}>{checked?'체크됨':'체크안됨'}</div>
        <div>
            <Link to={'/detail'} state={{ content:content, title:subject}}>가이드</Link>
        </div>
    </div>)
}

export default TeacherListItem;