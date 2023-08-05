import { useState,useEffect } from "react";
import { useLoaderData,useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import style from './teacher.module.css';
import Toggleitem from "../../componenets/toggleItem/Toggleitem";
import Loading from '../loading/Loading';
import axios, { all } from "axios";


  
const Teacher = () => {
    
    const [checked, setChecked] = useState();
    const [curriculum, setCurrilculum] = useState();
    const [allitems, setAllitems] = useState();
    const [StudentName, setStudentName] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    var teacherToken = '';

    function setScreenSize() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setScreenSize();
    window.addEventListener('resize', setScreenSize);
    
    // 선생님 페이지 get api
    const loadTeacherdata = async() =>{
        teacherToken = searchParams.get("teachertoken");
        await axios.get(`https://41icjhls1i.execute-api.ap-northeast-2.amazonaws.com/dev/teacher?token=${teacherToken}`)
        .then(function (response) {
            setStudentName(response.data.name);
            setChecked(response.data.checkedItem);
        })
        .catch(function (error) {
            console.log(error);
            
          });  
    }

    // 전체 커리큘럼 받아오기
    const getCurriculum = async() =>{
        await axios.get("https://41icjhls1i.execute-api.ap-northeast-2.amazonaws.com/dev/curriculum")
        .then(function (response) {
            setTimeout(()=>{
                setCurrilculum(response.data.curriculum);
                setAllitems(response.data.items);},600)
          })
          .catch(function (error) {
            console.log(error);
          });  
    }
    
    useEffect(()=>{
    loadTeacherdata();
    getCurriculum();
    },[])

  return (
    <section className={style.teacher_section}>
        {StudentName !==''?curriculum?(<>
        <div className={style.title}>{StudentName?(<div className={style.font}>{StudentName}님과 함께하는 연수!</div>):(<div className={style.font}>상일님과 함께하는 연수!</div>)}</div>
        {curriculum.map((item, idx)=>{
            //해당 섹션에 관련된 아이템 필터링
            const filteredItem = allitems.filter(nonfiltereditem => 
                nonfiltereditem.day === item.days
            );
            const prop = {
                key : item.days,
                day: item.days,
                summary : item.title,
                img : item.imgLink,
                filterdItem : filteredItem,
                checked : checked,
            }
            return <Toggleitem {...prop}/>
        })}</>):(<Loading/>) : (<div className={style.nonAuthority}>페이지 열람 권한이 없습니다.</div>)}   
    </section>
  );
}

export default Teacher;