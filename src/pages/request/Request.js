import style from './request.module.css';
import '../../global.css';
import { useOutletContext } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import {CopyToClipboard} from "react-copy-to-clipboard/src";
import TopNavi from '../../componenets/topNavi/TopNavi';

const Request = () => {
const curriculum = useOutletContext().curriculum.curriculum;
const checkRef = useRef([]);
const [cookies,,] = useCookies([]);
const [sharebtn, setSharebtn] = useState('true');

//섹션의 수만큼의 크기를 가진 배열을 생성 추후에 해당 배열의 true 섹션만 쿼리스트링으로 표기
const itemCheck = new Array(curriculum.length).fill(false);
useEffect(()=>{
    if(!navigator.canShare){
        setSharebtn(false)
    }
},[])

const clickbox = (e) =>{ //섹션박스 누르면 체크상태 변경, 각 섹션의 체크상태 itemCheck에 표시. 
    var click_section;        
    if(e.target.id){
            click_section = e.target.id;
            if(!itemCheck[click_section]){
                checkRef.current[click_section].style.backgroundColor = 'dodgerblue';
               
            } 
            else{
                checkRef.current[click_section].style.backgroundColor = 'white';
              
            }
            itemCheck[click_section] = !itemCheck[click_section];
        }
        else{
            click_section = e.target.parentElement.id;
            if(!itemCheck[click_section]){
                checkRef.current[click_section].style.backgroundColor = 'dodgerblue';
               
            } 
            else{
                checkRef.current[click_section].style.backgroundColor = 'white';
              
            }
            itemCheck[click_section] = !itemCheck[click_section];
           
        }
        
    
}

function getSection(arr){
    var temp = [];
    for(var i=0; i<arr.length; i++){
        if(arr[i]){
            temp.push(i);
        }
    }
    return temp.join(',');
}


const ShareTeacher = (checkArr) => {
    //티처토큰과, 체크된 섹션의 숫자 구해서 쿼리스트링에 담아주기.
    const teachertoken=cookies.teacherToken;
    const section =getSection(checkArr);
    const url = `https://friendrive.net/teacher?section=${section}&teachertoken=${teachertoken}`
    if (navigator.share) {
        navigator.share({
            title: '기록하며 성장하기',
            text: 'Hello World',
            url: url,
        });
    }else{
        alert("공유하기가 지원되지 않는 환경 입니다.");
    }
  }

    return(
    <div className='common_list_container'>
        <TopNavi title={'요청하기'}/>
        <div className={style.request_list_innerbox}>
        {curriculum.map((item, idx)=>(
           <div id={idx} className={style.checkcontainer} onClick={clickbox}>
            <p className={style.section_title}>sesction {item.days}</p>
            <div ref={el => checkRef.current[idx] = el} className={style.checkbox}></div>
            <div className={style.section_description}>{item.summary}</div>
           </div> 
        ))}
        </div>    
        {sharebtn?(<button className={style.share_button} onClick={()=>{ShareTeacher(itemCheck)}}>공유하기</button>):
        (<CopyToClipboard text={'zzzzz'} onCopy={() => alert("클립보드에 복사되었습니다.")}>
        <button className={style.share_button}> 공유하기</button></CopyToClipboard>)}
    </div>)
}

export default Request;