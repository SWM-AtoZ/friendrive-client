const KakaoLogin = () => {
    const CLIENT_ID = 'a7a85bcf9e7af40d7002b8fe4a670851';
    const REDIRECT_URI = 'http://localhost:3000/user';
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`

    return(
        <button
            width="255"
            height="35"
            style={{backgroundColor:'yellow'}}
            onClick={() => window.location.href = kakaoURL}
        >카카오 로그인
        </button>
    )
}

export default KakaoLogin;