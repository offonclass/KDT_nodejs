const express = require('express');
const app = express();
const PORT = 8000;

// view engine 설정
app.set('view engine', 'ejs');



// 미들웨어
app.use(express.json());



// 라우터
const userRouter = require('./routes/user')
app.use('/user', userRouter);


// 404페이지
app.use('*', (req, res) => {
    res.render('404');
});

app.listen(PORT, () => {
console.log(`http://localhost:${PORT}`);
});