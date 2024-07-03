// 하나의 모듈 파일에 여러개의 모듈 만들기
// 방법1

/* function add(x,y) {
    return x + y ;
}
function subtract(x,y) {
    return x - y;
}
function multiply(x, y) {
    return x * y ;
} */
/* 
const add = (x, y) =>  x + y ;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

 */

// function 키워드를 사용 할때는 module.exports의 위치가 상관 없지만
// 화살표 함수로 작성 했을 때는 module.exports는 항상 화살표 함수 아래에 위치해야한다.
// module.exports = { add, subtract, multiply, divide }


// 방법2
/* 
module.exports.add = (x,y) => {
    return x + y;
}
module.exports.subtract = (x,y) => {
    return x - y;
}
module.exports.multiply = (x,y) => {
    return x * y;
}
module.exports.divide = (x,y) => {
    return x / y;
}
 */

// 방법2 의 생략버전
exports.add = (x,y) => {
    return x + y;
}
exports.subtract = (x,y) => {
    return x - y;
}
exports.multiply = (x,y) => {
    return x * y;
}
exports.divide = (x,y) => {
    return x / y;
}


