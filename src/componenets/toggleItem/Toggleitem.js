import { useRef } from 'react';
import style from './toggleitem.module.css';
import { Link } from 'react-router-dom';
import TeacherListItem from '../teacherListItem/TeacherListItem';
import toggle from './toggle.png';
const Toggleitem = ({ day, summary, filterdItem, checked})=> {
    
    const listRef = useRef();
    const toggleRef = useRef(false);
    const toggleBtn = useRef();
    const innerboxRef = useRef();

    const toggleControl = () => { // 토글이벤트 함수
        if(!listRef || !listRef.current){ // 아직 userRef에 값이 없을 때 예외처리.
            return;
        }

        if(toggleRef.current){
            listRef.current.style.maxHeight = 0;
            toggleBtn.current.style.transform = 'rotate(180deg)';
          //  innerboxRef.current.style.borderRadius = '1rem';
        }
        else if(!toggleRef.current){
            // maxHeight = scroll 길이가 되고 메뉴가 열린다.
            listRef.current.style.maxHeight = `${listRef.current.scrollHeight}px`;
            toggleBtn.current.style.transform = 'rotate(0deg)';
           // innerboxRef.current.style.borderRadius = '1rem 1rem 0 0';
        }
       toggleRef.current = !toggleRef.current;

      };

    return(
    <section className={style.section_container}>
        <div ref={innerboxRef} className={style.section_innerbox} onClick={toggleControl}>
            <div className={style.item_title}>Section {day}</div>
            <div className={style.item_summary}>{summary}</div>
            <div ref={toggleBtn} className={style.item_imgbox}>
                <img src={toggle} className={style.toggle_img}/>
            </div>
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
                        checked : check,
                        itemId : item.itemId
                    } 
                    return <TeacherListItem {...props}></TeacherListItem>
                })
            }
        </div>
    </section>
    )
} 

export default Toggleitem;