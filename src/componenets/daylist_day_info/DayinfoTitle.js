import style from './dayinfotitle.module.css';
import { useEffect, useRef, useState } from 'react';
import { Cookies } from 'react-cookie';
import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';

const DayinfoTitle = ({day, title, dayprocess, confirm, memosLength}) => {
    const DaysItemsTotalNumb = [7,8,3,6,4];
    const TotalNumb = DaysItemsTotalNumb[day-1];
    const [percentage, setPercentage] = useState('');
    const navigate = useNavigate()
    const cookies = new Cookies();
    const circleRef = useRef();

    const goToWrite = () =>{
        if(cookies.get('token')){
            navigate('/writing',{
                state : {
                day : day
            }});
        }
        else{
            if(!isMobile){
                const loginConfirm = window.confirm('로그인이 필요한 서비스입니다, 로그인 하시겠습니까?');
                if(loginConfirm){
                    navigate('/login');
                }
            }
            else{
                confirm();
            }
        }
    }

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
        if(tempPercent<=15&&tempPercent>0){
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
                    <div>
                    {memosLength>0&&<button onClick={goToWrite}>
                         <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 32 32" fill="none">
                             <path fill-rule="evenodd" clip-rule="evenodd" d="M16 4C22.6274 4 28 9.37258 28 16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4Z" stroke="black" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                             <path d="M20 16.0001H12" stroke="black" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                             <path d="M16.0001 12V20" stroke="black" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>}
                    </div>
                
        </div>
    )
}


export default DayinfoTitle;