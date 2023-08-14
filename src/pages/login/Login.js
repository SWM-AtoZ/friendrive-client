import style from './login.module.css';
import KakaoLogin from '../../componenets/kakaoLogin/KakaoLogin';

const Login = () => {

    //번호 간편 로그인으로 변경
    //번호 입력받아 서버로 번호 보내는 함수
    const sendPhoneNumber = () => {}

    //인증코드, 폰번호, 이름 입력받아 서버로 보내어 jwt토큰 반환받는 함수
    const getJWT = () => {}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    return(<div className={style.login_button_container}>
        <div className={style.login_text}>
            <div>Friendrive 간편 시작하기</div>
        </div>
        <div className={style.login_innerbox}>
        <KakaoLogin/>
        </div>
    </div>
        
    )
}

export default Login;