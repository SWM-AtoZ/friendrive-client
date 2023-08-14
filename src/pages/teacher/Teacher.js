import { useState,useEffect } from "react";
import {useSearchParams, Outlet } from "react-router-dom";
import style from './teacher.module.css';
import Loading from '../loading/Loading';
import axios, { all } from "axios";


  
const Teacher = () => {
    
    const [checked, setChecked] = useState();
    const [curriculum, setCurrilculum] = useState();
    const [allitems, setAllitems] = useState();
    const [StudentName, setStudentName] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const teacherToken = searchParams.get("teachertoken");

    function setScreenSize() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setScreenSize();
    window.addEventListener('resize', setScreenSize);
    
    // 선생님 페이지 get api
    const loadTeacherdata = async() =>{
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
        <Outlet context={{checked, curriculum, allitems, StudentName}}/>
    </section>
  );
}

export default Teacher;