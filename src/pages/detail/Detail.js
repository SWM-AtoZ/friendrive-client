import style from './detail.module.css';
import { useLocation } from 'react-router-dom';
const Detail = ()=>{
    const location = useLocation();
    const item = location.state;
    console.log(item);
    return(<div>
        <h1>{item.title} 상세설명 페이지 입니다.</h1>
    </div>)
}

export default Detail;