// 하나의 모듈 파일에 하나의 모듈 만들기(es6)
const a = 10;
const b = 20;

function connect() {
    return a+b;
}

// 여기가 변경
export default connect;