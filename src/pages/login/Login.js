import style from "./login.module.css";
import TopNavi from "../../componenets/topNavi/TopNavi";
import { useCookies } from "react-cookie";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

//로그인 api열리면 jwt토큰 받아서 쿠키에 저장하고 홈페이지로 리턴하는 코드까지 작성 완료
const Login = () => {
  const [phonenumber, setPhonenumber] = useState("");
  const [isUser, setIsUser] = useState(false);
  const [name, setName] = useState("");
  const [certification, setCertification] = useState("");
  const [IsphoneNumberBtn, setIsPhoneNumberBtn] = useState(true);
  const [IsJwtBtn, setIsJwtBtn] = useState(true);
  const [cookies, setCookies] = useCookies(["token"]);
  const expires = new Date();
  expires.setMonth(expires.getMonth() + 3);
  const navigate = useNavigate();

  const loginbtnRef = useRef();
  const certibtnRef = useRef();
  const certiToggle = useRef();

  const onChangePhonenumber = (e) => {
    if (e.target.value.length < 12) {
      setPhonenumber(e.target.value);
    }
  };
  const onChangeName = (e) => {
    if (e.target.value.includes(" ")) {
      return;
    }
    setName(e.target.value);
  };

  const onChangeCertification = (e) => {
    if (e.target.value.length < 7) {
      setCertification(e.target.value);
    }
  };

  const sendPhoneumber = () => {
    loginbtnRef.current.innerText = "인증문자 다시 받기";
    axios
      .post("https://api.friendrive.net/login/number", {
        phoneNumber: phonenumber,
      })
      .then(function (response) {
        console.log(response);
        setIsUser(response.data.isUser);
        certiToggle.current.style.maxHeight = `${certiToggle.current.scrollHeight}px`;
      })
      .catch(function (error) {
        console.log(error);
        if (
          error.response.data.message === "인증번호 발송 횟수를 초과하였습니다."
        ) {
          alert("인증번호 발송 횟수를 초과하였습니다. 고객센터에 문의해주세요");
        } else {
          alert("현재 로그인이 불가한 상태입니다. 고객센터에 문의해주세요");
        }
      });
  };

  useEffect(() => {
    if (phonenumber.length >= 10) {
      //loginbtnRef.current.disabled = false;
      setIsPhoneNumberBtn(false);
    } else {
      setIsPhoneNumberBtn(true);
    }
    if (isUser) {
      if (certification.length === 6) {
        // certibtnRef.current.disabled = false;
        setIsJwtBtn(false);
      } else {
        setIsJwtBtn(true);
      }
    } else {
      if (certification.length === 6 && name.length > 1) {
        // certibtnRef.current.disabled = false;
        setIsJwtBtn(false);
      } else {
        setIsJwtBtn(true);
      }
    }
  }, [phonenumber, name, certification]);

  //인증코드, 폰번호, 이름 입력받아 서버로 보내어 jwt토큰 반환받는 함수
  const getJWT = () => {
    if (isUser) {
      axios
        .post("https://api.friendrive.net/login/verification", {
          code: certification,
          phoneNumber: phonenumber,
        })
        .then(function (response) {
          console.log(response);
          setCookies("token", response.data.accessToken, {
            expires: expires,
          });
          navigate(-1);
        })
        .catch(function (error) {
          console.log(error);
          if (
            error.response.data.message ===
            "인증번호 발송 횟수를 초과하였습니다."
          ) {
            alert(
              "인증번호 발송 횟수를 초과하였습니다. 고객센터에 문의해주세요"
            );
          } else {
            alert("현재 로그인이 불가한 상태입니다. 고객센터에 문의해주세요");
          }
        });
    } else {
      axios
        .post("https://api.friendrive.net/login/verification", {
          code: certification,
          phoneNumber: phonenumber,
          name: name,
        })
        .then(function (response) {
          console.log(response);
          setCookies("token", response.data.accessToken, {
            expires: expires,
          });
          navigate(-1);
        })
        .catch(function (error) {
          console.log(error);
          if (
            error.response.data.message ===
            "인증번호 발송 횟수를 초과하였습니다."
          ) {
            alert(
              "인증번호 발송 횟수를 초과하였습니다. 고객센터에 문의해주세요"
            );
          } else {
            alert("현재 로그인이 불가한 상태입니다. 고객센터에 문의해주세요");
          }
        });
    }
  };

  return (
    <section className={style.login_section}>
      <TopNavi title={"로그인"} />
      <article className={style.login_container}>
        <div className={style.login_description}>
          <div>휴대폰 번호와 이름을 입력해주세요.</div>
          <div>
            프렌드라이브는 휴대폰 번호로 간편 가입해요. 번호는 안전하게 보관되며
            어디에도 공개되지 않아요.
          </div>
          <article className={style.form_box}>
            <input
              className={style.login_input}
              type="number"
              placeholder="휴대폰 번호를 입력해 주세요 (필수)"
              value={phonenumber}
              onChange={onChangePhonenumber}
            ></input>
            <button
              ref={loginbtnRef}
              className={style.receive_certification}
              onClick={sendPhoneumber}
              disabled={IsphoneNumberBtn}
            >
              인증문자 받기
            </button>
            <div ref={certiToggle} className={style.login_toggle}>
              <input
                style={{ opacity: isUser ? `0` : `1` }}
                className={style.login_input}
                type="text"
                placeholder="이름을 입력해주세요 (필수)"
                value={name}
                onChange={onChangeName}
              ></input>
              <input
                className={style.certification_input}
                type="number"
                placeholder="인증 번호를 입력해 주세요"
                value={certification}
                onChange={onChangeCertification}
              ></input>
              <button
                ref={certibtnRef}
                className={style.send_certification}
                onClick={getJWT}
                disabled={IsJwtBtn}
              >
                인증번호 확인
              </button>
            </div>
          </article>
        </div>
      </article>
    </section>
  );
};

export default Login;
