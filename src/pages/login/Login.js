import style from './login.module.css';
import KakaoLogin from '../../componenets/kakaoLogin/KakaoLogin';

const Login = () => {
    return(<div className={style.login_button_container}>
        <div className={style.login_text}>
            <div>Friendrive 로그인</div>
        </div>
        <div className={style.login_innerbox}>
        <KakaoLogin/>
        </div>
    </div>
        
    )
}

export default Login;