import style from './section.module.css';
import { Link,useLocation, useOutletContext} from 'react-router-dom';
const Section = () => {
  const location = useLocation();

  //선택된 섹션의 몇번째 섹션인지 location 객체에서 추출
  const id = location.state.section;

  // outlet context의 전역 객체의 items에서 id에 대응하는 항목만 추출
  const Arryitem = useOutletContext().curriculum.items.filter(item=>item.day===id );
  
  // 체크된 아이템을 outletContext에서 추출한다.
  const checkedItem = useOutletContext().checked.checkedItem;
  
    return(<div>
        <div className={style.section_list_container}>
        <h1>{id} 섹션 페이지입니다.</h1>
          <ul className={style.section_list_innerbox}>
              {Arryitem.map((item)=>{
                var check = checkedItem.includes(item.itemId);
                return(
                <li className={style.section_list_item}>
                <Link to={'/detail'} state={{
                  content:item.content,
                  title:item.subject}}>{item.subject}</Link>
                  <div>{check?'체크됨':'체크안됨'}</div>
                </li>
              )})}
          </ul>
        </div>
    </div>)
}

export default Section;