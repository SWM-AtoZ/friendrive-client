import style from './curriculum.module.css';
import TopNavi from '../../componenets/topNavi/TopNavi';

const Curriculum = () => {
    return(
        <section className={style.curruculumSection}>
        <TopNavi title={'커리큘럼'}/>
        {/* 데이 리스트마다 프로그레스 바 추가., 각 curriculumList 클릭하면 해당 Daylist로 이동. */}
        <div className={style.curriculum_list_container}>
        <div  className={style.curriculum_list}>
                    <div className={style.curriculum_progress}>
                    
                    </div>
                    <div className={style.title}>
                    
                    </div>
                    <div className={style.to_daylist}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
                        <path d="M2.70921 1.29128L6.70921 5.29128C6.80294 5.38424 6.87733 5.49484 6.9281 5.6167C6.97887 5.73856 7.00501 5.86927 7.00501 6.00128C7.00501 6.13329 6.97887 6.264 6.9281 6.38586C6.87733 6.50772 6.80294 6.61832 6.70921 6.71128L2.70921 10.7113C2.61597 10.8045 2.50528 10.8785 2.38346 10.9289C2.26164 10.9794 2.13107 11.0054 1.99921 11.0054C1.86735 11.0054 1.73678 10.9794 1.61496 10.9289C1.49314 10.8785 1.38245 10.8045 1.28921 10.7113C1.19597 10.618 1.12201 10.5074 1.07155 10.3855C1.02109 10.2637 0.995117 10.1331 0.995117 10.0013C0.995117 9.86942 1.02109 9.73885 1.07155 9.61703C1.12201 9.49521 1.19597 9.38452 1.28921 9.29128L4.58921 6.00128L1.28921 2.71128C1.1009 2.52297 0.995117 2.26758 0.995117 2.00128C0.995117 1.73498 1.1009 1.47958 1.28921 1.29128C1.47751 1.10298 1.73291 0.997189 1.99921 0.997189C2.26551 0.997189 2.5209 1.10298 2.70921 1.29128Z" fill="black" fill-opacity="0.6"/>
                    </svg>
                    </div>
        </div>
        </div>
        </section>
    )
}

export default Curriculum;