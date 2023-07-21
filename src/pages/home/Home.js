import React,{useRef, useEffect} from 'react';
import { Link } from 'react-router-dom';
import style from './home.module.css';

function Home() {
  const width = window.innerWidth;
  console.log(width*0.66);

  return (
    <section id='home_section'>
        <div className={style.section_explain}>
        <div className={style.section_explain_numner}></div>
        <div className={style.section_explain_title}></div>
        <div className={style.section_explain_discription}></div>
      </div>
      <div className={style.section_card_container}>
          <ul className={style.section_card_innerbox}>
              <li className={style.section_card_item}>
                <Link to={'/section'}>상세보기</Link>
              </li>
              <li className={style.section_card_item}>
                <Link to={'/request'}>요청하기</Link>
              </li>
          </ul>
      </div>
    </section>
  );
}

export default Home;

