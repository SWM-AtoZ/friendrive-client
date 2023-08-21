import style from './dayinfotitle.module.css';
import { useEffect, useRef, useState } from 'react';
import { Cookies } from 'react-cookie';

const DayinfoTitle = ({day, title, dayprocess}) => {
    const DaysItemsTotalNumb = [7,8,3,6,4];
    const TotalNumb = DaysItemsTotalNumb[day-1];
    const [percentage, setPercentage] = useState('');
    const cookies = new Cookies();
    const circleRef = useRef();

    useEffect(()=>{
        //체크 목록 불러와서 몇개 체크되어있는지 확인하기.

        //로그인 유무에 따라 퍼센테이지 다르게 그려주기
       const outline = circleRef.current.getTotalLength();
       circleRef.current.style.strokeDasharray = outline;
    
       if(cookies.get('token')){
        // 로그인이 된 경우
        circleRef.current.style.strokeDashoffset = outline * (1 - Math.floor((dayprocess/TotalNumb) * 100) / 100);
        const tempPercent = Math.floor((dayprocess/TotalNumb) * 100);
        setPercentage(tempPercent);
        if(tempPercent<=15){
            circleRef.current.style.stroke = "#FF0000";
        }
        else if(tempPercent>15 && tempPercent<100 ){
            circleRef.current.style.stroke = "#FFE300";
        }
        else if(tempPercent===100){
            circleRef.current.style.stroke = "#389300";
        }
       }
       else{
        // 로그인이 되지 않은 경우
        circleRef.current.style.strokeDashoffset = outline;
        setPercentage(0);
       }
    },[dayprocess])

    return(
        <div className={style.curriculum_list}>
                    <div className={style.curriculum_progress}>
                    {/* dayprocess 의 값에 따라 진행율 적용하여 보여줌 */}
                    <div className={style.circle_box}> 
                    <svg className={style.circle_inner_box}  width="100%" height="100%" viewBox="0 0 200 200" fill="none">
                        <circle  cx="100" cy="100" r="88" fill="none" stroke="#BDBDBD" stroke-width="12" />
                        <circle className={style.circle} ref={circleRef} cx="100" cy="100" r="88" fill="none" stroke-width="12" />
                    </svg>
                    <div>
                        {percentage?percentage:0}%
                    </div>
                    </div>
                    <div className={style.title}>
                    <div>Day {day}</div>
                    <div>{title}</div>
                    </div>
                    </div>
                    <div className={style.go_daylist}>
                    </div>
        </div>
    )
}


export default DayinfoTitle;