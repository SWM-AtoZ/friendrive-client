import style from "./nav.module.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Nav = () => { 
    const [cookies,setCookie,removeCookie] = useCookies(['token']);
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState('1');

    const goHome=()=>{
        setActiveNav('1');
        navigate('/');
    }
    const goToSupplyment = () => {
        // if(cookies.token){
        //         navigate('/supplyment');
        //         setActiveNav('2');
        // }
        // else{
        //     alert('로그인이 필요한 서비스입니다.');
        //     navigate('/login');
        // }
        alert('준비중인 서비스입니다!');
    }
    const goToUser = () => {
        // if(cookies.token){
        //     navigate('./user');
        //     setActiveNav('3');
        // }
        // else{
        //     alert('로그인이 필요한 서비스입니다.');
        //     navigate('/login');
    // }
        navigate('./user');
        setActiveNav('3');
        
    }

    return (
    <div className={style.nav}>
        {activeNav==='1'?(
            <div onClick={goHome} className={style.link} >
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 25 24" fill="none">
                <path d="M11.803 3.84101C12.0959 3.54811 12.5708 3.54811 12.8636 3.84101L21.553 12.5303C21.8459 12.8232 22.3207 12.8232 22.6136 12.5303C22.9065 12.2375 22.9065 11.7626 22.6136 11.4697L13.9243 2.78035C13.0456 1.90167 11.621 1.90167 10.7423 2.78035L2.05298 11.4697C1.76009 11.7626 1.76009 12.2375 2.05298 12.5303C2.34588 12.8232 2.82075 12.8232 3.11364 12.5303L11.803 3.84101Z" fill="white"/>
                <path d="M12.3333 5.432L20.4923 13.591C20.522 13.6207 20.5524 13.6494 20.5833 13.6772V19.875C20.5833 20.9105 19.7438 21.75 18.7083 21.75H15.3333C14.9191 21.75 14.5833 21.4142 14.5833 21V16.5C14.5833 16.0858 14.2475 15.75 13.8333 15.75H10.8333C10.4191 15.75 10.0833 16.0858 10.0833 16.5V21C10.0833 21.4142 9.74753 21.75 9.33331 21.75H5.95831C4.92278 21.75 4.08331 20.9106 4.08331 19.875V13.6772C4.11424 13.6494 4.14458 13.6207 4.1743 13.591L12.3333 5.432Z" fill="white"/>
            </svg>
            <div className={style.img_description}>홈</div>
            </div>
        ):
        (<div onClick={goHome} className={style.link} >
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 22 21" fill="none">
        <path d="M1 10.284L9.9545 1.32951C10.3938 0.890165 11.1062 0.890165 11.5455 1.3295L20.5 10.284M3.25 8.03401V18.159C3.25 18.7803 3.75368 19.284 4.375 19.284H8.5V14.409C8.5 13.7877 9.00368 13.284 9.625 13.284H11.875C12.4963 13.284 13 13.7877 13 14.409V19.284H17.125C17.7463 19.284 18.25 18.7803 18.25 18.159V8.03401M7 19.284H15.25" stroke="#D6D6D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>  
        <div className={style.img_description}>홈</div>
        </div>)}
        {activeNav==='2'?(
            <div className={style.link} onClick={goToSupplyment}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 17 21" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.25 0H1.875C0.839467 0 0 0.839465 0 1.875V19.125C0 20.1605 0.839466 21 1.875 21H14.625C15.6605 21 16.5 20.1605 16.5 19.125V11.25C16.5 9.17893 14.8211 7.5 12.75 7.5H10.875C9.83947 7.5 9 6.66053 9 5.625V3.75C9 1.67893 7.32107 0 5.25 0ZM11.8603 10.9359C12.1011 10.5989 12.023 10.1305 11.6859 9.8897C11.3489 9.64894 10.8805 9.72701 10.6397 10.0641L7.4043 14.5936L5.78033 12.9697C5.48744 12.6768 5.01256 12.6768 4.71967 12.9697C4.42678 13.2626 4.42678 13.7374 4.71967 14.0303L6.96967 16.2803C7.12556 16.4362 7.34215 16.5156 7.56186 16.4974C7.78157 16.4793 7.98216 16.3653 8.1103 16.1859L11.8603 10.9359Z" fill="white"/>
            <path d="M9.22119 0.315905C10.018 1.23648 10.5 2.43695 10.5 3.75V5.625C10.5 5.83211 10.6679 6 10.875 6H12.75C14.0631 6 15.2635 6.48204 16.1841 7.27881C15.2962 3.87988 12.6201 1.20377 9.22119 0.315905Z" fill="white"/>
          </svg>
          <div className={style.img_description}>보충 과목</div>
        </div>
        ):(
            <div className={style.link} onClick={goToSupplyment}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none">
        <path d="M10.125 2.25H5.625C5.00368 2.25 4.5 2.75368 4.5 3.375V20.625C4.5 21.2463 5.00368 21.75 5.625 21.75H18.375C18.9963 21.75 19.5 21.2463 19.5 20.625V11.625M10.125 2.25H10.5C15.4706 2.25 19.5 6.27944 19.5 11.25V11.625M10.125 2.25C11.989 2.25 13.5 3.76104 13.5 5.625V7.125C13.5 7.74632 14.0037 8.25 14.625 8.25H16.125C17.989 8.25 19.5 9.76104 19.5 11.625M9 15L11.25 17.25L15 12" stroke="#D6D6D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div className={style.img_description}>보충 과목</div>
        </div>
        )}
        {activeNav==='3'?(
            <div className={style.link} onClick={goToUser}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 20 20" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.4354 16.8471C18.3221 15.0691 19.5 12.5471 19.5 9.75C19.5 4.36522 15.1348 0 9.75 0C4.36522 0 0 4.36522 0 9.75C0 12.5471 1.17785 15.0691 3.06463 16.8471C4.81012 18.4919 7.16234 19.5 9.75 19.5C12.3377 19.5 14.6899 18.4919 16.4354 16.8471ZM3.89512 15.5623C5.26961 13.8478 7.38161 12.75 9.75 12.75C12.1184 12.75 14.2304 13.8478 15.6049 15.5623C14.1103 17.0678 12.039 18 9.75 18C7.461 18 5.38973 17.0678 3.89512 15.5623ZM13.5 6.75C13.5 8.82107 11.8211 10.5 9.75 10.5C7.67893 10.5 6 8.82107 6 6.75C6 4.67893 7.67893 3 9.75 3C11.8211 3 13.5 4.67893 13.5 6.75Z" fill="white"/>
                </svg>
            <div className={style.img_description}>내 정보</div>
        </div>
        ):(
            <div className={style.link} onClick={goToUser}>
        <svg width="1.5rem" height="1.5rem" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="Vector" d="M15.9815 16.7248C14.6121 14.9175 12.4424 13.75 10 13.75C7.55761 13.75 5.38789 14.9175 4.01846 16.7248M15.9815 16.7248C17.8335 15.0763 19 12.6744 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 12.6744 2.1665 15.0763 4.01846 16.7248M15.9815 16.7248C14.3915 18.1401 12.2962 19 10 19C7.70383 19 5.60851 18.1401 4.01846 16.7248M13 7.75C13 9.40685 11.6569 10.75 10 10.75C8.34315 10.75 7 9.40685 7 7.75C7 6.09315 8.34315 4.75 10 4.75C11.6569 4.75 13 6.09315 13 7.75Z" stroke="#D6D6D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div className={style.img_description}>내 정보</div>
        </div>
        )}
    </div>
    )
};

export default Nav;