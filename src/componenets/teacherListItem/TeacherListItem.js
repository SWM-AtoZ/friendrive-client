import style from './teacherListItem.module.css';
import { Link,useNavigate } from 'react-router-dom';
import guide from './guide.png';
import smile from './smile.png';
import sad from './sad.png';
import {useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const TeacherListItem = ({subject, content, checked, itemId}) =>{
    const navigate = useNavigate();
    const [checkState, setCheckState] = useState(checked);
    const [cookies,,] = useCookies([]);
 
    console.log(itemId.toString());

    const body = {
        token : cookies.teacherToken,
        item : itemId.toString()
    }

    const postdata = async() =>{
        axios.post("https://41icjhls1i.execute-api.ap-northeast-2.amazonaws.com/dev/teacher/check",body)
        .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });  
    }

    const chagestate = () =>{
        //  체크 할 때마다 서버에 전송.
        setCheckState(prev => !prev);
        postdata();
    }
    const goToGuide = (content, subject) => {
        navigate('/detail', {state:{ content:content, title:subject}})
    }
    return(
    <div className={style.list_container}>
        <div>{subject}</div>
        {checkState?(
            <div onClick={chagestate} className={style.icon_box}>
                <img className={style.img} src={sad}/>
            <div className={style.img_description}>연습필요</div>
            </div>
        ):
        (
            <div onClick={chagestate} className={style.icon_box}>
                <img className={style.img} src={smile}/>
            <div className={style.img_description}>잘했어요</div>
            </div>
        )}
        <div onClick={()=>{goToGuide(content, subject)}} className={style.icon_box}>
            <img className={style.img} src={guide}/>
            <div className={style.img_description}>가이드 보기</div>
        </div>
        
    </div>)
}

export default TeacherListItem;