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


// 여기가 변경 

// es6문법에서는 화살표든 function이던 export위치는 상관없음
// 이유 : es6는 모든 export와 import문이 로드 시점에 한번에 평가되고 처리되기 떄문에
// 함수 선언이나 변수 선언의 위치와 무관하게 올바르게 작동함

// export {add, subtract, multiply};

// 방법2
/* 
export function add(x, y) {
    return x + y;
}
export function subtract(x, y) {
    return x - y;
}
export function multiply(x, y) {
    return x * y;
}
 */


// 방법3 (한번에 내보내기)
const add = (x, y) => x+ y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;

const calculator = {add, subtract, multiply};

export default calculator;