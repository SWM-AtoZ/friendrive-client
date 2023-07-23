
const Teacher = () => {
// API 더미데이터
const curriculum = {
    "curriculum": [
        {
            "days": 1,
            "title": "차량 기본 조작 요령 숙지",
            "summary": "넓고 안전한 공간에서 기본 조작을 배우는 시간이에요",
            "explain": "도로에 나가기 전 여러 기능을 조작해 보고 차를 내게 맞도록 조정해야 해요!"
        },
        {
            "days": 2,
            "title": "안전 주행, 방어 운전",
            "summary": "넓고 안전한 도로에서 기본 주행을 배우는 시간이에요.",
            "explain": "도로에서 차선을 맞추며 달리다가 신호와 표지판에 따라 좌/우회전, U턴을 해보아요!"
        },
        {
          "days": 3,
          "title": "여러 차선이 있는 큰 도로에서 차선 변경을 배우는 시간이에요",
          "summary": "아직 좁고 복잡한 도로는 어려울 수 있어요 안전거리를 유지하고 멀리 보며 운전해 보아요!",
          "explain": "큰 도로에서 다른 운전자들과 어울려 볼까요?"
       },
        {
          "days": 4,
          "title": "혼잡한 시내와 골목에서 주행을 배우는 시간이에요",
          "summary": "시내와 좁은 골목까지 익숙해진다묜 이제 주행은 어렵지 않을 거에요",
          "explain": "이제 다 왔어요! 혼잡한 도로까지 정복해 볼까요?"
         },
         {
          "days": 5,
          "title": "공간이 넓은 주차장에서 주차를 배우는 시간이에요",
          "summary": "괜찮아요, 주차는 모든 초보가 어려워해요 머릿속으로 그려가며 천천히 연습해 보아요!",
          "explain": "마지막이에요! 주차만 끝내면 베스트 드라이버!"
         }
    ],
    "items": [
        {
            "itemId": "d1i1",
            "day": 1,
            "subject": "운전자세",
            "content": [
                [
                    "https://paillo.tistory.com",
                    "문석이 블로그"
                ],
                [
                    "https://youtube.com",
                    "네이버"
                ]
            ]
        },
        {
            "itemId": "d1i2",
            "day": 1,
            "subject": "내부조작",
            "content": [
                [
                    "https://paillo.tistory.com",
                    "문석이 블로그"
                ],
                [
                    "https://youtube.com",
                    "네이버"
                ]
            ]
        },
        {
            "itemId": "d2i1",
            "day": 2,
            "subject": "좌회전",
            "content": [
                [
                    "https://paillo.tistory.com",
                    "문석이 블로그"
                ],
                [
                    "https://youtube.com",
                    "네이버"
                ]
            ]
        },
        {
            "itemId": "d2i2",
            "day": 2,
            "subject": "우회전",
            "content": [
                [
                    "https://paillo.tistory.com",
                    "문석이 블로그"
                ],
                [
                    "https://youtube.com",
                    "네이버"
                ]
            ]
        }
    ]
};

    return(<div>
        <h1>선생님 페이지 입니다.</h1>
    </div>)
}

export default Teacher;