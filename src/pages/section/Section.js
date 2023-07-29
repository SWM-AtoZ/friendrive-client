import style from './section.module.css';
import { Link,useLocation, useOutletContext,useNavigate} from 'react-router-dom';
const Section = () => {
  const location = useLocation();

  //선택된 섹션의 몇번째 섹션인지 location 객체에서 추출
  const id = location.state.section;

  // outlet context의 전역 객체의 items에서 id에 대응하는 항목만 추출
  const Arryitem = useOutletContext().curriculum.items.filter(item=>item.day===id );
  
  // 체크된 아이템을 outletContext에서 추출한다.
  const checkedItem = useOutletContext().checked.checkedItem;
  
  const navigate=useNavigate();

  const goToDetail = (content,subject) => {
    navigate('/detail', {state:{content:content, title:subject}})
  }

    return(
      <div className={style.section_list_container}>
        <div className={style.topNavi}>
          <div onClick={() => navigate(-1)} className={style.back}>{'<'}</div>
          <div className={style.naviTitle}>Section {id}</div>
          <div className={style.blank}></div>
        </div>
          <ul className={style.section_list_innerbox}>
              {Arryitem.map((item)=>{
                var check = checkedItem.includes(item.itemId);
                return(
                <li onClick={()=>{goToDetail(item.content, item.subject)}} className={style.section_list_item}>
                  <div>{item.subject}</div>
                  <div>{check?'체크됨':'체크안됨'}</div>
                </li>
              )})}
          </ul>
        </div>
   )
}

export default Section;