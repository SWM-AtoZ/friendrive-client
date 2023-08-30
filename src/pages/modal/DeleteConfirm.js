import { useLocation, useNavigate } from 'react-router-dom';
import style from './confirm.module.css';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';


const DeleteConfirm = () =>{
const navigate = useNavigate();
const location = useLocation();
const title = location.state.message_title;
const description = location.state.message_description;
const memo_id = location.state.memo_id;
const {setMemo} = useOutletContext();
const [cookies,,] = useCookies(['token']);

const ClickOk = () =>{
    axios.delete(`https://api.friendrive.net/record/${memo_id}`,{
        headers:{
          Authorization: `Bearer ${cookies.token}`
        }
      })
      .then((response)=>{
        console.log(response);
        setMemo(prev=>prev.filter((item)=>item.id!==memo_id))
      })
      .catch((response)=>{
        console.log(response);
      })
    navigate(-1);

}
const ClicikCancle = () =>{
    navigate(-1);
}
    return(
        <section className={style.alert_container}>
        <div className={style.alert_innerbox}>
            <div>
            <div>{title}</div>
           <div>{description}</div>
            </div>
            <div className={style.btn_box}>
            <button onClick={ClickOk}>예</button>
           <button onClick={ClicikCancle}>아니오</button>
            </div>
        </div>
      </section>
    )
}

export default DeleteConfirm;