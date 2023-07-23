import style from './request.module.css';

const Request = () => {
//섹션의 수만큼의 크기를 가진 배열을 생성 추후에 해당 배열의 true 섹션만 쿼리스트링으로 표기
const itemCheck = new Array(5).fill(false);
const clickbox = (e) =>{ //섹션박스 누르면 체크상태 변경, 각 섹션의 체크상태 itemCheck에 표시. 
    if(e.target.id){
        const click_section = e.target.id;
        if(itemCheck[click_section]){
            e.target.children[1].style.backgroundColor = 'dodgerblue';
           
        } 
        else{
            e.target.children[1].style.backgroundColor = 'white';
          
        }
        itemCheck[click_section] = !itemCheck[click_section];
    }
}
    return(<div className={style.container}>
        <h1>요청페이지 입니다.</h1>
        <div id='0' className={style.checkcontainer} onClick={clickbox}>
        <h1>sesction 1</h1>
        <div className={style.checkbox}></div>
        </div>
        <div id='1' className={style.checkcontainer} onClick={clickbox}>
        <h1>sesction 2</h1>
        <div className={style.checkbox}></div>
        </div>
        <div id='2' className={style.checkcontainer} onClick={clickbox}>
        <h1>sesction 3</h1>
        <div className={style.checkbox}></div>
        </div>
        <div id='3' className={style.checkcontainer} onClick={clickbox}>
        <h1>sesction 4</h1>
        <div className={style.checkbox}></div>
        </div>
        <div id='4' className={style.checkcontainer} onClick={clickbox}>
        <h1>sesction </h1>
        <div className={style.checkbox}></div>
        </div>
    </div>)
}

export default Request;