import { useRouteError } from "react-router-dom";
import style from "./error.module.css";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className={style.error_box} id="error-page">
      <h1>Oops!</h1>
      <p>죄송합니다. 예상치 못한 오류가 발생했습니다.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
