import style from './memo_component.module.css';
import { useCookies } from 'react-cookie';
import memo from './memo.png';
import teacher from'./teacher.png';
import axios from 'axios';
const MemoComponent = ({setMemos, memo_article,writing_time,is_feedback,teacher_name,memo_id,width, height }) => {
    const [cookies,,] = useCookies(['token']);
   //삭제버튼 누르면 카드에서 메모/피드백 삭제하는 함수
    const removeMemo = () =>{
      axios.delete(`https://api.friendrive.net/record/${memo_id}`,{
        headers:{
          Authorization: `Bearer ${cookies.token}`
        }
      })
      .then((response)=>{
        console.log(response);
        setMemos(prev=>prev.filter((item)=>item.id!==memo_id))
      })
      .catch((response)=>{
        console.log(response);
      })
    }

    return(
        <div style={{width:`${width}px`, height:`${height}px`}} className={style.memoBox}>
                  <div className={style.memoBox_top}>
                    <div className={style.memo_iconBox}>
                    <div className={style.memo_icon} style={{backgroundImage:`url(${is_feedback?teacher:memo})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', }}></div>
                    <div>{is_feedback?teacher_name:'메모'}</div>
                    </div>
                    <div className={style.writing_time}>{writing_time}</div>
                  </div>
                  <div className={style.memo_area}>
                  {memo_article}
                  </div>
                  <div onClick={removeMemo} className={style.remove_memo}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 18 20" fill="none">
                      <path d="M10 15V9C10 8.73478 10.1054 8.48043 10.2929 8.29289C10.4804 8.10536 10.7348 8 11 8C11.2652 8 11.5196 8.10536 11.7071 8.29289C11.8946 8.48043 12 8.73478 12 9V15C12 15.2652 11.8946 15.5196 11.7071 15.7071C11.5196 15.8946 11.2652 16 11 16C10.7348 16 10.4804 15.8946 10.2929 15.7071C10.1054 15.5196 10 15.2652 10 15ZM7 16C7.26522 16 7.51957 15.8946 7.70711 15.7071C7.89464 15.5196 8 15.2652 8 15V9C8 8.73478 7.89464 8.48043 7.70711 8.29289C7.51957 8.10536 7.26522 8 7 8C6.73478 8 6.48043 8.10536 6.29289 8.29289C6.10536 8.48043 6 8.73478 6 9V15C6 15.2652 6.10536 15.5196 6.29289 15.7071C6.48043 15.8946 6.73478 16 7 16ZM18 5C18 5.26522 17.8946 5.51957 17.7071 5.70711C17.5196 5.89464 17.2652 6 17 6H16V16.94C16 17.7356 15.6839 18.4987 15.1213 19.0613C14.5587 19.6239 13.7956 19.94 13 19.94H5C4.20435 19.94 3.44129 19.6239 2.87868 19.0613C2.31607 18.4987 2 17.7356 2 16.94V6H1C0.734784 6 0.48043 5.89464 0.292893 5.70711C0.105357 5.51957 0 5.26522 0 5C0 4.73478 0.105357 4.48043 0.292893 4.29289C0.48043 4.10536 0.734784 4 1 4H5V3C5 2.20435 5.31607 1.44129 5.87868 0.87868C6.44129 0.316071 7.20435 0 8 0H10C10.7956 0 11.5587 0.316071 12.1213 0.87868C12.6839 1.44129 13 2.20435 13 3V4H17C17.2652 4 17.5196 4.10536 17.7071 4.29289C17.8946 4.48043 18 4.73478 18 5ZM7 4H11V3C11 2.73478 10.8946 2.48043 10.7071 2.29289C10.5196 2.10536 10.2652 2 10 2H8C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3V4ZM14 6H4V16.94C4 17.2052 4.10536 17.4596 4.29289 17.6471C4.48043 17.8346 4.73478 17.94 5 17.94H13C13.2652 17.94 13.5196 17.8346 13.7071 17.6471C13.8946 17.4596 14 17.2052 14 16.94V6Z" fill="black" fill-opacity="0.5"/>
                    </svg>
                  </div>
        </div>
    )
}

export default MemoComponent;