import style from './teacherListItem.module.css';
import { useNavigate } from 'react-router-dom';
import {useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import pass from './pass.png';
import axios from 'axios';

const TeacherListItem = ({subject, content, checked, itemId, icon}) =>{
    const navigate = useNavigate();
    const [checkState, setCheckState] = useState(checked);
    const [cookies,,] = useCookies([]);
    const passRef = useRef();

    const body = {
        token : cookies.teacherToken,
        item : itemId.toString()
    }

    const postdata = async() =>{
        axios.post("https://41icjhls1i.execute-api.ap-northeast-2.amazonaws.com/dev/teacher/check",body)
        .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });  
    }

    const chagestate = () =>{
        //  체크 할 때마다 서버에 전송.
       setCheckState(prev => !prev);
        if(checkState){
            passRef.current.style.opacity = 0;
            
        }
        else{
            passRef.current.style.opacity = 1;
        }
        postdata();
    }

    const goToGuide = (content) => {
       // navigate('/teacherdetail', {state:{ content:content, title:subject}})
       console.log(content);
       window.location.href = `${content}`;
    }
    
    useEffect(()=>{
        if(checkState){
            passRef.current.style.opacity = 1;
        }
        else{
            passRef.current.style.opacity = 0;

        }
    },[])

    return(
    <div className={style.list_container}>
        <div className={style.info_box}>
        <div className={style.subject_icon_box}>
            <div className={style.subject_icon}> 
                <img src={icon}/>
            </div>
            <div ref={passRef} className={style.pass_icon}>
                <img src={pass}/>
        </div>
        </div>
        <div className={style.subject_title}>{subject}</div>
        </div>
        <div onClick={chagestate} >
        {checkState?
        (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M6.39001 16.2251V6.06508C6.39001 5.66508 6.51001 5.27508 6.73001 4.94508L9.46001 0.885083C9.89001 0.235083 10.96 -0.224917 11.87 0.115083C12.85 0.445083 13.5 1.54508 13.29 2.52508L12.77 5.79508C12.73 6.09508 12.81 6.36508 12.98 6.57508C13.15 6.76508 13.4 6.88508 13.67 6.88508H17.78C18.57 6.88508 19.25 7.20508 19.65 7.76508C20.03 8.30508 20.1 9.00508 19.85 9.71508L17.39 17.2051C17.08 18.4451 15.73 19.4551 14.39 19.4551H10.49C9.82001 19.4551 8.88001 19.2251 8.45001 18.7951L7.17001 17.8051C6.68001 17.4351 6.39001 16.8451 6.39001 16.2251Z" fill="#202632"/>
                <path d="M3.21 4.11499H2.18C0.63 4.11499 0 4.71499 0 6.19499V16.255C0 17.735 0.63 18.335 2.18 18.335H3.21C4.76 18.335 5.39 17.735 5.39 16.255V6.19499C5.39 4.71499 4.76 4.11499 3.21 4.11499Z" fill="#202632"/>
            </svg>
            
        ):
        (  
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4002 0.14491C13.623 0.559986 14.4594 1.89959 14.1877 3.18919L13.6919 6.362C13.673 6.50087 13.7138 6.57745 13.7499 6.61833C13.7917 6.66574 13.8602 6.70204 13.95 6.70204H17.95C18.9029 6.70204 19.7427 7.08848 20.2538 7.78214C20.7666 8.47815 20.8795 9.39063 20.5597 10.2948L18.1704 17.5623C17.9645 18.3525 17.447 19.0062 16.8304 19.4573C16.207 19.9135 15.4298 20.202 14.65 20.202H10.85C10.4776 20.202 10.0333 20.1416 9.61896 20.0232C9.23818 19.9144 8.78894 19.7305 8.45859 19.4201L5.39087 17.0451L6.30913 15.859L9.44672 18.2881L9.48033 18.3217C9.54698 18.3884 9.727 18.494 10.031 18.5809C10.3167 18.6625 10.6224 18.702 10.85 18.702H14.65C15.0702 18.702 15.543 18.5406 15.9446 18.2468C16.3457 17.9533 16.6231 17.5672 16.7224 17.1701L16.729 17.1437L19.1405 9.80876L19.1437 9.79979C19.3197 9.30705 19.2316 8.92349 19.0462 8.67194C18.8573 8.41561 18.4971 8.20204 17.95 8.20204H13.95C12.9067 8.20204 12.0412 7.31064 12.2075 6.14598L12.2089 6.13625L12.7127 2.91266L12.7179 2.88935C12.8285 2.39133 12.4749 1.7509 11.9128 1.56356L11.8997 1.55917L11.8867 1.55429C11.6837 1.47817 11.4169 1.47992 11.1438 1.57381C10.8656 1.66943 10.6649 1.83174 10.574 1.96807L10.5725 1.97042L6.47247 8.07042L5.22754 7.23367L9.32596 1.13602C9.32626 1.13558 9.32655 1.13513 9.32685 1.13469C9.63603 0.671703 10.1349 0.334485 10.6562 0.155279C11.1792 -0.0245053 11.807 -0.0733724 12.4002 0.14491Z" fill="#202632"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.73371 5.72806C1.63499 5.81918 1.5 6.03647 1.5 6.65195V16.452C1.5 17.0674 1.63499 17.2847 1.73371 17.3759C1.84716 17.4806 2.10748 17.602 2.75 17.602H3.75C4.39252 17.602 4.65284 17.4806 4.76629 17.3759C4.86501 17.2847 5 17.0674 5 16.452V6.65195C5 6.03647 4.86501 5.81918 4.76629 5.72806C4.65284 5.62333 4.39252 5.50195 3.75 5.50195H2.75C2.10748 5.50195 1.84716 5.62333 1.73371 5.72806ZM0.71629 4.62585C1.25284 4.13058 1.99252 4.00195 2.75 4.00195H3.75C4.50748 4.00195 5.24716 4.13058 5.78371 4.62585C6.33499 5.13473 6.5 5.86744 6.5 6.65195V16.452C6.5 17.2365 6.33499 17.9692 5.78371 18.4781C5.24716 18.9733 4.50748 19.102 3.75 19.102H2.75C1.99252 19.102 1.25284 18.9733 0.71629 18.4781C0.165005 17.9692 0 17.2365 0 16.452V6.65195C0 5.86744 0.165005 5.13473 0.71629 4.62585Z" fill="#202632"/>
            </svg>
        )}
        </div>
        <div onClick={(e)=>{
            console.log(e.target);
            
                goToGuide(content)
            }} className={style.icon_box}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M8.59003 7.41L13.17 12L8.59003 16.59L10 18L16 12L10 6L8.59003 7.41Z" fill="black"/>
                </svg>
        </div>
        
    </div>)
}

export default TeacherListItem;