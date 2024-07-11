const express = require('express')
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs')

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

// router
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/comments', (req, res) => {
    res.render('comments', { list: comments })
});

// :변수값은 {변수명: "값"} 형태
app.get('/comment/:page', (req, res) => {
    
    console.log(req.params);
    console.log(req.params.page);
    console.log(typeof req.params.page);
    const page = Number(req.params.page);
    res.render('comment', {data: comments[page-1]})
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})