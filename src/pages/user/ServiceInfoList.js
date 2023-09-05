import style from './serviceinfolist.module.css';
import TopNavi from '../../componenets/topNavi/TopNavi';
import { useNavigate } from 'react-router-dom';
const ServiceInfoList = () => {
    const navigate = useNavigate();

    const GotoTermsAndConditions = () => {
        navigate('/TermsAndCondition');
    }

    const GoToPrivacyPolicy = () => {
        navigate('/PrivacyPolicy')
    }
    return(
    <section className={style.serviceinfo_area}>
        <TopNavi title={'서비스 정보'}/>
        <div className={style.list_box}>
            <div onClick={GotoTermsAndConditions} className={style.list}>
                <div>이용약관</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8.59003 7.41L13.17 12L8.59003 16.59L10 18L16 12L10 6L8.59003 7.41Z" fill="rgba(0, 0, 0, 0.4)"/>
                </svg>
            </div>
            <div onClick={GoToPrivacyPolicy} className={style.list}>
            <div>개인정보 처리방침</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8.59003 7.41L13.17 12L8.59003 16.59L10 18L16 12L10 6L8.59003 7.41Z" fill="rgba(0, 0, 0, 0.4)"/>
                </svg>
            </div>
        </div>
    </section>)
}

export default ServiceInfoList;