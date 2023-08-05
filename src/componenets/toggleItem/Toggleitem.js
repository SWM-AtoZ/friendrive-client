import { useRef } from 'react';
import style from './toggleitem.module.css';
import TeacherListItem from '../teacherListItem/TeacherListItem';
import toggle from './toggle.png';
const Toggleitem = ({ day, summary, filterdItem, checked, img})=> {
    
    const listRef = useRef();
    const toggleRef = useRef(false);
    const toggleBtn = useRef();

    const toggleControl = () => { // 토글이벤트 함수
        if(!listRef || !listRef.current){ // 아직 userRef에 값이 없을 때 예외처리.
            return;
        }

        if(toggleRef.current){
            listRef.current.style.maxHeight = 0;
            toggleBtn.current.style.transform = 'rotate(180deg)';
        }
        else if(!toggleRef.current){
            // maxHeight = scroll 길이가 되고 메뉴가 열린다.
            listRef.current.style.maxHeight = `${listRef.current.scrollHeight}px`;
            toggleBtn.current.style.transform = 'rotate(0deg)';
        }
       toggleRef.current = !toggleRef.current;

      };

    return(
    <section className={style.section_container}>
        <div className={style.section_innerbox} onClick={toggleControl}>
             <div className={style.item_img}>
                <img src={img}/>
            </div>
            <div className={style.item_info_box}>
            <div className={style.item_title}>Day {day}</div>
            <div className={style.item_summary}>{summary}</div>
            </div>
            <div ref={toggleBtn} className={style.item_imgbox}>
                <img src={toggle} className={style.toggle_img}/>
            </div>
        </div>
        <div ref={listRef} className={style.toggle}>
            {
                filterdItem.map((item)=>{
                    var check = false;
                    // 해당 아이템 체크 되어있는지 검사.
                    for(var i=0; i<checked.length; i++){
                        if(checked[i]===item.itemId){
                            check = true;
                            break;
                        }
                    }
                    const props = {
                        //여기에 filteredItem의 iconLink 넣어주기.
                        key : item.itemId,
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