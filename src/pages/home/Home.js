import React,{useRef, useEffect} from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import style from './home.module.css';

function Home() {
  const curriculum = useOutletContext().curriculum;

  return (
    <section id={style.home_section}>
      <div className={style.section_explain}>
        <div className={style.section_explain_number}>{curriculum[0].days} 운전, 그게 뭔데?</div>
        <div className={style.section_explain_title}><h1>{curriculum[0].summary}</h1></div>
        <div className={style.section_explain_discription}>{curriculum[0].explain}</div>
      </div>
      <div className={style.section_card_container}>
          <ul className={style.section_card_innerbox}>
              <li className={style.section_card_item}>
                <Link className={style.section_item} to={`/section`} state={{section:curriculum[0].days}}>
                     해당 섹션 자세히 보기.
                </Link>
              </li>              
          </ul>
          <Link to={'/request'}><button>요청하기</button></Link>
      </div>
    </section>
  );
}

export default Home;

