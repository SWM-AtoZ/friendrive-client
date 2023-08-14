import style from './teacherdaylist.module.css'

const TeacherDayList = () => {

    //url에서 티처토큰,day 받아오는 코드작성

    //서버로부터 전체 커리큘럼 받아오는 함수
    const getCurriculum = () =>{}

    //서버로부터 체크아이템 받아오는 함수
    const getCheckedItem = () =>{}

    //뒤로가기 버튼 누를 때 히스토리 없을 시 티처 홈으로 이동하게하는 함수 작성 (선생님 페이지 공유 대비.)
    const backBtn = () => {}

    //피드백 주기 버튼 누르면 피드백 입력하는 모달창 띄우는 함수
    const WriteFeedback = () => {}

    //피드백 입력하고 서버에 보내주는 함수
    const sendFeedback = () => {}
    
    return(
        <div>선생님 데이리스트 페이지입니다.</div>
    )
}

export default TeacherDayList;