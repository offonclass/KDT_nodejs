const express = require('express')
const session = require('express-session')
const app = express();
const PORT = 8000;


// 세션옵션 객체
/**
 * secret: 세션을 암호화 하기 위한 비밀키
 * resave: 세션을 항상 저장할지를 지정(보통 false를 권장)
 * => 세션에 수정사항이 생기지 않더라도매 요청마다 세션을 다시 저장할 것인지 지정
 * saveUninitialized: 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정
 * => 초기화 되지 않는 세션을 저장할지 설정(보통 true)
 * name: 세션의 쿠키 이름을 설정
 * cookie 객체
 * cookie: {
 * httpOnly: 자바스크립트를 통해서 세션을 사용할 수 없도록 함
 * secure: https에서만 세션을 주고 받음
 * }
*/


app.use(
    session({
    secret: 'mySession',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 1000,
    }
}));

app.get('/', (req, res) => {
    // 세션설정
    // req.session.name = "홍길동"
    req.session.user = {
        id: 1,
        username: '홍길동'
    }
    res.send('세션설정')

})

app.get('/getSession', (req, res) => {
    console.log(req.session.user);
})

app.get('/destroy', (req, res) => {
    req.session.destroy();
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})