import style from './servicefeedback.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const ServiceFeedback = () => {
    const navigate = useNavigate();
    const [feedBack, setMemoText] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [SubmitBtn, setSubmitBtn] = useState(true);
    const [cookies,,] = useCookies(['token']);
    const location = useLocation();
    const history = location.state;

    const onChangeWrite = (e) =>{
        setMemoText(e.target.value);
    }
    const onChangePhonenumber = (e) =>{
        setPhoneNumber(e.target.value);
    }

    const sendFeedback = () => {
        if(cookies.token){
            axios.post('https://api.friendrive.net/feedback',{
                feedback : `${feedBack}`
            })
            .then(response=>{
                console.log(response);
                navigate(-1);
                alert('소중한 의견 감사합니다.');
            })
            .catch(response=>{
                console.log(response);
            })
        }
        else if(!cookies.token){
            if(phoneNumber.length>=10){
                axios.post('https://api.friendrive.net/feedback',{
                phoneNumber : `${phoneNumber}`,
                feedback : `${feedBack}`
            })
            .then(response=>{
                console.log(response);
                navigate(-1);
                alert('소중한 의견 감사합니다.');
            })
            .catch(response=>{
                console.log(response);
            })
            }
            else{
                if(phoneNumber.length>0){
                    alert('전화번호를 올바르게 입력해주세요')
                }
                else{
                    axios.post('https://api.friendrive.net/feedback',{
                feedback : `${feedBack}`
            })
            .then(response=>{
                console.log(response);
            })
            .catch(response=>{
                console.log(response);
            })
                }
            }
        }
    }
    useEffect(()=>{
        if(feedBack.length>=1){
            //loginbtnRef.current.disabled = false;    
            setSubmitBtn(false);
        }
        else{
            setSubmitBtn(true);
        }
    
    },[feedBack])
    return(
        <section className={style.navi_section}>
        <div id='topNavi' className={style.topNavi}>
          <div onClick={() => navigate(`${history}`,{
            replace:true,
          })} className={style.back}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 8 12" fill="none">
              <path d="M7.40991 10.5898L2.82991 5.99976L7.40991 1.40976L5.99991 -0.000244141L-8.7738e-05 5.99976L5.99991 11.9998L7.40991 10.5898Z" fill="black"/>
            </svg>
          </div>
          <div className={style.naviTitle}>서비스 피드백</div>
        </div>
        <article className={style.writing_area_box}>
          <div className={style.page_description}>
            <div>서비스의 <span>중심</span>은 언제나 <span>고객님</span>입니다.</div>
            <div className={style.page_description_inner}>
            <div>이용하며 느끼신 불편한 점이나 바라는 점을 알려주세요. <br/>소중한 의견으로 한뼘 더 자라는 FD가 되도록 하겠습니다.<br/><span>{'( '}추첨을 통해 소정의 상품을 드립니다.{' )'}</span> </div>
            </div>
          </div>
          <textarea className={style.writing_area} onChange={onChangeWrite} value={feedBack} placeholder='(필수) 서비스에 대한 소중한 의견사항을 남겨주세요'></textarea>
          {!cookies.token&&<div className={style.phoneNumber_box}>
          <label for="phoneNumber">전화번호</label>
          <input id="phoneNumber" className={style.login_input} type='number' placeholder='(선택) 소정의 상품을 원하시는 분은 전화번호를 남겨주세요' value={phoneNumber} onChange={onChangePhonenumber}></input>
          </div>}
          <button onClick={sendFeedback} className={style.send_btn} disabled={SubmitBtn}>작성 완료</button>
        </article>
        </section>
    )
}

export default ServiceFeedback;