import style from './section.module.css';
import { Link,useLocation, useOutletContext} from 'react-router-dom';
const Section = () => {
  const location = useLocation();
  //선택된 섹션의 몇번째 섹션인지
  const id = location.state.section;
  // outlet context의 전역 객체의 items에서 id에 대응하는 항목만 추출
  const item = useOutletContext().items.filter(list=>list.day===id );

    return(<div>
        <h1>{id}섹션 페이지입니다.</h1>
        <div className={style.section_card_container}>
          <ul className={style.section_card_innerbox}>
              {item.map((item)=>(
                <li className={style.section_card_item}>
                <Link to={'/detail'} state={{
                  content:item.content,
                  title:item.subject}}>{item.subject}</Link>
              </li>
              ))}
          </ul>
        </div>
    </div>)
}

export default Section;