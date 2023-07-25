import style from './login.module.css';
import KakaoLogin from '../../componenets/kakaoLogin/KakaoLogin';

const Login = () => {
    return(<div className={style.login_button_container}>
        <KakaoLogin/>
    </div>
        
    )
}

export default Login;