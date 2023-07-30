import style from './supplyment.module.css';
import '../../global.css';
import { useOutletContext } from 'react-router-dom';
import TopNavi from '../../componenets/topNavi/TopNavi';
import CommonList from '../../componenets/commonList/CommonList';

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
        <div className='common_list_container'>
            <TopNavi title={`보충과목`}/>
            {checkedItemsStack !== null?
                (<ul className='common_list_innerbox'>
                {checkedItemsStack.map(item=>(
                    <CommonList content={item.content} subject={item.subject} check={false}/>
                ))}
                </ul>):(<IsnotSupplyment/>)
            }
        </div>
    )
}
const IsnotSupplyment = ()=>{

    return(
        <div className={style.isnot_supplyment}>
            {/* 추 후에 이미지로 대체 */}
            <div>보충과목이 존재하지않아요!</div>
        </div>
    )
}
export default Supplyment;