// 임시db

const comments = [
    {
        id: 1,
        userid: 'hello',
        date: '2024-07-01',
        comment: '안녕하세요',
    },
    {
        id: 2,
        userid: 'happy',
        date: '2024-07-02',
        comment: '반갑습니다.',
    },
    {
        id: 3,
        userid: 'lucky',
        date: '2024-07-04',
        comment: '행복하세요',
    },
    {
        id: 4,
        userid: 'fail',
        date: '2024-07-08',
        comment: '망했다',
    }
    
]

module.exports = comments; 
//어느 범위까지 이 모듈을 쓸수 있지? 
// => 딴곳에서 require로 불러올때 경로를 쓰기떄문에 관계없음