import style from './feedback.module.css'
import { useEffect } from 'react';
const FeedBack = () => {
    useEffect(()=>{
        const arrow = document.getElementById('arrow');
        const content = document.getElementById('contents');
        const feedback = document.getElementById('feedback');

        arrow.style.display = 'block';
        content.style.backgroundColor = 'white';
        feedback.style.backgroundColor = 'rgba(0, 0, 0, 0.07)';
    },[])

    return(
        <div>
            평가화면입니다.
        </div>
    )
}

export default FeedBack;