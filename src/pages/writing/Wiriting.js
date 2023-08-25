import { useCookies } from 'react-cookie';
import style from './wirting.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { memo, useState } from 'react';

const Writing = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [memoText, setMemoText] = useState('');
    const [cookies,,] = useCookies();

    const day = location.state.day;//!location.state.day&&'2';
    const history = location.state.history;
    
    const Write = (e) => {
      setMemoText(e.target.value);
    }
    const sendMemo = () =>{
        axios.post('https://api.friendrive.net/record/memo',{
          memo:`${memoText}`,
          day:`${day}`
        },{
          headers:{
            Authorization: `Bearer ${cookies.token}`
          }
        })
        .then((response)=>{
          console.log(response)
          navigate(history,{
            replace:true
          });
          alert('기록에 성공하였습니다.')
        })
        .catch((response)=>{
          console.log(response);
      })
      }

    return(
        <section className={style.navi_section}>
        <div id='topNavi' className={style.topNavi}>
          <div onClick={() => {navigate(-1)}} className={style.back}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 8 12" fill="none">
              <path d="M7.40991 10.5898L2.82991 5.99976L7.40991 1.40976L5.99991 -0.000244141L-8.7738e-05 5.99976L5.99991 11.9998L7.40991 10.5898Z" fill="black"/>
            </svg>
          </div>
          <div className={style.naviTitle}>메모하기</div>
          <button onClick={sendMemo} className={style.wiriting_complete}>작성완료</button>
        </div>
        <article className={style.writing_area_box}>
          <textarea className={style.writing_area} onChange={Write} value={memoText} placeholder='나에게 남길 메모를 입력해보세요'></textarea>
        </article>
        </section>
    )
}

export default Writing;