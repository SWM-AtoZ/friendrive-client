import style from "./loading.module.css";

const Loading = () => {
  return (
    <div className={style.loading_box}>
      {/* <div className={style.loading_title}>Friendrive</div> */}
      <div class={style.lds_default}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
