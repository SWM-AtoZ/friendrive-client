import style from './section.module.css';
import { Link } from 'react-router-dom';
const Section = () => {
    return(<div>
        <h1>섹션 페이지입니다.</h1>
        <div className={style.section_card_container}>
          <ul className={style.section_card_innerbox}>
              <li className={style.section_card_item}>
                <Link to={'/detail/운전자세'}>운전자세</Link>
              </li>
              <li className={style.section_card_item}>
                <Link to={'/detail/명칭과기능'}>명칭과 기능</Link>
              </li>
          </ul>
        </div>
    </div>)
}

export default Section;