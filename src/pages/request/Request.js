import style from './request.module.css';
import { useOutletContext } from 'react-router-dom';

const Request = () => {
const curriculum = useOutletContext().curriculum.curriculum;

//섹션의 수만큼의 크기를 가진 배열을 생성 추후에 해당 배열의 true 섹션만 쿼리스트링으로 표기
const itemCheck = new Array(5).fill(false);

const clickbox = (e) =>{ //섹션박스 누르면 체크상태 변경, 각 섹션의 체크상태 itemCheck에 표시. 
    if(e.target.id){
        const click_section = e.target.id;
        if(!itemCheck[click_section]){
            e.target.children[1].style.backgroundColor = 'dodgerblue';
           
        } 
        else{
            e.target.children[1].style.backgroundColor = 'white';
          
        }
        itemCheck[click_section] = !itemCheck[click_section];
    }
}

const ShareTeacher = () => {
    if (navigator.share) {
        navigator.share({
            title: '기록하며 성장하기',
            text: 'Hello World',
            url: 'https://naver.com',
        });
    }else{
        alert("공유하기가 지원되지 않는 환경 입니다.")
    }
  }

    return(<div className={style.container}>
        <h1>요청페이지 입니다.</h1>
        {curriculum.map((item)=>(
           <div id={item.days-1} className={style.checkcontainer} onClick={clickbox}>
           <h1>sesction {item.days}</h1>
           <div className={style.checkbox}></div>
           </div> 
        ))}
        
        <button className={style.share_button} onClick={ShareTeacher}>공유하기</button>
    </div>)
}

export default Request;