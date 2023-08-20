import style from './addmemo_component.module.css';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const AddMemoComponent = ({setMemos,width,height,day,innertext}) => {
    const [cookies,,] = useCookies(['token']);

    const sendMemo = () =>{
        axios.post('https://api.friendrive.net/record/memo',{
          memo:'lflksjdlfkjlgornviernvjnvlkjdfnvlkjdfnlvkjsdlfkjvnlskdjfnvlksjdfvlkjsdflkvjsldkfjvslkdjfvlksjdfvlkjsdfvlkjsdlkvjnsdlkjvnsdlfkjvsdkl',
          day:`${day}`
        },{
          headers:{
            Authorization: `Bearer ${cookies.token}`
          }
        })
        .then((response)=>{
          console.log(response)
        })
        .catch((response)=>{
          console.log(response);
      })
      }

    return(
        <div style={{width:`${width}px`, height:`${height}px`}} className={style.add_memo}>
            <div>{innertext}</div>
            <button onClick={sendMemo}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 32 32" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16 4C22.6274 4 28 9.37258 28 16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4Z" stroke="black" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20 16.0001H12" stroke="black" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.0001 12V20" stroke="black" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
             </button>
        </div>
    )
}

export default AddMemoComponent;