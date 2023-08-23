import style from './teacherhome.module.css';
import TopNavi from '../../componenets/topNavi/TopNavi';
import CurriculumList from '../../componenets/curriculumList/CurriculumList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const Curriculum = () => {
    const curriculum = ['기본 조작하기','핸들링 배우기','주차 마스터하기','차선변경 익히기','주행 정복하기'];
    const [studentName, setStudentName] = useState();
    const [day1, setDay1] = useState(0);
    const [day2, setDay2] = useState(0);
    const [day3, setDay3] = useState(0);
    const [day4, setDay4] = useState(0);
    const [day5, setDay5] = useState(0);
    const setCheckedItemsNumb = [setDay1,setDay2,setDay3,setDay4,setDay5];
    const CheckedItemsNumb = [day1, day2, day3, day4, day5];
    const test = new Array(5).fill(0);

    const [searchParams, setSearchParams] = useSearchParams();
    const teacherToken = searchParams.get("teachertoken");

    useEffect( ()=>{
                axios.get(`https://api.friendrive.net/teacher?teacherToken=${teacherToken}`)
                .then(response =>{
                    const TempCheckedItem  = response.data.checkedItem;
                    setStudentName(response.data.name);
                    //각 데이마다 몇개의 아이템이 체크되어있는지 확인.
                    for(var i=0; i<setCheckedItemsNumb.length; i++){
                        var day = i+1;
                        for(var j=0; j<TempCheckedItem.length; j++){
                            if(TempCheckedItem[j].includes(`d${day}`)){
                                setCheckedItemsNumb[i](prev=>prev+1);
                                test[i]++;
                            }
                        }
                    }
                    console.log(test)
                })
                .catch(response => {
                    console.log(response);
                })
    },[])

    return(
        <section className={style.curruculumSection}>
        <div className={style.teacherHomeTitle}><span>{studentName}</span>님과 함께하는 운전연수!</div>
        <div className={style.curriculum_list_container}>
        <div  className={style.curriculum_list}>
            {curriculum.map(
                (item,idx)=>(<CurriculumList day={idx+1} title={item} progress={CheckedItemsNumb[idx]} teacherToken={teacherToken} studentName={studentName}/>)
            )}
        </div>
        </div>
        </section>
    )
}

export default Curriculum;