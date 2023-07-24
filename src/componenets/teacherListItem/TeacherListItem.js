import style from './teacherListItem.module.css';
import { Link } from 'react-router-dom';

const TeacherListItem = ({subject, content, checked}) =>{
    const chagestate = () =>{
        //  상태표시 변경하는 함수.
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