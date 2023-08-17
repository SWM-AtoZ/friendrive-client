import style from './daylistcomponent.module.css';
import { useNavigate } from 'react-router-dom';

const DaylistComponent = ({subject,contents}) => {
    const navigate = useNavigate();

    const goToDetail = () => {
        navigate(`/detail?content=${subject}`, {state:{contents,subject}})
    }
    return(
        <div onClick={goToDetail} className={style.daylist}>
                <div>
                  {subject}
                </div>
              </div>
    )
}

export default DaylistComponent;