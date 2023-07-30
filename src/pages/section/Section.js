import style from './section.module.css';
import '../../global.css';
import TopNavi from '../../componenets/topNavi/TopNavi';
import CommonList from '../../componenets/commonList/CommonList';
import { useLocation, useOutletContext,useNavigate} from 'react-router-dom';
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
      <div className='common_list_container'>
          <TopNavi title={`Section ${id}`}/>
          <ul className='common_list_innerbox'>
              {Arryitem.map((item)=>{
                var check = checkedItem.includes(item.itemId);
                return(
                <CommonList content={item.content} subject={item.subject} check={check}/>
              )})}
          </ul>
        </div>
   )
}

export default Section;