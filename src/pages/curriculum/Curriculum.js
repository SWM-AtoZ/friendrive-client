import style from './curriculum.module.css';
import TopNavi from '../../componenets/topNavi/TopNavi';
import CurriculumList from '../../componenets/curriculumList/CurriculumList';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Curriculum = () => {
    const curriculum = ['기본 조작하기','핸들링 배우기','주차 마스터하기','차선변경 익히기','주행 정복하기']
    const [chekedItem, setCheckedItem] = useState();
    //쿠키에 담겨진 jwt토근을 이용하여 로그인 유무를 검사 
    //로그인이 되어있으면 chekedItem API 호출
    //로그인 유무에 따라 각 데이의 진행율을 표기
    //로그인이 되어있으면 각 데이의 체크표시율을 CurriculumList에 Props로 전달.

    useEffect(()=>{
        //day 표기 안하면 전체 체크리스트 보내게 할 수는 없나 물어보기.
    },[])

    return(
        <section className={style.curruculumSection}>
        <TopNavi title={'커리큘럼'}/>
        {/* 데이 리스트마다 프로그레스 바 추가., 각 curriculumList 클릭하면 해당 Daylist로 이동. */}
        <div className={style.curriculum_list_container}>
        <div  className={style.curriculum_list}>
            {curriculum.map(
                (item,idx)=>(<CurriculumList day={idx+1} title={item}/>)
            )}
        </div>
        </div>
        </section>
    )
}

export default Curriculum;