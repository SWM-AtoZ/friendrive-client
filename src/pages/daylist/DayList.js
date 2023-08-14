import style from './daylist.module.css';
import '../../global.css';
import TopNavi from '../../componenets/topNavi/TopNavi';
import { useLocation, useOutletContext,useSearchParams} from 'react-router-dom';
import { useCookies } from 'react-cookie';

const DayList = () => {
  const [cookies,,] = useCookies(['token']);
  const location = useLocation();
  const checkedData = useOutletContext().checked;
  const [searchParams, setSearchParams] = useSearchParams();
  const day = Number(searchParams.get("day"));


  //api로 메모,피드백 불러오기 함수
  const callMemo = () =>{}

  //체크된 아이템 불러오는 api
  const callChecked = () =>{}

  //추가버튼 누르면 모달창 띄워주는 이벤트함수
  const addMemo = () =>{}

  //추가 메모를 입력하고 완료를 누르면 서버로 메모내용을 보내고 카드를 최신화 해주는 함수.
  const sendMemo = () =>{}

  //삭제버튼 누르면 카드에서 메모/피드백 삭제하는 함수
  const removeInfo = () =>{}

  //pass 버튼 체크/해지시 진행률 반영하는 함수.
  const changeProgress = () =>{}


  // outlet context의 전역 객체의 items에서 id에 대응하는 항목만 추출
  const Arryitem = useOutletContext().curriculum.items.filter(item=>item.day===day );
  
  // 체크된 아이템을 outletContext에서 추출한다.
  const checkedItem = checkedData?checkedData.checkedItem:[];
  
    return(
      <div className='common_list_container'>
          <TopNavi title={`Day ${day}`}/>
          
        </div>
   )
}

export default DayList;