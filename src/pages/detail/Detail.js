import style from './detail.module.css';
import { useLocation } from 'react-router-dom';
const Detail = ()=>{
    const location = useLocation();
    
    // location객체로부터 클릭한 아이템의 정보 추출
    const item = location.state;
   
    return(<div>
        <h1>{item.title} 상세설명 페이지 입니다.</h1>
    </div>)
}

export default Detail;