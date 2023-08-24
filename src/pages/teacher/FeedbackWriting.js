import { useCookies } from 'react-cookie';
import style from './feedbackwriting.module.css'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useState } from 'react';

const FeedbackWriting = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [feedbackText, setFeedbackText] = useState('');
    const [cookies,,] = useCookies();

    const day = location.state.day;
    const teacherToken = location.state.teacherToken;
    const studentName= location.state.studentName;
    const Write = (e) => {
      setFeedbackText(e.target.value);
    }

    const sendFeedback = () =>{
        axios.post('https://api.friendrive.net/record/feedback',{
          teacherToken: `${teacherToken}`,
          feedback:`${feedbackText}`,
          day:`${day}`,
          name: `${studentName}`
        })
        .then((response)=>{
          console.log(response)
          navigate(`/teacherDayList?day=${day}`,{
            replace:true
          });
        })
        .catch((response)=>{
          console.log(response);
      })
      }

    return(
        <section className={style.navi_section}>
        <div id='topNavi' className={style.topNavi}>
          <div onClick={() => {navigate(`/teacherDayList?day=${day}`,{
            replace:true,
          })}} className={style.back}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 8 12" fill="none">
              <path d="M7.40991 10.5898L2.82991 5.99976L7.40991 1.40976L5.99991 -0.000244141L-8.7738e-05 5.99976L5.99991 11.9998L7.40991 10.5898Z" fill="black"/>
            </svg>
          </div>
          <div className={style.naviTitle}>피드백</div>
          <button onClick={sendFeedback} className={style.wiriting_complete}>보내기</button>
        </div>
        <article className={style.writing_area_box}>
          <textarea className={style.writing_area} onChange={Write} value={feedbackText} placeholder='연수생에게 보낼 피드백을 남겨주세요'></textarea>
        </article>
        </section>
    )
}

export default FeedbackWriting;