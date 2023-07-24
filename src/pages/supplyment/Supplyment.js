import style from './supplyment.module.css';
import { useOutletContext } from 'react-router-dom';

const Supplyment = ()=>{
    const {curriculum, checked} = useOutletContext();
    const allItems = curriculum.items; // 커리큘럼의 모든 아이템이 모여있는 객체 배열
    const checkedItmes = checked.checkedItem; // 체크된 itemId가 기재된 배열
    const checkedItemsStack = []; // 전체 아이템 중 체크된 아이템객체를 모아둘 배열

    for(var i=0; i<checkedItmes.length; i++){ // 체크된 아이템객체만 필터링
        for(var j=0; j<allItems.length; j++){
            if(checkedItmes[i]===allItems[j].itemId){
                checkedItemsStack.push(allItems[j]);
                break;
            }
        }
    }


    return (
        <div><h1>보충항목 페이지입니다.</h1></div>
    )
}

export default Supplyment;