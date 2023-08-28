import { useCookies } from 'react-cookie';
import style from './feedbackwriting.module.css'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useState } from 'react';

const FeedbackWriting = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [feedbackText, setFeedbackText] = useState('');
    const [teacherName, SetTeacherName] = useState('');
    const day = location.state.day;
    const teacherToken = location.state.teacherToken;
    const studentName = location.state.studentName;

    const Write = (e) => {
      setFeedbackText(e.target.value);
    }

    const onChangeName = (e) => {
      SetTeacherName(e.target.value);
  }

    const sendFeedback = () =>{
      if(teacherName.length<1 || feedbackText.length<1){
        if(teacherName.length<1 && feedbackText.length<1){
          alert('이름과 피드백을 작성해주세요')
        }
        else if(teacherName.length<1){
          alert('성함을 작성해주세요.')
        }
        else if(feedbackText.length<1){
          alert('피드백을 작성해주세요.')
        }
      }
      else{
        axios.post('https://api.friendrive.net/record/feedback',{
          teacherToken: `${teacherToken}`,
          feedback:`${feedbackText}`,
          day:`${day}`,
          name: `${teacherName}`
        })
        .then((response)=>{
          console.log(response)
          navigate(-1);
          alert('피드백이 전송되었습니다.')
        })
        .catch((response)=>{
          console.log(response);
      })
      }
      }

    return(
        <section className={style.navi_section}>
        <div id='topNavi' className={style.topNavi}>
          <div onClick={() => {navigate(-1)}} className={style.back}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 8 12" fill="none">
              <path d="M7.40991 10.5898L2.82991 5.99976L7.40991 1.40976L5.99991 -0.000244141L-8.7738e-05 5.99976L5.99991 11.9998L7.40991 10.5898Z" fill="black"/>
            </svg>
          </div>
          <div className={style.naviTitle}>피드백</div>
          <button onClick={sendFeedback} className={style.wiriting_complete}>보내기</button>
        </div>
        <article className={style.writing_area_box}>
        <label for='teacherName' >이름 : </label> 
        <input id='teacherName' className={style.teacherName_input} type='text' placeholder='선생님의 이름을 입력해주세요 (필수)' value={teacherName} onChange={onChangeName}></input>
        <textarea className={style.writing_area} onChange={Write} value={feedbackText} placeholder={`${studentName}님에게 보낼 피드백을 적어주세요`}></textarea>
        </article>
        </section>
    )
}

export default FeedbackWriting;