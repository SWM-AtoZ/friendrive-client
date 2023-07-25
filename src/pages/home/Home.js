import React from 'react';
import { Link, useOutletContext, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import style from './home.module.css';
import axios from 'axios';

function Home() {
  const {curriculum} = useOutletContext().curriculum;
  const [cookies,,] = useCookies(['token']);
  const navigate = useNavigate();

  const isLogin = () => {
    if(cookies.token){
      navigate('/request')
    }
    else{
      alert('로그인이 필요힌 서비스입니다');
      navigate('/login')
    }
  }
  return (
    <section id={style.home_section}>
      <div className={style.section_explain}>
        <div className={style.section_explain_number}>{curriculum[0].days} 운전, 그게 뭔데?</div>
        <div className={style.section_explain_title}><h1>{curriculum[0].summary}</h1></div>
        <div className={style.section_explain_discription}>{curriculum[0].explain}</div>
      </div>
      <div className={style.section_card_container}>
              {curriculum.map((item,idx)=>(
                <div className={style.section_card_item}>
                <Link className={style.section_item} to={`/section`} state={{section:item.days}}>
                     {item.title}
                </Link>
              </div>  
              )
              )};            
      </div>
     <button onClick={isLogin} className={style.request_button}>요청하기</button>
    </section>
  );
}

export default Home;

