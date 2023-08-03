import kakoLogin from './kakaoLogin.png';
import style from './kakaologin.module.css';

const KakaoLogin = () => {
    const CLIENT_ID = 'a7a85bcf9e7af40d7002b8fe4a670851';
    const REDIRECT_URI = 'https://friendrive.net/user';
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`

    return(
        <div onClick={() => window.location.href = kakaoURL}>
            <img className={style.login_btn} src={kakoLogin}/>
        </div>
    )
}

export default KakaoLogin;