const express = require('express')
const app = express();
const PORT = 8000;

// 뷰 앤진
app.set("view engine", 'ejs');
app.set('views', './views');
// 미들웨어 body-parser
app.use(express.urlencoded({ extended: true }))
// extended:true 일때는 qs모듈을 사용하여 body 데이터를 해석
// extended:false 일때는 내장된 querystring 모듈을 사용


app.get('/', (req, res) => {
    res.render('form');
});

app.get('/form', (req, res) => {
    res.render('index');
    
});

// get방식 일때
app.get('/getForm', (req, res) => {
    console.log(req.query);
    res.render("result", {title: 'get요청 결과', userInfo: req.query});
})
// post방식 일때
app.post('/postForm', (req, res) => {
    console.log(req.body);
    res.render("result", {title :"post요청 결과", userInfo: req.body})
})


// 서버실행
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})