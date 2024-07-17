const express = require('express')
const cookieParser = require('cookie-parser')
const app = express();
const PORT = 8000;



// 미들웨어, 설정
app.set('view engine', 'ejs')
// 쿠키-파서
app.use(cookieParser('my-secret'))

// 쿠키옵션
const cookieConfig = {
    /* 
    httpOnly: 웹서버를 통해서만 쿠키에 접근 가능
    => javascript에서 document.cookie를 이용해 쿠키에 접근하는 것을 차단

    maxAge: 쿠키의 수명
    
    expires: 만료 날짜를 GMT시간(일반적인 시간)으로 설정(maxAge와 동시 사용불가)
    
    path: 해당 디렉토리와 하위 디렉토리에서만 경로가 활성화 되고,
    웹 브라우저는 해당 하는 쿠키만 웹서버에 전송
    => 쿠키가 전송될 url을 지정 (기본값 : /)

    domain: 쿠키가 전송될 도메인을 지정 (기본값: 현재 도메인)
    
    secure: https로 통신하는 경우만 쿠키를 전송

    signed: 쿠키의 암호화 결정. 
    쿠키가 서명되어, 클라이언트가 쿠키를 수정하는 것을 방지
    */

    httpOnly: true,
    maxAge: 60 * 1000, // 1분
    signed: true,

}

// router
app.get('/', (req, res) => {
    res.render('index');
})
app.get('/setCookie', (req, res) => {
    // 쿠키 생성
    // cookie(쿠키이름, 쿠키값, 옵션)
    res.cookie("myCookie", "가나다라마바사", cookieConfig)
    res.send('쿠키 생성하기')
})
app.get('/getCookie', (req, res) => {
    // 쿠키값 가져오기
    // console.log(req.cookies.myCookie);
    // res.send(req.cookies)
    console.log(req.signedCookies.myCookie);
    res.send(req.signedCookies)
})
app.get('/clearCookie', (req, res) => {
    // 쿠키 삭제
    res.clearCookie('myCookie')
    res.send("쿠키삭제");
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})