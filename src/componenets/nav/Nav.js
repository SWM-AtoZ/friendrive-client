import style from "./nav.module.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Nav = () => { 
    const [cookies,setCookie,removeCookie] = useCookies(['token']);
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState('1');

    const goToSupplyment = () => {
        if(cookies.token){
                navigate('/supplyment');
                setActiveNav('2');
        }
        else{
            alert('로그인이 필요한 서비스입니다.');
            navigate('/login');
        }
    }
    const goToUser = () => {
        if(cookies.token){
            navigate('./user');
            setActiveNav('3');
        }
        else{
            alert('로그인이 필요한 서비스입니다.');
            navigate('/login');
        }
    }
    const goHome=()=>{
        setActiveNav('1');
        navigate('/');
    }
    return (
    <div className={style.nav}>
        <div onClick={goHome} className={style.link} >
        <svg  xmlns="http://www.w3.org/2000/svg" width="30%" height="50%" viewBox="0 0 29 30" fill="none">
        <path d="M2.71875 15L13.5388 3.8069C14.0696 3.25773 14.9304 3.25773 15.4612 3.8069L26.2812 15M5.4375 12.1875V24.8438C5.4375 25.6204 6.04611 26.25 6.79688 26.25H11.7812V20.1563C11.7812 19.3796 12.3899 18.75 13.1406 18.75H15.8594C16.6101 18.75 17.2188 19.3796 17.2188 20.1563V26.25H22.2031C22.9539 26.25 23.5625 25.6204 23.5625 24.8438V12.1875M9.96875 26.25H19.9375" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div className={style.img_description}>홈</div>
        </div>
        
        <div className={style.link} onClick={goToSupplyment}>
        {/* <img src={check} className={style.img}/> */}
        <svg xmlns="http://www.w3.org/2000/svg" width="30%" height="50%" viewBox="0 0 24 24" fill="none">
        <path d="M10.125 2.25H5.625C5.00368 2.25 4.5 2.75368 4.5 3.375V20.625C4.5 21.2463 5.00368 21.75 5.625 21.75H18.375C18.9963 21.75 19.5 21.2463 19.5 20.625V11.625M10.125 2.25H10.5C15.4706 2.25 19.5 6.27944 19.5 11.25V11.625M10.125 2.25C11.989 2.25 13.5 3.76104 13.5 5.625V7.125C13.5 7.74632 14.0037 8.25 14.625 8.25H16.125C17.989 8.25 19.5 9.76104 19.5 11.625M9 15L11.25 17.25L15 12" stroke="#D6D6D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div className={style.img_description}>보충 과목</div>
        </div>

        <div className={style.link} onClick={goToUser}>
        <svg width="30%" height="50%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="Vector" d="M15.9815 16.7248C14.6121 14.9175 12.4424 13.75 10 13.75C7.55761 13.75 5.38789 14.9175 4.01846 16.7248M15.9815 16.7248C17.8335 15.0763 19 12.6744 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 12.6744 2.1665 15.0763 4.01846 16.7248M15.9815 16.7248C14.3915 18.1401 12.2962 19 10 19C7.70383 19 5.60851 18.1401 4.01846 16.7248M13 7.75C13 9.40685 11.6569 10.75 10 10.75C8.34315 10.75 7 9.40685 7 7.75C7 6.09315 8.34315 4.75 10 4.75C11.6569 4.75 13 6.09315 13 7.75Z" stroke="#D6D6D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div className={style.img_description}>내 정보</div>
        </div>
    </div>
    )
};

export default Nav;