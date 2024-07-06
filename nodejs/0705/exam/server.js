const express = require('express')
const app = express();
const PORT = 8000

//body-parser
app.use(express.json())
// view engine
app.set('view engine', 'ejs')

// router
app.get('/', (req,res) => {
    res.render('index')
})
app.get('/get', (req,res) => {
    res.render('get')
})
app.get('/post', (req,res) => {
    res.render('post')
})


// 데이터 요청과 응답

app.get('/resultGet',(req, res) => {
    console.log('요청값',req.query);
    
    res.json({response: req.query})
})

const id = 'kdt13'
const pw = '1234'
app.post('/resultPost', (req, res) => {
    console.log('요청값', req.body);
    const {id: reqId, pw:reqPw} = req.body
    if( id === reqId && pw === reqPw) {
        res.json({result: true, userId: id })
    }else{
        res.json({result: false, userId: null})

    }
})





app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})