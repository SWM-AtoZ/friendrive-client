import { useCookies } from 'react-cookie';
import style from './wirting.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Writing = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [cookies,,] = useCookies();

    const day = location.state.day;
    console.log(window.history)
    const sendMemo = () =>{
        axios.post('https://api.friendrive.net/record/memo',{
          memo:'lflksjdlfkjlgornviernvjnvlkjdfnvlkjdfnlvkjsdlfkjvnlskdjfnvlksjdfvlkjsdflkvjsldkfjvslkdjfvlksjdfvlkjsdfvlkjsdlkvjnsdlkjvnsdlfkjvsdkl',
          day:`${day}`
        },{
          headers:{
            Authorization: `Bearer ${cookies.token}`
          }
        })
        .then((response)=>{
          console.log(response)
          navigate(-1);
        })
        .catch((response)=>{
          console.log(response);
      })
      }

    return(
        <section className={style.navi_section}>
        <div id='topNavi' className={style.topNavi}>
          <div onClick={() => navigate(`/daylist?day=${day}`,{
            replace:true,
          })} className={style.back}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 8 12" fill="none">
              <path d="M7.40991 10.5898L2.82991 5.99976L7.40991 1.40976L5.99991 -0.000244141L-8.7738e-05 5.99976L5.99991 11.9998L7.40991 10.5898Z" fill="black"/>
            </svg>
          </div>
          <div className={style.naviTitle}>메모하기</div>
          <button onClick={sendMemo} className={style.wiriting_complete}>작성완료</button>
        </div>
        <article className={style.writing_area}>

        </article>
        </section>
    )
}

export default Writing;