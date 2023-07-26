import { useRef } from 'react';
import style from './toggleitem.module.css';
import { Link } from 'react-router-dom';
import TeacherListItem from '../teacherListItem/TeacherListItem';

const Toggleitem = ({ day, summary, filterdItem, checked})=> {
    
    const listRef = useRef();
    const buttonCheckRef = useRef(false);
    const toggleControl = (e) => { // 토글이벤트 함수
        if(!listRef || !listRef.current){ // 아직 userRef에 값이 없을 때 예외처리.
            return;
        }

        const index = e.target.value-1;

        if(buttonCheckRef.current){
            listRef.current.style.maxHeight = 0;
        }
        else if(!buttonCheckRef.current){
            // maxHeight = scroll 길이가 되고 메뉴가 열린다.
            listRef.current.style.maxHeight=	`${listRef.current.scrollHeight}px`;
        }
       buttonCheckRef.current = !buttonCheckRef.current;

      };

    return(
    <section>
        <div className={style.section_container}>
        <div className={style.item}>Section {day}</div>
        <div className={style.item}>{summary}</div>
        <button value={day} className={style.item} onClick={toggleControl}>토글</button>
        </div>
        <div ref={listRef} className={style.toggle}>
            {
                filterdItem.map((item)=>{
                    var check = false;
                    // 해당 아이템 체크 되어있는지 검사.
                    for(var i=0; i<checked.checkedItem.length; i++){
                        if(checked.checkedItem[i]===item.itemId){
                            check = true;
                            break;
                        }
                    }
                    const props = {
                        subject : item.subject,
                        content : item.content,
                        checked : check
                    } 
                    return <TeacherListItem {...props}></TeacherListItem>
                })
            }
        </div>
    </section>
    )
} 

export default Toggleitem;